;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="b0ce7392-fac7-7912-f4fc-b84185c1eb1d")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
if ("TURBOPACK compile-time truthy", 1) {
    (function() {
        'use strict';
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var enableSchedulerDebugging = false;
        var enableProfiling = false;
        var frameYieldMs = 5;
        function push(heap, node) {
            var index = heap.length;
            heap.push(node);
            siftUp(heap, node, index);
        }
        function peek(heap) {
            return heap.length === 0 ? null : heap[0];
        }
        function pop(heap) {
            if (heap.length === 0) {
                return null;
            }
            var first = heap[0];
            var last = heap.pop();
            if (last !== first) {
                heap[0] = last;
                siftDown(heap, last, 0);
            }
            return first;
        }
        function siftUp(heap, node, i) {
            var index = i;
            while(index > 0){
                var parentIndex = index - 1 >>> 1;
                var parent = heap[parentIndex];
                if (compare(parent, node) > 0) {
                    // The parent is larger. Swap positions.
                    heap[parentIndex] = node;
                    heap[index] = parent;
                    index = parentIndex;
                } else {
                    // The parent is smaller. Exit.
                    return;
                }
            }
        }
        function siftDown(heap, node, i) {
            var index = i;
            var length = heap.length;
            var halfLength = length >>> 1;
            while(index < halfLength){
                var leftIndex = (index + 1) * 2 - 1;
                var left = heap[leftIndex];
                var rightIndex = leftIndex + 1;
                var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.
                if (compare(left, node) < 0) {
                    if (rightIndex < length && compare(right, left) < 0) {
                        heap[index] = right;
                        heap[rightIndex] = node;
                        index = rightIndex;
                    } else {
                        heap[index] = left;
                        heap[leftIndex] = node;
                        index = leftIndex;
                    }
                } else if (rightIndex < length && compare(right, node) < 0) {
                    heap[index] = right;
                    heap[rightIndex] = node;
                    index = rightIndex;
                } else {
                    // Neither child is smaller. Exit.
                    return;
                }
            }
        }
        function compare(a, b) {
            // Compare sort index first, then task id.
            var diff = a.sortIndex - b.sortIndex;
            return diff !== 0 ? diff : a.id - b.id;
        }
        // TODO: Use symbols?
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        function markTaskErrored(task, ms) {}
        /* eslint-disable no-var */ var hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
        if (hasPerformanceNow) {
            var localPerformance = performance;
            exports.unstable_now = function() {
                return localPerformance.now();
            };
        } else {
            var localDate = Date;
            var initialTime = localDate.now();
            exports.unstable_now = function() {
                return localDate.now() - initialTime;
            };
        } // Max 31 bit integer. The max integer size in V8 for 32-bit systems.
        // Math.pow(2, 30) - 1
        // 0b111111111111111111111111111111
        var maxSigned31BitInt = 1073741823; // Times out immediately
        var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out
        var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
        var NORMAL_PRIORITY_TIMEOUT = 5000;
        var LOW_PRIORITY_TIMEOUT = 10000; // Never times out
        var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap
        var taskQueue = [];
        var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.
        var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
        var currentTask = null;
        var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrance.
        var isPerformingWork = false;
        var isHostCallbackScheduled = false;
        var isHostTimeoutScheduled = false; // Capture local references to native APIs, in case a polyfill overrides them.
        var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : null;
        var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : null;
        var localSetImmediate = typeof setImmediate !== 'undefined' ? setImmediate : null; // IE and Node.js + jsdom
        var isInputPending = typeof navigator !== 'undefined' && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined ? navigator.scheduling.isInputPending.bind(navigator.scheduling) : null;
        function advanceTimers(currentTime) {
            // Check for tasks that are no longer delayed and add them to the queue.
            var timer = peek(timerQueue);
            while(timer !== null){
                if (timer.callback === null) {
                    // Timer was cancelled.
                    pop(timerQueue);
                } else if (timer.startTime <= currentTime) {
                    // Timer fired. Transfer to the task queue.
                    pop(timerQueue);
                    timer.sortIndex = timer.expirationTime;
                    push(taskQueue, timer);
                } else {
                    // Remaining timers are pending.
                    return;
                }
                timer = peek(timerQueue);
            }
        }
        function handleTimeout(currentTime) {
            isHostTimeoutScheduled = false;
            advanceTimers(currentTime);
            if (!isHostCallbackScheduled) {
                if (peek(taskQueue) !== null) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                } else {
                    var firstTimer = peek(timerQueue);
                    if (firstTimer !== null) {
                        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                    }
                }
            }
        }
        function flushWork(hasTimeRemaining, initialTime) {
            isHostCallbackScheduled = false;
            if (isHostTimeoutScheduled) {
                // We scheduled a timeout but it's no longer needed. Cancel it.
                isHostTimeoutScheduled = false;
                cancelHostTimeout();
            }
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                {
                    var currentTime;
                } else {
                    // No catch in prod code path.
                    return workLoop(hasTimeRemaining, initialTime);
                }
            } finally{
                currentTask = null;
                currentPriorityLevel = previousPriorityLevel;
                isPerformingWork = false;
            }
        }
        function workLoop(hasTimeRemaining, initialTime) {
            var currentTime = initialTime;
            advanceTimers(currentTime);
            currentTask = peek(taskQueue);
            while(currentTask !== null && !enableSchedulerDebugging){
                if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
                    break;
                }
                var callback = currentTask.callback;
                if (typeof callback === 'function') {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
                    var continuationCallback = callback(didUserCallbackTimeout);
                    currentTime = exports.unstable_now();
                    if (typeof continuationCallback === 'function') {
                        currentTask.callback = continuationCallback;
                    } else {
                        if (currentTask === peek(taskQueue)) {
                            pop(taskQueue);
                        }
                    }
                    advanceTimers(currentTime);
                } else {
                    pop(taskQueue);
                }
                currentTask = peek(taskQueue);
            } // Return whether there's additional work
            if (currentTask !== null) {
                return true;
            } else {
                var firstTimer = peek(timerQueue);
                if (firstTimer !== null) {
                    requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                }
                return false;
            }
        }
        function unstable_runWithPriority(priorityLevel, eventHandler) {
            switch(priorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                case LowPriority:
                case IdlePriority:
                    break;
                default:
                    priorityLevel = NormalPriority;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_next(eventHandler) {
            var priorityLevel;
            switch(currentPriorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                    // Shift down to normal priority
                    priorityLevel = NormalPriority;
                    break;
                default:
                    // Anything lower than normal priority should remain at the current level.
                    priorityLevel = currentPriorityLevel;
                    break;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_wrapCallback(callback) {
            var parentPriorityLevel = currentPriorityLevel;
            return function() {
                // This is a fork of runWithPriority, inlined for performance.
                var previousPriorityLevel = currentPriorityLevel;
                currentPriorityLevel = parentPriorityLevel;
                try {
                    return callback.apply(this, arguments);
                } finally{
                    currentPriorityLevel = previousPriorityLevel;
                }
            };
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
            var currentTime = exports.unstable_now();
            var startTime;
            if (typeof options === 'object' && options !== null) {
                var delay = options.delay;
                if (typeof delay === 'number' && delay > 0) {
                    startTime = currentTime + delay;
                } else {
                    startTime = currentTime;
                }
            } else {
                startTime = currentTime;
            }
            var timeout;
            switch(priorityLevel){
                case ImmediatePriority:
                    timeout = IMMEDIATE_PRIORITY_TIMEOUT;
                    break;
                case UserBlockingPriority:
                    timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
                    break;
                case IdlePriority:
                    timeout = IDLE_PRIORITY_TIMEOUT;
                    break;
                case LowPriority:
                    timeout = LOW_PRIORITY_TIMEOUT;
                    break;
                case NormalPriority:
                default:
                    timeout = NORMAL_PRIORITY_TIMEOUT;
                    break;
            }
            var expirationTime = startTime + timeout;
            var newTask = {
                id: taskIdCounter++,
                callback: callback,
                priorityLevel: priorityLevel,
                startTime: startTime,
                expirationTime: expirationTime,
                sortIndex: -1
            };
            if (startTime > currentTime) {
                // This is a delayed task.
                newTask.sortIndex = startTime;
                push(timerQueue, newTask);
                if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
                    // All tasks are delayed, and this is the task with the earliest delay.
                    if (isHostTimeoutScheduled) {
                        // Cancel an existing timeout.
                        cancelHostTimeout();
                    } else {
                        isHostTimeoutScheduled = true;
                    } // Schedule a timeout.
                    requestHostTimeout(handleTimeout, startTime - currentTime);
                }
            } else {
                newTask.sortIndex = expirationTime;
                push(taskQueue, newTask);
                // wait until the next time we yield.
                if (!isHostCallbackScheduled && !isPerformingWork) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                }
            }
            return newTask;
        }
        function unstable_pauseExecution() {}
        function unstable_continueExecution() {
            if (!isHostCallbackScheduled && !isPerformingWork) {
                isHostCallbackScheduled = true;
                requestHostCallback(flushWork);
            }
        }
        function unstable_getFirstCallbackNode() {
            return peek(taskQueue);
        }
        function unstable_cancelCallback(task) {
            // remove from the queue because you can't remove arbitrary nodes from an
            // array based heap, only the first one.)
            task.callback = null;
        }
        function unstable_getCurrentPriorityLevel() {
            return currentPriorityLevel;
        }
        var isMessageLoopRunning = false;
        var scheduledHostCallback = null;
        var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
        // thread, like user events. By default, it yields multiple times per frame.
        // It does not attempt to align with frame boundaries, since most tasks don't
        // need to be frame aligned; for those that do, use requestAnimationFrame.
        var frameInterval = frameYieldMs;
        var startTime = -1;
        function shouldYieldToHost() {
            var timeElapsed = exports.unstable_now() - startTime;
            if (timeElapsed < frameInterval) {
                // The main thread has only been blocked for a really short amount of time;
                // smaller than a single frame. Don't yield yet.
                return false;
            } // The main thread has been blocked for a non-negligible amount of time. We
            return true;
        }
        function requestPaint() {}
        function forceFrameRate(fps) {
            if (fps < 0 || fps > 125) {
                // Using console['error'] to evade Babel and ESLint
                console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');
                return;
            }
            if (fps > 0) {
                frameInterval = Math.floor(1000 / fps);
            } else {
                // reset the framerate
                frameInterval = frameYieldMs;
            }
        }
        var performWorkUntilDeadline = function() {
            if (scheduledHostCallback !== null) {
                var currentTime = exports.unstable_now(); // Keep track of the start time so we can measure how long the main thread
                // has been blocked.
                startTime = currentTime;
                var hasTimeRemaining = true; // If a scheduler task throws, exit the current browser task so the
                // error can be observed.
                //
                // Intentionally not using a try-catch, since that makes some debugging
                // techniques harder. Instead, if `scheduledHostCallback` errors, then
                // `hasMoreWork` will remain true, and we'll continue the work loop.
                var hasMoreWork = true;
                try {
                    hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
                } finally{
                    if (hasMoreWork) {
                        // If there's more work, schedule the next message event at the end
                        // of the preceding one.
                        schedulePerformWorkUntilDeadline();
                    } else {
                        isMessageLoopRunning = false;
                        scheduledHostCallback = null;
                    }
                }
            } else {
                isMessageLoopRunning = false;
            } // Yielding to the browser will give it a chance to paint, so we can
        };
        var schedulePerformWorkUntilDeadline;
        if (typeof localSetImmediate === 'function') {
            // Node.js and old IE.
            // There's a few reasons for why we prefer setImmediate.
            //
            // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
            // (Even though this is a DOM fork of the Scheduler, you could get here
            // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
            // https://github.com/facebook/react/issues/20756
            //
            // But also, it runs earlier which is the semantic we want.
            // If other browsers ever implement it, it's better to use it.
            // Although both of these would be inferior to native scheduling.
            schedulePerformWorkUntilDeadline = function() {
                localSetImmediate(performWorkUntilDeadline);
            };
        } else if (typeof MessageChannel !== 'undefined') {
            // DOM and Worker environments.
            // We prefer MessageChannel because of the 4ms setTimeout clamping.
            var channel = new MessageChannel();
            var port = channel.port2;
            channel.port1.onmessage = performWorkUntilDeadline;
            schedulePerformWorkUntilDeadline = function() {
                port.postMessage(null);
            };
        } else {
            // We should only fallback here in non-browser environments.
            schedulePerformWorkUntilDeadline = function() {
                localSetTimeout(performWorkUntilDeadline, 0);
            };
        }
        function requestHostCallback(callback) {
            scheduledHostCallback = callback;
            if (!isMessageLoopRunning) {
                isMessageLoopRunning = true;
                schedulePerformWorkUntilDeadline();
            }
        }
        function requestHostTimeout(callback, ms) {
            taskTimeoutID = localSetTimeout(function() {
                callback(exports.unstable_now());
            }, ms);
        }
        function cancelHostTimeout() {
            localClearTimeout(taskTimeoutID);
            taskTimeoutID = -1;
        }
        var unstable_requestPaint = requestPaint;
        var unstable_Profiling = null;
        exports.unstable_IdlePriority = IdlePriority;
        exports.unstable_ImmediatePriority = ImmediatePriority;
        exports.unstable_LowPriority = LowPriority;
        exports.unstable_NormalPriority = NormalPriority;
        exports.unstable_Profiling = unstable_Profiling;
        exports.unstable_UserBlockingPriority = UserBlockingPriority;
        exports.unstable_cancelCallback = unstable_cancelCallback;
        exports.unstable_continueExecution = unstable_continueExecution;
        exports.unstable_forceFrameRate = forceFrameRate;
        exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports.unstable_next = unstable_next;
        exports.unstable_pauseExecution = unstable_pauseExecution;
        exports.unstable_requestPaint = unstable_requestPaint;
        exports.unstable_runWithPriority = unstable_runWithPriority;
        exports.unstable_scheduleCallback = unstable_scheduleCallback;
        exports.unstable_shouldYield = shouldYieldToHost;
        exports.unstable_wrapCallback = unstable_wrapCallback;
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
    })();
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/scheduler/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)");
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/stacktrace-parser/dist/stack-trace-parser.esm.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parse",
    ()=>parse
]);
var UNKNOWN_FUNCTION = '<unknown>';
/**
 * This parses the different stack traces and puts them into one format
 * This borrows heavily from TraceKit (https://github.com/csnover/TraceKit)
 */ function parse(stackString) {
    var lines = stackString.split('\n');
    return lines.reduce(function(stack, line) {
        var parseResult = parseChrome(line) || parseWinjs(line) || parseGecko(line) || parseNode(line) || parseJSC(line);
        if (parseResult) {
            stack.push(parseResult);
        }
        return stack;
    }, []);
}
var chromeRe = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|rsc|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var chromeEvalRe = /\((\S*)(?::(\d+))(?::(\d+))\)/;
function parseChrome(line) {
    var parts = chromeRe.exec(line);
    if (!parts) {
        return null;
    }
    var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
    var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
    var submatch = chromeEvalRe.exec(parts[2]);
    if (isEval && submatch != null) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = submatch[1]; // url
        parts[3] = submatch[2]; // line
        parts[4] = submatch[3]; // column
    }
    return {
        file: !isNative ? parts[2] : null,
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: isNative ? [
            parts[2]
        ] : [],
        lineNumber: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
    };
}
var winjsRe = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|rsc|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseWinjs(line) {
    var parts = winjsRe.exec(line);
    if (!parts) {
        return null;
    }
    return {
        file: parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[3],
        column: parts[4] ? +parts[4] : null
    };
}
var geckoRe = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|rsc|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
var geckoEvalRe = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
function parseGecko(line) {
    var parts = geckoRe.exec(line);
    if (!parts) {
        return null;
    }
    var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
    var submatch = geckoEvalRe.exec(parts[3]);
    if (isEval && submatch != null) {
        // throw out eval line/column and use top-most line number
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = null; // no column when eval
    }
    return {
        file: parts[3],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: parts[2] ? parts[2].split(',') : [],
        lineNumber: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
    };
}
var javaScriptCoreRe = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
function parseJSC(line) {
    var parts = javaScriptCoreRe.exec(line);
    if (!parts) {
        return null;
    }
    return {
        file: parts[3],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[4],
        column: parts[5] ? +parts[5] : null
    };
}
var nodeRe = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseNode(line) {
    var parts = nodeRe.exec(line);
    if (!parts) {
        return null;
    }
    return {
        file: parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[3],
        column: parts[4] ? +parts[4] : null
    };
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/feedback/build/npm/esm/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFeedbackIntegration",
    ()=>buildFeedbackIntegration,
    "feedbackModalIntegration",
    ()=>feedbackModalIntegration,
    "feedbackScreenshotIntegration",
    ()=>feedbackScreenshotIntegration,
    "getFeedback",
    ()=>getFeedback,
    "sendFeedback",
    ()=>sendFeedback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$feedback$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/feedback.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$isBrowser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/isBrowser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
;
// exporting a separate copy of `WINDOW` rather than exporting the one from `@sentry/browser`
// prevents the browser package from being bundled in the CDN bundle, and avoids a
// circular dependency between the browser and feedback packages
const WINDOW = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
const DOCUMENT = WINDOW.document;
const NAVIGATOR = WINDOW.navigator;
const TRIGGER_LABEL = 'Report a Bug';
const CANCEL_BUTTON_LABEL = 'Cancel';
const SUBMIT_BUTTON_LABEL = 'Send Bug Report';
const CONFIRM_BUTTON_LABEL = 'Confirm';
const FORM_TITLE = 'Report a Bug';
const EMAIL_PLACEHOLDER = 'your.email@example.org';
const EMAIL_LABEL = 'Email';
const MESSAGE_PLACEHOLDER = "What's the bug? What did you expect?";
const MESSAGE_LABEL = 'Description';
const NAME_PLACEHOLDER = 'Your Name';
const NAME_LABEL = 'Name';
const SUCCESS_MESSAGE_TEXT = 'Thank you for your report!';
const IS_REQUIRED_LABEL = '(required)';
const ADD_SCREENSHOT_LABEL = 'Add a screenshot';
const REMOVE_SCREENSHOT_LABEL = 'Remove screenshot';
const HIGHLIGHT_TOOL_TEXT = 'Highlight';
const HIDE_TOOL_TEXT = 'Hide';
const REMOVE_HIGHLIGHT_TEXT = 'Remove';
const FEEDBACK_WIDGET_SOURCE = 'widget';
const FEEDBACK_API_SOURCE = 'api';
const SUCCESS_MESSAGE_TIMEOUT = 5000;
/**
 * Public API to send a Feedback item to Sentry
 */ const sendFeedback = (params, hint = {
    includeReplay: true
})=>{
    if (!params.message) {
        throw new Error('Unable to submit feedback with empty message');
    }
    // We want to wait for the feedback to be sent (or not)
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        throw new Error('No client setup, cannot send feedback.');
    }
    if (params.tags && Object.keys(params.tags).length) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().setTags(params.tags);
    }
    const eventId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$feedback$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureFeedback"])({
        source: FEEDBACK_API_SOURCE,
        url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getLocationHref"])(),
        ...params
    }, hint);
    // We want to wait for the feedback to be sent (or not)
    return new Promise((resolve, reject)=>{
        // After 30s, we want to clear anyhow
        const timeout = setTimeout(()=>reject('Unable to determine if Feedback was correctly sent.'), 30000);
        const cleanup = client.on('afterSendEvent', (event, response)=>{
            if (event.event_id !== eventId) {
                return;
            }
            clearTimeout(timeout);
            cleanup();
            // Require valid status codes, otherwise can assume feedback was not sent successfully
            if (response?.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                return resolve(eventId);
            }
            if (response?.statusCode === 403) {
                return reject('Unable to send feedback. This could be because this domain is not in your list of allowed domains.');
            }
            return reject('Unable to send feedback. This could be because of network issues, or because you are using an ad-blocker.');
        });
    });
};
/*
 * For reference, the fully built event looks something like this:
 * {
 *     "type": "feedback",
 *     "event_id": "d2132d31b39445f1938d7e21b6bf0ec4",
 *     "timestamp": 1597977777.6189718,
 *     "dist": "1.12",
 *     "platform": "javascript",
 *     "environment": "production",
 *     "release": 42,
 *     "tags": {"transaction": "/organizations/:orgId/performance/:eventSlug/"},
 *     "sdk": {"name": "name", "version": "version"},
 *     "user": {
 *         "id": "123",
 *         "username": "user",
 *         "email": "user@site.com",
 *         "ip_address": "192.168.11.12",
 *     },
 *     "request": {
 *         "url": None,
 *         "headers": {
 *             "user-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15"
 *         },
 *     },
 *     "contexts": {
 *         "feedback": {
 *             "message": "test message",
 *             "contact_email": "test@example.com",
 *             "type": "feedback",
 *         },
 *         "trace": {
 *             "trace_id": "4C79F60C11214EB38604F4AE0781BFB2",
 *             "span_id": "FA90FDEAD5F74052",
 *             "type": "trace",
 *         },
 *         "replay": {
 *             "replay_id": "e2d42047b1c5431c8cba85ee2a8ab25d",
 *         },
 *     },
 *   }
 */ /**
 * This serves as a build time flag that will be true by default, but false in non-debug builds or if users replace `__SENTRY_DEBUG__` in their generated code.
 *
 * ATTENTION: This constant must never cross package boundaries (i.e. be exported) to guarantee that it can be used for tree shaking.
 */ const DEBUG_BUILD = typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__;
/**
 * Mobile browsers do not support `mediaDevices.getDisplayMedia` even though they have the api implemented
 * Instead they return things like `NotAllowedError` when called.
 *
 * It's simpler for us to browser sniff first, and avoid loading the integration if we can.
 *
 * https://stackoverflow.com/a/58879212
 * https://stackoverflow.com/a/3540295
 *
 * `mediaDevices.getDisplayMedia` is also only supported in secure contexts, and return a `mediaDevices is not supported` error, so we should also avoid loading the integration if we can.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
 */ function isScreenshotSupported() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(NAVIGATOR.userAgent)) {
        return false;
    }
    /**
   * User agent on iPads show as Macintosh, so we need extra checks
   *
   * https://forums.developer.apple.com/forums/thread/119186
   * https://stackoverflow.com/questions/60482650/how-to-detect-ipad-useragent-on-safari-browser
   */ if (/Macintosh/i.test(NAVIGATOR.userAgent) && NAVIGATOR.maxTouchPoints && NAVIGATOR.maxTouchPoints > 1) {
        return false;
    }
    if (!isSecureContext) {
        return false;
    }
    return true;
}
/**
 * Quick and dirty deep merge for the Feedback integration options
 */ function mergeOptions(defaultOptions, optionOverrides) {
    return {
        ...defaultOptions,
        ...optionOverrides,
        tags: {
            ...defaultOptions.tags,
            ...optionOverrides.tags
        },
        onFormOpen: ()=>{
            optionOverrides.onFormOpen?.();
            defaultOptions.onFormOpen?.();
        },
        onFormClose: ()=>{
            optionOverrides.onFormClose?.();
            defaultOptions.onFormClose?.();
        },
        onSubmitSuccess: (data, eventId)=>{
            optionOverrides.onSubmitSuccess?.(data, eventId);
            defaultOptions.onSubmitSuccess?.(data, eventId);
        },
        onSubmitError: (error)=>{
            optionOverrides.onSubmitError?.(error);
            defaultOptions.onSubmitError?.(error);
        },
        onFormSubmitted: ()=>{
            optionOverrides.onFormSubmitted?.();
            defaultOptions.onFormSubmitted?.();
        },
        themeDark: {
            ...defaultOptions.themeDark,
            ...optionOverrides.themeDark
        },
        themeLight: {
            ...defaultOptions.themeLight,
            ...optionOverrides.themeLight
        }
    };
}
/**
 * Creates <style> element for widget actor (button that opens the dialog)
 */ function createActorStyles(styleNonce) {
    const style = DOCUMENT.createElement('style');
    style.textContent = `
.widget__actor {
  position: fixed;
  z-index: var(--z-index);
  margin: var(--page-margin);
  inset: var(--actor-inset);

  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;

  font-family: inherit;
  font-size: var(--font-size);
  font-weight: 600;
  line-height: 1.14em;
  text-decoration: none;

  background: var(--actor-background, var(--background));
  border-radius: var(--actor-border-radius, 1.7em/50%);
  border: var(--actor-border, var(--border));
  box-shadow: var(--actor-box-shadow, var(--box-shadow));
  color: var(--actor-color, var(--foreground));
  fill: var(--actor-color, var(--foreground));
  cursor: pointer;
  opacity: 1;
  transition: transform 0.2s ease-in-out;
  transform: translate(0, 0) scale(1);
}
.widget__actor[aria-hidden="true"] {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transform: translate(0, 16px) scale(0.98);
}

.widget__actor:hover {
  background: var(--actor-hover-background, var(--background));
  filter: var(--interactive-filter);
}

.widget__actor svg {
  width: 1.14em;
  height: 1.14em;
}

@media (max-width: 600px) {
  .widget__actor span {
    display: none;
  }
}
`;
    if (styleNonce) {
        style.setAttribute('nonce', styleNonce);
    }
    return style;
}
/**
 * Helper function to set a dict of attributes on element (w/ specified namespace)
 */ function setAttributesNS(el, attributes) {
    Object.entries(attributes).forEach(([key, val])=>{
        el.setAttributeNS(null, key, val);
    });
    return el;
}
const SIZE = 20;
const XMLNS$2 = 'http://www.w3.org/2000/svg';
/**
 * Feedback Icon
 */ function FeedbackIcon() {
    const createElementNS = (tagName)=>WINDOW.document.createElementNS(XMLNS$2, tagName);
    const svg = setAttributesNS(createElementNS('svg'), {
        width: `${SIZE}`,
        height: `${SIZE}`,
        viewBox: `0 0 ${SIZE} ${SIZE}`,
        fill: 'var(--actor-color, var(--foreground))'
    });
    const g = setAttributesNS(createElementNS('g'), {
        clipPath: 'url(#clip0_57_80)'
    });
    const path = setAttributesNS(createElementNS('path'), {
        ['fill-rule']: 'evenodd',
        ['clip-rule']: 'evenodd',
        d: 'M15.6622 15H12.3997C12.2129 14.9959 12.031 14.9396 11.8747 14.8375L8.04965 12.2H7.49956V19.1C7.4875 19.3348 7.3888 19.5568 7.22256 19.723C7.05632 19.8892 6.83435 19.9879 6.59956 20H2.04956C1.80193 19.9968 1.56535 19.8969 1.39023 19.7218C1.21511 19.5467 1.1153 19.3101 1.11206 19.0625V12.2H0.949652C0.824431 12.2017 0.700142 12.1783 0.584123 12.1311C0.468104 12.084 0.362708 12.014 0.274155 11.9255C0.185602 11.8369 0.115689 11.7315 0.0685419 11.6155C0.0213952 11.4995 -0.00202913 11.3752 -0.00034808 11.25V3.75C-0.00900498 3.62067 0.0092504 3.49095 0.0532651 3.36904C0.0972798 3.24712 0.166097 3.13566 0.255372 3.04168C0.344646 2.94771 0.452437 2.87327 0.571937 2.82307C0.691437 2.77286 0.82005 2.74798 0.949652 2.75H8.04965L11.8747 0.1625C12.031 0.0603649 12.2129 0.00407221 12.3997 0H15.6622C15.9098 0.00323746 16.1464 0.103049 16.3215 0.278167C16.4966 0.453286 16.5964 0.689866 16.5997 0.9375V3.25269C17.3969 3.42959 18.1345 3.83026 18.7211 4.41679C19.5322 5.22788 19.9878 6.32796 19.9878 7.47502C19.9878 8.62209 19.5322 9.72217 18.7211 10.5333C18.1345 11.1198 17.3969 11.5205 16.5997 11.6974V14.0125C16.6047 14.1393 16.5842 14.2659 16.5395 14.3847C16.4948 14.5035 16.4268 14.6121 16.3394 14.7042C16.252 14.7962 16.147 14.8698 16.0307 14.9206C15.9144 14.9714 15.7891 14.9984 15.6622 15ZM1.89695 10.325H1.88715V4.625H8.33715C8.52423 4.62301 8.70666 4.56654 8.86215 4.4625L12.6872 1.875H14.7247V13.125H12.6872L8.86215 10.4875C8.70666 10.3835 8.52423 10.327 8.33715 10.325H2.20217C2.15205 10.3167 2.10102 10.3125 2.04956 10.3125C1.9981 10.3125 1.94708 10.3167 1.89695 10.325ZM2.98706 12.2V18.1625H5.66206V12.2H2.98706ZM16.5997 9.93612V5.01393C16.6536 5.02355 16.7072 5.03495 16.7605 5.04814C17.1202 5.13709 17.4556 5.30487 17.7425 5.53934C18.0293 5.77381 18.2605 6.06912 18.4192 6.40389C18.578 6.73866 18.6603 7.10452 18.6603 7.47502C18.6603 7.84552 18.578 8.21139 18.4192 8.54616C18.2605 8.88093 18.0293 9.17624 17.7425 9.41071C17.4556 9.64518 17.1202 9.81296 16.7605 9.90191C16.7072 9.91509 16.6536 9.9265 16.5997 9.93612Z'
    });
    svg.appendChild(g).appendChild(path);
    const speakerDefs = createElementNS('defs');
    const speakerClipPathDef = setAttributesNS(createElementNS('clipPath'), {
        id: 'clip0_57_80'
    });
    const speakerRect = setAttributesNS(createElementNS('rect'), {
        width: `${SIZE}`,
        height: `${SIZE}`,
        fill: 'white'
    });
    speakerClipPathDef.appendChild(speakerRect);
    speakerDefs.appendChild(speakerClipPathDef);
    svg.appendChild(speakerDefs).appendChild(speakerClipPathDef).appendChild(speakerRect);
    return svg;
}
/**
 * The sentry-provided button to open the feedback modal
 */ function Actor({ triggerLabel, triggerAriaLabel, shadow, styleNonce }) {
    const el = DOCUMENT.createElement('button');
    el.type = 'button';
    el.className = 'widget__actor';
    el.ariaHidden = 'false';
    el.ariaLabel = triggerAriaLabel || triggerLabel || TRIGGER_LABEL;
    el.appendChild(FeedbackIcon());
    if (triggerLabel) {
        const label = DOCUMENT.createElement('span');
        label.appendChild(DOCUMENT.createTextNode(triggerLabel));
        el.appendChild(label);
    }
    const style = createActorStyles(styleNonce);
    return {
        el,
        appendToDom () {
            shadow.appendChild(style);
            shadow.appendChild(el);
        },
        removeFromDom () {
            el.remove();
            style.remove();
        },
        show () {
            el.ariaHidden = 'false';
        },
        hide () {
            el.ariaHidden = 'true';
        }
    };
}
const PURPLE = 'rgba(88, 74, 192, 1)';
const DEFAULT_LIGHT = {
    foreground: '#2b2233',
    background: '#ffffff',
    accentForeground: 'white',
    accentBackground: PURPLE,
    successColor: '#268d75',
    errorColor: '#df3338',
    border: '1.5px solid rgba(41, 35, 47, 0.13)',
    boxShadow: '0px 4px 24px 0px rgba(43, 34, 51, 0.12)',
    outline: '1px auto var(--accent-background)',
    interactiveFilter: 'brightness(95%)'
};
const DEFAULT_DARK = {
    foreground: '#ebe6ef',
    background: '#29232f',
    accentForeground: 'white',
    accentBackground: PURPLE,
    successColor: '#2da98c',
    errorColor: '#f55459',
    border: '1.5px solid rgba(235, 230, 239, 0.15)',
    boxShadow: '0px 4px 24px 0px rgba(43, 34, 51, 0.12)',
    outline: '1px auto var(--accent-background)',
    interactiveFilter: 'brightness(150%)'
};
function getThemedCssVariables(theme) {
    return `
  --foreground: ${theme.foreground};
  --background: ${theme.background};
  --accent-foreground: ${theme.accentForeground};
  --accent-background: ${theme.accentBackground};
  --success-color: ${theme.successColor};
  --error-color: ${theme.errorColor};
  --border: ${theme.border};
  --box-shadow: ${theme.boxShadow};
  --outline: ${theme.outline};
  --interactive-filter: ${theme.interactiveFilter};
  `;
}
/**
 * Creates <style> element for widget actor (button that opens the dialog)
 */ function createMainStyles({ colorScheme, themeDark, themeLight, styleNonce }) {
    const style = DOCUMENT.createElement('style');
    style.textContent = `
:host {
  --font-family: system-ui, 'Helvetica Neue', Arial, sans-serif;
  --font-size: 14px;
  --z-index: 100000;

  --page-margin: 16px;
  --inset: auto 0 0 auto;
  --actor-inset: var(--inset);

  font-family: var(--font-family);
  font-size: var(--font-size);

  ${colorScheme !== 'system' ? `color-scheme: only ${colorScheme};` : ''}

  ${getThemedCssVariables(colorScheme === 'dark' ? {
        ...DEFAULT_DARK,
        ...themeDark
    } : {
        ...DEFAULT_LIGHT,
        ...themeLight
    })}
}

${colorScheme === 'system' ? `
@media (prefers-color-scheme: dark) {
  :host {
    color-scheme: only dark;

    ${getThemedCssVariables({
        ...DEFAULT_DARK,
        ...themeDark
    })}
  }
}` : ''}
`;
    if (styleNonce) {
        style.setAttribute('nonce', styleNonce);
    }
    return style;
}
const buildFeedbackIntegration = ({ lazyLoadIntegration, getModalIntegration, getScreenshotIntegration })=>{
    const feedbackIntegration = ({ // FeedbackGeneralConfiguration
    id = 'sentry-feedback', autoInject = true, showBranding = true, isEmailRequired = false, isNameRequired = false, showEmail = true, showName = true, enableScreenshot = true, useSentryUser = {
        email: 'email',
        name: 'username'
    }, tags, styleNonce, scriptNonce, // FeedbackThemeConfiguration
    colorScheme = 'system', themeLight = {}, themeDark = {}, // FeedbackTextConfiguration
    addScreenshotButtonLabel = ADD_SCREENSHOT_LABEL, cancelButtonLabel = CANCEL_BUTTON_LABEL, confirmButtonLabel = CONFIRM_BUTTON_LABEL, emailLabel = EMAIL_LABEL, emailPlaceholder = EMAIL_PLACEHOLDER, formTitle = FORM_TITLE, isRequiredLabel = IS_REQUIRED_LABEL, messageLabel = MESSAGE_LABEL, messagePlaceholder = MESSAGE_PLACEHOLDER, nameLabel = NAME_LABEL, namePlaceholder = NAME_PLACEHOLDER, removeScreenshotButtonLabel = REMOVE_SCREENSHOT_LABEL, submitButtonLabel = SUBMIT_BUTTON_LABEL, successMessageText = SUCCESS_MESSAGE_TEXT, triggerLabel = TRIGGER_LABEL, triggerAriaLabel = '', highlightToolText = HIGHLIGHT_TOOL_TEXT, hideToolText = HIDE_TOOL_TEXT, removeHighlightText = REMOVE_HIGHLIGHT_TEXT, // FeedbackCallbacks
    onFormOpen, onFormClose, onSubmitSuccess, onSubmitError, onFormSubmitted } = {})=>{
        const _options = {
            id,
            autoInject,
            showBranding,
            isEmailRequired,
            isNameRequired,
            showEmail,
            showName,
            enableScreenshot,
            useSentryUser,
            tags,
            styleNonce,
            scriptNonce,
            colorScheme,
            themeDark,
            themeLight,
            triggerLabel,
            triggerAriaLabel,
            cancelButtonLabel,
            submitButtonLabel,
            confirmButtonLabel,
            formTitle,
            emailLabel,
            emailPlaceholder,
            messageLabel,
            messagePlaceholder,
            nameLabel,
            namePlaceholder,
            successMessageText,
            isRequiredLabel,
            addScreenshotButtonLabel,
            removeScreenshotButtonLabel,
            highlightToolText,
            hideToolText,
            removeHighlightText,
            onFormClose,
            onFormOpen,
            onSubmitError,
            onSubmitSuccess,
            onFormSubmitted
        };
        let _shadow = null;
        let _subscriptions = [];
        /**
     * Get the shadow root where we will append css
     */ const _createShadow = (options)=>{
            if (!_shadow) {
                const host = DOCUMENT.createElement('div');
                host.id = String(options.id);
                DOCUMENT.body.appendChild(host);
                _shadow = host.attachShadow({
                    mode: 'open'
                });
                _shadow.appendChild(createMainStyles(options));
            }
            return _shadow;
        };
        const _loadAndRenderDialog = async (options)=>{
            const screenshotRequired = options.enableScreenshot && isScreenshotSupported();
            let modalIntegration;
            let screenshotIntegration;
            try {
                const modalIntegrationFn = getModalIntegration ? getModalIntegration() : await lazyLoadIntegration('feedbackModalIntegration', scriptNonce);
                modalIntegration = modalIntegrationFn();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addIntegration"])(modalIntegration);
            } catch  {
                DEBUG_BUILD && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('[Feedback] Error when trying to load feedback integrations. Try using `feedbackSyncIntegration` in your `Sentry.init`.');
                throw new Error('[Feedback] Missing feedback modal integration!');
            }
            try {
                const screenshotIntegrationFn = screenshotRequired ? getScreenshotIntegration ? getScreenshotIntegration() : await lazyLoadIntegration('feedbackScreenshotIntegration', scriptNonce) : undefined;
                if (screenshotIntegrationFn) {
                    screenshotIntegration = screenshotIntegrationFn();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addIntegration"])(screenshotIntegration);
                }
            } catch  {
                DEBUG_BUILD && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('[Feedback] Missing feedback screenshot integration. Proceeding without screenshots.');
            }
            const dialog = modalIntegration.createDialog({
                options: {
                    ...options,
                    onFormClose: ()=>{
                        dialog?.close();
                        options.onFormClose?.();
                    },
                    onFormSubmitted: ()=>{
                        dialog?.close();
                        options.onFormSubmitted?.();
                    }
                },
                screenshotIntegration,
                sendFeedback,
                shadow: _createShadow(options)
            });
            return dialog;
        };
        const _attachTo = (el, optionOverrides = {})=>{
            const mergedOptions = mergeOptions(_options, optionOverrides);
            const targetEl = typeof el === 'string' ? DOCUMENT.querySelector(el) : typeof el.addEventListener === 'function' ? el : null;
            if (!targetEl) {
                DEBUG_BUILD && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('[Feedback] Unable to attach to target element');
                throw new Error('Unable to attach to target element');
            }
            let dialog = null;
            const handleClick = async ()=>{
                if (!dialog) {
                    dialog = await _loadAndRenderDialog({
                        ...mergedOptions,
                        onFormSubmitted: ()=>{
                            dialog?.removeFromDom();
                            mergedOptions.onFormSubmitted?.();
                        }
                    });
                }
                dialog.appendToDom();
                dialog.open();
            };
            targetEl.addEventListener('click', handleClick);
            const unsubscribe = ()=>{
                _subscriptions = _subscriptions.filter((sub)=>sub !== unsubscribe);
                dialog?.removeFromDom();
                dialog = null;
                targetEl.removeEventListener('click', handleClick);
            };
            _subscriptions.push(unsubscribe);
            return unsubscribe;
        };
        const _createActor = (optionOverrides = {})=>{
            const mergedOptions = mergeOptions(_options, optionOverrides);
            const shadow = _createShadow(mergedOptions);
            const actor = Actor({
                triggerLabel: mergedOptions.triggerLabel,
                triggerAriaLabel: mergedOptions.triggerAriaLabel,
                shadow,
                styleNonce
            });
            _attachTo(actor.el, {
                ...mergedOptions,
                onFormOpen () {
                    actor.hide();
                },
                onFormClose () {
                    actor.show();
                },
                onFormSubmitted () {
                    actor.show();
                }
            });
            return actor;
        };
        return {
            name: 'Feedback',
            setupOnce () {
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$isBrowser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isBrowser"])() || !_options.autoInject) {
                    return;
                }
                if (DOCUMENT.readyState === 'loading') {
                    DOCUMENT.addEventListener('DOMContentLoaded', ()=>_createActor().appendToDom());
                } else {
                    _createActor().appendToDom();
                }
            },
            /**
       * Adds click listener to the element to open a feedback dialog
       *
       * The returned function can be used to remove the click listener
       */ attachTo: _attachTo,
            /**
       * Creates a new widget which is composed of a Button which triggers a Dialog.
       * Accepts partial options to override any options passed to constructor.
       */ createWidget (optionOverrides = {}) {
                const actor = _createActor(mergeOptions(_options, optionOverrides));
                actor.appendToDom();
                return actor;
            },
            /**
       * Creates a new Form which you can
       * Accepts partial options to override any options passed to constructor.
       */ async createForm (optionOverrides = {}) {
                return _loadAndRenderDialog(mergeOptions(_options, optionOverrides));
            },
            /**
       * Removes the Feedback integration (including host, shadow DOM, and all widgets)
       */ remove () {
                if (_shadow) {
                    _shadow.parentElement?.remove();
                    _shadow = null;
                }
                // Remove any lingering subscriptions
                _subscriptions.forEach((sub)=>sub());
                _subscriptions = [];
            }
        };
    };
    return feedbackIntegration;
};
/**
 * This is a small utility to get a type-safe instance of the Feedback integration.
 */ function getFeedback() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    return client?.getIntegrationByName('Feedback');
}
var n, l$1, u$1, i$1, o$1, r$1, f$1, c$1 = {}, s$1 = [], a$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, h$1 = Array.isArray;
function v$1(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function p$1(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
}
function y$1(l, u, t) {
    var i, o, r, f = {};
    for(r in u)"key" == r ? i = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
    if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for(r in l.defaultProps)void 0 === f[r] && (f[r] = l.defaultProps[r]);
    return d$1(l, f, i, o, null);
}
function d$1(n, t, i, o, r) {
    var f = {
        type: n,
        props: t,
        key: i,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: null == r ? ++u$1 : r,
        __i: -1,
        __u: 0
    };
    return null == r && null != l$1.vnode && l$1.vnode(f), f;
}
function g$1(n) {
    return n.children;
}
function b$1(n, l) {
    this.props = n, this.context = l;
}
function m$1(n, l) {
    if (null == l) return n.__ ? m$1(n.__, n.__i + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? m$1(n) : null;
}
function w$1(n, u, t) {
    var i, o = n.__v, r = o.__e, f = n.__P;
    if (f) return (i = v$1({}, o)).__v = o.__v + 1, l$1.vnode && l$1.vnode(i), M(f, i, o, n.__n, void 0 !== f.ownerSVGElement, 32 & o.__u ? [
        r
    ] : null, u, null == r ? m$1(o) : r, !!(32 & o.__u), t), i.__.__k[i.__i] = i, i.__d = void 0, i.__e != r && k$1(i), i;
}
function k$1(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return k$1(n);
    }
}
function x$1(n) {
    (!n.__d && (n.__d = true) && i$1.push(n) && !C$1.__r++ || o$1 !== l$1.debounceRendering) && ((o$1 = l$1.debounceRendering) || r$1)(C$1);
}
function C$1() {
    var n, u, t, o = [], r = [];
    for(i$1.sort(f$1); n = i$1.shift();)n.__d && (t = i$1.length, u = w$1(n, o, r) || u, 0 === t || i$1.length > t ? (j$1(o, u, r), r.length = o.length = 0, u = void 0, i$1.sort(f$1)) : u && l$1.__c && l$1.__c(u, s$1));
    u && j$1(o, u, r), C$1.__r = 0;
}
function P$1(n, l, u, t, i, o, r, f, e, a, h) {
    var v, p, y, d, _, g = t && t.__k || s$1, b = l.length;
    for(u.__d = e, S(u, l, g), e = u.__d, v = 0; v < b; v++)null != (y = u.__k[v]) && "boolean" != typeof y && "function" != typeof y && (p = -1 === y.__i ? c$1 : g[y.__i] || c$1, y.__i = v, M(n, y, p, i, o, r, f, e, a, h), d = y.__e, y.ref && p.ref != y.ref && (p.ref && N(p.ref, null, y), h.push(y.ref, y.__c || d, y)), null == _ && null != d && (_ = d), 65536 & y.__u || p.__k === y.__k ? e = $(y, e, n) : "function" == typeof y.type && void 0 !== y.__d ? e = y.__d : d && (e = d.nextSibling), y.__d = void 0, y.__u &= -196609);
    u.__d = e, u.__e = _;
}
function S(n, l, u) {
    var t, i, o, r, f, e = l.length, c = u.length, s = c, a = 0;
    for(n.__k = [], t = 0; t < e; t++)null != (i = n.__k[t] = null == (i = l[t]) || "boolean" == typeof i || "function" == typeof i ? null : "string" == typeof i || "number" == typeof i || "bigint" == typeof i || i.constructor == String ? d$1(null, i, null, null, i) : h$1(i) ? d$1(g$1, {
        children: i
    }, null, null, null) : void 0 === i.constructor && i.__b > 0 ? d$1(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i) ? (i.__ = n, i.__b = n.__b + 1, f = I(i, u, r = t + a, s), i.__i = f, o = null, -1 !== f && (s--, (o = u[f]) && (o.__u |= 131072)), null == o || null === o.__v ? (-1 == f && a--, "function" != typeof i.type && (i.__u |= 65536)) : f !== r && (f === r + 1 ? a++ : f > r ? s > e - r ? a += f - r : a-- : a = f < r && f == r - 1 ? f - r : 0, f !== t + a && (i.__u |= 65536))) : (o = u[t]) && null == o.key && o.__e && (o.__e == n.__d && (n.__d = m$1(o)), O(o, o, false), u[t] = null, s--);
    if (s) for(t = 0; t < c; t++)null != (o = u[t]) && 0 == (131072 & o.__u) && (o.__e == n.__d && (n.__d = m$1(o)), O(o, o));
}
function $(n, l, u) {
    var t, i;
    if ("function" == typeof n.type) {
        for(t = n.__k, i = 0; t && i < t.length; i++)t[i] && (t[i].__ = n, l = $(t[i], l, u));
        return l;
    }
    n.__e != l && (u.insertBefore(n.__e, l || null), l = n.__e);
    do {
        l = l && l.nextSibling;
    }while (null != l && 8 === l.nodeType)
    return l;
}
function I(n, l, u, t) {
    var i = n.key, o = n.type, r = u - 1, f = u + 1, e = l[u];
    if (null === e || e && i == e.key && o === e.type) return u;
    if (t > (null != e && 0 == (131072 & e.__u) ? 1 : 0)) for(; r >= 0 || f < l.length;){
        if (r >= 0) {
            if ((e = l[r]) && 0 == (131072 & e.__u) && i == e.key && o === e.type) return r;
            r--;
        }
        if (f < l.length) {
            if ((e = l[f]) && 0 == (131072 & e.__u) && i == e.key && o === e.type) return f;
            f++;
        }
    }
    return -1;
}
function T$1(n, l, u) {
    "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || a$1.test(l) ? u : u + "px";
}
function A$1(n, l, u, t, i) {
    var o;
    n: if ("style" === l) if ("string" == typeof u) n.style.cssText = u;
    else {
        if ("string" == typeof t && (n.style.cssText = t = ""), t) for(l in t)u && l in u || T$1(n.style, l, "");
        if (u) for(l in u)t && u[l] === t[l] || T$1(n.style, l, u[l]);
    }
    else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/(PointerCapture)$|Capture$/i, "$1")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? t ? u.u = t.u : (u.u = Date.now(), n.addEventListener(l, o ? L : D$1, o)) : n.removeEventListener(l, o ? L : D$1, o);
    else {
        if (i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l && "height" !== l && "href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && "rowSpan" !== l && "colSpan" !== l && "role" !== l && l in n) try {
            n[l] = null == u ? "" : u;
            break n;
        } catch (n) {}
        "function" == typeof u || (null == u || false === u && "-" !== l[4] ? n.removeAttribute(l) : n.setAttribute(l, u));
    }
}
function D$1(n) {
    if (this.l) {
        var u = this.l[n.type + false];
        if (n.t) {
            if (n.t <= u.u) return;
        } else n.t = Date.now();
        return u(l$1.event ? l$1.event(n) : n);
    }
}
function L(n) {
    if (this.l) return this.l[n.type + true](l$1.event ? l$1.event(n) : n);
}
function M(n, u, t, i, o, r, f, e, c, s) {
    var a, p, y, d, _, m, w, k, x, C, S, $, H, I, T, A = u.type;
    if (void 0 !== u.constructor) return null;
    128 & t.__u && (c = !!(32 & t.__u), r = [
        e = u.__e = t.__e
    ]), (a = l$1.__b) && a(u);
    n: if ("function" == typeof A) try {
        if (k = u.props, x = (a = A.contextType) && i[a.__c], C = a ? x ? x.props.value : a.__ : i, t.__c ? w = (p = u.__c = t.__c).__ = p.__E : ("prototype" in A && A.prototype.render ? u.__c = p = new A(k, C) : (u.__c = p = new b$1(k, C), p.constructor = A, p.render = q$1), x && x.sub(p), p.props = k, p.state || (p.state = {}), p.context = C, p.__n = i, y = p.__d = !0, p.__h = [], p._sb = []), null == p.__s && (p.__s = p.state), null != A.getDerivedStateFromProps && (p.__s == p.state && (p.__s = v$1({}, p.__s)), v$1(p.__s, A.getDerivedStateFromProps(k, p.__s))), d = p.props, _ = p.state, p.__v = u, y) null == A.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), null != p.componentDidMount && p.__h.push(p.componentDidMount);
        else {
            if (null == A.getDerivedStateFromProps && k !== d && null != p.componentWillReceiveProps && p.componentWillReceiveProps(k, C), !p.__e && (null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(k, p.__s, C) || u.__v === t.__v)) {
                for(u.__v !== t.__v && (p.props = k, p.state = p.__s, p.__d = !1), u.__e = t.__e, u.__k = t.__k, u.__k.forEach(function(n) {
                    n && (n.__ = u);
                }), S = 0; S < p._sb.length; S++)p.__h.push(p._sb[S]);
                p._sb = [], p.__h.length && f.push(p);
                break n;
            }
            null != p.componentWillUpdate && p.componentWillUpdate(k, p.__s, C), null != p.componentDidUpdate && p.__h.push(function() {
                p.componentDidUpdate(d, _, m);
            });
        }
        if (p.context = C, p.props = k, p.__P = n, p.__e = !1, $ = l$1.__r, H = 0, "prototype" in A && A.prototype.render) {
            for(p.state = p.__s, p.__d = !1, $ && $(u), a = p.render(p.props, p.state, p.context), I = 0; I < p._sb.length; I++)p.__h.push(p._sb[I]);
            p._sb = [];
        } else do {
            p.__d = !1, $ && $(u), a = p.render(p.props, p.state, p.context), p.state = p.__s;
        }while (p.__d && ++H < 25)
        p.state = p.__s, null != p.getChildContext && (i = v$1(v$1({}, i), p.getChildContext())), y || null == p.getSnapshotBeforeUpdate || (m = p.getSnapshotBeforeUpdate(d, _)), P$1(n, h$1(T = null != a && a.type === g$1 && null == a.key ? a.props.children : a) ? T : [
            T
        ], u, t, i, o, r, f, e, c, s), p.base = u.__e, u.__u &= -161, p.__h.length && f.push(p), w && (p.__E = p.__ = null);
    } catch (n) {
        u.__v = null, c || null != r ? (u.__e = e, u.__u |= c ? 160 : 32, r[r.indexOf(e)] = null) : (u.__e = t.__e, u.__k = t.__k), l$1.__e(n, u, t);
    }
    else null == r && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = z$1(t.__e, u, t, i, o, r, f, c, s);
    (a = l$1.diffed) && a(u);
}
function j$1(n, u, t) {
    for(var i = 0; i < t.length; i++)N(t[i], t[++i], t[++i]);
    l$1.__c && l$1.__c(u, n), n.some(function(u) {
        try {
            n = u.__h, u.__h = [], n.some(function(n) {
                n.call(u);
            });
        } catch (n) {
            l$1.__e(n, u.__v);
        }
    });
}
function z$1(l, u, t, i, o, r, f, e, s) {
    var a, v, y, d, _, g, b, w = t.props, k = u.props, x = u.type;
    if ("svg" === x && (o = true), null != r) {
        for(a = 0; a < r.length; a++)if ((_ = r[a]) && "setAttribute" in _ == !!x && (x ? _.localName === x : 3 === _.nodeType)) {
            l = _, r[a] = null;
            break;
        }
    }
    if (null == l) {
        if (null === x) return document.createTextNode(k);
        l = o ? document.createElementNS("http://www.w3.org/2000/svg", x) : document.createElement(x, k.is && k), r = null, e = false;
    }
    if (null === x) w === k || e && l.data === k || (l.data = k);
    else {
        if (r = r && n.call(l.childNodes), w = t.props || c$1, !e && null != r) for(w = {}, a = 0; a < l.attributes.length; a++)w[(_ = l.attributes[a]).name] = _.value;
        for(a in w)_ = w[a], "children" == a || ("dangerouslySetInnerHTML" == a ? y = _ : "key" === a || a in k || A$1(l, a, null, _, o));
        for(a in k)_ = k[a], "children" == a ? d = _ : "dangerouslySetInnerHTML" == a ? v = _ : "value" == a ? g = _ : "checked" == a ? b = _ : "key" === a || e && "function" != typeof _ || w[a] === _ || A$1(l, a, _, w[a], o);
        if (v) e || y && (v.__html === y.__html || v.__html === l.innerHTML) || (l.innerHTML = v.__html), u.__k = [];
        else if (y && (l.innerHTML = ""), P$1(l, h$1(d) ? d : [
            d
        ], u, t, i, o && "foreignObject" !== x, r, f, r ? r[0] : t.__k && m$1(t, 0), e, s), null != r) for(a = r.length; a--;)null != r[a] && p$1(r[a]);
        e || (a = "value", void 0 !== g && (g !== l[a] || "progress" === x && !g || "option" === x && g !== w[a]) && A$1(l, a, g, w[a], false), a = "checked", void 0 !== b && b !== l[a] && A$1(l, a, b, w[a], false));
    }
    return l;
}
function N(n, u, t) {
    try {
        "function" == typeof n ? n(u) : n.current = u;
    } catch (n) {
        l$1.__e(n, t);
    }
}
function O(n, u, t) {
    var i, o;
    if (l$1.unmount && l$1.unmount(n), (i = n.ref) && (i.current && i.current !== n.__e || N(i, null, u)), null != (i = n.__c)) {
        if (i.componentWillUnmount) try {
            i.componentWillUnmount();
        } catch (n) {
            l$1.__e(n, u);
        }
        i.base = i.__P = null, n.__c = void 0;
    }
    if (i = n.__k) for(o = 0; o < i.length; o++)i[o] && O(i[o], u, t || "function" != typeof n.type);
    t || null == n.__e || p$1(n.__e), n.__ = n.__e = n.__d = void 0;
}
function q$1(n, l, u) {
    return this.constructor(n, u);
}
function B$1(u, t, i) {
    var o, r, f, e;
    l$1.__ && l$1.__(u, t), r = (o = "function" == "undefined") ? null : t.__k, f = [], e = [], M(t, u = t.__k = y$1(g$1, null, [
        u
    ]), r || c$1, c$1, void 0 !== t.ownerSVGElement, r ? null : t.firstChild ? n.call(t.childNodes) : null, f, r ? r.__e : t.firstChild, o, e), u.__d = void 0, j$1(f, u, e);
}
n = s$1.slice, l$1 = {
    __e: function(n, l, u, t) {
        for(var i, o, r; l = l.__;)if ((i = l.__c) && !i.__) try {
            if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(n)), r = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), r = i.__d), r) return i.__E = i;
        } catch (l) {
            n = l;
        }
        throw n;
    }
}, u$1 = 0, b$1.prototype.setState = function(n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = v$1({}, this.state), "function" == typeof n && (n = n(v$1({}, u), this.props)), n && v$1(u, n), null != n && this.__v && (l && this._sb.push(l), x$1(this));
}, b$1.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = true, n && this.__h.push(n), x$1(this));
}, b$1.prototype.render = g$1, i$1 = [], r$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f$1 = function(n, l) {
    return n.__v.__b - l.__v.__b;
}, C$1.__r = 0;
var t, r, u, i, o = 0, f = [], c = [], e = l$1, a = e.__b, v = e.__r, l = e.diffed, m = e.__c, s = e.unmount, d = e.__;
function h(n, t) {
    e.__h && e.__h(r, n, o || t), o = 0;
    var u = r.__H || (r.__H = {
        __: [],
        __h: []
    });
    return n >= u.__.length && u.__.push({
        __V: c
    }), u.__[n];
}
function p(n) {
    return o = 1, y(D, n);
}
function y(n, u, i) {
    var o = h(t++, 2);
    if (o.t = n, !o.__c && (o.__ = [
        i ? i(u) : D(void 0, u),
        function(n) {
            var t = o.__N ? o.__N[0] : o.__[0], r = o.t(t, n);
            t !== r && (o.__N = [
                r,
                o.__[1]
            ], o.__c.setState({}));
        }
    ], o.__c = r, !r.u)) {
        var f = function(n, t, r) {
            if (!o.__c.__H) return true;
            var u = o.__c.__H.__.filter(function(n) {
                return !!n.__c;
            });
            if (u.every(function(n) {
                return !n.__N;
            })) return !c || c.call(this, n, t, r);
            var i = false;
            return u.forEach(function(n) {
                if (n.__N) {
                    var t = n.__[0];
                    n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = true);
                }
            }), !(!i && o.__c.props === n) && (!c || c.call(this, n, t, r));
        };
        r.u = true;
        var c = r.shouldComponentUpdate, e = r.componentWillUpdate;
        r.componentWillUpdate = function(n, t, r) {
            if (this.__e) {
                var u = c;
                c = void 0, f(n, t, r), c = u;
            }
            e && e.call(this, n, t, r);
        }, r.shouldComponentUpdate = f;
    }
    return o.__N || o.__;
}
function _(n, u) {
    var i = h(t++, 3);
    !e.__s && C(i.__H, u) && (i.__ = n, i.i = u, r.__H.__h.push(i));
}
function A(n, u) {
    var i = h(t++, 4);
    !e.__s && C(i.__H, u) && (i.__ = n, i.i = u, r.__h.push(i));
}
function F(n) {
    return o = 5, q(function() {
        return {
            current: n
        };
    }, []);
}
function T(n, t, r) {
    o = 6, A(function() {
        return "function" == typeof n ? (n(t()), function() {
            return n(null);
        }) : n ? (n.current = t(), function() {
            return n.current = null;
        }) : void 0;
    }, null == r ? r : r.concat(n));
}
function q(n, r) {
    var u = h(t++, 7);
    return C(u.__H, r) ? (u.__V = n(), u.i = r, u.__h = n, u.__V) : u.__;
}
function x(n, t) {
    return o = 8, q(function() {
        return n;
    }, t);
}
function P(n) {
    var u = r.context[n.__c], i = h(t++, 9);
    return i.c = n, u ? (null == i.__ && (i.__ = true, u.sub(r)), u.props.value) : n.__;
}
function V(n, t) {
    e.useDebugValue && e.useDebugValue(t ? t(n) : n);
}
function b(n) {
    var u = h(t++, 10), i = p();
    return u.__ = n, r.componentDidCatch || (r.componentDidCatch = function(n, t) {
        u.__ && u.__(n, t), i[1](n);
    }), [
        i[0],
        function() {
            i[1](void 0);
        }
    ];
}
function g() {
    var n = h(t++, 11);
    if (!n.__) {
        for(var u = r.__v; null !== u && !u.__m && null !== u.__;)u = u.__;
        var i = u.__m || (u.__m = [
            0,
            0
        ]);
        n.__ = "P" + i[0] + "-" + i[1]++;
    }
    return n.__;
}
function j() {
    for(var n; n = f.shift();)if (n.__P && n.__H) try {
        n.__H.__h.forEach(z), n.__H.__h.forEach(B), n.__H.__h = [];
    } catch (t) {
        n.__H.__h = [], e.__e(t, n.__v);
    }
}
e.__b = function(n) {
    r = null, a && a(n);
}, e.__ = function(n, t) {
    t.__k && t.__k.__m && (n.__m = t.__k.__m), d && d(n, t);
}, e.__r = function(n) {
    v && v(n), t = 0;
    var i = (r = n.__c).__H;
    i && (u === r ? (i.__h = [], r.__h = [], i.__.forEach(function(n) {
        n.__N && (n.__ = n.__N), n.__V = c, n.__N = n.i = void 0;
    })) : (i.__h.forEach(z), i.__h.forEach(B), i.__h = [], t = 0)), u = r;
}, e.diffed = function(n) {
    l && l(n);
    var t = n.__c;
    t && t.__H && (t.__H.__h.length && (1 !== f.push(t) && i === e.requestAnimationFrame || ((i = e.requestAnimationFrame) || w)(j)), t.__H.__.forEach(function(n) {
        n.i && (n.__H = n.i), n.__V !== c && (n.__ = n.__V), n.i = void 0, n.__V = c;
    })), u = r = null;
}, e.__c = function(n, t) {
    t.some(function(n) {
        try {
            n.__h.forEach(z), n.__h = n.__h.filter(function(n) {
                return !n.__ || B(n);
            });
        } catch (r) {
            t.some(function(n) {
                n.__h && (n.__h = []);
            }), t = [], e.__e(r, n.__v);
        }
    }), m && m(n, t);
}, e.unmount = function(n) {
    s && s(n);
    var t, r = n.__c;
    r && r.__H && (r.__H.__.forEach(function(n) {
        try {
            z(n);
        } catch (n) {
            t = n;
        }
    }), r.__H = void 0, t && e.__e(t, r.__v));
};
var k = "function" == typeof requestAnimationFrame;
function w(n) {
    var t, r = function() {
        clearTimeout(u), k && cancelAnimationFrame(t), setTimeout(n);
    }, u = setTimeout(r, 100);
    k && (t = requestAnimationFrame(r));
}
function z(n) {
    var t = r, u = n.__c;
    "function" == typeof u && (n.__c = void 0, u()), r = t;
}
function B(n) {
    var t = r;
    n.__c = n.__(), r = t;
}
function C(n, t) {
    return !n || n.length !== t.length || t.some(function(t, r) {
        return t !== n[r];
    });
}
function D(n, t) {
    return "function" == typeof t ? t(n) : t;
}
const hooks = /*#__PURE__*/ Object.defineProperty({
    __proto__: null,
    useCallback: x,
    useContext: P,
    useDebugValue: V,
    useEffect: _,
    useErrorBoundary: b,
    useId: g,
    useImperativeHandle: T,
    useLayoutEffect: A,
    useMemo: q,
    useReducer: y,
    useRef: F,
    useState: p
}, Symbol.toStringTag, {
    value: 'Module'
});
const XMLNS$1 = 'http://www.w3.org/2000/svg';
/**
 * Sentry Logo
 */ function SentryLogo() {
    const createElementNS = (tagName)=>DOCUMENT.createElementNS(XMLNS$1, tagName);
    const svg = setAttributesNS(createElementNS('svg'), {
        width: '32',
        height: '30',
        viewBox: '0 0 72 66',
        fill: 'inherit'
    });
    const path = setAttributesNS(createElementNS('path'), {
        transform: 'translate(11, 11)',
        d: 'M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z'
    });
    svg.appendChild(path);
    return svg;
}
function DialogHeader({ options }) {
    const logoHtml = q(()=>({
            __html: SentryLogo().outerHTML
        }), []);
    return y$1('h2', {
        class: "dialog__header"
    }, y$1('span', {
        class: "dialog__title"
    }, options.formTitle), options.showBranding ? y$1('a', {
        class: "brand-link",
        target: "_blank",
        href: "https://sentry.io/welcome/",
        title: "Powered by Sentry",
        rel: "noopener noreferrer",
        dangerouslySetInnerHTML: logoHtml
    }) : null);
}
/**
 * Validate that a given feedback submission has the required fields
 */ function getMissingFields(feedback, props) {
    const emptyFields = [];
    if (props.isNameRequired && !feedback.name) {
        emptyFields.push(props.nameLabel);
    }
    if (props.isEmailRequired && !feedback.email) {
        emptyFields.push(props.emailLabel);
    }
    if (!feedback.message) {
        emptyFields.push(props.messageLabel);
    }
    return emptyFields;
}
function retrieveStringValue(formData, key) {
    const value = formData.get(key);
    if (typeof value === 'string') {
        return value.trim();
    }
    return '';
}
function Form({ options, defaultEmail, defaultName, onFormClose, onSubmit, onSubmitSuccess, onSubmitError, showEmail, showName, screenshotInput }) {
    const { tags, addScreenshotButtonLabel, removeScreenshotButtonLabel, cancelButtonLabel, emailLabel, emailPlaceholder, isEmailRequired, isNameRequired, messageLabel, messagePlaceholder, nameLabel, namePlaceholder, submitButtonLabel, isRequiredLabel } = options;
    const [isSubmitting, setIsSubmitting] = p(false);
    // TODO: set a ref on the form, and whenever an input changes call processForm() and setError()
    const [error, setError] = p(null);
    const [showScreenshotInput, setShowScreenshotInput] = p(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ScreenshotInputComponent = screenshotInput?.input;
    const [screenshotError, setScreenshotError] = p(null);
    const onScreenshotError = x((error)=>{
        setScreenshotError(error);
        setShowScreenshotInput(false);
    }, []);
    const hasAllRequiredFields = x((data)=>{
        const missingFields = getMissingFields(data, {
            emailLabel,
            isEmailRequired,
            isNameRequired,
            messageLabel,
            nameLabel
        });
        if (missingFields.length > 0) {
            setError(`Please enter in the following required fields: ${missingFields.join(', ')}`);
        } else {
            setError(null);
        }
        return missingFields.length === 0;
    }, [
        emailLabel,
        isEmailRequired,
        isNameRequired,
        messageLabel,
        nameLabel
    ]);
    const handleSubmit = x(async (e)=>{
        setIsSubmitting(true);
        try {
            e.preventDefault();
            if (!(e.target instanceof HTMLFormElement)) {
                return;
            }
            const formData = new FormData(e.target);
            const attachment = await (screenshotInput && showScreenshotInput ? screenshotInput.value() : undefined);
            const data = {
                name: retrieveStringValue(formData, 'name'),
                email: retrieveStringValue(formData, 'email'),
                message: retrieveStringValue(formData, 'message'),
                attachments: attachment ? [
                    attachment
                ] : undefined
            };
            if (!hasAllRequiredFields(data)) {
                return;
            }
            try {
                const eventId = await onSubmit({
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    source: FEEDBACK_WIDGET_SOURCE,
                    tags
                }, {
                    attachments: data.attachments
                });
                onSubmitSuccess(data, eventId);
            } catch (error) {
                DEBUG_BUILD && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error(error);
                setError(error);
                onSubmitError(error);
            }
        } finally{
            setIsSubmitting(false);
        }
    }, [
        screenshotInput && showScreenshotInput,
        onSubmitSuccess,
        onSubmitError
    ]);
    return y$1('form', {
        class: "form",
        onSubmit: handleSubmit
    }, ScreenshotInputComponent && showScreenshotInput ? y$1(ScreenshotInputComponent, {
        onError: onScreenshotError
    }) : null, y$1('fieldset', {
        class: "form__right",
        'data-sentry-feedback': true,
        disabled: isSubmitting
    }, y$1('div', {
        class: "form__top"
    }, error ? y$1('div', {
        class: "form__error-container"
    }, error) : null, showName ? y$1('label', {
        for: "name",
        class: "form__label"
    }, y$1(LabelText, {
        label: nameLabel,
        isRequiredLabel: isRequiredLabel,
        isRequired: isNameRequired
    }), y$1('input', {
        class: "form__input",
        defaultValue: defaultName,
        id: "name",
        name: "name",
        placeholder: namePlaceholder,
        required: isNameRequired,
        type: "text"
    })) : y$1('input', {
        'aria-hidden': true,
        value: defaultName,
        name: "name",
        type: "hidden"
    }), showEmail ? y$1('label', {
        for: "email",
        class: "form__label"
    }, y$1(LabelText, {
        label: emailLabel,
        isRequiredLabel: isRequiredLabel,
        isRequired: isEmailRequired
    }), y$1('input', {
        class: "form__input",
        defaultValue: defaultEmail,
        id: "email",
        name: "email",
        placeholder: emailPlaceholder,
        required: isEmailRequired,
        type: "email"
    })) : y$1('input', {
        'aria-hidden': true,
        value: defaultEmail,
        name: "email",
        type: "hidden"
    }), y$1('label', {
        for: "message",
        class: "form__label"
    }, y$1(LabelText, {
        label: messageLabel,
        isRequiredLabel: isRequiredLabel,
        isRequired: true
    }), y$1('textarea', {
        autoFocus: true,
        class: "form__input form__input--textarea",
        id: "message",
        name: "message",
        placeholder: messagePlaceholder,
        required: true,
        rows: 5
    })), ScreenshotInputComponent ? y$1('label', {
        for: "screenshot",
        class: "form__label"
    }, y$1('button', {
        class: "btn btn--default",
        disabled: isSubmitting,
        type: "button",
        onClick: ()=>{
            setScreenshotError(null);
            setShowScreenshotInput((prev)=>!prev);
        }
    }, showScreenshotInput ? removeScreenshotButtonLabel : addScreenshotButtonLabel), screenshotError ? y$1('div', {
        class: "form__error-container"
    }, screenshotError.message) : null) : null), y$1('div', {
        class: "btn-group"
    }, y$1('button', {
        class: "btn btn--primary",
        disabled: isSubmitting,
        type: "submit"
    }, submitButtonLabel), y$1('button', {
        class: "btn btn--default",
        disabled: isSubmitting,
        type: "button",
        onClick: onFormClose
    }, cancelButtonLabel))));
}
function LabelText({ label, isRequired, isRequiredLabel }) {
    return y$1('span', {
        class: "form__label__text"
    }, label, isRequired && y$1('span', {
        class: "form__label__text--required"
    }, isRequiredLabel));
}
const WIDTH = 16;
const HEIGHT = 17;
const XMLNS = 'http://www.w3.org/2000/svg';
/**
 * Success Icon (checkmark)
 */ function SuccessIcon() {
    const createElementNS = (tagName)=>WINDOW.document.createElementNS(XMLNS, tagName);
    const svg = setAttributesNS(createElementNS('svg'), {
        width: `${WIDTH}`,
        height: `${HEIGHT}`,
        viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
        fill: 'inherit'
    });
    const g = setAttributesNS(createElementNS('g'), {
        clipPath: 'url(#clip0_57_156)'
    });
    const path2 = setAttributesNS(createElementNS('path'), {
        ['fill-rule']: 'evenodd',
        ['clip-rule']: 'evenodd',
        d: 'M3.55544 15.1518C4.87103 16.0308 6.41775 16.5 8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.91775 15.5308 5.37103 14.6518 4.05544C13.7727 2.73985 12.5233 1.71447 11.0615 1.10897C9.59966 0.503466 7.99113 0.34504 6.43928 0.653721C4.88743 0.962403 3.46197 1.72433 2.34315 2.84315C1.22433 3.96197 0.462403 5.38743 0.153721 6.93928C-0.15496 8.49113 0.00346625 10.0997 0.608967 11.5615C1.21447 13.0233 2.23985 14.2727 3.55544 15.1518ZM4.40546 3.1204C5.46945 2.40946 6.72036 2.03 8 2.03C9.71595 2.03 11.3616 2.71166 12.575 3.92502C13.7883 5.13838 14.47 6.78405 14.47 8.5C14.47 9.77965 14.0905 11.0306 13.3796 12.0945C12.6687 13.1585 11.6582 13.9878 10.476 14.4775C9.29373 14.9672 7.99283 15.0953 6.73777 14.8457C5.48271 14.596 4.32987 13.9798 3.42502 13.075C2.52018 12.1701 1.90397 11.0173 1.65432 9.76224C1.40468 8.50718 1.5328 7.20628 2.0225 6.02404C2.5122 4.8418 3.34148 3.83133 4.40546 3.1204Z'
    });
    const path = setAttributesNS(createElementNS('path'), {
        d: 'M6.68775 12.4297C6.78586 12.4745 6.89218 12.4984 7 12.5C7.11275 12.4955 7.22315 12.4664 7.32337 12.4145C7.4236 12.3627 7.51121 12.2894 7.58 12.2L12 5.63999C12.0848 5.47724 12.1071 5.28902 12.0625 5.11098C12.0178 4.93294 11.9095 4.77744 11.7579 4.67392C11.6064 4.57041 11.4221 4.52608 11.24 4.54931C11.0579 4.57254 10.8907 4.66173 10.77 4.79999L6.88 10.57L5.13 8.56999C5.06508 8.49566 4.98613 8.43488 4.89768 8.39111C4.80922 8.34735 4.713 8.32148 4.61453 8.31498C4.51605 8.30847 4.41727 8.32147 4.32382 8.35322C4.23038 8.38497 4.14413 8.43484 4.07 8.49999C3.92511 8.63217 3.83692 8.81523 3.82387 9.01092C3.81083 9.2066 3.87393 9.39976 4 9.54999L6.43 12.24C6.50187 12.3204 6.58964 12.385 6.68775 12.4297Z'
    });
    svg.appendChild(g).append(path, path2);
    const speakerDefs = createElementNS('defs');
    const speakerClipPathDef = setAttributesNS(createElementNS('clipPath'), {
        id: 'clip0_57_156'
    });
    const speakerRect = setAttributesNS(createElementNS('rect'), {
        width: `${WIDTH}`,
        height: `${WIDTH}`,
        fill: 'white',
        transform: 'translate(0 0.5)'
    });
    speakerClipPathDef.appendChild(speakerRect);
    speakerDefs.appendChild(speakerClipPathDef);
    svg.appendChild(speakerDefs).appendChild(speakerClipPathDef).appendChild(speakerRect);
    return svg;
}
function Dialog({ open, onFormSubmitted, ...props }) {
    const options = props.options;
    const successIconHtml = q(()=>({
            __html: SuccessIcon().outerHTML
        }), []);
    const [timeoutId, setTimeoutId] = p(null);
    const handleOnSuccessClick = x(()=>{
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        onFormSubmitted();
    }, [
        timeoutId
    ]);
    const onSubmitSuccess = x((data, eventId)=>{
        props.onSubmitSuccess(data, eventId);
        setTimeoutId(setTimeout(()=>{
            onFormSubmitted();
            setTimeoutId(null);
        }, SUCCESS_MESSAGE_TIMEOUT));
    }, [
        onFormSubmitted
    ]);
    return y$1(g$1, null, timeoutId ? y$1('div', {
        class: "success__position",
        onClick: handleOnSuccessClick
    }, y$1('div', {
        class: "success__content"
    }, options.successMessageText, y$1('span', {
        class: "success__icon",
        dangerouslySetInnerHTML: successIconHtml
    }))) : y$1('dialog', {
        class: "dialog",
        onClick: options.onFormClose,
        open: open
    }, y$1('div', {
        class: "dialog__position"
    }, y$1('div', {
        class: "dialog__content",
        onClick: (e)=>{
            // Stop event propagation so clicks on content modal do not propagate to dialog (which will close dialog)
            e.stopPropagation();
        }
    }, y$1(DialogHeader, {
        options: options
    }), y$1(Form, {
        ...props,
        onSubmitSuccess: onSubmitSuccess
    })))));
}
const DIALOG = `
.dialog {
  position: fixed;
  z-index: var(--z-index);
  margin: 0;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 100vh;
  width: 100vw;

  color: var(--dialog-color, var(--foreground));
  fill: var(--dialog-color, var(--foreground));
  line-height: 1.75em;

  background-color: rgba(0, 0, 0, 0.05);
  border: none;
  inset: 0;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.dialog__position {
  position: fixed;
  z-index: var(--z-index);
  inset: var(--dialog-inset);
  padding: var(--page-margin);
  display: flex;
  max-height: calc(100vh - (2 * var(--page-margin)));
}
@media (max-width: 600px) {
  .dialog__position {
    inset: var(--page-margin);
    padding: 0;
  }
}

.dialog__position:has(.editor) {
  inset: var(--page-margin);
  padding: 0;
}

.dialog:not([open]) {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}
.dialog:not([open]) .dialog__content {
  transform: translate(0, -16px) scale(0.98);
}

.dialog__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: var(--dialog-padding, 24px);
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  overflow: auto;

  background: var(--dialog-background, var(--background));
  border-radius: var(--dialog-border-radius, 20px);
  border: var(--dialog-border, var(--border));
  box-shadow: var(--dialog-box-shadow, var(--box-shadow));
  transform: translate(0, 0) scale(1);
  transition: transform 0.2s ease-in-out;
}

`;
const DIALOG_HEADER = `
.dialog__header {
  display: flex;
  gap: 4px;
  justify-content: space-between;
  font-weight: var(--dialog-header-weight, 600);
  margin: 0;
}
.dialog__title {
  align-self: center;
  width: var(--form-width, 272px);
}

@media (max-width: 600px) {
  .dialog__title {
    width: auto;
  }
}

.dialog__position:has(.editor) .dialog__title {
  width: auto;
}


.brand-link {
  display: inline-flex;
}
.brand-link:focus-visible {
  outline: var(--outline);
}
`;
const FORM = `
.form {
  display: flex;
  overflow: auto;
  flex-direction: row;
  gap: 16px;
  flex: 1 0;
}

.form fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

.form__right {
  flex: 0 0 auto;
  display: flex;
  overflow: auto;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: var(--form-width, 100%);
}

.dialog__position:has(.editor) .form__right {
  width: var(--form-width, 272px);
}

.form__top {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form__error-container {
  color: var(--error-color);
  fill: var(--error-color);
}

.form__label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0px;
}

.form__label__text {
  display: flex;
  gap: 4px;
  align-items: center;
}

.form__label__text--required {
  font-size: 0.85em;
}

.form__input {
  font-family: inherit;
  line-height: inherit;
  background: transparent;
  box-sizing: border-box;
  border: var(--input-border, var(--border));
  border-radius: var(--input-border-radius, 6px);
  color: var(--input-color, inherit);
  fill: var(--input-color, inherit);
  font-size: var(--input-font-size, inherit);
  font-weight: var(--input-font-weight, 500);
  padding: 6px 12px;
}

.form__input::placeholder {
  opacity: 0.65;
  color: var(--input-placeholder-color, inherit);
  filter: var(--interactive-filter);
}

.form__input:focus-visible {
  outline: var(--input-focus-outline, var(--outline));
}

.form__input--textarea {
  font-family: inherit;
  resize: vertical;
}

.error {
  color: var(--error-color);
  fill: var(--error-color);
}
`;
const BUTTON = `
.btn-group {
  display: grid;
  gap: 8px;
}

.btn {
  line-height: inherit;
  border: var(--button-border, var(--border));
  border-radius: var(--button-border-radius, 6px);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--button-font-size, inherit);
  font-weight: var(--button-font-weight, 600);
  padding: var(--button-padding, 6px 16px);
}
.btn[disabled] {
  opacity: 0.6;
  pointer-events: none;
}

.btn--primary {
  color: var(--button-primary-color, var(--accent-foreground));
  fill: var(--button-primary-color, var(--accent-foreground));
  background: var(--button-primary-background, var(--accent-background));
  border: var(--button-primary-border, var(--border));
  border-radius: var(--button-primary-border-radius, 6px);
  font-weight: var(--button-primary-font-weight, 500);
}
.btn--primary:hover {
  color: var(--button-primary-hover-color, var(--accent-foreground));
  fill: var(--button-primary-hover-color, var(--accent-foreground));
  background: var(--button-primary-hover-background, var(--accent-background));
  filter: var(--interactive-filter);
}
.btn--primary:focus-visible {
  background: var(--button-primary-hover-background, var(--accent-background));
  filter: var(--interactive-filter);
  outline: var(--button-primary-focus-outline, var(--outline));
}

.btn--default {
  color: var(--button-color, var(--foreground));
  fill: var(--button-color, var(--foreground));
  background: var(--button-background, var(--background));
  border: var(--button-border, var(--border));
  border-radius: var(--button-border-radius, 6px);
  font-weight: var(--button-font-weight, 500);
}
.btn--default:hover {
  color: var(--button-color, var(--foreground));
  fill: var(--button-color, var(--foreground));
  background: var(--button-hover-background, var(--background));
  filter: var(--interactive-filter);
}
.btn--default:focus-visible {
  background: var(--button-hover-background, var(--background));
  filter: var(--interactive-filter);
  outline: var(--button-focus-outline, var(--outline));
}
`;
const SUCCESS = `
.success__position {
  position: fixed;
  inset: var(--dialog-inset);
  padding: var(--page-margin);
  z-index: var(--z-index);
}
.success__content {
  background: var(--success-background, var(--background));
  border: var(--success-border, var(--border));
  border-radius: var(--success-border-radius, 1.7em/50%);
  box-shadow: var(--success-box-shadow, var(--box-shadow));
  font-weight: var(--success-font-weight, 600);
  color: var(--success-color);
  fill: var(--success-color);
  padding: 12px 24px;
  line-height: 1.75em;

  display: grid;
  align-items: center;
  grid-auto-flow: column;
  gap: 6px;
  cursor: default;
}

.success__icon {
  display: flex;
}
`;
/**
 * Creates <style> element for widget dialog
 */ function createDialogStyles(styleNonce) {
    const style = DOCUMENT.createElement('style');
    style.textContent = `
:host {
  --dialog-inset: var(--inset);
}

${DIALOG}
${DIALOG_HEADER}
${FORM}
${BUTTON}
${SUCCESS}
`;
    if (styleNonce) {
        style.setAttribute('nonce', styleNonce);
    }
    return style;
}
function getUser() {
    const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().getUser();
    const isolationUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getIsolationScope"])().getUser();
    const globalUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getGlobalScope"])().getUser();
    if (currentUser && Object.keys(currentUser).length) {
        return currentUser;
    }
    if (isolationUser && Object.keys(isolationUser).length) {
        return isolationUser;
    }
    return globalUser;
}
const feedbackModalIntegration = ()=>{
    return {
        name: 'FeedbackModal',
        setupOnce () {},
        createDialog: ({ options, screenshotIntegration, sendFeedback, shadow })=>{
            const shadowRoot = shadow;
            const userKey = options.useSentryUser;
            const user = getUser();
            const el = DOCUMENT.createElement('div');
            const style = createDialogStyles(options.styleNonce);
            let originalOverflow = '';
            const dialog = {
                get el () {
                    return el;
                },
                appendToDom () {
                    if (!shadowRoot.contains(style) && !shadowRoot.contains(el)) {
                        shadowRoot.appendChild(style);
                        shadowRoot.appendChild(el);
                    }
                },
                removeFromDom () {
                    el.remove();
                    style.remove();
                    DOCUMENT.body.style.overflow = originalOverflow;
                },
                open () {
                    renderContent(true);
                    options.onFormOpen?.();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])()?.emit('openFeedbackWidget');
                    originalOverflow = DOCUMENT.body.style.overflow;
                    DOCUMENT.body.style.overflow = 'hidden';
                },
                close () {
                    renderContent(false);
                    DOCUMENT.body.style.overflow = originalOverflow;
                }
            };
            const screenshotInput = screenshotIntegration?.createInput({
                h: y$1,
                hooks,
                dialog,
                options
            });
            const renderContent = (open)=>{
                B$1(y$1(Dialog, {
                    options: options,
                    screenshotInput: screenshotInput,
                    showName: options.showName || options.isNameRequired,
                    showEmail: options.showEmail || options.isEmailRequired,
                    defaultName: String(userKey && user?.[userKey.name] || ''),
                    defaultEmail: String(userKey && user?.[userKey.email] || ''),
                    onFormClose: ()=>{
                        renderContent(false);
                        options.onFormClose?.();
                    },
                    onSubmit: sendFeedback,
                    onSubmitSuccess: (data, eventId)=>{
                        renderContent(false);
                        options.onSubmitSuccess?.(data, eventId);
                    },
                    onSubmitError: (error)=>{
                        options.onSubmitError?.(error);
                    },
                    onFormSubmitted: ()=>{
                        options.onFormSubmitted?.();
                    },
                    open: open
                }), el);
            };
            return dialog;
        }
    };
};
function IconCloseFactory({ h }) {
    return function IconClose() {
        return h('svg', {
            'data-test-id': "icon-close",
            viewBox: "0 0 16 16",
            fill: "#2B2233",
            height: "25px",
            width: "25px"
        }, h('circle', {
            r: "7",
            cx: "8",
            cy: "8",
            fill: "white"
        }), h('path', {
            strokeWidth: "1.5",
            d: "M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16ZM8,1.53A6.47,6.47,0,1,0,14.47,8,6.47,6.47,0,0,0,8,1.53Z"
        }), h('path', {
            strokeWidth: "1.5",
            d: "M5.34,11.41a.71.71,0,0,1-.53-.22.74.74,0,0,1,0-1.06l5.32-5.32a.75.75,0,0,1,1.06,1.06L5.87,11.19A.74.74,0,0,1,5.34,11.41Z"
        }), h('path', {
            strokeWidth: "1.5",
            d: "M10.66,11.41a.74.74,0,0,1-.53-.22L4.81,5.87A.75.75,0,0,1,5.87,4.81l5.32,5.32a.74.74,0,0,1,0,1.06A.71.71,0,0,1,10.66,11.41Z"
        }));
    };
}
/**
 * Creates <style> element for widget dialog
 */ function createScreenshotInputStyles(styleNonce) {
    const style = DOCUMENT.createElement('style');
    const surface200 = '#1A141F';
    const gray100 = '#302735';
    style.textContent = `
.editor {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.editor__image-container {
  justify-items: center;
  padding: 15px;
  position: relative;
  height: 100%;
  border-radius: var(--menu-border-radius, 6px);

  background-color: ${surface200};
  background-image: repeating-linear-gradient(
      -145deg,
      transparent,
      transparent 8px,
      ${surface200} 8px,
      ${surface200} 11px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 15px,
      ${gray100} 15px,
      ${gray100} 16px
    );
}

.editor__canvas-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor__canvas-container > * {
  object-fit: contain;
  position: absolute;
}

.editor__tool-container {
  padding-top: 8px;
  display: flex;
  justify-content: center;
}

.editor__tool-bar {
  display: flex;
  gap: 8px;
}

.editor__tool {
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  border: var(--button-border, var(--border));
  border-radius: var(--button-border-radius, 6px);
  background: var(--button-background, var(--background));
  color: var(--button-color, var(--foreground));
}

.editor__tool--active {
  background: var(--button-primary-background, var(--accent-background));
  color: var(--button-primary-color, var(--accent-foreground));
}

.editor__rect {
  position: absolute;
  z-index: 2;
}

.editor__rect button {
  opacity: 0;
  position: absolute;
  top: -12px;
  right: -12px;
  cursor: pointer;
  padding: 0;
  z-index: 3;
  border: none;
  background: none;
}

.editor__rect:hover button {
  opacity: 1;
}
`;
    if (styleNonce) {
        style.setAttribute('nonce', styleNonce);
    }
    return style;
}
function ToolbarFactory({ h }) {
    return function Toolbar({ action, setAction, options }) {
        return h('div', {
            class: "editor__tool-container"
        }, h('div', {
            class: "editor__tool-bar"
        }, h('button', {
            type: "button",
            class: `editor__tool ${action === 'highlight' ? 'editor__tool--active' : ''}`,
            onClick: ()=>{
                setAction(action === 'highlight' ? '' : 'highlight');
            }
        }, options.highlightToolText), h('button', {
            type: "button",
            class: `editor__tool ${action === 'hide' ? 'editor__tool--active' : ''}`,
            onClick: ()=>{
                setAction(action === 'hide' ? '' : 'hide');
            }
        }, options.hideToolText)));
    };
}
function useTakeScreenshotFactory({ hooks }) {
    function useDpi() {
        const [dpi, setDpi] = hooks.useState(WINDOW.devicePixelRatio ?? 1);
        hooks.useEffect({
            "useTakeScreenshotFactory.useDpi.useEffect": ()=>{
                const onChange = {
                    "useTakeScreenshotFactory.useDpi.useEffect.onChange": ()=>{
                        setDpi(WINDOW.devicePixelRatio);
                    }
                }["useTakeScreenshotFactory.useDpi.useEffect.onChange"];
                const media = matchMedia(`(resolution: ${WINDOW.devicePixelRatio}dppx)`);
                media.addEventListener('change', onChange);
                return ({
                    "useTakeScreenshotFactory.useDpi.useEffect": ()=>{
                        media.removeEventListener('change', onChange);
                    }
                })["useTakeScreenshotFactory.useDpi.useEffect"];
            }
        }["useTakeScreenshotFactory.useDpi.useEffect"], []);
        return dpi;
    }
    return function useTakeScreenshot({ onBeforeScreenshot, onScreenshot, onAfterScreenshot, onError }) {
        const dpi = useDpi();
        hooks.useEffect({
            "useTakeScreenshotFactory.useTakeScreenshot.useEffect": ()=>{
                const takeScreenshot = {
                    "useTakeScreenshotFactory.useTakeScreenshot.useEffect.takeScreenshot": async ()=>{
                        onBeforeScreenshot();
                        // Chrome will animate a top-bar which can shrink the window height by a
                        // few pixels. The exact amount depends on how fast it takes to exec
                        // the onloadedmetadata callback.
                        // https://stackoverflow.com/q/75833049
                        const stream = await NAVIGATOR.mediaDevices.getDisplayMedia({
                            video: {
                                width: WINDOW.innerWidth * dpi,
                                height: WINDOW.innerHeight * dpi
                            },
                            audio: false,
                            // @ts-expect-error experimental flags: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia#prefercurrenttab
                            monitorTypeSurfaces: 'exclude',
                            preferCurrentTab: true,
                            selfBrowserSurface: 'include',
                            surfaceSwitching: 'exclude'
                        });
                        const video = DOCUMENT.createElement('video');
                        await new Promise({
                            "useTakeScreenshotFactory.useTakeScreenshot.useEffect.takeScreenshot": (resolve, reject)=>{
                                video.srcObject = stream;
                                video.onloadedmetadata = ({
                                    "useTakeScreenshotFactory.useTakeScreenshot.useEffect.takeScreenshot": ()=>{
                                        onScreenshot(video, dpi);
                                        stream.getTracks().forEach({
                                            "useTakeScreenshotFactory.useTakeScreenshot.useEffect.takeScreenshot": (track)=>track.stop()
                                        }["useTakeScreenshotFactory.useTakeScreenshot.useEffect.takeScreenshot"]);
                                        resolve();
                                    }
                                })["useTakeScreenshotFactory.useTakeScreenshot.useEffect.takeScreenshot"];
                                video.play().catch(reject);
                            }
                        }["useTakeScreenshotFactory.useTakeScreenshot.useEffect.takeScreenshot"]);
                        onAfterScreenshot();
                    }
                }["useTakeScreenshotFactory.useTakeScreenshot.useEffect.takeScreenshot"];
                takeScreenshot().catch(onError);
            }
        }["useTakeScreenshotFactory.useTakeScreenshot.useEffect"], []);
    };
}
function drawRect(command, ctx, color) {
    switch(command.type){
        case 'highlight':
            {
                // creates a shadow around
                ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
                ctx.shadowBlur = 50;
                // draws a rectangle first with a shadow
                ctx.fillStyle = color;
                ctx.fillRect(command.x - 1, command.y - 1, command.w + 2, command.h + 2);
                // cut out the inside of the rectangle
                ctx.clearRect(command.x, command.y, command.w, command.h);
                break;
            }
        case 'hide':
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(command.x, command.y, command.w, command.h);
            break;
    }
}
function with2dContext(canvas, options, callback) {
    if (!canvas) {
        return;
    }
    const ctx = canvas.getContext('2d', options);
    if (!ctx) {
        return;
    }
    callback(canvas, ctx);
}
function paintImage(maybeDest, source) {
    with2dContext(maybeDest, {
        alpha: true
    }, (destCanvas, destCtx)=>{
        destCtx.drawImage(source, 0, 0, source.width, source.height, 0, 0, destCanvas.width, destCanvas.height);
    });
}
// Paint the array of drawCommands into a canvas.
// Assuming this is the canvas foreground, and the background is cleaned.
function paintForeground(maybeCanvas, strokeColor, drawCommands) {
    with2dContext(maybeCanvas, {
        alpha: true
    }, (canvas, ctx)=>{
        // If there's anything to draw, then we'll first clear the canvas with
        // a transparent grey background
        if (drawCommands.length) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        drawCommands.forEach((command)=>{
            drawRect(command, ctx, strokeColor);
        });
    });
}
function ScreenshotEditorFactory({ h, hooks, outputBuffer, dialog, options }) {
    const useTakeScreenshot = useTakeScreenshotFactory({
        hooks
    });
    const Toolbar = ToolbarFactory({
        h
    });
    const IconClose = IconCloseFactory({
        h
    });
    const editorStyleInnerText = {
        __html: createScreenshotInputStyles(options.styleNonce).innerText
    };
    const dialogStyle = dialog.el.style;
    const ScreenshotEditor = ({ screenshot })=>{
        // Data for rendering:
        const [action, setAction] = hooks.useState('highlight');
        const [drawCommands, setDrawCommands] = hooks.useState([]);
        // Refs to our html components:
        const measurementRef = hooks.useRef(null);
        const backgroundRef = hooks.useRef(null);
        const foregroundRef = hooks.useRef(null);
        const mouseRef = hooks.useRef(null);
        // The size of our window, relative to the imageSource
        const [scaleFactor, setScaleFactor] = hooks.useState(1);
        const strokeColor = hooks.useMemo({
            "ScreenshotEditorFactory.ScreenshotEditor.useMemo[strokeColor]": ()=>{
                const sentryFeedback = DOCUMENT.getElementById(options.id);
                if (!sentryFeedback) {
                    return 'white';
                }
                const computedStyle = getComputedStyle(sentryFeedback);
                return computedStyle.getPropertyValue('--button-primary-background') || computedStyle.getPropertyValue('--accent-background');
            }
        }["ScreenshotEditorFactory.ScreenshotEditor.useMemo[strokeColor]"], [
            options.id
        ]);
        // The initial resize, to measure the area and set the children to the correct size
        hooks.useLayoutEffect({
            "ScreenshotEditorFactory.ScreenshotEditor.useLayoutEffect": ()=>{
                const handleResize = {
                    "ScreenshotEditorFactory.ScreenshotEditor.useLayoutEffect.handleResize": ()=>{
                        const measurementDiv = measurementRef.current;
                        if (!measurementDiv) {
                            return;
                        }
                        with2dContext(screenshot.canvas, {
                            alpha: false
                        }, {
                            "ScreenshotEditorFactory.ScreenshotEditor.useLayoutEffect.handleResize": (canvas)=>{
                                const scale = Math.min(measurementDiv.clientWidth / canvas.width, measurementDiv.clientHeight / canvas.height);
                                setScaleFactor(scale);
                            }
                        }["ScreenshotEditorFactory.ScreenshotEditor.useLayoutEffect.handleResize"]);
                        // For Firefox, the canvas is not yet measured, so we need to wait for it to get the correct size
                        if (measurementDiv.clientHeight === 0 || measurementDiv.clientWidth === 0) {
                            setTimeout(handleResize, 0);
                        }
                    }
                }["ScreenshotEditorFactory.ScreenshotEditor.useLayoutEffect.handleResize"];
                handleResize();
                WINDOW.addEventListener('resize', handleResize);
                return ({
                    "ScreenshotEditorFactory.ScreenshotEditor.useLayoutEffect": ()=>{
                        WINDOW.removeEventListener('resize', handleResize);
                    }
                })["ScreenshotEditorFactory.ScreenshotEditor.useLayoutEffect"];
            }
        }["ScreenshotEditorFactory.ScreenshotEditor.useLayoutEffect"], [
            screenshot
        ]);
        // Set the size of the canvas element to match our screenshot
        const setCanvasSize = hooks.useCallback({
            "ScreenshotEditorFactory.ScreenshotEditor.useCallback[setCanvasSize]": (maybeCanvas, scale)=>{
                with2dContext(maybeCanvas, {
                    alpha: true
                }, {
                    "ScreenshotEditorFactory.ScreenshotEditor.useCallback[setCanvasSize]": (canvas, ctx)=>{
                        // Must call `scale()` before setting `width` & `height`
                        ctx.scale(scale, scale);
                        canvas.width = screenshot.canvas.width;
                        canvas.height = screenshot.canvas.height;
                    }
                }["ScreenshotEditorFactory.ScreenshotEditor.useCallback[setCanvasSize]"]);
            }
        }["ScreenshotEditorFactory.ScreenshotEditor.useCallback[setCanvasSize]"], [
            screenshot
        ]);
        // Draw the screenshot into the background
        hooks.useEffect({
            "ScreenshotEditorFactory.ScreenshotEditor.useEffect": ()=>{
                setCanvasSize(backgroundRef.current, screenshot.dpi);
                paintImage(backgroundRef.current, screenshot.canvas);
            }
        }["ScreenshotEditorFactory.ScreenshotEditor.useEffect"], [
            screenshot
        ]);
        // Draw the commands into the foreground
        hooks.useEffect({
            "ScreenshotEditorFactory.ScreenshotEditor.useEffect": ()=>{
                setCanvasSize(foregroundRef.current, screenshot.dpi);
                with2dContext(foregroundRef.current, {
                    alpha: true
                }, {
                    "ScreenshotEditorFactory.ScreenshotEditor.useEffect": (canvas, ctx)=>{
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                }["ScreenshotEditorFactory.ScreenshotEditor.useEffect"]);
                paintForeground(foregroundRef.current, strokeColor, drawCommands);
            }
        }["ScreenshotEditorFactory.ScreenshotEditor.useEffect"], [
            drawCommands,
            strokeColor
        ]);
        // Draw into the output outputBuffer
        hooks.useEffect({
            "ScreenshotEditorFactory.ScreenshotEditor.useEffect": ()=>{
                setCanvasSize(outputBuffer, screenshot.dpi);
                paintImage(outputBuffer, screenshot.canvas);
                with2dContext(DOCUMENT.createElement('canvas'), {
                    alpha: true
                }, {
                    "ScreenshotEditorFactory.ScreenshotEditor.useEffect": (foreground, ctx)=>{
                        ctx.scale(screenshot.dpi, screenshot.dpi); // The scale needs to be set before we set the width/height and paint
                        foreground.width = screenshot.canvas.width;
                        foreground.height = screenshot.canvas.height;
                        paintForeground(foreground, strokeColor, drawCommands);
                        paintImage(outputBuffer, foreground);
                    }
                }["ScreenshotEditorFactory.ScreenshotEditor.useEffect"]);
            }
        }["ScreenshotEditorFactory.ScreenshotEditor.useEffect"], [
            drawCommands,
            screenshot,
            strokeColor
        ]);
        const handleMouseDown = (e)=>{
            if (!action || !mouseRef.current) {
                return;
            }
            const boundingRect = mouseRef.current.getBoundingClientRect();
            const startingPoint = {
                type: action,
                x: e.offsetX / scaleFactor,
                y: e.offsetY / scaleFactor
            };
            const getDrawCommand = (startingPoint, e)=>{
                const x = (e.clientX - boundingRect.x) / scaleFactor;
                const y = (e.clientY - boundingRect.y) / scaleFactor;
                return {
                    type: startingPoint.type,
                    x: Math.min(startingPoint.x, x),
                    y: Math.min(startingPoint.y, y),
                    w: Math.abs(x - startingPoint.x),
                    h: Math.abs(y - startingPoint.y)
                };
            };
            const handleMouseMove = (e)=>{
                with2dContext(foregroundRef.current, {
                    alpha: true
                }, (canvas, ctx)=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                });
                paintForeground(foregroundRef.current, strokeColor, [
                    ...drawCommands,
                    getDrawCommand(startingPoint, e)
                ]);
            };
            const handleMouseUp = (e)=>{
                const drawCommand = getDrawCommand(startingPoint, e);
                // Prevent just clicking onto the canvas, mouse has to move at least 1 pixel
                if (drawCommand.w * scaleFactor >= 1 && drawCommand.h * scaleFactor >= 1) {
                    setDrawCommands((prev)=>[
                            ...prev,
                            drawCommand
                        ]);
                }
                DOCUMENT.removeEventListener('mousemove', handleMouseMove);
                DOCUMENT.removeEventListener('mouseup', handleMouseUp);
            };
            DOCUMENT.addEventListener('mousemove', handleMouseMove);
            DOCUMENT.addEventListener('mouseup', handleMouseUp);
        };
        const deleteRect = hooks.useCallback({
            "ScreenshotEditorFactory.ScreenshotEditor.useCallback[deleteRect]": (index)=>{
                return ({
                    "ScreenshotEditorFactory.ScreenshotEditor.useCallback[deleteRect]": (e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        setDrawCommands({
                            "ScreenshotEditorFactory.ScreenshotEditor.useCallback[deleteRect]": (prev)=>{
                                const updatedRects = [
                                    ...prev
                                ];
                                updatedRects.splice(index, 1);
                                return updatedRects;
                            }
                        }["ScreenshotEditorFactory.ScreenshotEditor.useCallback[deleteRect]"]);
                    }
                })["ScreenshotEditorFactory.ScreenshotEditor.useCallback[deleteRect]"];
            }
        }["ScreenshotEditorFactory.ScreenshotEditor.useCallback[deleteRect]"], []);
        const dimensions = {
            width: `${screenshot.canvas.width * scaleFactor}px`,
            height: `${screenshot.canvas.height * scaleFactor}px`
        };
        const handleStopPropagation = (e)=>{
            e.stopPropagation();
        };
        return h('div', {
            class: "editor"
        }, h('style', {
            nonce: options.styleNonce,
            dangerouslySetInnerHTML: editorStyleInnerText
        }), h('div', {
            class: "editor__image-container"
        }, h('div', {
            class: "editor__canvas-container",
            ref: measurementRef
        }, h('canvas', {
            ref: backgroundRef,
            id: "background",
            style: dimensions
        }), h('canvas', {
            ref: foregroundRef,
            id: "foreground",
            style: dimensions
        }), h('div', {
            ref: mouseRef,
            onMouseDown: handleMouseDown,
            style: dimensions
        }, drawCommands.map((rect, index)=>h('div', {
                key: index,
                class: "editor__rect",
                style: {
                    top: `${rect.y * scaleFactor}px`,
                    left: `${rect.x * scaleFactor}px`,
                    width: `${rect.w * scaleFactor}px`,
                    height: `${rect.h * scaleFactor}px`
                }
            }, h('button', {
                'aria-label': options.removeHighlightText,
                onClick: deleteRect(index),
                onMouseDown: handleStopPropagation,
                onMouseUp: handleStopPropagation,
                type: "button"
            }, h(IconClose, null))))))), h(Toolbar, {
            options: options,
            action: action,
            setAction: setAction
        }));
    };
    return function Wrapper({ onError }) {
        const [screenshot, setScreenshot] = hooks.useState();
        useTakeScreenshot({
            onBeforeScreenshot: hooks.useCallback({
                "ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback": ()=>{
                    dialogStyle.display = 'none';
                }
            }["ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback"], []),
            onScreenshot: hooks.useCallback({
                "ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback": (screenshotVideo, dpi)=>{
                    // Stash the original screenshot image so we can (re)draw it multiple times
                    with2dContext(DOCUMENT.createElement('canvas'), {
                        alpha: false
                    }, {
                        "ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback": (canvas, ctx)=>{
                            ctx.scale(dpi, dpi); // The scale needs to be set before we set the width/height and paint
                            canvas.width = screenshotVideo.videoWidth;
                            canvas.height = screenshotVideo.videoHeight;
                            ctx.drawImage(screenshotVideo, 0, 0, canvas.width, canvas.height);
                            setScreenshot({
                                canvas,
                                dpi
                            });
                        }
                    }["ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback"]);
                    // The output buffer, we only need to set the width/height on this once, it stays the same forever
                    outputBuffer.width = screenshotVideo.videoWidth;
                    outputBuffer.height = screenshotVideo.videoHeight;
                }
            }["ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback"], []),
            onAfterScreenshot: hooks.useCallback({
                "ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback": ()=>{
                    dialogStyle.display = 'block';
                }
            }["ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback"], []),
            onError: hooks.useCallback({
                "ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback": (error)=>{
                    dialogStyle.display = 'block';
                    onError(error);
                }
            }["ScreenshotEditorFactory.Wrapper.useTakeScreenshot.useCallback"], [])
        });
        if (screenshot) {
            return h(ScreenshotEditor, {
                screenshot: screenshot
            });
        }
        return h('div', null);
    };
}
const feedbackScreenshotIntegration = ()=>{
    return {
        name: 'FeedbackScreenshot',
        setupOnce () {},
        createInput: ({ h, hooks, dialog, options })=>{
            const outputBuffer = DOCUMENT.createElement('canvas');
            return {
                input: ScreenshotEditorFactory({
                    h: h,
                    hooks: hooks,
                    outputBuffer,
                    dialog,
                    options
                }),
                value: async ()=>{
                    const blob = await new Promise((resolve)=>{
                        outputBuffer.toBlob(resolve, 'image/png');
                    });
                    if (blob) {
                        const data = new Uint8Array(await blob.arrayBuffer());
                        const attachment = {
                            data,
                            filename: 'screenshot.png',
                            contentType: 'application/png'
                        };
                        return attachment;
                    }
                    return undefined;
                }
            };
        }
    };
};
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/replay-canvas/build/npm/esm/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "replayCanvasIntegration",
    ()=>replayCanvasIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
;
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value)=>key in obj ? __defProp$1(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField$1 = (obj, key, value)=>__defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
class Mirror {
    constructor(){
        __publicField$1(this, "idNodeMap", /* @__PURE__ */ new Map());
        __publicField$1(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
    }
    getId(n2) {
        if (!n2) return -1;
        const id = this.getMeta(n2)?.id;
        return id ?? -1;
    }
    getNode(id) {
        return this.idNodeMap.get(id) || null;
    }
    getIds() {
        return Array.from(this.idNodeMap.keys());
    }
    getMeta(n2) {
        return this.nodeMetaMap.get(n2) || null;
    }
    // removes the node from idNodeMap
    // doesn't remove the node from nodeMetaMap
    removeNodeFromMap(n2) {
        const id = this.getId(n2);
        this.idNodeMap.delete(id);
        if (n2.childNodes) {
            n2.childNodes.forEach((childNode)=>this.removeNodeFromMap(childNode));
        }
    }
    has(id) {
        return this.idNodeMap.has(id);
    }
    hasNode(node) {
        return this.nodeMetaMap.has(node);
    }
    add(n2, meta) {
        const id = meta.id;
        this.idNodeMap.set(id, n2);
        this.nodeMetaMap.set(n2, meta);
    }
    replace(id, n2) {
        const oldNode = this.getNode(id);
        if (oldNode) {
            const meta = this.nodeMetaMap.get(oldNode);
            if (meta) this.nodeMetaMap.set(n2, meta);
        }
        this.idNodeMap.set(id, n2);
    }
    reset() {
        this.idNodeMap = /* @__PURE__ */ new Map();
        this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
    }
}
function createMirror$2() {
    return new Mirror();
}
function elementClassMatchesRegex(el, regex) {
    for(let eIndex = el.classList.length; eIndex--;){
        const className = el.classList[eIndex];
        if (regex.test(className)) {
            return true;
        }
    }
    return false;
}
function distanceToMatch(node, matchPredicate, limit = Infinity, distance = 0) {
    if (!node) return -1;
    if (node.nodeType !== node.ELEMENT_NODE) return -1;
    if (distance > limit) return -1;
    if (matchPredicate(node)) return distance;
    return distanceToMatch(node.parentNode, matchPredicate, limit, distance + 1);
}
function createMatchPredicate(className, selector) {
    return (node)=>{
        const el = node;
        if (el === null) return false;
        try {
            if (className) {
                if (typeof className === "string") {
                    if (el.matches(`.${className}`)) return true;
                } else if (elementClassMatchesRegex(el, className)) {
                    return true;
                }
            }
            if (selector && el.matches(selector)) return true;
            return false;
        } catch  {
            return false;
        }
    };
}
const DEPARTED_MIRROR_ACCESS_WARNING = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
let _mirror = {
    map: {},
    getId () {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
        return -1;
    },
    getNode () {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
        return null;
    },
    removeNodeFromMap () {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    },
    has () {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
        return false;
    },
    reset () {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    }
};
if (typeof window !== "undefined" && window.Proxy && window.Reflect) {
    _mirror = new Proxy(_mirror, {
        get (target, prop, receiver) {
            if (prop === "map") {
                console.error(DEPARTED_MIRROR_ACCESS_WARNING);
            }
            return Reflect.get(target, prop, receiver);
        }
    });
}
function hookSetter(target, key, d, isRevoked, win = window) {
    const original = win.Object.getOwnPropertyDescriptor(target, key);
    win.Object.defineProperty(target, key, isRevoked ? d : {
        set (value) {
            setTimeout$1(()=>{
                d.set.call(this, value);
            }, 0);
            if (original && original.set) {
                original.set.call(this, value);
            }
        }
    });
    return ()=>hookSetter(target, key, original || {}, true);
}
function patch(source, name, replacement) {
    try {
        if (!(name in source)) {
            return ()=>{};
        }
        const original = source[name];
        const wrapped = replacement(original);
        if (typeof wrapped === "function") {
            wrapped.prototype = wrapped.prototype || {};
            Object.defineProperties(wrapped, {
                __rrweb_original__: {
                    enumerable: false,
                    value: original
                }
            });
        }
        source[name] = wrapped;
        return ()=>{
            source[name] = original;
        };
    } catch  {
        return ()=>{};
    }
}
if (!/* @__PURE__ */ /[1-9][0-9]{12}/.test(Date.now().toString())) ;
function closestElementOfNode(node) {
    if (!node) {
        return null;
    }
    try {
        const el = node.nodeType === node.ELEMENT_NODE ? node : node.parentElement;
        return el;
    } catch (error) {
        return null;
    }
}
function isBlocked(node, blockClass, blockSelector, unblockSelector, checkAncestors) {
    if (!node) {
        return false;
    }
    const el = closestElementOfNode(node);
    if (!el) {
        return false;
    }
    const blockedPredicate = createMatchPredicate(blockClass, blockSelector);
    if (!checkAncestors) {
        const isUnblocked = unblockSelector && el.matches(unblockSelector);
        return blockedPredicate(el) && !isUnblocked;
    }
    const blockDistance = distanceToMatch(el, blockedPredicate);
    let unblockDistance = -1;
    if (blockDistance < 0) {
        return false;
    }
    if (unblockSelector) {
        unblockDistance = distanceToMatch(el, createMatchPredicate(null, unblockSelector));
    }
    if (blockDistance > -1 && unblockDistance < 0) {
        return true;
    }
    return blockDistance < unblockDistance;
}
const cachedImplementations = {};
function getImplementation(name) {
    const cached = cachedImplementations[name];
    if (cached) {
        return cached;
    }
    const document2 = window.document;
    let impl = window[name];
    if (document2 && typeof document2.createElement === "function") {
        try {
            const sandbox = document2.createElement("iframe");
            sandbox.hidden = true;
            document2.head.appendChild(sandbox);
            const contentWindow = sandbox.contentWindow;
            if (contentWindow && contentWindow[name]) {
                impl = contentWindow[name];
            }
            document2.head.removeChild(sandbox);
        } catch (e2) {}
    }
    return cachedImplementations[name] = impl.bind(window);
}
function onRequestAnimationFrame(...rest) {
    return getImplementation("requestAnimationFrame")(...rest);
}
function setTimeout$1(...rest) {
    return getImplementation("setTimeout")(...rest);
}
var CanvasContext = /* @__PURE__ */ ((CanvasContext2)=>{
    CanvasContext2[CanvasContext2["2D"] = 0] = "2D";
    CanvasContext2[CanvasContext2["WebGL"] = 1] = "WebGL";
    CanvasContext2[CanvasContext2["WebGL2"] = 2] = "WebGL2";
    return CanvasContext2;
})(CanvasContext || {});
let errorHandler;
function registerErrorHandler(handler) {
    errorHandler = handler;
}
const callbackWrapper = (cb)=>{
    if (!errorHandler) {
        return cb;
    }
    const rrwebWrapped = (...rest)=>{
        try {
            return cb(...rest);
        } catch (error) {
            if (errorHandler && errorHandler(error) === true) {
                return ()=>{};
            }
            throw error;
        }
    };
    return rrwebWrapped;
};
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for(var i$1 = 0; i$1 < chars.length; i$1++){
    lookup[chars.charCodeAt(i$1)] = i$1;
}
var encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i2, len = bytes.length, base64 = "";
    for(i2 = 0; i2 < len; i2 += 3){
        base64 += chars[bytes[i2] >> 2];
        base64 += chars[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
        base64 += chars[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
        base64 += chars[bytes[i2 + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
    }
    return base64;
};
const canvasVarMap = /* @__PURE__ */ new Map();
function variableListFor$1(ctx, ctor) {
    let contextMap = canvasVarMap.get(ctx);
    if (!contextMap) {
        contextMap = /* @__PURE__ */ new Map();
        canvasVarMap.set(ctx, contextMap);
    }
    if (!contextMap.has(ctor)) {
        contextMap.set(ctor, []);
    }
    return contextMap.get(ctor);
}
const saveWebGLVar = (value, win, ctx)=>{
    if (!value || !(isInstanceOfWebGLObject(value, win) || typeof value === "object")) return;
    const name = value.constructor.name;
    const list = variableListFor$1(ctx, name);
    let index = list.indexOf(value);
    if (index === -1) {
        index = list.length;
        list.push(value);
    }
    return index;
};
function serializeArg(value, win, ctx) {
    if (value instanceof Array) {
        return value.map((arg)=>serializeArg(arg, win, ctx));
    } else if (value === null) {
        return value;
    } else if (value instanceof Float32Array || value instanceof Float64Array || value instanceof Int32Array || value instanceof Uint32Array || value instanceof Uint8Array || value instanceof Uint16Array || value instanceof Int16Array || value instanceof Int8Array || value instanceof Uint8ClampedArray) {
        const name = value.constructor.name;
        return {
            rr_type: name,
            args: [
                Object.values(value)
            ]
        };
    } else if (// SharedArrayBuffer disabled on most browsers due to spectre.
    // More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/SharedArrayBuffer
    // value instanceof SharedArrayBuffer ||
    value instanceof ArrayBuffer) {
        const name = value.constructor.name;
        const base64 = encode(value);
        return {
            rr_type: name,
            base64
        };
    } else if (value instanceof DataView) {
        const name = value.constructor.name;
        return {
            rr_type: name,
            args: [
                serializeArg(value.buffer, win, ctx),
                value.byteOffset,
                value.byteLength
            ]
        };
    } else if (value instanceof HTMLImageElement) {
        const name = value.constructor.name;
        const { src } = value;
        return {
            rr_type: name,
            src
        };
    } else if (value instanceof HTMLCanvasElement) {
        const name = "HTMLImageElement";
        const src = value.toDataURL();
        return {
            rr_type: name,
            src
        };
    } else if (value instanceof ImageData) {
        const name = value.constructor.name;
        return {
            rr_type: name,
            args: [
                serializeArg(value.data, win, ctx),
                value.width,
                value.height
            ]
        };
    } else if (isInstanceOfWebGLObject(value, win) || typeof value === "object") {
        const name = value.constructor.name;
        const index = saveWebGLVar(value, win, ctx);
        return {
            rr_type: name,
            index
        };
    }
    return value;
}
const serializeArgs = (args, win, ctx)=>{
    return args.map((arg)=>serializeArg(arg, win, ctx));
};
const isInstanceOfWebGLObject = (value, win)=>{
    const webGLConstructorNames = [
        "WebGLActiveInfo",
        "WebGLBuffer",
        "WebGLFramebuffer",
        "WebGLProgram",
        "WebGLRenderbuffer",
        "WebGLShader",
        "WebGLShaderPrecisionFormat",
        "WebGLTexture",
        "WebGLUniformLocation",
        "WebGLVertexArrayObject",
        // In old Chrome versions, value won't be an instanceof WebGLVertexArrayObject.
        "WebGLVertexArrayObjectOES"
    ];
    const supportedWebGLConstructorNames = webGLConstructorNames.filter((name)=>typeof win[name] === "function");
    return Boolean(supportedWebGLConstructorNames.find((name)=>value instanceof win[name]));
};
function initCanvas2DMutationObserver(cb, win, blockClass2, blockSelector, unblockSelector) {
    const handlers = [];
    const props2D = Object.getOwnPropertyNames(win.CanvasRenderingContext2D.prototype);
    for (const prop of props2D){
        try {
            if (typeof win.CanvasRenderingContext2D.prototype[prop] !== "function") {
                continue;
            }
            const restoreHandler = patch(win.CanvasRenderingContext2D.prototype, prop, function(original) {
                return function(...args) {
                    if (!isBlocked(this.canvas, blockClass2, blockSelector, unblockSelector, true)) {
                        setTimeout$1(()=>{
                            const recordArgs = serializeArgs(args, win, this);
                            cb(this.canvas, {
                                type: CanvasContext["2D"],
                                property: prop,
                                args: recordArgs
                            });
                        }, 0);
                    }
                    return original.apply(this, args);
                };
            });
            handlers.push(restoreHandler);
        } catch  {
            const hookHandler = hookSetter(win.CanvasRenderingContext2D.prototype, prop, {
                set (v2) {
                    cb(this.canvas, {
                        type: CanvasContext["2D"],
                        property: prop,
                        args: [
                            v2
                        ],
                        setter: true
                    });
                }
            });
            handlers.push(hookHandler);
        }
    }
    return ()=>{
        handlers.forEach((h)=>h());
    };
}
function getNormalizedContextName(contextType) {
    return contextType === "experimental-webgl" ? "webgl" : contextType;
}
function initCanvasContextObserver(win, blockClass, blockSelector, unblockSelector, setPreserveDrawingBufferToTrue) {
    const handlers = [];
    try {
        const restoreHandler = patch(win.HTMLCanvasElement.prototype, "getContext", function(original) {
            return function(contextType, ...args) {
                if (!isBlocked(this, blockClass, blockSelector, unblockSelector, true)) {
                    const ctxName = getNormalizedContextName(contextType);
                    if (!("__context" in this)) this.__context = ctxName;
                    if (setPreserveDrawingBufferToTrue && [
                        "webgl",
                        "webgl2"
                    ].includes(ctxName)) {
                        if (args[0] && typeof args[0] === "object") {
                            const contextAttributes = args[0];
                            if (!contextAttributes.preserveDrawingBuffer) {
                                contextAttributes.preserveDrawingBuffer = true;
                            }
                        } else {
                            args.splice(0, 1, {
                                preserveDrawingBuffer: true
                            });
                        }
                    }
                }
                return original.apply(this, [
                    contextType,
                    ...args
                ]);
            };
        });
        handlers.push(restoreHandler);
    } catch  {
        console.error("failed to patch HTMLCanvasElement.prototype.getContext");
    }
    return ()=>{
        handlers.forEach((h)=>h());
    };
}
function patchGLPrototype(prototype, type, cb, blockClass2, blockSelector, unblockSelector, _mirror2, win) {
    const handlers = [];
    const props = Object.getOwnPropertyNames(prototype);
    for (const prop of props){
        if (//prop.startsWith('get') ||  // e.g. getProgramParameter, but too risky
        [
            "isContextLost",
            "canvas",
            "drawingBufferWidth",
            "drawingBufferHeight"
        ].includes(prop)) {
            continue;
        }
        try {
            if (typeof prototype[prop] !== "function") {
                continue;
            }
            const restoreHandler = patch(prototype, prop, function(original) {
                return function(...args) {
                    const result = original.apply(this, args);
                    saveWebGLVar(result, win, this);
                    if ("tagName" in this.canvas && !isBlocked(this.canvas, blockClass2, blockSelector, unblockSelector, true)) {
                        const recordArgs = serializeArgs(args, win, this);
                        const mutation = {
                            type,
                            property: prop,
                            args: recordArgs
                        };
                        cb(this.canvas, mutation);
                    }
                    return result;
                };
            });
            handlers.push(restoreHandler);
        } catch  {
            const hookHandler = hookSetter(prototype, prop, {
                set (v2) {
                    cb(this.canvas, {
                        type,
                        property: prop,
                        args: [
                            v2
                        ],
                        setter: true
                    });
                }
            });
            handlers.push(hookHandler);
        }
    }
    return handlers;
}
function initCanvasWebGLMutationObserver(cb, win, blockClass2, blockSelector, unblockSelector, mirror2) {
    const handlers = [];
    handlers.push(...patchGLPrototype(win.WebGLRenderingContext.prototype, CanvasContext.WebGL, cb, blockClass2, blockSelector, unblockSelector, mirror2, win));
    if (typeof win.WebGL2RenderingContext !== "undefined") {
        handlers.push(...patchGLPrototype(win.WebGL2RenderingContext.prototype, CanvasContext.WebGL2, cb, blockClass2, blockSelector, unblockSelector, mirror2, win));
    }
    return ()=>{
        handlers.forEach((h)=>h());
    };
}
const r$1 = `for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t="undefined"==typeof Uint8Array?[]:new Uint8Array(256),a=0;a<64;a++)t[e.charCodeAt(a)]=a;var n=function(t){var a,n=new Uint8Array(t),r=n.length,s="";for(a=0;a<r;a+=3)s+=e[n[a]>>2],s+=e[(3&n[a])<<4|n[a+1]>>4],s+=e[(15&n[a+1])<<2|n[a+2]>>6],s+=e[63&n[a+2]];return r%3==2?s=s.substring(0,s.length-1)+"=":r%3==1&&(s=s.substring(0,s.length-2)+"=="),s};const r=new Map,s=new Map;const i=self;i.onmessage=async function(e){if(!("OffscreenCanvas"in globalThis))return i.postMessage({id:e.data.id});{const{id:t,bitmap:a,width:o,height:f,maxCanvasSize:c,dataURLOptions:g}=e.data,u=async function(e,t,a){const r=e+"-"+t;if("OffscreenCanvas"in globalThis){if(s.has(r))return s.get(r);const i=new OffscreenCanvas(e,t);i.getContext("2d");const o=await i.convertToBlob(a),f=await o.arrayBuffer(),c=n(f);return s.set(r,c),c}return""}(o,f,g),[h,d]=function(e,t,a){if(!a)return[e,t];const[n,r]=a;if(e<=n&&t<=r)return[e,t];let s=e,i=t;return s>n&&(i=Math.floor(n*t/e),s=n),i>r&&(s=Math.floor(r*e/t),i=r),[s,i]}(o,f,c),l=new OffscreenCanvas(h,d),w=l.getContext("bitmaprenderer"),p=h===o&&d===f?a:await createImageBitmap(a,{resizeWidth:h,resizeHeight:d,resizeQuality:"low"});w?.transferFromImageBitmap(p),a.close();const y=await l.convertToBlob(g),v=y.type,b=await y.arrayBuffer(),m=n(b);if(p.close(),!r.has(t)&&await u===m)return r.set(t,m),i.postMessage({id:t});if(r.get(t)===m)return i.postMessage({id:t});i.postMessage({id:t,type:v,base64:m,width:o,height:f}),r.set(t,m)}};`;
function t$1() {
    const t2 = new Blob([
        r$1
    ]);
    return URL.createObjectURL(t2);
}
class CanvasManager {
    constructor(options){
        this.pendingCanvasMutations = /* @__PURE__ */ new Map();
        this.rafStamps = {
            latestId: 0,
            invokeId: null
        };
        this.shadowDoms = /* @__PURE__ */ new Set();
        this.windowsSet = /* @__PURE__ */ new WeakSet();
        this.windows = [];
        this.restoreHandlers = [];
        this.frozen = false;
        this.locked = false;
        this.snapshotInProgressMap = /* @__PURE__ */ new Map();
        this.worker = null;
        this.lastSnapshotTime = 0;
        this.processMutation = (target, mutation)=>{
            const newFrame = this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId;
            if (newFrame || !this.rafStamps.invokeId) this.rafStamps.invokeId = this.rafStamps.latestId;
            if (!this.pendingCanvasMutations.has(target)) {
                this.pendingCanvasMutations.set(target, []);
            }
            this.pendingCanvasMutations.get(target).push(mutation);
        };
        const { enableManualSnapshot, sampling = "all", win, recordCanvas, errorHandler: errorHandler2 } = options;
        options.sampling = sampling;
        this.mutationCb = options.mutationCb;
        this.mirror = options.mirror;
        this.options = options;
        if (errorHandler2) {
            registerErrorHandler(errorHandler2);
        }
        if (recordCanvas && typeof sampling === "number" || enableManualSnapshot) {
            this.worker = this.initFPSWorker();
        }
        this.addWindow(win);
        if (enableManualSnapshot) {
            return;
        }
        callbackWrapper(()=>{
            if (recordCanvas && sampling === "all") {
                this.startRAFTimestamping();
                this.startPendingCanvasMutationFlusher();
            }
            if (recordCanvas && typeof sampling === "number") {
                this.initCanvasFPSObserver();
            }
        })();
    }
    reset() {
        this.pendingCanvasMutations.clear();
        this.restoreHandlers.forEach((handler)=>{
            try {
                handler();
            } catch (e2) {}
        });
        this.restoreHandlers = [];
        this.windowsSet = /* @__PURE__ */ new WeakSet();
        this.windows = [];
        this.shadowDoms = /* @__PURE__ */ new Set();
        this.worker?.terminate();
        this.worker = null;
        this.snapshotInProgressMap = /* @__PURE__ */ new Map();
    }
    freeze() {
        this.frozen = true;
    }
    unfreeze() {
        this.frozen = false;
    }
    lock() {
        this.locked = true;
    }
    unlock() {
        this.locked = false;
    }
    addWindow(win) {
        const { sampling = "all", blockClass, blockSelector, unblockSelector, recordCanvas, enableManualSnapshot } = this.options;
        if (this.windowsSet.has(win)) return;
        if (enableManualSnapshot) {
            this.windowsSet.add(win);
            this.windows.push(new WeakRef(win));
            return;
        }
        callbackWrapper(()=>{
            if (recordCanvas && sampling === "all") {
                this.initCanvasMutationObserver(win, blockClass, blockSelector, unblockSelector);
            }
            if (recordCanvas && typeof sampling === "number") {
                const canvasContextReset = initCanvasContextObserver(win, blockClass, blockSelector, unblockSelector, true);
                this.restoreHandlers.push(()=>{
                    canvasContextReset();
                });
            }
        })();
        this.windowsSet.add(win);
        this.windows.push(new WeakRef(win));
    }
    addShadowRoot(shadowRoot) {
        this.shadowDoms.add(new WeakRef(shadowRoot));
    }
    resetShadowRoots() {
        this.shadowDoms = /* @__PURE__ */ new Set();
    }
    snapshot(canvasElement, options) {
        if (options?.skipRequestAnimationFrame) {
            this.takeSnapshot(performance.now(), true, canvasElement);
            return;
        }
        onRequestAnimationFrame((timestamp)=>this.takeSnapshot(timestamp, true, canvasElement));
    }
    initFPSWorker() {
        const worker = new Worker(t$1());
        worker.onmessage = (e2)=>{
            const data = e2.data;
            const { id } = data;
            this.snapshotInProgressMap.set(id, false);
            if (!("base64" in data)) return;
            const { base64, type, width, height } = data;
            this.mutationCb({
                id,
                type: CanvasContext["2D"],
                commands: [
                    {
                        property: "clearRect",
                        // wipe canvas
                        args: [
                            0,
                            0,
                            width,
                            height
                        ]
                    },
                    {
                        property: "drawImage",
                        // draws (semi-transparent) image
                        args: [
                            {
                                rr_type: "ImageBitmap",
                                args: [
                                    {
                                        rr_type: "Blob",
                                        data: [
                                            {
                                                rr_type: "ArrayBuffer",
                                                base64
                                            }
                                        ],
                                        type
                                    }
                                ]
                            },
                            0,
                            0,
                            // The below args are needed if we enforce a max size, we want to
                            // retain the original size when drawing the image (which should be smaller)
                            width,
                            height
                        ]
                    }
                ]
            });
        };
        return worker;
    }
    initCanvasFPSObserver() {
        let rafId;
        if (!this.windows.length && !this.shadowDoms.size) {
            return;
        }
        const rafCallback = (timestamp)=>{
            this.takeSnapshot(timestamp, false);
            rafId = onRequestAnimationFrame(rafCallback);
        };
        rafId = onRequestAnimationFrame(rafCallback);
        this.restoreHandlers.push(()=>{
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        });
    }
    initCanvasMutationObserver(win, blockClass, blockSelector, unblockSelector) {
        const canvasContextReset = initCanvasContextObserver(win, blockClass, blockSelector, unblockSelector, false);
        const canvas2DReset = initCanvas2DMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector, unblockSelector);
        const canvasWebGL1and2Reset = initCanvasWebGLMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector, unblockSelector, this.mirror);
        this.restoreHandlers.push(()=>{
            canvasContextReset();
            canvas2DReset();
            canvasWebGL1and2Reset();
        });
    }
    /**
   * Returns all `canvas` elements that are not blocked by the given selectors. Searches all windows and shadow roots.
   */ getCanvasElements(blockClass, blockSelector, unblockSelector) {
        const matchedCanvas = [];
        const searchCanvas = (root)=>{
            root.querySelectorAll("canvas").forEach((canvas)=>{
                if (!isBlocked(canvas, blockClass, blockSelector, unblockSelector, true)) {
                    matchedCanvas.push(canvas);
                }
            });
        };
        for (const item of this.windows){
            const window2 = item.deref();
            let _document;
            try {
                _document = window2 && window2.document;
            } catch  {}
            if (_document) {
                searchCanvas(_document);
            }
        }
        for (const item of this.shadowDoms){
            const shadowRoot = item.deref();
            if (shadowRoot) {
                searchCanvas(shadowRoot);
            }
        }
        return matchedCanvas;
    }
    /**
   * Takes a snapshot of the provided canvas element, or will search all windows/shadow roots for canvases. Will self-throttle based on `options.sampling`.
   *
   * @returns `true` if the snapshot was taken, `false` if it was throttled.
   */ takeSnapshot(timestamp, isManualSnapshot, canvasElement) {
        const { sampling, blockClass, blockSelector, unblockSelector, dataURLOptions, maxCanvasSize } = this.options;
        const fps = sampling === "all" ? 2 : sampling || 2;
        const timeBetweenSnapshots = 1e3 / fps;
        const shouldThrottle = this.lastSnapshotTime && timestamp - this.lastSnapshotTime < timeBetweenSnapshots;
        if (shouldThrottle) {
            return false;
        }
        this.lastSnapshotTime = timestamp;
        const canvases = canvasElement ? [
            canvasElement
        ] : this.getCanvasElements(blockClass, blockSelector, unblockSelector);
        canvases.forEach((canvas)=>{
            const id = this.mirror.getId(canvas);
            if (!this.mirror.hasNode(canvas) || !canvas.width || !canvas.height || this.snapshotInProgressMap.get(id)) {
                return;
            }
            this.snapshotInProgressMap.set(id, true);
            if (!isManualSnapshot && [
                "webgl",
                "webgl2"
            ].includes(canvas.__context)) {
                const context = canvas.getContext(canvas.__context);
                if (context?.getContextAttributes()?.preserveDrawingBuffer === false) {
                    context.clear(context.COLOR_BUFFER_BIT);
                }
            }
            createImageBitmap(canvas).then((bitmap)=>{
                this.worker?.postMessage({
                    id,
                    bitmap,
                    width: canvas.width,
                    height: canvas.height,
                    dataURLOptions,
                    maxCanvasSize
                }, [
                    bitmap
                ]);
            }).catch((error)=>{
                callbackWrapper(()=>{
                    this.snapshotInProgressMap.delete(id);
                    throw error;
                })();
            });
        });
        return true;
    }
    startPendingCanvasMutationFlusher() {
        onRequestAnimationFrame(()=>this.flushPendingCanvasMutations());
    }
    startRAFTimestamping() {
        const setLatestRAFTimestamp = (timestamp)=>{
            this.rafStamps.latestId = timestamp;
            onRequestAnimationFrame(setLatestRAFTimestamp);
        };
        onRequestAnimationFrame(setLatestRAFTimestamp);
    }
    flushPendingCanvasMutations() {
        this.pendingCanvasMutations.forEach((_values, canvas)=>{
            const id = this.mirror.getId(canvas);
            this.flushPendingCanvasMutationFor(canvas, id);
        });
        onRequestAnimationFrame(()=>this.flushPendingCanvasMutations());
    }
    flushPendingCanvasMutationFor(canvas, id) {
        if (this.frozen || this.locked) {
            return;
        }
        const valuesWithType = this.pendingCanvasMutations.get(canvas);
        if (!valuesWithType || id === -1) return;
        const values = valuesWithType.map((value)=>{
            const { type: type2, ...rest } = value;
            return rest;
        });
        const { type } = valuesWithType[0];
        this.mutationCb({
            id,
            type,
            commands: values
        });
        this.pendingCanvasMutations.delete(canvas);
    }
}
try {
    if (Array.from([
        1
    ], (x)=>x * 2)[0] !== 2) {
        const cleanFrame = document.createElement("iframe");
        document.body.appendChild(cleanFrame);
        Array.from = cleanFrame.contentWindow?.Array.from || Array.from;
        document.body.removeChild(cleanFrame);
    }
} catch (err) {
    console.debug("Unable to override Array.from", err);
}
createMirror$2();
var n;
!function(t2) {
    t2[t2.NotStarted = 0] = "NotStarted", t2[t2.Running = 1] = "Running", t2[t2.Stopped = 2] = "Stopped";
}(n || (n = {}));
const CANVAS_QUALITY = {
    low: {
        sampling: {
            canvas: 1
        },
        dataURLOptions: {
            type: 'image/webp',
            quality: 0.25
        }
    },
    medium: {
        sampling: {
            canvas: 2
        },
        dataURLOptions: {
            type: 'image/webp',
            quality: 0.4
        }
    },
    high: {
        sampling: {
            canvas: 4
        },
        dataURLOptions: {
            type: 'image/webp',
            quality: 0.5
        }
    }
};
const INTEGRATION_NAME = 'ReplayCanvas';
const DEFAULT_MAX_CANVAS_SIZE = 1280;
/** Exported only for type safe tests. */ const _replayCanvasIntegration = (options = {})=>{
    const [maxCanvasWidth, maxCanvasHeight] = options.maxCanvasSize || [];
    const _canvasOptions = {
        quality: options.quality || 'medium',
        enableManualSnapshot: options.enableManualSnapshot,
        maxCanvasSize: [
            maxCanvasWidth ? Math.min(maxCanvasWidth, DEFAULT_MAX_CANVAS_SIZE) : DEFAULT_MAX_CANVAS_SIZE,
            maxCanvasHeight ? Math.min(maxCanvasHeight, DEFAULT_MAX_CANVAS_SIZE) : DEFAULT_MAX_CANVAS_SIZE
        ]
    };
    let currentCanvasManager;
    let canvasManagerResolve;
    const _canvasManager = new Promise((resolve)=>canvasManagerResolve = resolve);
    return {
        name: INTEGRATION_NAME,
        getOptions () {
            const { quality, enableManualSnapshot, maxCanvasSize } = _canvasOptions;
            return {
                enableManualSnapshot,
                recordCanvas: true,
                getCanvasManager: (getCanvasManagerOptions)=>{
                    const manager = new CanvasManager({
                        ...getCanvasManagerOptions,
                        enableManualSnapshot,
                        maxCanvasSize,
                        errorHandler: (err)=>{
                            try {
                                if (typeof err === 'object') {
                                    err.__rrweb__ = true;
                                }
                            } catch  {
                            // ignore errors here
                            // this can happen if the error is frozen or does not allow mutation for other reasons
                            }
                        }
                    });
                    currentCanvasManager = manager;
                    // Resolve promise on first call for backward compatibility
                    canvasManagerResolve(manager);
                    return manager;
                },
                ...CANVAS_QUALITY[quality] || CANVAS_QUALITY.medium
            };
        },
        async snapshot (canvasElement, options) {
            const canvasManager = currentCanvasManager || await _canvasManager;
            canvasManager.snapshot(canvasElement, options);
        }
    };
};
/**
 * Add this in addition to `replayIntegration()` to enable canvas recording.
 */ const replayCanvasIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_replayCanvasIntegration);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/events/events.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
} else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target);
    };
}
function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
        return defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        }
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function() {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for(var i = 1; i < arguments.length; i++)args.push(arguments[i]);
    var doError = type === 'error';
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) {
            // Note: The comments on the `throw` lines are intentional, they show
            // up in Node's output if this results in an unhandled exception.
            throw er; // Unhandled 'error' event
        }
        // At least give some kind of context to the user
        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === 'function') {
        ReflectApply(handler, this, args);
    } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for(var i = 0; i < len; ++i)ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit('newListener', type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] = prepend ? [
                listener,
                existing
            ] : [
                existing,
                listener
            ];
        // If we've already got an array, just append.
        } else if (prepend) {
            existing.unshift(listener);
        } else {
            existing.push(listener);
        }
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
};
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
};
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);
        else {
            delete events[type];
            if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
        }
    } else if (typeof list !== 'function') {
        position = -1;
        for(i = list.length - 1; i >= 0; i--){
            if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
            }
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else {
            spliceOne(list, position);
        }
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
    }
    return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this;
    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else delete events[type];
        }
        return this;
    }
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for(i = 0; i < keys.length; ++i){
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    listeners = events[type];
    if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
    } else if (listeners !== undefined) {
        // LIFO order
        for(i = listeners.length - 1; i >= 0; i--){
            this.removeListener(type, listeners[i]);
        }
    }
    return this;
};
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === 'function') return unwrap ? [
        evlistener.listener || evlistener
    ] : [
        evlistener
    ];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
    } else {
        return listenerCount.call(emitter, type);
    }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === 'function') {
            return 1;
        } else if (evlistener !== undefined) {
            return evlistener.length;
        }
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for(var i = 0; i < n; ++i)copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for(var i = 0; i < ret.length; ++i){
        ret[i] = arr[i].listener || arr[i];
    }
    return ret;
}
function once(emitter, name) {
    return new Promise(function(resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === 'function') {
                emitter.removeListener('error', errorListener);
            }
            resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, {
            once: true
        });
        if (name !== 'error') {
            addErrorHandlerIfEventEmitter(emitter, errorListener, {
                once: true
            });
        }
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
        eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
        if (flags.once) {
            emitter.once(name, listener);
        } else {
            emitter.on(name, listener);
        }
    } else if (typeof emitter.addEventListener === 'function') {
        // EventTarget does not have `error` event semantics like Node
        // EventEmitters, we do not listen for `error` events here.
        emitter.addEventListener(name, function wrapListener(arg) {
            // IE does not have builtin `{ once: true }` support so we
            // have to do it manually.
            if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
        });
    } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-array/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.parse = function(source, transform) {
    return new ArrayParser(source, transform).parse();
};
class ArrayParser {
    constructor(source, transform){
        this.source = source;
        this.transform = transform || identity;
        this.position = 0;
        this.entries = [];
        this.recorded = [];
        this.dimension = 0;
    }
    isEof() {
        return this.position >= this.source.length;
    }
    nextCharacter() {
        var character = this.source[this.position++];
        if (character === '\\') {
            return {
                value: this.source[this.position++],
                escaped: true
            };
        }
        return {
            value: character,
            escaped: false
        };
    }
    record(character) {
        this.recorded.push(character);
    }
    newEntry(includeEmpty) {
        var entry;
        if (this.recorded.length > 0 || includeEmpty) {
            entry = this.recorded.join('');
            if (entry === 'NULL' && !includeEmpty) {
                entry = null;
            }
            if (entry !== null) entry = this.transform(entry);
            this.entries.push(entry);
            this.recorded = [];
        }
    }
    consumeDimensions() {
        if (this.source[0] === '[') {
            while(!this.isEof()){
                var char = this.nextCharacter();
                if (char.value === '=') break;
            }
        }
    }
    parse(nested) {
        var character, parser, quote;
        this.consumeDimensions();
        while(!this.isEof()){
            character = this.nextCharacter();
            if (character.value === '{' && !quote) {
                this.dimension++;
                if (this.dimension > 1) {
                    parser = new ArrayParser(this.source.substr(this.position - 1), this.transform);
                    this.entries.push(parser.parse(true));
                    this.position += parser.position - 2;
                }
            } else if (character.value === '}' && !quote) {
                this.dimension--;
                if (!this.dimension) {
                    this.newEntry();
                    if (nested) return this.entries;
                }
            } else if (character.value === '"' && !character.escaped) {
                if (quote) this.newEntry(true);
                quote = !quote;
            } else if (character.value === ',' && !quote) {
                this.newEntry();
            } else {
                this.record(character.value);
            }
        }
        if (this.dimension !== 0) {
            throw new Error('array dimension not balanced');
        }
        return this.entries;
    }
}
function identity(value) {
    return value;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/arrayParser.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var array = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-array/index.js [client] (ecmascript)");
module.exports = {
    create: function(source, transform) {
        return {
            parse: function() {
                return array.parse(source, transform);
            }
        };
    }
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/textParsers.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var array = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-array/index.js [client] (ecmascript)");
var arrayParser = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/arrayParser.js [client] (ecmascript)");
var parseDate = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-date/index.js [client] (ecmascript)");
var parseInterval = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-interval/index.js [client] (ecmascript)");
var parseByteA = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-bytea/index.js [client] (ecmascript)");
function allowNull(fn) {
    return function nullAllowed(value) {
        if (value === null) return value;
        return fn(value);
    };
}
function parseBool(value) {
    if (value === null) return value;
    return value === 'TRUE' || value === 't' || value === 'true' || value === 'y' || value === 'yes' || value === 'on' || value === '1';
}
function parseBoolArray(value) {
    if (!value) return null;
    return array.parse(value, parseBool);
}
function parseBaseTenInt(string) {
    return parseInt(string, 10);
}
function parseIntegerArray(value) {
    if (!value) return null;
    return array.parse(value, allowNull(parseBaseTenInt));
}
function parseBigIntegerArray(value) {
    if (!value) return null;
    return array.parse(value, allowNull(function(entry) {
        return parseBigInteger(entry).trim();
    }));
}
var parsePointArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
            entry = parsePoint(entry);
        }
        return entry;
    });
    return p.parse();
};
var parseFloatArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
            entry = parseFloat(entry);
        }
        return entry;
    });
    return p.parse();
};
var parseStringArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value);
    return p.parse();
};
var parseDateArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
            entry = parseDate(entry);
        }
        return entry;
    });
    return p.parse();
};
var parseIntervalArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
            entry = parseInterval(entry);
        }
        return entry;
    });
    return p.parse();
};
var parseByteAArray = function(value) {
    if (!value) {
        return null;
    }
    return array.parse(value, allowNull(parseByteA));
};
var parseInteger = function(value) {
    return parseInt(value, 10);
};
var parseBigInteger = function(value) {
    var valStr = String(value);
    if (/^\d+$/.test(valStr)) {
        return valStr;
    }
    return value;
};
var parseJsonArray = function(value) {
    if (!value) {
        return null;
    }
    return array.parse(value, allowNull(JSON.parse));
};
var parsePoint = function(value) {
    if (value[0] !== '(') {
        return null;
    }
    value = value.substring(1, value.length - 1).split(',');
    return {
        x: parseFloat(value[0]),
        y: parseFloat(value[1])
    };
};
var parseCircle = function(value) {
    if (value[0] !== '<' && value[1] !== '(') {
        return null;
    }
    var point = '(';
    var radius = '';
    var pointParsed = false;
    for(var i = 2; i < value.length - 1; i++){
        if (!pointParsed) {
            point += value[i];
        }
        if (value[i] === ')') {
            pointParsed = true;
            continue;
        } else if (!pointParsed) {
            continue;
        }
        if (value[i] === ',') {
            continue;
        }
        radius += value[i];
    }
    var result = parsePoint(point);
    result.radius = parseFloat(radius);
    return result;
};
var init = function(register) {
    register(20, parseBigInteger); // int8
    register(21, parseInteger); // int2
    register(23, parseInteger); // int4
    register(26, parseInteger); // oid
    register(700, parseFloat); // float4/real
    register(701, parseFloat); // float8/double
    register(16, parseBool);
    register(1082, parseDate); // date
    register(1114, parseDate); // timestamp without timezone
    register(1184, parseDate); // timestamp
    register(600, parsePoint); // point
    register(651, parseStringArray); // cidr[]
    register(718, parseCircle); // circle
    register(1000, parseBoolArray);
    register(1001, parseByteAArray);
    register(1005, parseIntegerArray); // _int2
    register(1007, parseIntegerArray); // _int4
    register(1028, parseIntegerArray); // oid[]
    register(1016, parseBigIntegerArray); // _int8
    register(1017, parsePointArray); // point[]
    register(1021, parseFloatArray); // _float4
    register(1022, parseFloatArray); // _float8
    register(1231, parseFloatArray); // _numeric
    register(1014, parseStringArray); //char
    register(1015, parseStringArray); //varchar
    register(1008, parseStringArray);
    register(1009, parseStringArray);
    register(1040, parseStringArray); // macaddr[]
    register(1041, parseStringArray); // inet[]
    register(1115, parseDateArray); // timestamp without time zone[]
    register(1182, parseDateArray); // _date
    register(1185, parseDateArray); // timestamp with time zone[]
    register(1186, parseInterval);
    register(1187, parseIntervalArray);
    register(17, parseByteA);
    register(114, JSON.parse.bind(JSON)); // json
    register(3802, JSON.parse.bind(JSON)); // jsonb
    register(199, parseJsonArray); // json[]
    register(3807, parseJsonArray); // jsonb[]
    register(3907, parseStringArray); // numrange[]
    register(2951, parseStringArray); // uuid[]
    register(791, parseStringArray); // money[]
    register(1183, parseStringArray); // time[]
    register(1270, parseStringArray); // timetz[]
};
module.exports = {
    init: init
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/binaryParsers.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var parseInt64 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-int8/index.js [client] (ecmascript)");
var parseBits = function(data, bits, offset, invert, callback) {
    offset = offset || 0;
    invert = invert || false;
    callback = callback || function(lastValue, newValue, bits) {
        return lastValue * Math.pow(2, bits) + newValue;
    };
    var offsetBytes = offset >> 3;
    var inv = function(value) {
        if (invert) {
            return ~value & 0xff;
        }
        return value;
    };
    // read first (maybe partial) byte
    var mask = 0xff;
    var firstBits = 8 - offset % 8;
    if (bits < firstBits) {
        mask = 0xff << 8 - bits & 0xff;
        firstBits = bits;
    }
    if (offset) {
        mask = mask >> offset % 8;
    }
    var result = 0;
    if (offset % 8 + bits >= 8) {
        result = callback(0, inv(data[offsetBytes]) & mask, firstBits);
    }
    // read bytes
    var bytes = bits + offset >> 3;
    for(var i = offsetBytes + 1; i < bytes; i++){
        result = callback(result, inv(data[i]), 8);
    }
    // bits to read, that are not a complete byte
    var lastBits = (bits + offset) % 8;
    if (lastBits > 0) {
        result = callback(result, inv(data[bytes]) >> 8 - lastBits, lastBits);
    }
    return result;
};
var parseFloatFromBits = function(data, precisionBits, exponentBits) {
    var bias = Math.pow(2, exponentBits - 1) - 1;
    var sign = parseBits(data, 1);
    var exponent = parseBits(data, exponentBits, 1);
    if (exponent === 0) {
        return 0;
    }
    // parse mantissa
    var precisionBitsCounter = 1;
    var parsePrecisionBits = function(lastValue, newValue, bits) {
        if (lastValue === 0) {
            lastValue = 1;
        }
        for(var i = 1; i <= bits; i++){
            precisionBitsCounter /= 2;
            if ((newValue & 0x1 << bits - i) > 0) {
                lastValue += precisionBitsCounter;
            }
        }
        return lastValue;
    };
    var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
    // special cases
    if (exponent == Math.pow(2, exponentBits + 1) - 1) {
        if (mantissa === 0) {
            return sign === 0 ? Infinity : -Infinity;
        }
        return NaN;
    }
    // normale number
    return (sign === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
};
var parseInt16 = function(value) {
    if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 15, 1, true) + 1);
    }
    return parseBits(value, 15, 1);
};
var parseInt32 = function(value) {
    if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 31, 1, true) + 1);
    }
    return parseBits(value, 31, 1);
};
var parseFloat32 = function(value) {
    return parseFloatFromBits(value, 23, 8);
};
var parseFloat64 = function(value) {
    return parseFloatFromBits(value, 52, 11);
};
var parseNumeric = function(value) {
    var sign = parseBits(value, 16, 32);
    if (sign == 0xc000) {
        return NaN;
    }
    var weight = Math.pow(10000, parseBits(value, 16, 16));
    var result = 0;
    var digits = [];
    var ndigits = parseBits(value, 16);
    for(var i = 0; i < ndigits; i++){
        result += parseBits(value, 16, 64 + 16 * i) * weight;
        weight /= 10000;
    }
    var scale = Math.pow(10, parseBits(value, 16, 48));
    return (sign === 0 ? 1 : -1) * Math.round(result * scale) / scale;
};
var parseDate = function(isUTC, value) {
    var sign = parseBits(value, 1);
    var rawValue = parseBits(value, 63, 1);
    // discard usecs and shift from 2000 to 1970
    var result = new Date((sign === 0 ? 1 : -1) * rawValue / 1000 + 946684800000);
    if (!isUTC) {
        result.setTime(result.getTime() + result.getTimezoneOffset() * 60000);
    }
    // add microseconds to the date
    result.usec = rawValue % 1000;
    result.getMicroSeconds = function() {
        return this.usec;
    };
    result.setMicroSeconds = function(value) {
        this.usec = value;
    };
    result.getUTCMicroSeconds = function() {
        return this.usec;
    };
    return result;
};
var parseArray = function(value) {
    var dim = parseBits(value, 32);
    var flags = parseBits(value, 32, 32);
    var elementType = parseBits(value, 32, 64);
    var offset = 96;
    var dims = [];
    for(var i = 0; i < dim; i++){
        // parse dimension
        dims[i] = parseBits(value, 32, offset);
        offset += 32;
        // ignore lower bounds
        offset += 32;
    }
    var parseElement = function(elementType) {
        // parse content length
        var length = parseBits(value, 32, offset);
        offset += 32;
        // parse null values
        if (length == 0xffffffff) {
            return null;
        }
        var result;
        if (elementType == 0x17 || elementType == 0x14) {
            // int/bigint
            result = parseBits(value, length * 8, offset);
            offset += length * 8;
            return result;
        } else if (elementType == 0x19) {
            // string
            result = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
            return result;
        } else {
            console.log("ERROR: ElementType not implemented: " + elementType);
        }
    };
    var parse = function(dimension, elementType) {
        var array = [];
        var i;
        if (dimension.length > 1) {
            var count = dimension.shift();
            for(i = 0; i < count; i++){
                array[i] = parse(dimension, elementType);
            }
            dimension.unshift(count);
        } else {
            for(i = 0; i < dimension[0]; i++){
                array[i] = parseElement(elementType);
            }
        }
        return array;
    };
    return parse(dims, elementType);
};
var parseText = function(value) {
    return value.toString('utf8');
};
var parseBool = function(value) {
    if (value === null) return null;
    return parseBits(value, 8) > 0;
};
var init = function(register) {
    register(20, parseInt64);
    register(21, parseInt16);
    register(23, parseInt32);
    register(26, parseInt32);
    register(1700, parseNumeric);
    register(700, parseFloat32);
    register(701, parseFloat64);
    register(16, parseBool);
    register(1114, parseDate.bind(null, false));
    register(1184, parseDate.bind(null, true));
    register(1000, parseArray);
    register(1007, parseArray);
    register(1016, parseArray);
    register(1008, parseArray);
    register(1009, parseArray);
    register(25, parseText);
};
module.exports = {
    init: init
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/builtins.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Following query was used to generate this file:

 SELECT json_object_agg(UPPER(PT.typname), PT.oid::int4 ORDER BY pt.oid)
 FROM pg_type PT
 WHERE typnamespace = (SELECT pgn.oid FROM pg_namespace pgn WHERE nspname = 'pg_catalog') -- Take only builting Postgres types with stable OID (extension types are not guaranted to be stable)
 AND typtype = 'b' -- Only basic types
 AND typelem = 0 -- Ignore aliases
 AND typisdefined -- Ignore undefined types
 */ module.exports = {
    BOOL: 16,
    BYTEA: 17,
    CHAR: 18,
    INT8: 20,
    INT2: 21,
    INT4: 23,
    REGPROC: 24,
    TEXT: 25,
    OID: 26,
    TID: 27,
    XID: 28,
    CID: 29,
    JSON: 114,
    XML: 142,
    PG_NODE_TREE: 194,
    SMGR: 210,
    PATH: 602,
    POLYGON: 604,
    CIDR: 650,
    FLOAT4: 700,
    FLOAT8: 701,
    ABSTIME: 702,
    RELTIME: 703,
    TINTERVAL: 704,
    CIRCLE: 718,
    MACADDR8: 774,
    MONEY: 790,
    MACADDR: 829,
    INET: 869,
    ACLITEM: 1033,
    BPCHAR: 1042,
    VARCHAR: 1043,
    DATE: 1082,
    TIME: 1083,
    TIMESTAMP: 1114,
    TIMESTAMPTZ: 1184,
    INTERVAL: 1186,
    TIMETZ: 1266,
    BIT: 1560,
    VARBIT: 1562,
    NUMERIC: 1700,
    REFCURSOR: 1790,
    REGPROCEDURE: 2202,
    REGOPER: 2203,
    REGOPERATOR: 2204,
    REGCLASS: 2205,
    REGTYPE: 2206,
    UUID: 2950,
    TXID_SNAPSHOT: 2970,
    PG_LSN: 3220,
    PG_NDISTINCT: 3361,
    PG_DEPENDENCIES: 3402,
    TSVECTOR: 3614,
    TSQUERY: 3615,
    GTSVECTOR: 3642,
    REGCONFIG: 3734,
    REGDICTIONARY: 3769,
    JSONB: 3802,
    REGNAMESPACE: 4089,
    REGROLE: 4096
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var textParsers = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/textParsers.js [client] (ecmascript)");
var binaryParsers = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/binaryParsers.js [client] (ecmascript)");
var arrayParser = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/arrayParser.js [client] (ecmascript)");
var builtinTypes = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/builtins.js [client] (ecmascript)");
exports.getTypeParser = getTypeParser;
exports.setTypeParser = setTypeParser;
exports.arrayParser = arrayParser;
exports.builtins = builtinTypes;
var typeParsers = {
    text: {},
    binary: {}
};
//the empty parse function
function noParse(val) {
    return String(val);
}
;
//returns a function used to convert a specific type (specified by
//oid) into a result javascript type
//note: the oid can be obtained via the following sql query:
//SELECT oid FROM pg_type WHERE typname = 'TYPE_NAME_HERE';
function getTypeParser(oid, format) {
    format = format || 'text';
    if (!typeParsers[format]) {
        return noParse;
    }
    return typeParsers[format][oid] || noParse;
}
;
function setTypeParser(oid, format, parseFn) {
    if (typeof format == 'function') {
        parseFn = format;
        format = 'text';
    }
    typeParsers[format][oid] = parseFn;
}
;
textParsers.init(function(oid, converter) {
    typeParsers.text[oid] = converter;
});
binaryParsers.init(function(oid, converter) {
    typeParsers.binary[oid] = converter;
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-date/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
var INFINITY = /^-?infinity$/;
module.exports = function parseDate(isoDate) {
    if (INFINITY.test(isoDate)) {
        // Capitalize to Infinity before passing to Number
        return Number(isoDate.replace('i', 'I'));
    }
    var matches = DATE_TIME.exec(isoDate);
    if (!matches) {
        // Force YYYY-MM-DD dates to be parsed as local time
        return getDate(isoDate) || null;
    }
    var isBC = !!matches[8];
    var year = parseInt(matches[1], 10);
    if (isBC) {
        year = bcYearToNegativeYear(year);
    }
    var month = parseInt(matches[2], 10) - 1;
    var day = matches[3];
    var hour = parseInt(matches[4], 10);
    var minute = parseInt(matches[5], 10);
    var second = parseInt(matches[6], 10);
    var ms = matches[7];
    ms = ms ? 1000 * parseFloat(ms) : 0;
    var date;
    var offset = timeZoneOffset(isoDate);
    if (offset != null) {
        date = new Date(Date.UTC(year, month, day, hour, minute, second, ms));
        // Account for years from 0 to 99 being interpreted as 1900-1999
        // by Date.UTC / the multi-argument form of the Date constructor
        if (is0To99(year)) {
            date.setUTCFullYear(year);
        }
        if (offset !== 0) {
            date.setTime(date.getTime() - offset);
        }
    } else {
        date = new Date(year, month, day, hour, minute, second, ms);
        if (is0To99(year)) {
            date.setFullYear(year);
        }
    }
    return date;
};
function getDate(isoDate) {
    var matches = DATE.exec(isoDate);
    if (!matches) {
        return;
    }
    var year = parseInt(matches[1], 10);
    var isBC = !!matches[4];
    if (isBC) {
        year = bcYearToNegativeYear(year);
    }
    var month = parseInt(matches[2], 10) - 1;
    var day = matches[3];
    // YYYY-MM-DD will be parsed as local time
    var date = new Date(year, month, day);
    if (is0To99(year)) {
        date.setFullYear(year);
    }
    return date;
}
// match timezones:
// Z (UTC)
// -05
// +06:30
function timeZoneOffset(isoDate) {
    if (isoDate.endsWith('+00')) {
        return 0;
    }
    var zone = TIME_ZONE.exec(isoDate.split(' ')[1]);
    if (!zone) return;
    var type = zone[1];
    if (type === 'Z') {
        return 0;
    }
    var sign = type === '-' ? -1 : 1;
    var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
    return offset * sign * 1000;
}
function bcYearToNegativeYear(year) {
    // Account for numerical difference between representations of BC years
    // See: https://github.com/bendrucker/postgres-date/issues/5
    return -(year - 1);
}
function is0To99(num) {
    return num >= 0 && num < 100;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/xtend/mutable.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function extend(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i];
        for(var key in source){
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-interval/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var extend = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/xtend/mutable.js [client] (ecmascript)");
module.exports = PostgresInterval;
function PostgresInterval(raw) {
    if (!(this instanceof PostgresInterval)) {
        return new PostgresInterval(raw);
    }
    extend(this, parse(raw));
}
var properties = [
    'seconds',
    'minutes',
    'hours',
    'days',
    'months',
    'years'
];
PostgresInterval.prototype.toPostgres = function() {
    var filtered = properties.filter(this.hasOwnProperty, this);
    // In addition to `properties`, we need to account for fractions of seconds.
    if (this.milliseconds && filtered.indexOf('seconds') < 0) {
        filtered.push('seconds');
    }
    if (filtered.length === 0) return '0';
    return filtered.map(function(property) {
        var value = this[property] || 0;
        // Account for fractional part of seconds,
        // remove trailing zeroes.
        if (property === 'seconds' && this.milliseconds) {
            value = (value + this.milliseconds / 1000).toFixed(6).replace(/\.?0+$/, '');
        }
        return value + ' ' + property;
    }, this).join(' ');
};
var propertiesISOEquivalent = {
    years: 'Y',
    months: 'M',
    days: 'D',
    hours: 'H',
    minutes: 'M',
    seconds: 'S'
};
var dateProperties = [
    'years',
    'months',
    'days'
];
var timeProperties = [
    'hours',
    'minutes',
    'seconds'
];
// according to ISO 8601
PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
    var datePart = dateProperties.map(buildProperty, this).join('');
    var timePart = timeProperties.map(buildProperty, this).join('');
    return 'P' + datePart + 'T' + timePart;
    //TURBOPACK unreachable
    ;
    function buildProperty(property) {
        var value = this[property] || 0;
        // Account for fractional part of seconds,
        // remove trailing zeroes.
        if (property === 'seconds' && this.milliseconds) {
            value = (value + this.milliseconds / 1000).toFixed(6).replace(/0+$/, '');
        }
        return value + propertiesISOEquivalent[property];
    }
};
var NUMBER = '([+-]?\\d+)';
var YEAR = NUMBER + '\\s+years?';
var MONTH = NUMBER + '\\s+mons?';
var DAY = NUMBER + '\\s+days?';
var TIME = '([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?';
var INTERVAL = new RegExp([
    YEAR,
    MONTH,
    DAY,
    TIME
].map(function(regexString) {
    return '(' + regexString + ')?';
}).join('\\s*'));
// Positions of values in regex match
var positions = {
    years: 2,
    months: 4,
    days: 6,
    hours: 9,
    minutes: 10,
    seconds: 11,
    milliseconds: 12
};
// We can use negative time
var negatives = [
    'hours',
    'minutes',
    'seconds',
    'milliseconds'
];
function parseMilliseconds(fraction) {
    // add omitted zeroes
    var microseconds = fraction + '000000'.slice(fraction.length);
    return parseInt(microseconds, 10) / 1000;
}
function parse(interval) {
    if (!interval) return {};
    var matches = INTERVAL.exec(interval);
    var isNegative = matches[8] === '-';
    return Object.keys(positions).reduce(function(parsed, property) {
        var position = positions[property];
        var value = matches[position];
        // no empty string
        if (!value) return parsed;
        // milliseconds are actually microseconds (up to 6 digits)
        // with omitted trailing zeroes.
        value = property === 'milliseconds' ? parseMilliseconds(value) : parseInt(value, 10);
        // no zeros
        if (!value) return parsed;
        if (isNegative && ~negatives.indexOf(property)) {
            value *= -1;
        }
        parsed[property] = value;
        return parsed;
    }, {});
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-bytea/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
'use strict';
var bufferFrom = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"];
module.exports = function parseBytea(input) {
    if (/^\\x/.test(input)) {
        // new 'hex' style response (pg >9.0)
        return bufferFrom(input.substr(2), 'hex');
    }
    var output = '';
    var i = 0;
    while(i < input.length){
        if (input[i] !== '\\') {
            output += input[i];
            ++i;
        } else {
            if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
                output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
                i += 4;
            } else {
                var backslashes = 1;
                while(i + backslashes < input.length && input[i + backslashes] === '\\'){
                    backslashes++;
                }
                for(var k = 0; k < Math.floor(backslashes / 2); ++k){
                    output += '\\';
                }
                i += Math.floor(backslashes / 2) * 2;
            }
        }
    }
    return bufferFrom(output, 'binary');
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-int8/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// selected so (BASE - 1) * 0x100000000 + 0xffffffff is a safe integer
var BASE = 1000000;
function readInt8(buffer) {
    var high = buffer.readInt32BE(0);
    var low = buffer.readUInt32BE(4);
    var sign = '';
    if (high < 0) {
        high = ~high + (low === 0);
        low = ~low + 1 >>> 0;
        sign = '-';
    }
    var result = '';
    var carry;
    var t;
    var digits;
    var pad;
    var l;
    var i;
    {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 0x100000000 * carry + low;
        low = t / BASE >>> 0;
        digits = '' + (t - BASE * low);
        if (low === 0 && high === 0) {
            return sign + digits + result;
        }
        pad = '';
        l = 6 - digits.length;
        for(i = 0; i < l; i++){
            pad += '0';
        }
        result = pad + digits + result;
    }
    {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 0x100000000 * carry + low;
        low = t / BASE >>> 0;
        digits = '' + (t - BASE * low);
        if (low === 0 && high === 0) {
            return sign + digits + result;
        }
        pad = '';
        l = 6 - digits.length;
        for(i = 0; i < l; i++){
            pad += '0';
        }
        result = pad + digits + result;
    }
    {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 0x100000000 * carry + low;
        low = t / BASE >>> 0;
        digits = '' + (t - BASE * low);
        if (low === 0 && high === 0) {
            return sign + digits + result;
        }
        pad = '';
        l = 6 - digits.length;
        for(i = 0; i < l; i++){
            pad += '0';
        }
        result = pad + digits + result;
    }
    {
        carry = high % BASE;
        t = 0x100000000 * carry + low;
        digits = '' + t % BASE;
        return sign + digits + result;
    }
}
module.exports = readInt8;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
let user;
try {
    user = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.USER;
} catch  {
// ignore, e.g., Deno without --allow-env
}
module.exports = {
    // database host. defaults to localhost
    host: 'localhost',
    // database user's name
    user,
    // name of database to connect
    database: undefined,
    // database user's password
    password: null,
    // a Postgres connection string to be used instead of setting individual connection items
    // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
    // in the defaults object.
    connectionString: undefined,
    // database port
    port: 5432,
    // number of rows to return at a time from a prepared statement's
    // portal. 0 will return all rows at once
    rows: 0,
    // binary result mode
    binary: false,
    // Connection pool options - see https://github.com/brianc/node-pg-pool
    // number of connections to use in connection pool
    // 0 will disable connection pooling
    max: 10,
    // max milliseconds a client can go unused before it is removed
    // from the pool and destroyed
    idleTimeoutMillis: 30000,
    client_encoding: '',
    ssl: false,
    application_name: undefined,
    fallback_application_name: undefined,
    options: undefined,
    parseInputDatesAsUTC: false,
    // max milliseconds any query using this connection will execute for before timing out in error.
    // false=unlimited
    statement_timeout: false,
    // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
    // false=unlimited
    lock_timeout: false,
    // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
    // false=unlimited
    idle_in_transaction_session_timeout: false,
    // max milliseconds to wait for query to complete (client side)
    query_timeout: false,
    connect_timeout: 0,
    keepalives: 1,
    keepalives_idle: 0
};
const pgTypes = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [client] (ecmascript)");
// save default parsers
const parseBigInteger = pgTypes.getTypeParser(20, 'text');
const parseBigIntegerArray = pgTypes.getTypeParser(1016, 'text');
// parse int8 so you can get your count values as actual numbers
module.exports.__defineSetter__('parseInt8', function(val) {
    pgTypes.setTypeParser(20, 'text', val ? pgTypes.getTypeParser(23, 'text') : parseBigInteger);
    pgTypes.setTypeParser(1016, 'text', val ? pgTypes.getTypeParser(1007, 'text') : parseBigIntegerArray);
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
'use strict';
const defaults = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [client] (ecmascript)");
const util = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/util/util.js [client] (ecmascript)");
const { isDate } = util.types || util // Node 8 doesn't have `util.types`
;
function escapeElement(elementRepresentation) {
    const escaped = elementRepresentation.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return '"' + escaped + '"';
}
// convert a JS array to a postgres array literal
// uses comma separator so won't work for types like box that use
// a different array separator.
function arrayString(val) {
    let result = '{';
    for(let i = 0; i < val.length; i++){
        if (i > 0) {
            result = result + ',';
        }
        if (val[i] === null || typeof val[i] === 'undefined') {
            result = result + 'NULL';
        } else if (Array.isArray(val[i])) {
            result = result + arrayString(val[i]);
        } else if (ArrayBuffer.isView(val[i])) {
            let item = val[i];
            if (!(item instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"])) {
                const buf = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(item.buffer, item.byteOffset, item.byteLength);
                if (buf.length === item.byteLength) {
                    item = buf;
                } else {
                    item = buf.slice(item.byteOffset, item.byteOffset + item.byteLength);
                }
            }
            result += '\\\\x' + item.toString('hex');
        } else {
            result += escapeElement(prepareValue(val[i]));
        }
    }
    result = result + '}';
    return result;
}
// converts values from javascript types
// to their 'raw' counterparts for use as a postgres parameter
// note: you can override this function to provide your own conversion mechanism
// for complex types, etc...
const prepareValue = function(val, seen) {
    // null and undefined are both null for postgres
    if (val == null) {
        return null;
    }
    if (typeof val === 'object') {
        if (val instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"]) {
            return val;
        }
        if (ArrayBuffer.isView(val)) {
            const buf = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(val.buffer, val.byteOffset, val.byteLength);
            if (buf.length === val.byteLength) {
                return buf;
            }
            return buf.slice(val.byteOffset, val.byteOffset + val.byteLength) // Node.js v4 does not support those Buffer.from params
            ;
        }
        if (isDate(val)) {
            if (defaults.parseInputDatesAsUTC) {
                return dateToStringUTC(val);
            } else {
                return dateToString(val);
            }
        }
        if (Array.isArray(val)) {
            return arrayString(val);
        }
        return prepareObject(val, seen);
    }
    return val.toString();
};
function prepareObject(val, seen) {
    if (val && typeof val.toPostgres === 'function') {
        seen = seen || [];
        if (seen.indexOf(val) !== -1) {
            throw new Error('circular reference detected while preparing "' + val + '" for query');
        }
        seen.push(val);
        return prepareValue(val.toPostgres(prepareValue), seen);
    }
    return JSON.stringify(val);
}
function dateToString(date) {
    let offset = -date.getTimezoneOffset();
    let year = date.getFullYear();
    const isBCYear = year < 1;
    if (isBCYear) year = Math.abs(year) + 1; // negative years are 1 off their BC representation
    let ret = String(year).padStart(4, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0') + 'T' + String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0') + '.' + String(date.getMilliseconds()).padStart(3, '0');
    if (offset < 0) {
        ret += '-';
        offset *= -1;
    } else {
        ret += '+';
    }
    ret += String(Math.floor(offset / 60)).padStart(2, '0') + ':' + String(offset % 60).padStart(2, '0');
    if (isBCYear) ret += ' BC';
    return ret;
}
function dateToStringUTC(date) {
    let year = date.getUTCFullYear();
    const isBCYear = year < 1;
    if (isBCYear) year = Math.abs(year) + 1; // negative years are 1 off their BC representation
    let ret = String(year).padStart(4, '0') + '-' + String(date.getUTCMonth() + 1).padStart(2, '0') + '-' + String(date.getUTCDate()).padStart(2, '0') + 'T' + String(date.getUTCHours()).padStart(2, '0') + ':' + String(date.getUTCMinutes()).padStart(2, '0') + ':' + String(date.getUTCSeconds()).padStart(2, '0') + '.' + String(date.getUTCMilliseconds()).padStart(3, '0');
    ret += '+00:00';
    if (isBCYear) ret += ' BC';
    return ret;
}
function normalizeQueryConfig(config, values, callback) {
    // can take in strings or config objects
    config = typeof config === 'string' ? {
        text: config
    } : config;
    if (values) {
        if (typeof values === 'function') {
            config.callback = values;
        } else {
            config.values = values;
        }
    }
    if (callback) {
        config.callback = callback;
    }
    return config;
}
// Ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c
const escapeIdentifier = function(str) {
    return '"' + str.replace(/"/g, '""') + '"';
};
const escapeLiteral = function(str) {
    let hasBackslash = false;
    let escaped = "'";
    if (str == null) {
        return "''";
    }
    if (typeof str !== 'string') {
        return "''";
    }
    for(let i = 0; i < str.length; i++){
        const c = str[i];
        if (c === "'") {
            escaped += c + c;
        } else if (c === '\\') {
            escaped += c + c;
            hasBackslash = true;
        } else {
            escaped += c;
        }
    }
    escaped += "'";
    if (hasBackslash === true) {
        escaped = ' E' + escaped;
    }
    return escaped;
};
module.exports = {
    prepareValue: function prepareValueWrapper(value) {
        // this ensures that extra arguments do not get passed into prepareValue
        // by accident, eg: from calling values.map(utils.prepareValue)
        return prepareValue(value);
    },
    normalizeQueryConfig,
    escapeIdentifier,
    escapeLiteral
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils-webcrypto.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
const nodeCrypto = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/crypto-browserify/index.js [client] (ecmascript)");
module.exports = {
    postgresMd5PasswordHash,
    randomBytes,
    deriveKey,
    sha256,
    hashByName,
    hmacSha256,
    md5
};
/**
 * The Web Crypto API - grabbed from the Node.js library or the global
 * @type Crypto
 */ // eslint-disable-next-line no-undef
const webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
/**
 * The SubtleCrypto API for low level crypto operations.
 * @type SubtleCrypto
 */ const subtleCrypto = webCrypto.subtle;
const textEncoder = new TextEncoder();
/**
 *
 * @param {*} length
 * @returns
 */ function randomBytes(length) {
    return webCrypto.getRandomValues(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].alloc(length));
}
async function md5(string) {
    try {
        return nodeCrypto.createHash('md5').update(string, 'utf-8').digest('hex');
    } catch (e) {
        // `createHash()` failed so we are probably not in Node.js, use the WebCrypto API instead.
        // Note that the MD5 algorithm on WebCrypto is not available in Node.js.
        // This is why we cannot just use WebCrypto in all environments.
        const data = typeof string === 'string' ? textEncoder.encode(string) : string;
        const hash = await subtleCrypto.digest('MD5', data);
        return Array.from(new Uint8Array(hash)).map((b)=>b.toString(16).padStart(2, '0')).join('');
    }
}
// See AuthenticationMD5Password at https://www.postgresql.org/docs/current/static/protocol-flow.html
async function postgresMd5PasswordHash(user, password, salt) {
    const inner = await md5(password + user);
    const outer = await md5(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].concat([
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(inner),
        salt
    ]));
    return 'md5' + outer;
}
/**
 * Create a SHA-256 digest of the given data
 * @param {Buffer} data
 */ async function sha256(text) {
    return await subtleCrypto.digest('SHA-256', text);
}
async function hashByName(hashName, text) {
    return await subtleCrypto.digest(hashName, text);
}
/**
 * Sign the message with the given key
 * @param {ArrayBuffer} keyBuffer
 * @param {string} msg
 */ async function hmacSha256(keyBuffer, msg) {
    const key = await subtleCrypto.importKey('raw', keyBuffer, {
        name: 'HMAC',
        hash: 'SHA-256'
    }, false, [
        'sign'
    ]);
    return await subtleCrypto.sign('HMAC', key, textEncoder.encode(msg));
}
/**
 * Derive a key from the password and salt
 * @param {string} password
 * @param {Uint8Array} salt
 * @param {number} iterations
 */ async function deriveKey(password, salt, iterations) {
    const key = await subtleCrypto.importKey('raw', textEncoder.encode(password), 'PBKDF2', false, [
        'deriveBits'
    ]);
    const params = {
        name: 'PBKDF2',
        hash: 'SHA-256',
        salt: salt,
        iterations: iterations
    };
    return await subtleCrypto.deriveBits(params, key, 32 * 8, [
        'deriveBits'
    ]);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils-legacy.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
'use strict';
// This file contains crypto utility functions for versions of Node.js < 15.0.0,
// which does not support the WebCrypto.subtle API.
const nodeCrypto = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/crypto-browserify/index.js [client] (ecmascript)");
function md5(string) {
    return nodeCrypto.createHash('md5').update(string, 'utf-8').digest('hex');
}
// See AuthenticationMD5Password at https://www.postgresql.org/docs/current/static/protocol-flow.html
function postgresMd5PasswordHash(user, password, salt) {
    const inner = md5(password + user);
    const outer = md5(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].concat([
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(inner),
        salt
    ]));
    return 'md5' + outer;
}
function sha256(text) {
    return nodeCrypto.createHash('sha256').update(text).digest();
}
function hashByName(hashName, text) {
    hashName = hashName.replace(/(\D)-/, '$1'); // e.g. SHA-256 -> SHA256
    return nodeCrypto.createHash(hashName).update(text).digest();
}
function hmacSha256(key, msg) {
    return nodeCrypto.createHmac('sha256', key).update(msg).digest();
}
async function deriveKey(password, salt, iterations) {
    return nodeCrypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
}
module.exports = {
    postgresMd5PasswordHash,
    randomBytes: nodeCrypto.randomBytes,
    deriveKey,
    sha256,
    hashByName,
    hmacSha256,
    md5
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
const useLegacyCrypto = parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].versions && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].versions.node && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].versions.node.split('.')[0]) < 15;
if (useLegacyCrypto) {
    // We are on an old version of Node.js that requires legacy crypto utilities.
    module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils-legacy.js [client] (ecmascript)");
} else {
    module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils-webcrypto.js [client] (ecmascript)");
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/cert-signatures.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function x509Error(msg, cert) {
    return new Error('SASL channel binding: ' + msg + ' when parsing public certificate ' + cert.toString('base64'));
}
function readASN1Length(data, index) {
    let length = data[index++];
    if (length < 0x80) return {
        length,
        index
    };
    const lengthBytes = length & 0x7f;
    if (lengthBytes > 4) throw x509Error('bad length', data);
    length = 0;
    for(let i = 0; i < lengthBytes; i++){
        length = length << 8 | data[index++];
    }
    return {
        length,
        index
    };
}
function readASN1OID(data, index) {
    if (data[index++] !== 0x6) throw x509Error('non-OID data', data) // 6 = OID
    ;
    const { length: OIDLength, index: indexAfterOIDLength } = readASN1Length(data, index);
    index = indexAfterOIDLength;
    const lastIndex = index + OIDLength;
    const byte1 = data[index++];
    let oid = (byte1 / 40 >> 0) + '.' + byte1 % 40;
    while(index < lastIndex){
        // loop over numbers in OID
        let value = 0;
        while(index < lastIndex){
            // loop over bytes in number
            const nextByte = data[index++];
            value = value << 7 | nextByte & 0x7f;
            if (nextByte < 0x80) break;
        }
        oid += '.' + value;
    }
    return {
        oid,
        index
    };
}
function expectASN1Seq(data, index) {
    if (data[index++] !== 0x30) throw x509Error('non-sequence data', data) // 30 = Sequence
    ;
    return readASN1Length(data, index);
}
function signatureAlgorithmHashFromCertificate(data, index) {
    // read this thread: https://www.postgresql.org/message-id/17760-b6c61e752ec07060%40postgresql.org
    if (index === undefined) index = 0;
    index = expectASN1Seq(data, index).index;
    const { length: certInfoLength, index: indexAfterCertInfoLength } = expectASN1Seq(data, index);
    index = indexAfterCertInfoLength + certInfoLength; // skip over certificate info
    index = expectASN1Seq(data, index).index; // skip over signature length field
    const { oid, index: indexAfterOID } = readASN1OID(data, index);
    switch(oid){
        // RSA
        case '1.2.840.113549.1.1.4':
            return 'MD5';
        case '1.2.840.113549.1.1.5':
            return 'SHA-1';
        case '1.2.840.113549.1.1.11':
            return 'SHA-256';
        case '1.2.840.113549.1.1.12':
            return 'SHA-384';
        case '1.2.840.113549.1.1.13':
            return 'SHA-512';
        case '1.2.840.113549.1.1.14':
            return 'SHA-224';
        case '1.2.840.113549.1.1.15':
            return 'SHA512-224';
        case '1.2.840.113549.1.1.16':
            return 'SHA512-256';
        // ECDSA
        case '1.2.840.10045.4.1':
            return 'SHA-1';
        case '1.2.840.10045.4.3.1':
            return 'SHA-224';
        case '1.2.840.10045.4.3.2':
            return 'SHA-256';
        case '1.2.840.10045.4.3.3':
            return 'SHA-384';
        case '1.2.840.10045.4.3.4':
            return 'SHA-512';
        // RSASSA-PSS: hash is indicated separately
        case '1.2.840.113549.1.1.10':
            {
                index = indexAfterOID;
                index = expectASN1Seq(data, index).index;
                if (data[index++] !== 0xa0) throw x509Error('non-tag data', data) // a0 = constructed tag 0
                ;
                index = readASN1Length(data, index).index; // skip over tag length field
                index = expectASN1Seq(data, index).index; // skip over sequence length field
                const { oid: hashOID } = readASN1OID(data, index);
                switch(hashOID){
                    // standalone hash OIDs
                    case '1.2.840.113549.2.5':
                        return 'MD5';
                    case '1.3.14.3.2.26':
                        return 'SHA-1';
                    case '2.16.840.1.101.3.4.2.1':
                        return 'SHA-256';
                    case '2.16.840.1.101.3.4.2.2':
                        return 'SHA-384';
                    case '2.16.840.1.101.3.4.2.3':
                        return 'SHA-512';
                }
                throw x509Error('unknown hash OID ' + hashOID, data);
            }
        // Ed25519 -- see https: return//github.com/openssl/openssl/issues/15477
        case '1.3.101.110':
        case '1.3.101.112':
            return 'SHA-512';
        // Ed448 -- still not in pg 17.2 (if supported, digest would be SHAKE256 x 64 bytes)
        case '1.3.101.111':
        case '1.3.101.113':
            throw x509Error('Ed448 certificate channel binding is not currently supported by Postgres');
    }
    throw x509Error('unknown OID ' + oid, data);
}
module.exports = {
    signatureAlgorithmHashFromCertificate
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/sasl.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
'use strict';
const crypto = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils.js [client] (ecmascript)");
const { signatureAlgorithmHashFromCertificate } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/cert-signatures.js [client] (ecmascript)");
function startSession(mechanisms, stream) {
    const candidates = [
        'SCRAM-SHA-256'
    ];
    if (stream) candidates.unshift('SCRAM-SHA-256-PLUS'); // higher-priority, so placed first
    const mechanism = candidates.find((candidate)=>mechanisms.includes(candidate));
    if (!mechanism) {
        throw new Error('SASL: Only mechanism(s) ' + candidates.join(' and ') + ' are supported');
    }
    if (mechanism === 'SCRAM-SHA-256-PLUS' && typeof stream.getPeerCertificate !== 'function') {
        // this should never happen if we are really talking to a Postgres server
        throw new Error('SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate');
    }
    const clientNonce = crypto.randomBytes(18).toString('base64');
    const gs2Header = mechanism === 'SCRAM-SHA-256-PLUS' ? 'p=tls-server-end-point' : stream ? 'y' : 'n';
    return {
        mechanism,
        clientNonce,
        response: gs2Header + ',,n=*,r=' + clientNonce,
        message: 'SASLInitialResponse'
    };
}
async function continueSession(session, password, serverData, stream) {
    if (session.message !== 'SASLInitialResponse') {
        throw new Error('SASL: Last message was not SASLInitialResponse');
    }
    if (typeof password !== 'string') {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string');
    }
    if (password === '') {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string');
    }
    if (typeof serverData !== 'string') {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string');
    }
    const sv = parseServerFirstMessage(serverData);
    if (!sv.nonce.startsWith(session.clientNonce)) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce');
    } else if (sv.nonce.length === session.clientNonce.length) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short');
    }
    const clientFirstMessageBare = 'n=*,r=' + session.clientNonce;
    const serverFirstMessage = 'r=' + sv.nonce + ',s=' + sv.salt + ',i=' + sv.iteration;
    // without channel binding:
    let channelBinding = stream ? 'eSws' : 'biws' // 'y,,' or 'n,,', base64-encoded
    ;
    // override if channel binding is in use:
    if (session.mechanism === 'SCRAM-SHA-256-PLUS') {
        const peerCert = stream.getPeerCertificate().raw;
        let hashName = signatureAlgorithmHashFromCertificate(peerCert);
        if (hashName === 'MD5' || hashName === 'SHA-1') hashName = 'SHA-256';
        const certHash = await crypto.hashByName(hashName, peerCert);
        const bindingData = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].concat([
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from('p=tls-server-end-point,,'),
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(certHash)
        ]);
        channelBinding = bindingData.toString('base64');
    }
    const clientFinalMessageWithoutProof = 'c=' + channelBinding + ',r=' + sv.nonce;
    const authMessage = clientFirstMessageBare + ',' + serverFirstMessage + ',' + clientFinalMessageWithoutProof;
    const saltBytes = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(sv.salt, 'base64');
    const saltedPassword = await crypto.deriveKey(password, saltBytes, sv.iteration);
    const clientKey = await crypto.hmacSha256(saltedPassword, 'Client Key');
    const storedKey = await crypto.sha256(clientKey);
    const clientSignature = await crypto.hmacSha256(storedKey, authMessage);
    const clientProof = xorBuffers(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(clientKey), __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(clientSignature)).toString('base64');
    const serverKey = await crypto.hmacSha256(saltedPassword, 'Server Key');
    const serverSignatureBytes = await crypto.hmacSha256(serverKey, authMessage);
    session.message = 'SASLResponse';
    session.serverSignature = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(serverSignatureBytes).toString('base64');
    session.response = clientFinalMessageWithoutProof + ',p=' + clientProof;
}
function finalizeSession(session, serverData) {
    if (session.message !== 'SASLResponse') {
        throw new Error('SASL: Last message was not SASLResponse');
    }
    if (typeof serverData !== 'string') {
        throw new Error('SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string');
    }
    const { serverSignature } = parseServerFinalMessage(serverData);
    if (serverSignature !== session.serverSignature) {
        throw new Error('SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match');
    }
}
/**
 * printable       = %x21-2B / %x2D-7E
 *                   ;; Printable ASCII except ",".
 *                   ;; Note that any "printable" is also
 *                   ;; a valid "value".
 */ function isPrintableChars(text) {
    if (typeof text !== 'string') {
        throw new TypeError('SASL: text must be a string');
    }
    return text.split('').map((_, i)=>text.charCodeAt(i)).every((c)=>c >= 0x21 && c <= 0x2b || c >= 0x2d && c <= 0x7e);
}
/**
 * base64-char     = ALPHA / DIGIT / "/" / "+"
 *
 * base64-4        = 4base64-char
 *
 * base64-3        = 3base64-char "="
 *
 * base64-2        = 2base64-char "=="
 *
 * base64          = *base64-4 [base64-3 / base64-2]
 */ function isBase64(text) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
}
function parseAttributePairs(text) {
    if (typeof text !== 'string') {
        throw new TypeError('SASL: attribute pairs text must be a string');
    }
    return new Map(text.split(',').map((attrValue)=>{
        if (!/^.=/.test(attrValue)) {
            throw new Error('SASL: Invalid attribute pair entry');
        }
        const name = attrValue[0];
        const value = attrValue.substring(2);
        return [
            name,
            value
        ];
    }));
}
function parseServerFirstMessage(data) {
    const attrPairs = parseAttributePairs(data);
    const nonce = attrPairs.get('r');
    if (!nonce) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing');
    } else if (!isPrintableChars(nonce)) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters');
    }
    const salt = attrPairs.get('s');
    if (!salt) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing');
    } else if (!isBase64(salt)) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64');
    }
    const iterationText = attrPairs.get('i');
    if (!iterationText) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing');
    } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count');
    }
    const iteration = parseInt(iterationText, 10);
    return {
        nonce,
        salt,
        iteration
    };
}
function parseServerFinalMessage(serverData) {
    const attrPairs = parseAttributePairs(serverData);
    const serverSignature = attrPairs.get('v');
    if (!serverSignature) {
        throw new Error('SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing');
    } else if (!isBase64(serverSignature)) {
        throw new Error('SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64');
    }
    return {
        serverSignature
    };
}
function xorBuffers(a, b) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(a)) {
        throw new TypeError('first argument must be a Buffer');
    }
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(b)) {
        throw new TypeError('second argument must be a Buffer');
    }
    if (a.length !== b.length) {
        throw new Error('Buffer lengths must match');
    }
    if (a.length === 0) {
        throw new Error('Buffers cannot be empty');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(a.map((_, i)=>a[i] ^ b[i]));
}
module.exports = {
    startSession,
    continueSession,
    finalizeSession
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/type-overrides.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [client] (ecmascript)");
function TypeOverrides(userTypes) {
    this._types = userTypes || types;
    this.text = {};
    this.binary = {};
}
TypeOverrides.prototype.getOverrides = function(format) {
    switch(format){
        case 'text':
            return this.text;
        case 'binary':
            return this.binary;
        default:
            return {};
    }
};
TypeOverrides.prototype.setTypeParser = function(oid, format, parseFn) {
    if (typeof format === 'function') {
        parseFn = format;
        format = 'text';
    }
    this.getOverrides(format)[oid] = parseFn;
};
TypeOverrides.prototype.getTypeParser = function(oid, format) {
    format = format || 'text';
    return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
};
module.exports = TypeOverrides;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection-parameters.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
const dns = (()=>{
    const e = new Error("Cannot find module 'dns'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const defaults = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [client] (ecmascript)");
const parse = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-connection-string/index.js [client] (ecmascript)").parse // parses a connection string
;
const val = function(key, config, envVar) {
    if (config[key]) {
        return config[key];
    }
    if (envVar === undefined) {
        envVar = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env['PG' + key.toUpperCase()];
    } else if (envVar === false) {
    // do nothing ... use false
    } else {
        envVar = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env[envVar];
    }
    return envVar || defaults[key];
};
const readSSLConfigFromEnvironment = function() {
    switch(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.PGSSLMODE){
        case 'disable':
            return false;
        case 'prefer':
        case 'require':
        case 'verify-ca':
        case 'verify-full':
            return true;
        case 'no-verify':
            return {
                rejectUnauthorized: false
            };
    }
    return defaults.ssl;
};
// Convert arg to a string, surround in single quotes, and escape single quotes and backslashes
const quoteParamValue = function(value) {
    return "'" + ('' + value).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
};
const add = function(params, config, paramName) {
    const value = config[paramName];
    if (value !== undefined && value !== null) {
        params.push(paramName + '=' + quoteParamValue(value));
    }
};
class ConnectionParameters {
    constructor(config){
        // if a string is passed, it is a raw connection string so we parse it into a config
        config = typeof config === 'string' ? parse(config) : config || {};
        // if the config has a connectionString defined, parse IT into the config we use
        // this will override other default values with what is stored in connectionString
        if (config.connectionString) {
            config = Object.assign({}, config, parse(config.connectionString));
        }
        this.user = val('user', config);
        this.database = val('database', config);
        if (this.database === undefined) {
            this.database = this.user;
        }
        this.port = parseInt(val('port', config), 10);
        this.host = val('host', config);
        // "hiding" the password so it doesn't show up in stack traces
        // or if the client is console.logged
        Object.defineProperty(this, 'password', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: val('password', config)
        });
        this.binary = val('binary', config);
        this.options = val('options', config);
        this.ssl = typeof config.ssl === 'undefined' ? readSSLConfigFromEnvironment() : config.ssl;
        if (typeof this.ssl === 'string') {
            if (this.ssl === 'true') {
                this.ssl = true;
            }
        }
        // support passing in ssl=no-verify via connection string
        if (this.ssl === 'no-verify') {
            this.ssl = {
                rejectUnauthorized: false
            };
        }
        if (this.ssl && this.ssl.key) {
            Object.defineProperty(this.ssl, 'key', {
                enumerable: false
            });
        }
        this.client_encoding = val('client_encoding', config);
        this.replication = val('replication', config);
        // a domain socket begins with '/'
        this.isDomainSocket = !(this.host || '').indexOf('/');
        this.application_name = val('application_name', config, 'PGAPPNAME');
        this.fallback_application_name = val('fallback_application_name', config, false);
        this.statement_timeout = val('statement_timeout', config, false);
        this.lock_timeout = val('lock_timeout', config, false);
        this.idle_in_transaction_session_timeout = val('idle_in_transaction_session_timeout', config, false);
        this.query_timeout = val('query_timeout', config, false);
        if (config.connectionTimeoutMillis === undefined) {
            this.connect_timeout = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.PGCONNECT_TIMEOUT || 0;
        } else {
            this.connect_timeout = Math.floor(config.connectionTimeoutMillis / 1000);
        }
        if (config.keepAlive === false) {
            this.keepalives = 0;
        } else if (config.keepAlive === true) {
            this.keepalives = 1;
        }
        if (typeof config.keepAliveInitialDelayMillis === 'number') {
            this.keepalives_idle = Math.floor(config.keepAliveInitialDelayMillis / 1000);
        }
    }
    getLibpqConnectionString(cb) {
        const params = [];
        add(params, this, 'user');
        add(params, this, 'password');
        add(params, this, 'port');
        add(params, this, 'application_name');
        add(params, this, 'fallback_application_name');
        add(params, this, 'connect_timeout');
        add(params, this, 'options');
        const ssl = typeof this.ssl === 'object' ? this.ssl : this.ssl ? {
            sslmode: this.ssl
        } : {};
        add(params, ssl, 'sslmode');
        add(params, ssl, 'sslca');
        add(params, ssl, 'sslkey');
        add(params, ssl, 'sslcert');
        add(params, ssl, 'sslrootcert');
        if (this.database) {
            params.push('dbname=' + quoteParamValue(this.database));
        }
        if (this.replication) {
            params.push('replication=' + quoteParamValue(this.replication));
        }
        if (this.host) {
            params.push('host=' + quoteParamValue(this.host));
        }
        if (this.isDomainSocket) {
            return cb(null, params.join(' '));
        }
        if (this.client_encoding) {
            params.push('client_encoding=' + quoteParamValue(this.client_encoding));
        }
        dns.lookup(this.host, function(err, address) {
            if (err) return cb(err, null);
            params.push('hostaddr=' + quoteParamValue(address));
            return cb(null, params.join(' '));
        });
    }
}
module.exports = ConnectionParameters;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/result.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
'use strict';
const types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [client] (ecmascript)");
const matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
// result object returned from query
// in the 'end' event and also
// passed as second argument to provided callback
class Result {
    constructor(rowMode, types){
        this.command = null;
        this.rowCount = null;
        this.oid = null;
        this.rows = [];
        this.fields = [];
        this._parsers = undefined;
        this._types = types;
        this.RowCtor = null;
        this.rowAsArray = rowMode === 'array';
        if (this.rowAsArray) {
            this.parseRow = this._parseRowAsArray;
        }
        this._prebuiltEmptyResultObject = null;
    }
    // adds a command complete message
    addCommandComplete(msg) {
        let match;
        if (msg.text) {
            // pure javascript
            match = matchRegexp.exec(msg.text);
        } else {
            // native bindings
            match = matchRegexp.exec(msg.command);
        }
        if (match) {
            this.command = match[1];
            if (match[3]) {
                // COMMAND OID ROWS
                this.oid = parseInt(match[2], 10);
                this.rowCount = parseInt(match[3], 10);
            } else if (match[2]) {
                // COMMAND ROWS
                this.rowCount = parseInt(match[2], 10);
            }
        }
    }
    _parseRowAsArray(rowData) {
        const row = new Array(rowData.length);
        for(let i = 0, len = rowData.length; i < len; i++){
            const rawValue = rowData[i];
            if (rawValue !== null) {
                row[i] = this._parsers[i](rawValue);
            } else {
                row[i] = null;
            }
        }
        return row;
    }
    parseRow(rowData) {
        const row = {
            ...this._prebuiltEmptyResultObject
        };
        for(let i = 0, len = rowData.length; i < len; i++){
            const rawValue = rowData[i];
            const field = this.fields[i].name;
            if (rawValue !== null) {
                const v = this.fields[i].format === 'binary' ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from(rawValue) : rawValue;
                row[field] = this._parsers[i](v);
            } else {
                row[field] = null;
            }
        }
        return row;
    }
    addRow(row) {
        this.rows.push(row);
    }
    addFields(fieldDescriptions) {
        // clears field definitions
        // multiple query statements in 1 action can result in multiple sets
        // of rowDescriptions...eg: 'select NOW(); select 1::int;'
        // you need to reset the fields
        this.fields = fieldDescriptions;
        if (this.fields.length) {
            this._parsers = new Array(fieldDescriptions.length);
        }
        const row = {};
        for(let i = 0; i < fieldDescriptions.length; i++){
            const desc = fieldDescriptions[i];
            row[desc.name] = null;
            if (this._types) {
                this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || 'text');
            } else {
                this._parsers[i] = types.getTypeParser(desc.dataTypeID, desc.format || 'text');
            }
        }
        this._prebuiltEmptyResultObject = {
            ...row
        };
    }
}
module.exports = Result;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/query.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
const { EventEmitter } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/events/events.js [client] (ecmascript)");
const Result = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/result.js [client] (ecmascript)");
const utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [client] (ecmascript)");
class Query extends EventEmitter {
    constructor(config, values, callback){
        super();
        config = utils.normalizeQueryConfig(config, values, callback);
        this.text = config.text;
        this.values = config.values;
        this.rows = config.rows;
        this.types = config.types;
        this.name = config.name;
        this.queryMode = config.queryMode;
        this.binary = config.binary;
        // use unique portal name each time
        this.portal = config.portal || '';
        this.callback = config.callback;
        this._rowMode = config.rowMode;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].domain && config.callback) {
            this.callback = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].domain.bind(config.callback);
        }
        this._result = new Result(this._rowMode, this.types);
        // potential for multiple results
        this._results = this._result;
        this._canceledDueToError = false;
    }
    requiresPreparation() {
        if (this.queryMode === 'extended') {
            return true;
        }
        // named queries must always be prepared
        if (this.name) {
            return true;
        }
        // always prepare if there are max number of rows expected per
        // portal execution
        if (this.rows) {
            return true;
        }
        // don't prepare empty text queries
        if (!this.text) {
            return false;
        }
        // prepare if there are values
        if (!this.values) {
            return false;
        }
        return this.values.length > 0;
    }
    _checkForMultirow() {
        // if we already have a result with a command property
        // then we've already executed one query in a multi-statement simple query
        // turn our results into an array of results
        if (this._result.command) {
            if (!Array.isArray(this._results)) {
                this._results = [
                    this._result
                ];
            }
            this._result = new Result(this._rowMode, this._result._types);
            this._results.push(this._result);
        }
    }
    // associates row metadata from the supplied
    // message with this query object
    // metadata used when parsing row results
    handleRowDescription(msg) {
        this._checkForMultirow();
        this._result.addFields(msg.fields);
        this._accumulateRows = this.callback || !this.listeners('row').length;
    }
    handleDataRow(msg) {
        let row;
        if (this._canceledDueToError) {
            return;
        }
        try {
            row = this._result.parseRow(msg.fields);
        } catch (err) {
            this._canceledDueToError = err;
            return;
        }
        this.emit('row', row, this._result);
        if (this._accumulateRows) {
            this._result.addRow(row);
        }
    }
    handleCommandComplete(msg, connection) {
        this._checkForMultirow();
        this._result.addCommandComplete(msg);
        // need to sync after each command complete of a prepared statement
        // if we were using a row count which results in multiple calls to _getRows
        if (this.rows) {
            connection.sync();
        }
    }
    // if a named prepared statement is created with empty query text
    // the backend will send an emptyQuery message but *not* a command complete message
    // since we pipeline sync immediately after execute we don't need to do anything here
    // unless we have rows specified, in which case we did not pipeline the initial sync call
    handleEmptyQuery(connection) {
        if (this.rows) {
            connection.sync();
        }
    }
    handleError(err, connection) {
        // need to sync after error during a prepared statement
        if (this._canceledDueToError) {
            err = this._canceledDueToError;
            this._canceledDueToError = false;
        }
        // if callback supplied do not emit error event as uncaught error
        // events will bubble up to node process
        if (this.callback) {
            return this.callback(err);
        }
        this.emit('error', err);
    }
    handleReadyForQuery(con) {
        if (this._canceledDueToError) {
            return this.handleError(this._canceledDueToError, con);
        }
        if (this.callback) {
            try {
                this.callback(null, this._results);
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
                    throw err;
                });
            }
        }
        this.emit('end', this._results);
    }
    submit(connection) {
        if (typeof this.text !== 'string' && typeof this.name !== 'string') {
            return new Error('A query must have either text or a name. Supplying neither is unsupported.');
        }
        const previous = connection.parsedStatements[this.name];
        if (this.text && previous && this.text !== previous) {
            return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
        }
        if (this.values && !Array.isArray(this.values)) {
            return new Error('Query values must be an array');
        }
        if (this.requiresPreparation()) {
            // If we're using the extended query protocol we fire off several separate commands
            // to the backend. On some versions of node & some operating system versions
            // the network stack writes each message separately instead of buffering them together
            // causing the client & network to send more slowly. Corking & uncorking the stream
            // allows node to buffer up the messages internally before sending them all off at once.
            // note: we're checking for existence of cork/uncork because some versions of streams
            // might not have this (cloudflare?)
            connection.stream.cork && connection.stream.cork();
            try {
                this.prepare(connection);
            } finally{
                // while unlikely for this.prepare to throw, if it does & we don't uncork this stream
                // this client becomes unresponsive, so put in finally block "just in case"
                connection.stream.uncork && connection.stream.uncork();
            }
        } else {
            connection.query(this.text);
        }
        return null;
    }
    hasBeenParsed(connection) {
        return this.name && connection.parsedStatements[this.name];
    }
    handlePortalSuspended(connection) {
        this._getRows(connection, this.rows);
    }
    _getRows(connection, rows) {
        connection.execute({
            portal: this.portal,
            rows: rows
        });
        // if we're not reading pages of rows send the sync command
        // to indicate the pipeline is finished
        if (!rows) {
            connection.sync();
        } else {
            // otherwise flush the call out to read more rows
            connection.flush();
        }
    }
    // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
    prepare(connection) {
        // TODO refactor this poor encapsulation
        if (!this.hasBeenParsed(connection)) {
            connection.parse({
                text: this.text,
                name: this.name,
                types: this.types
            });
        }
        // because we're mapping user supplied values to
        // postgres wire protocol compatible values it could
        // throw an exception, so try/catch this section
        try {
            connection.bind({
                portal: this.portal,
                statement: this.name,
                values: this.values,
                binary: this.binary,
                valueMapper: utils.prepareValue
            });
        } catch (err) {
            this.handleError(err, connection);
            return;
        }
        connection.describe({
            type: 'P',
            name: this.portal || ''
        });
        this._getRows(connection, this.rows);
    }
    handleCopyInResponse(connection) {
        connection.sendCopyFail('No source stream defined');
    }
    handleCopyData(msg, connection) {
    // noop
    }
}
module.exports = Query;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/stream.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { getStream, getSecureStream } = getStreamFuncs();
module.exports = {
    /**
   * Get a socket stream compatible with the current runtime environment.
   * @returns {Duplex}
   */ getStream,
    /**
   * Get a TLS secured socket, compatible with the current environment,
   * using the socket and other settings given in `options`.
   * @returns {Duplex}
   */ getSecureStream
};
/**
 * The stream functions that work in Node.js
 */ function getNodejsStreamFuncs() {
    function getStream(ssl) {
        const net = (()=>{
            const e = new Error("Cannot find module 'net'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })();
        return new net.Socket();
    }
    function getSecureStream(options) {
        const tls = (()=>{
            const e = new Error("Cannot find module 'tls'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })();
        return tls.connect(options);
    }
    return {
        getStream,
        getSecureStream
    };
}
/**
 * The stream functions that work in Cloudflare Workers
 */ function getCloudflareStreamFuncs() {
    function getStream(ssl) {
        const { CloudflareSocket } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-cloudflare/dist/empty.js [client] (ecmascript)");
        return new CloudflareSocket(ssl);
    }
    function getSecureStream(options) {
        options.socket.startTls(options);
        return options.socket;
    }
    return {
        getStream,
        getSecureStream
    };
}
/**
 * Are we running in a Cloudflare Worker?
 *
 * @returns true if the code is currently running inside a Cloudflare Worker.
 */ function isCloudflareRuntime() {
    // Since 2022-03-21 the `global_navigator` compatibility flag is on for Cloudflare Workers
    // which means that `navigator.userAgent` will be defined.
    // eslint-disable-next-line no-undef
    if (typeof navigator === 'object' && navigator !== null && typeof navigator.userAgent === 'string') {
        // eslint-disable-next-line no-undef
        return navigator.userAgent === 'Cloudflare-Workers';
    }
    // In case `navigator` or `navigator.userAgent` is not defined then try a more sneaky approach
    if (typeof Response === 'function') {
        const resp = new Response(null, {
            cf: {
                thing: true
            }
        });
        if (typeof resp.cf === 'object' && resp.cf !== null && resp.cf.thing) {
            return true;
        }
    }
    return false;
}
function getStreamFuncs() {
    if (isCloudflareRuntime()) {
        return getCloudflareStreamFuncs();
    }
    return getNodejsStreamFuncs();
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/events/events.js [client] (ecmascript)").EventEmitter;
const { parse, serialize } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/index.js [client] (ecmascript)");
const { getStream, getSecureStream } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/stream.js [client] (ecmascript)");
const flushBuffer = serialize.flush();
const syncBuffer = serialize.sync();
const endBuffer = serialize.end();
// TODO(bmc) support binary mode at some point
class Connection extends EventEmitter {
    constructor(config){
        super();
        config = config || {};
        this.stream = config.stream || getStream(config.ssl);
        if (typeof this.stream === 'function') {
            this.stream = this.stream(config);
        }
        this._keepAlive = config.keepAlive;
        this._keepAliveInitialDelayMillis = config.keepAliveInitialDelayMillis;
        this.parsedStatements = {};
        this.ssl = config.ssl || false;
        this._ending = false;
        this._emitMessage = false;
        const self = this;
        this.on('newListener', function(eventName) {
            if (eventName === 'message') {
                self._emitMessage = true;
            }
        });
    }
    connect(port, host) {
        const self = this;
        this._connecting = true;
        this.stream.setNoDelay(true);
        this.stream.connect(port, host);
        this.stream.once('connect', function() {
            if (self._keepAlive) {
                self.stream.setKeepAlive(true, self._keepAliveInitialDelayMillis);
            }
            self.emit('connect');
        });
        const reportStreamError = function(error) {
            // errors about disconnections should be ignored during disconnect
            if (self._ending && (error.code === 'ECONNRESET' || error.code === 'EPIPE')) {
                return;
            }
            self.emit('error', error);
        };
        this.stream.on('error', reportStreamError);
        this.stream.on('close', function() {
            self.emit('end');
        });
        if (!this.ssl) {
            return this.attachListeners(this.stream);
        }
        this.stream.once('data', function(buffer) {
            const responseCode = buffer.toString('utf8');
            switch(responseCode){
                case 'S':
                    break;
                case 'N':
                    self.stream.end();
                    return self.emit('error', new Error('The server does not support SSL connections'));
                default:
                    // Any other response byte, including 'E' (ErrorResponse) indicating a server error
                    self.stream.end();
                    return self.emit('error', new Error('There was an error establishing an SSL connection'));
            }
            const options = {
                socket: self.stream
            };
            if (self.ssl !== true) {
                Object.assign(options, self.ssl);
                if ('key' in self.ssl) {
                    options.key = self.ssl.key;
                }
            }
            const net = (()=>{
                const e = new Error("Cannot find module 'net'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })();
            if (net.isIP && net.isIP(host) === 0) {
                options.servername = host;
            }
            try {
                self.stream = getSecureStream(options);
            } catch (err) {
                return self.emit('error', err);
            }
            self.attachListeners(self.stream);
            self.stream.on('error', reportStreamError);
            self.emit('sslconnect');
        });
    }
    attachListeners(stream) {
        parse(stream, (msg)=>{
            const eventName = msg.name === 'error' ? 'errorMessage' : msg.name;
            if (this._emitMessage) {
                this.emit('message', msg);
            }
            this.emit(eventName, msg);
        });
    }
    requestSsl() {
        this.stream.write(serialize.requestSsl());
    }
    startup(config) {
        this.stream.write(serialize.startup(config));
    }
    cancel(processID, secretKey) {
        this._send(serialize.cancel(processID, secretKey));
    }
    password(password) {
        this._send(serialize.password(password));
    }
    sendSASLInitialResponseMessage(mechanism, initialResponse) {
        this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
    }
    sendSCRAMClientFinalMessage(additionalData) {
        this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
    }
    _send(buffer) {
        if (!this.stream.writable) {
            return false;
        }
        return this.stream.write(buffer);
    }
    query(text) {
        this._send(serialize.query(text));
    }
    // send parse message
    parse(query) {
        this._send(serialize.parse(query));
    }
    // send bind message
    bind(config) {
        this._send(serialize.bind(config));
    }
    // send execute message
    execute(config) {
        this._send(serialize.execute(config));
    }
    flush() {
        if (this.stream.writable) {
            this.stream.write(flushBuffer);
        }
    }
    sync() {
        this._ending = true;
        this._send(syncBuffer);
    }
    ref() {
        this.stream.ref();
    }
    unref() {
        this.stream.unref();
    }
    end() {
        // 0x58 = 'X'
        this._ending = true;
        if (!this._connecting || !this.stream.writable) {
            this.stream.end();
            return;
        }
        return this.stream.write(endBuffer, ()=>{
            this.stream.end();
        });
    }
    close(msg) {
        this._send(serialize.close(msg));
    }
    describe(msg) {
        this._send(serialize.describe(msg));
    }
    sendCopyFromChunk(chunk) {
        this._send(serialize.copyData(chunk));
    }
    endCopyFrom() {
        this._send(serialize.copyDone());
    }
    sendCopyFail(msg) {
        this._send(serialize.copyFail(msg));
    }
}
module.exports = Connection;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/client.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
const EventEmitter = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/events/events.js [client] (ecmascript)").EventEmitter;
const utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [client] (ecmascript)");
const nodeUtils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/util/util.js [client] (ecmascript)");
const sasl = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/sasl.js [client] (ecmascript)");
const TypeOverrides = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/type-overrides.js [client] (ecmascript)");
const ConnectionParameters = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection-parameters.js [client] (ecmascript)");
const Query = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/query.js [client] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [client] (ecmascript)");
const Connection = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection.js [client] (ecmascript)");
const crypto = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils.js [client] (ecmascript)");
const activeQueryDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Client.activeQuery is deprecated and will be removed in pg@9.0');
const queryQueueDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Client.queryQueue is deprecated and will be removed in pg@9.0.');
const pgPassDeprecationNotice = nodeUtils.deprecate(()=>{}, 'pgpass support is deprecated and will be removed in pg@9.0. ' + 'You can provide an async function as the password property to the Client/Pool constructor that returns a password instead. Within this function you can call the pgpass module in your own code.');
const byoPromiseDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Passing a custom Promise implementation to the Client/Pool constructor is deprecated and will be removed in pg@9.0.');
const queryQueueLengthDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use asycn/await or an external async flow control mechanism instead.');
class Client extends EventEmitter {
    constructor(config){
        super();
        this.connectionParameters = new ConnectionParameters(config);
        this.user = this.connectionParameters.user;
        this.database = this.connectionParameters.database;
        this.port = this.connectionParameters.port;
        this.host = this.connectionParameters.host;
        // "hiding" the password so it doesn't show up in stack traces
        // or if the client is console.logged
        Object.defineProperty(this, 'password', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: this.connectionParameters.password
        });
        this.replication = this.connectionParameters.replication;
        const c = config || {};
        if (c.Promise) {
            byoPromiseDeprecationNotice();
        }
        this._Promise = c.Promise || /*TURBOPACK member replacement*/ __turbopack_context__.g.Promise;
        this._types = new TypeOverrides(c.types);
        this._ending = false;
        this._ended = false;
        this._connecting = false;
        this._connected = false;
        this._connectionError = false;
        this._queryable = true;
        this._activeQuery = null;
        this.enableChannelBinding = Boolean(c.enableChannelBinding); // set true to use SCRAM-SHA-256-PLUS when offered
        this.connection = c.connection || new Connection({
            stream: c.stream,
            ssl: this.connectionParameters.ssl,
            keepAlive: c.keepAlive || false,
            keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
            encoding: this.connectionParameters.client_encoding || 'utf8'
        });
        this._queryQueue = [];
        this.binary = c.binary || defaults.binary;
        this.processID = null;
        this.secretKey = null;
        this.ssl = this.connectionParameters.ssl || false;
        // As with Password, make SSL->Key (the private key) non-enumerable.
        // It won't show up in stack traces
        // or if the client is console.logged
        if (this.ssl && this.ssl.key) {
            Object.defineProperty(this.ssl, 'key', {
                enumerable: false
            });
        }
        this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
    }
    get activeQuery() {
        activeQueryDeprecationNotice();
        return this._activeQuery;
    }
    set activeQuery(val) {
        activeQueryDeprecationNotice();
        this._activeQuery = val;
    }
    _getActiveQuery() {
        return this._activeQuery;
    }
    _errorAllQueries(err) {
        const enqueueError = (query)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
                query.handleError(err, this.connection);
            });
        };
        const activeQuery = this._getActiveQuery();
        if (activeQuery) {
            enqueueError(activeQuery);
            this._activeQuery = null;
        }
        this._queryQueue.forEach(enqueueError);
        this._queryQueue.length = 0;
    }
    _connect(callback) {
        const self = this;
        const con = this.connection;
        this._connectionCallback = callback;
        if (this._connecting || this._connected) {
            const err = new Error('Client has already been connected. You cannot reuse a client.');
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
                callback(err);
            });
            return;
        }
        this._connecting = true;
        if (this._connectionTimeoutMillis > 0) {
            this.connectionTimeoutHandle = setTimeout(()=>{
                con._ending = true;
                con.stream.destroy(new Error('timeout expired'));
            }, this._connectionTimeoutMillis);
            if (this.connectionTimeoutHandle.unref) {
                this.connectionTimeoutHandle.unref();
            }
        }
        if (this.host && this.host.indexOf('/') === 0) {
            con.connect(this.host + '/.s.PGSQL.' + this.port);
        } else {
            con.connect(this.port, this.host);
        }
        // once connection is established send startup message
        con.on('connect', function() {
            if (self.ssl) {
                con.requestSsl();
            } else {
                con.startup(self.getStartupConf());
            }
        });
        con.on('sslconnect', function() {
            con.startup(self.getStartupConf());
        });
        this._attachListeners(con);
        con.once('end', ()=>{
            const error = this._ending ? new Error('Connection terminated') : new Error('Connection terminated unexpectedly');
            clearTimeout(this.connectionTimeoutHandle);
            this._errorAllQueries(error);
            this._ended = true;
            if (!this._ending) {
                // if the connection is ended without us calling .end()
                // on this client then we have an unexpected disconnection
                // treat this as an error unless we've already emitted an error
                // during connection.
                if (this._connecting && !this._connectionError) {
                    if (this._connectionCallback) {
                        this._connectionCallback(error);
                    } else {
                        this._handleErrorEvent(error);
                    }
                } else if (!this._connectionError) {
                    this._handleErrorEvent(error);
                }
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
                this.emit('end');
            });
        });
    }
    connect(callback) {
        if (callback) {
            this._connect(callback);
            return;
        }
        return new this._Promise((resolve, reject)=>{
            this._connect((error)=>{
                if (error) {
                    reject(error);
                } else {
                    resolve(this);
                }
            });
        });
    }
    _attachListeners(con) {
        // password request handling
        con.on('authenticationCleartextPassword', this._handleAuthCleartextPassword.bind(this));
        // password request handling
        con.on('authenticationMD5Password', this._handleAuthMD5Password.bind(this));
        // password request handling (SASL)
        con.on('authenticationSASL', this._handleAuthSASL.bind(this));
        con.on('authenticationSASLContinue', this._handleAuthSASLContinue.bind(this));
        con.on('authenticationSASLFinal', this._handleAuthSASLFinal.bind(this));
        con.on('backendKeyData', this._handleBackendKeyData.bind(this));
        con.on('error', this._handleErrorEvent.bind(this));
        con.on('errorMessage', this._handleErrorMessage.bind(this));
        con.on('readyForQuery', this._handleReadyForQuery.bind(this));
        con.on('notice', this._handleNotice.bind(this));
        con.on('rowDescription', this._handleRowDescription.bind(this));
        con.on('dataRow', this._handleDataRow.bind(this));
        con.on('portalSuspended', this._handlePortalSuspended.bind(this));
        con.on('emptyQuery', this._handleEmptyQuery.bind(this));
        con.on('commandComplete', this._handleCommandComplete.bind(this));
        con.on('parseComplete', this._handleParseComplete.bind(this));
        con.on('copyInResponse', this._handleCopyInResponse.bind(this));
        con.on('copyData', this._handleCopyData.bind(this));
        con.on('notification', this._handleNotification.bind(this));
    }
    _getPassword(cb) {
        const con = this.connection;
        if (typeof this.password === 'function') {
            this._Promise.resolve().then(()=>this.password(this.connectionParameters)).then((pass)=>{
                if (pass !== undefined) {
                    if (typeof pass !== 'string') {
                        con.emit('error', new TypeError('Password must be a string'));
                        return;
                    }
                    this.connectionParameters.password = this.password = pass;
                } else {
                    this.connectionParameters.password = this.password = null;
                }
                cb();
            }).catch((err)=>{
                con.emit('error', err);
            });
        } else if (this.password !== null) {
            cb();
        } else {
            try {
                const pgPass = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pgpass/lib/index.js [client] (ecmascript)");
                pgPass(this.connectionParameters, (pass)=>{
                    if (undefined !== pass) {
                        pgPassDeprecationNotice();
                        this.connectionParameters.password = this.password = pass;
                    }
                    cb();
                });
            } catch (e) {
                this.emit('error', e);
            }
        }
    }
    _handleAuthCleartextPassword(msg) {
        this._getPassword(()=>{
            this.connection.password(this.password);
        });
    }
    _handleAuthMD5Password(msg) {
        this._getPassword(async ()=>{
            try {
                const hashedPassword = await crypto.postgresMd5PasswordHash(this.user, this.password, msg.salt);
                this.connection.password(hashedPassword);
            } catch (e) {
                this.emit('error', e);
            }
        });
    }
    _handleAuthSASL(msg) {
        this._getPassword(()=>{
            try {
                this.saslSession = sasl.startSession(msg.mechanisms, this.enableChannelBinding && this.connection.stream);
                this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
            } catch (err) {
                this.connection.emit('error', err);
            }
        });
    }
    async _handleAuthSASLContinue(msg) {
        try {
            await sasl.continueSession(this.saslSession, this.password, msg.data, this.enableChannelBinding && this.connection.stream);
            this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
        } catch (err) {
            this.connection.emit('error', err);
        }
    }
    _handleAuthSASLFinal(msg) {
        try {
            sasl.finalizeSession(this.saslSession, msg.data);
            this.saslSession = null;
        } catch (err) {
            this.connection.emit('error', err);
        }
    }
    _handleBackendKeyData(msg) {
        this.processID = msg.processID;
        this.secretKey = msg.secretKey;
    }
    _handleReadyForQuery(msg) {
        if (this._connecting) {
            this._connecting = false;
            this._connected = true;
            clearTimeout(this.connectionTimeoutHandle);
            // process possible callback argument to Client#connect
            if (this._connectionCallback) {
                this._connectionCallback(null, this);
                // remove callback for proper error handling
                // after the connect event
                this._connectionCallback = null;
            }
            this.emit('connect');
        }
        const activeQuery = this._getActiveQuery();
        this._activeQuery = null;
        this.readyForQuery = true;
        if (activeQuery) {
            activeQuery.handleReadyForQuery(this.connection);
        }
        this._pulseQueryQueue();
    }
    // if we receive an error event or error message
    // during the connection process we handle it here
    _handleErrorWhileConnecting(err) {
        if (this._connectionError) {
            // TODO(bmc): this is swallowing errors - we shouldn't do this
            return;
        }
        this._connectionError = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
            return this._connectionCallback(err);
        }
        this.emit('error', err);
    }
    // if we're connected and we receive an error event from the connection
    // this means the socket is dead - do a hard abort of all queries and emit
    // the socket error on the client as well
    _handleErrorEvent(err) {
        if (this._connecting) {
            return this._handleErrorWhileConnecting(err);
        }
        this._queryable = false;
        this._errorAllQueries(err);
        this.emit('error', err);
    }
    // handle error messages from the postgres backend
    _handleErrorMessage(msg) {
        if (this._connecting) {
            return this._handleErrorWhileConnecting(msg);
        }
        const activeQuery = this._getActiveQuery();
        if (!activeQuery) {
            this._handleErrorEvent(msg);
            return;
        }
        this._activeQuery = null;
        activeQuery.handleError(msg, this.connection);
    }
    _handleRowDescription(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected rowDescription message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate rowDescription to active query
        activeQuery.handleRowDescription(msg);
    }
    _handleDataRow(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected dataRow message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate dataRow to active query
        activeQuery.handleDataRow(msg);
    }
    _handlePortalSuspended(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected portalSuspended message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate portalSuspended to active query
        activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected emptyQuery message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate emptyQuery to active query
        activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected commandComplete message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate commandComplete to active query
        activeQuery.handleCommandComplete(msg, this.connection);
    }
    _handleParseComplete() {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected parseComplete message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // if a prepared statement has a name and properly parses
        // we track that its already been executed so we don't parse
        // it again on the same client
        if (activeQuery.name) {
            this.connection.parsedStatements[activeQuery.name] = activeQuery.text;
        }
    }
    _handleCopyInResponse(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected copyInResponse message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        activeQuery.handleCopyInResponse(this.connection);
    }
    _handleCopyData(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected copyData message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        activeQuery.handleCopyData(msg, this.connection);
    }
    _handleNotification(msg) {
        this.emit('notification', msg);
    }
    _handleNotice(msg) {
        this.emit('notice', msg);
    }
    getStartupConf() {
        const params = this.connectionParameters;
        const data = {
            user: params.user,
            database: params.database
        };
        const appName = params.application_name || params.fallback_application_name;
        if (appName) {
            data.application_name = appName;
        }
        if (params.replication) {
            data.replication = '' + params.replication;
        }
        if (params.statement_timeout) {
            data.statement_timeout = String(parseInt(params.statement_timeout, 10));
        }
        if (params.lock_timeout) {
            data.lock_timeout = String(parseInt(params.lock_timeout, 10));
        }
        if (params.idle_in_transaction_session_timeout) {
            data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
        }
        if (params.options) {
            data.options = params.options;
        }
        return data;
    }
    cancel(client, query) {
        if (client.activeQuery === query) {
            const con = this.connection;
            if (this.host && this.host.indexOf('/') === 0) {
                con.connect(this.host + '/.s.PGSQL.' + this.port);
            } else {
                con.connect(this.port, this.host);
            }
            // once connection is established send cancel message
            con.on('connect', function() {
                con.cancel(client.processID, client.secretKey);
            });
        } else if (client._queryQueue.indexOf(query) !== -1) {
            client._queryQueue.splice(client._queryQueue.indexOf(query), 1);
        }
    }
    setTypeParser(oid, format, parseFn) {
        return this._types.setTypeParser(oid, format, parseFn);
    }
    getTypeParser(oid, format) {
        return this._types.getTypeParser(oid, format);
    }
    // escapeIdentifier and escapeLiteral moved to utility functions & exported
    // on PG
    // re-exported here for backwards compatibility
    escapeIdentifier(str) {
        return utils.escapeIdentifier(str);
    }
    escapeLiteral(str) {
        return utils.escapeLiteral(str);
    }
    _pulseQueryQueue() {
        if (this.readyForQuery === true) {
            this._activeQuery = this._queryQueue.shift();
            const activeQuery = this._getActiveQuery();
            if (activeQuery) {
                this.readyForQuery = false;
                this.hasExecuted = true;
                const queryError = activeQuery.submit(this.connection);
                if (queryError) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
                        activeQuery.handleError(queryError, this.connection);
                        this.readyForQuery = true;
                        this._pulseQueryQueue();
                    });
                }
            } else if (this.hasExecuted) {
                this._activeQuery = null;
                this.emit('drain');
            }
        }
    }
    query(config, values, callback) {
        // can take in strings, config object or query object
        let query;
        let result;
        let readTimeout;
        let readTimeoutTimer;
        let queryCallback;
        if (config === null || config === undefined) {
            throw new TypeError('Client was passed a null or undefined query');
        } else if (typeof config.submit === 'function') {
            readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
            result = query = config;
            if (!query.callback) {
                if (typeof values === 'function') {
                    query.callback = values;
                } else if (callback) {
                    query.callback = callback;
                }
            }
        } else {
            readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
            query = new Query(config, values, callback);
            if (!query.callback) {
                result = new this._Promise((resolve, reject)=>{
                    query.callback = (err, res)=>err ? reject(err) : resolve(res);
                }).catch((err)=>{
                    // replace the stack trace that leads to `TCP.onStreamRead` with one that leads back to the
                    // application that created the query
                    Error.captureStackTrace(err);
                    throw err;
                });
            }
        }
        if (readTimeout) {
            queryCallback = query.callback || (()=>{});
            readTimeoutTimer = setTimeout(()=>{
                const error = new Error('Query read timeout');
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
                    query.handleError(error, this.connection);
                });
                queryCallback(error);
                // we already returned an error,
                // just do nothing if query completes
                query.callback = ()=>{};
                // Remove from queue
                const index = this._queryQueue.indexOf(query);
                if (index > -1) {
                    this._queryQueue.splice(index, 1);
                }
                this._pulseQueryQueue();
            }, readTimeout);
            query.callback = (err, res)=>{
                clearTimeout(readTimeoutTimer);
                queryCallback(err, res);
            };
        }
        if (this.binary && !query.binary) {
            query.binary = true;
        }
        if (query._result && !query._result._types) {
            query._result._types = this._types;
        }
        if (!this._queryable) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
                query.handleError(new Error('Client has encountered a connection error and is not queryable'), this.connection);
            });
            return result;
        }
        if (this._ending) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
                query.handleError(new Error('Client was closed and is not queryable'), this.connection);
            });
            return result;
        }
        if (this._queryQueue.length > 0) {
            queryQueueLengthDeprecationNotice();
        }
        this._queryQueue.push(query);
        this._pulseQueryQueue();
        return result;
    }
    ref() {
        this.connection.ref();
    }
    unref() {
        this.connection.unref();
    }
    end(cb) {
        this._ending = true;
        // if we have never connected, then end is a noop, callback immediately
        if (!this.connection._connecting || this._ended) {
            if (cb) {
                cb();
            } else {
                return this._Promise.resolve();
            }
        }
        if (this._getActiveQuery() || !this._queryable) {
            // if we have an active query we need to force a disconnect
            // on the socket - otherwise a hung query could block end forever
            this.connection.stream.destroy();
        } else {
            this.connection.end();
        }
        if (cb) {
            this.connection.once('end', cb);
        } else {
            return new this._Promise((resolve)=>{
                this.connection.once('end', resolve);
            });
        }
    }
    get queryQueue() {
        queryQueueDeprecationNotice();
        return this._queryQueue;
    }
}
// expose a Query constructor
Client.Query = Query;
module.exports = Client;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/query.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
const EventEmitter = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/events/events.js [client] (ecmascript)").EventEmitter;
const util = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/util/util.js [client] (ecmascript)");
const utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [client] (ecmascript)");
const NativeQuery = module.exports = function(config, values, callback) {
    EventEmitter.call(this);
    config = utils.normalizeQueryConfig(config, values, callback);
    this.text = config.text;
    this.values = config.values;
    this.name = config.name;
    this.queryMode = config.queryMode;
    this.callback = config.callback;
    this.state = 'new';
    this._arrayMode = config.rowMode === 'array';
    // if the 'row' event is listened for
    // then emit them as they come in
    // without setting singleRowMode to true
    // this has almost no meaning because libpq
    // reads all rows into memory before returning any
    this._emitRowEvents = false;
    this.on('newListener', (function(event) {
        if (event === 'row') this._emitRowEvents = true;
    }).bind(this));
};
util.inherits(NativeQuery, EventEmitter);
const errorFieldMap = {
    sqlState: 'code',
    statementPosition: 'position',
    messagePrimary: 'message',
    context: 'where',
    schemaName: 'schema',
    tableName: 'table',
    columnName: 'column',
    dataTypeName: 'dataType',
    constraintName: 'constraint',
    sourceFile: 'file',
    sourceLine: 'line',
    sourceFunction: 'routine'
};
NativeQuery.prototype.handleError = function(err) {
    // copy pq error fields into the error object
    const fields = this.native.pq.resultErrorFields();
    if (fields) {
        for(const key in fields){
            const normalizedFieldName = errorFieldMap[key] || key;
            err[normalizedFieldName] = fields[key];
        }
    }
    if (this.callback) {
        this.callback(err);
    } else {
        this.emit('error', err);
    }
    this.state = 'error';
};
NativeQuery.prototype.then = function(onSuccess, onFailure) {
    return this._getPromise().then(onSuccess, onFailure);
};
NativeQuery.prototype.catch = function(callback) {
    return this._getPromise().catch(callback);
};
NativeQuery.prototype._getPromise = function() {
    if (this._promise) return this._promise;
    this._promise = new Promise((function(resolve, reject) {
        this._once('end', resolve);
        this._once('error', reject);
    }).bind(this));
    return this._promise;
};
NativeQuery.prototype.submit = function(client) {
    this.state = 'running';
    const self = this;
    this.native = client.native;
    client.native.arrayMode = this._arrayMode;
    let after = function(err, rows, results) {
        client.native.arrayMode = false;
        setImmediate(function() {
            self.emit('_done');
        });
        // handle possible query error
        if (err) {
            return self.handleError(err);
        }
        // emit row events for each row in the result
        if (self._emitRowEvents) {
            if (results.length > 1) {
                rows.forEach((rowOfRows, i)=>{
                    rowOfRows.forEach((row)=>{
                        self.emit('row', row, results[i]);
                    });
                });
            } else {
                rows.forEach(function(row) {
                    self.emit('row', row, results);
                });
            }
        }
        // handle successful result
        self.state = 'end';
        self.emit('end', results);
        if (self.callback) {
            self.callback(null, results);
        }
    };
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].domain) {
        after = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].domain.bind(after);
    }
    // named query
    if (this.name) {
        if (this.name.length > 63) {
            console.error('Warning! Postgres only supports 63 characters for query names.');
            console.error('You supplied %s (%s)', this.name, this.name.length);
            console.error('This can cause conflicts and silent errors executing queries');
        }
        const values = (this.values || []).map(utils.prepareValue);
        // check if the client has already executed this named query
        // if so...just execute it again - skip the planning phase
        if (client.namedQueries[this.name]) {
            if (this.text && client.namedQueries[this.name] !== this.text) {
                const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
                return after(err);
            }
            return client.native.execute(this.name, values, after);
        }
        // plan the named query the first time, then execute it
        return client.native.prepare(this.name, this.text, values.length, function(err) {
            if (err) return after(err);
            client.namedQueries[self.name] = self.text;
            return self.native.execute(self.name, values, after);
        });
    } else if (this.values) {
        if (!Array.isArray(this.values)) {
            const err = new Error('Query values must be an array');
            return after(err);
        }
        const vals = this.values.map(utils.prepareValue);
        client.native.query(this.text, vals, after);
    } else if (this.queryMode === 'extended') {
        client.native.query(this.text, [], after);
    } else {
        client.native.query(this.text, after);
    }
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/client.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
const nodeUtils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/util/util.js [client] (ecmascript)");
// eslint-disable-next-line
var Native;
// eslint-disable-next-line no-useless-catch
try {
    // Wrap this `require()` in a try-catch to avoid upstream bundlers from complaining that this might not be available since it is an optional import
    Native = (()=>{
        const e = new Error("Cannot find module 'pg-native'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })();
} catch (e) {
    throw e;
}
const TypeOverrides = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/type-overrides.js [client] (ecmascript)");
const EventEmitter = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/events/events.js [client] (ecmascript)").EventEmitter;
const util = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/util/util.js [client] (ecmascript)");
const ConnectionParameters = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection-parameters.js [client] (ecmascript)");
const NativeQuery = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/query.js [client] (ecmascript)");
const queryQueueLengthDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use asycn/await or an external async flow control mechanism instead.');
const Client = module.exports = function(config) {
    EventEmitter.call(this);
    config = config || {};
    this._Promise = config.Promise || /*TURBOPACK member replacement*/ __turbopack_context__.g.Promise;
    this._types = new TypeOverrides(config.types);
    this.native = new Native({
        types: this._types
    });
    this._queryQueue = [];
    this._ending = false;
    this._connecting = false;
    this._connected = false;
    this._queryable = true;
    // keep these on the object for legacy reasons
    // for the time being. TODO: deprecate all this jazz
    const cp = this.connectionParameters = new ConnectionParameters(config);
    if (config.nativeConnectionString) cp.nativeConnectionString = config.nativeConnectionString;
    this.user = cp.user;
    // "hiding" the password so it doesn't show up in stack traces
    // or if the client is console.logged
    Object.defineProperty(this, 'password', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: cp.password
    });
    this.database = cp.database;
    this.host = cp.host;
    this.port = cp.port;
    // a hash to hold named queries
    this.namedQueries = {};
};
Client.Query = NativeQuery;
util.inherits(Client, EventEmitter);
Client.prototype._errorAllQueries = function(err) {
    const enqueueError = (query)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
            query.native = this.native;
            query.handleError(err);
        });
    };
    if (this._hasActiveQuery()) {
        enqueueError(this._activeQuery);
        this._activeQuery = null;
    }
    this._queryQueue.forEach(enqueueError);
    this._queryQueue.length = 0;
};
// connect to the backend
// pass an optional callback to be called once connected
// or with an error if there was a connection error
Client.prototype._connect = function(cb) {
    const self = this;
    if (this._connecting) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>cb(new Error('Client has already been connected. You cannot reuse a client.')));
        return;
    }
    this._connecting = true;
    this.connectionParameters.getLibpqConnectionString(function(err, conString) {
        if (self.connectionParameters.nativeConnectionString) conString = self.connectionParameters.nativeConnectionString;
        if (err) return cb(err);
        self.native.connect(conString, function(err) {
            if (err) {
                self.native.end();
                return cb(err);
            }
            // set internal states to connected
            self._connected = true;
            // handle connection errors from the native layer
            self.native.on('error', function(err) {
                self._queryable = false;
                self._errorAllQueries(err);
                self.emit('error', err);
            });
            self.native.on('notification', function(msg) {
                self.emit('notification', {
                    channel: msg.relname,
                    payload: msg.extra
                });
            });
            // signal we are connected now
            self.emit('connect');
            self._pulseQueryQueue(true);
            cb(null, this);
        });
    });
};
Client.prototype.connect = function(callback) {
    if (callback) {
        this._connect(callback);
        return;
    }
    return new this._Promise((resolve, reject)=>{
        this._connect((error)=>{
            if (error) {
                reject(error);
            } else {
                resolve(this);
            }
        });
    });
};
// send a query to the server
// this method is highly overloaded to take
// 1) string query, optional array of parameters, optional function callback
// 2) object query with {
//    string query
//    optional array values,
//    optional function callback instead of as a separate parameter
//    optional string name to name & cache the query plan
//    optional string rowMode = 'array' for an array of results
//  }
Client.prototype.query = function(config, values, callback) {
    let query;
    let result;
    let readTimeout;
    let readTimeoutTimer;
    let queryCallback;
    if (config === null || config === undefined) {
        throw new TypeError('Client was passed a null or undefined query');
    } else if (typeof config.submit === 'function') {
        readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
        result = query = config;
        // accept query(new Query(...), (err, res) => { }) style
        if (typeof values === 'function') {
            config.callback = values;
        }
    } else {
        readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
        query = new NativeQuery(config, values, callback);
        if (!query.callback) {
            let resolveOut, rejectOut;
            result = new this._Promise((resolve, reject)=>{
                resolveOut = resolve;
                rejectOut = reject;
            }).catch((err)=>{
                Error.captureStackTrace(err);
                throw err;
            });
            query.callback = (err, res)=>err ? rejectOut(err) : resolveOut(res);
        }
    }
    if (readTimeout) {
        queryCallback = query.callback || (()=>{});
        readTimeoutTimer = setTimeout(()=>{
            const error = new Error('Query read timeout');
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
                query.handleError(error, this.connection);
            });
            queryCallback(error);
            // we already returned an error,
            // just do nothing if query completes
            query.callback = ()=>{};
            // Remove from queue
            const index = this._queryQueue.indexOf(query);
            if (index > -1) {
                this._queryQueue.splice(index, 1);
            }
            this._pulseQueryQueue();
        }, readTimeout);
        query.callback = (err, res)=>{
            clearTimeout(readTimeoutTimer);
            queryCallback(err, res);
        };
    }
    if (!this._queryable) {
        query.native = this.native;
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
            query.handleError(new Error('Client has encountered a connection error and is not queryable'));
        });
        return result;
    }
    if (this._ending) {
        query.native = this.native;
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
            query.handleError(new Error('Client was closed and is not queryable'));
        });
        return result;
    }
    if (this._queryQueue.length > 0) {
        queryQueueLengthDeprecationNotice();
    }
    this._queryQueue.push(query);
    this._pulseQueryQueue();
    return result;
};
// disconnect from the backend server
Client.prototype.end = function(cb) {
    const self = this;
    this._ending = true;
    if (!this._connected) {
        this.once('connect', this.end.bind(this, cb));
    }
    let result;
    if (!cb) {
        result = new this._Promise(function(resolve, reject) {
            cb = (err)=>err ? reject(err) : resolve();
        });
    }
    this.native.end(function() {
        self._connected = false;
        self._errorAllQueries(new Error('Connection terminated'));
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>{
            self.emit('end');
            if (cb) cb();
        });
    });
    return result;
};
Client.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== 'error' && this._activeQuery.state !== 'end';
};
Client.prototype._pulseQueryQueue = function(initialConnection) {
    if (!this._connected) {
        return;
    }
    if (this._hasActiveQuery()) {
        return;
    }
    const query = this._queryQueue.shift();
    if (!query) {
        if (!initialConnection) {
            this.emit('drain');
        }
        return;
    }
    this._activeQuery = query;
    query.submit(this);
    const self = this;
    query.once('_done', function() {
        self._pulseQueryQueue();
    });
};
// attempt to cancel an in-progress query
Client.prototype.cancel = function(query) {
    if (this._activeQuery === query) {
        this.native.cancel(function() {});
    } else if (this._queryQueue.indexOf(query) !== -1) {
        this._queryQueue.splice(this._queryQueue.indexOf(query), 1);
    }
};
Client.prototype.ref = function() {};
Client.prototype.unref = function() {};
Client.prototype.setTypeParser = function(oid, format, parseFn) {
    return this._types.setTypeParser(oid, format, parseFn);
};
Client.prototype.getTypeParser = function(oid, format) {
    return this._types.getTypeParser(oid, format);
};
Client.prototype.isConnected = function() {
    return this._connected;
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/client.js [client] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
const Client = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/client.js [client] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [client] (ecmascript)");
const Connection = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection.js [client] (ecmascript)");
const Result = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/result.js [client] (ecmascript)");
const utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [client] (ecmascript)");
const Pool = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-pool/index.js [client] (ecmascript)");
const TypeOverrides = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/type-overrides.js [client] (ecmascript)");
const { DatabaseError } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/index.js [client] (ecmascript)");
const { escapeIdentifier, escapeLiteral } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [client] (ecmascript)");
const poolFactory = (Client)=>{
    return class BoundPool extends Pool {
        constructor(options){
            super(options, Client);
        }
    };
};
const PG = function(clientConstructor) {
    this.defaults = defaults;
    this.Client = clientConstructor;
    this.Query = this.Client.Query;
    this.Pool = poolFactory(this.Client);
    this._pools = [];
    this.Connection = Connection;
    this.types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [client] (ecmascript)");
    this.DatabaseError = DatabaseError;
    this.TypeOverrides = TypeOverrides;
    this.escapeIdentifier = escapeIdentifier;
    this.escapeLiteral = escapeLiteral;
    this.Result = Result;
    this.utils = utils;
};
let clientConstructor = Client;
let forceNative = false;
try {
    forceNative = !!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NODE_PG_FORCE_NATIVE;
} catch  {
// ignore, e.g., Deno without --allow-env
}
if (forceNative) {
    clientConstructor = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/index.js [client] (ecmascript)");
}
module.exports = new PG(clientConstructor);
// lazy require native module...the native module may not have installed
Object.defineProperty(module.exports, 'native', {
    configurable: true,
    enumerable: false,
    get () {
        let native = null;
        try {
            native = new PG(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/index.js [client] (ecmascript)"));
        } catch (err) {
            if (err.code !== 'MODULE_NOT_FOUND') {
                throw err;
            }
        }
        // overwrite module.exports.native so that getter is never called again
        Object.defineProperty(module.exports, 'native', {
            value: native
        });
        return native;
    }
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/esm/index.mjs [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Client",
    ()=>Client,
    "Connection",
    ()=>Connection,
    "DatabaseError",
    ()=>DatabaseError,
    "Pool",
    ()=>Pool,
    "Query",
    ()=>Query,
    "Result",
    ()=>Result,
    "TypeOverrides",
    ()=>TypeOverrides,
    "default",
    ()=>__TURBOPACK__default__export__,
    "defaults",
    ()=>defaults,
    "escapeIdentifier",
    ()=>escapeIdentifier,
    "escapeLiteral",
    ()=>escapeLiteral,
    "types",
    ()=>types
]);
// ESM wrapper for pg
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/index.js [client] (ecmascript)");
;
const Client = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].Client;
const Pool = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].Pool;
const Connection = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].Connection;
const types = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].types;
const Query = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].Query;
const DatabaseError = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].DatabaseError;
const escapeIdentifier = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].escapeIdentifier;
const escapeLiteral = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].escapeLiteral;
const Result = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].Result;
const TypeOverrides = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].TypeOverrides;
const defaults = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].defaults;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/base64-js/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
    }
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=');
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join('');
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength){
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
    }
    return parts.join('');
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/ieee754/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for(; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8){}
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for(; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8){}
    if (e === 0) {
        e = 1 - eBias;
    } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) {
            value += rt / c;
        } else {
            value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for(; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8){}
    e = e << mLen | m;
    eLen += mLen;
    for(; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8){}
    buffer[offset + i - d] |= s * 128;
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/buffer/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ const base64 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/base64-js/index.js [client] (ecmascript)");
const ieee754 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/ieee754/index.js [client] (ecmascript)");
const customInspectSymbol = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
 : null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
const K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */ Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
}
function typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        const arr = new Uint8Array(1);
        const proto = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Object.defineProperty(Buffer.prototype, 'parent', {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, 'offset', {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    // Return an augmented `Uint8Array` instance
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */ function Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
            throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192; // not used by this implementation
function from(value, encodingOrOffset, length) {
    if (typeof value === 'string') {
        return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
    }
    if (value == null) {
        throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
    }
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === 'number') {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
        return Buffer.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
        return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
    }
    throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ Buffer.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
}
function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
        return createBuffer(size);
    }
    if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpreted as a start offset.
        return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ Buffer.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ Buffer.allocUnsafe = function(size) {
    return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ Buffer.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8';
    }
    if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        buf = buf.slice(0, actual);
    }
    return buf;
}
function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for(let i = 0; i < length; i += 1){
        buf[i] = array[i] & 255;
    }
    return buf;
}
function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === undefined && length === undefined) {
        buf = new Uint8Array(array);
    } else if (length === undefined) {
        buf = new Uint8Array(array, byteOffset);
    } else {
        buf = new Uint8Array(array, byteOffset, length);
    }
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
            return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
            return createBuffer(0);
        }
        return fromArrayLike(obj);
    }
    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
    }
}
function checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
    }
    return length | 0;
}
function SlowBuffer(length) {
    if (+length != length) {
        length = 0;
    }
    return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
Buffer.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for(let i = 0, len = Math.min(x, y); i < len; ++i){
        if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
        }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    switch(String(encoding).toLowerCase()){
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return true;
        default:
            return false;
    }
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
        return Buffer.alloc(0);
    }
    let i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i){
            length += list[i].length;
        }
    }
    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for(i = 0; i < list.length; ++i){
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
                if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
                buf.copy(buffer, pos);
            } else {
                Uint8Array.prototype.set.call(buffer, buf, pos);
            }
        } else if (!Buffer.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
            buf.copy(buffer, pos);
        }
        pos += buf.length;
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) {
        return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
    }
    if (typeof string !== 'string') {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + 'Received type ' + typeof string);
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    let loweredCase = false;
    for(;;){
        switch(encoding){
            case 'ascii':
            case 'latin1':
            case 'binary':
                return len;
            case 'utf8':
            case 'utf-8':
                return utf8ToBytes(string).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return len * 2;
            case 'hex':
                return len >>> 1;
            case 'base64':
                return base64ToBytes(string).length;
            default:
                if (loweredCase) {
                    return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
                    ;
                }
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
        }
    }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
    let loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
        start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
        return '';
    }
    if (end === undefined || end > this.length) {
        end = this.length;
    }
    if (end <= 0) {
        return '';
    }
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
        return '';
    }
    if (!encoding) encoding = 'utf8';
    while(true){
        switch(encoding){
            case 'hex':
                return hexSlice(this, start, end);
            case 'utf8':
            case 'utf-8':
                return utf8Slice(this, start, end);
            case 'ascii':
                return asciiSlice(this, start, end);
            case 'latin1':
            case 'binary':
                return latin1Slice(this, start, end);
            case 'base64':
                return base64Slice(this, start, end);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return utf16leSlice(this, start, end);
            default:
                if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                encoding = (encoding + '').toLowerCase();
                loweredCase = true;
        }
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
    }
    for(let i = 0; i < len; i += 2){
        swap(this, i, i + 1);
    }
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
    }
    for(let i = 0; i < len; i += 4){
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
    }
    for(let i = 0; i < len; i += 8){
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return '';
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    let str = '';
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
    if (this.length > max) str += ' ... ';
    return '<Buffer ' + str + '>';
};
if (customInspectSymbol) {
    Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
}
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
        target = Buffer.from(target, target.offset, target.byteLength);
    }
    if (!Buffer.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + 'Received type ' + typeof target);
    }
    if (start === undefined) {
        start = 0;
    }
    if (end === undefined) {
        end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
        thisStart = 0;
    }
    if (thisEnd === undefined) {
        thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index');
    }
    if (thisStart >= thisEnd && start >= end) {
        return 0;
    }
    if (thisStart >= thisEnd) {
        return -1;
    }
    if (start >= end) {
        return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i = 0; i < len; ++i){
        if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
        }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;
    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset; // Coerce to Number.
    if (numberIsNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : buffer.length - 1;
    }
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    // Normalize val
    if (typeof val === 'string') {
        val = Buffer.from(val, encoding);
    }
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
            return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === 'number') {
        val = val & 0xFF; // Search for a byte value [0-255]
        if (typeof Uint8Array.prototype.indexOf === 'function') {
            if (dir) {
                return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
                return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
        }
        return arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
            if (arr.length < 2 || val.length < 2) {
                return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) {
            return buf[i];
        } else {
            return buf.readUInt16BE(i * indexSize);
        }
    }
    let i;
    if (dir) {
        let foundIndex = -1;
        for(i = byteOffset; i < arrLength; i++){
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                if (foundIndex === -1) foundIndex = i;
                if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
                if (foundIndex !== -1) i -= i - foundIndex;
                foundIndex = -1;
            }
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i = byteOffset; i >= 0; i--){
            let found = true;
            for(let j = 0; j < valLength; j++){
                if (read(arr, i + j) !== read(val, j)) {
                    found = false;
                    break;
                }
            }
            if (found) return i;
        }
    }
    return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
        length = remaining;
    } else {
        length = Number(length);
        if (length > remaining) {
            length = remaining;
        }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
        length = strLen / 2;
    }
    let i;
    for(i = 0; i < length; ++i){
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = 'utf8';
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) encoding = 'utf8';
        } else {
            encoding = length;
            length = undefined;
        }
    } else {
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
    }
    const remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds');
    }
    if (!encoding) encoding = 'utf8';
    let loweredCase = false;
    for(;;){
        switch(encoding){
            case 'hex':
                return hexWrite(this, string, offset, length);
            case 'utf8':
            case 'utf-8':
                return utf8Write(this, string, offset, length);
            case 'ascii':
            case 'latin1':
            case 'binary':
                return asciiWrite(this, string, offset, length);
            case 'base64':
                // Warning: maxLength not taken into account in base64Write
                return base64Write(this, string, offset, length);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return ucs2Write(this, string, offset, length);
            default:
                if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
        }
    }
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
    } else {
        return base64.fromByteArray(buf.slice(start, end));
    }
}
function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while(i < end){
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 0x80) {
                        codePoint = firstByte;
                    }
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                        if (tempCodePoint > 0x7F) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                            codePoint = tempCodePoint;
                        }
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
        ;
    }
    // Decode in chunks to avoid "call stack size exceeded".
    let res = '';
    let i = 0;
    while(i < len){
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
}
function asciiSlice(buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i){
        ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret;
}
function latin1Slice(buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i){
        ret += String.fromCharCode(buf[i]);
    }
    return ret;
}
function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = '';
    for(let i = start; i < end; ++i){
        out += hexSliceLookupTable[buf[i]];
    }
    return out;
}
function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = '';
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(let i = 0; i < bytes.length - 1; i += 2){
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
}
Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) {
        start = len;
    }
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) {
        end = len;
    }
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100)){
        val += this[offset + i] * mul;
    }
    return val;
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
    }
    let val = this[offset + --byteLength];
    let mul = 1;
    while(byteLength > 0 && (mul *= 0x100)){
        val += this[offset + --byteLength] * mul;
    }
    return val;
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
};
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
});
Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
});
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100)){
        val += this[offset + i] * mul;
    }
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let i = byteLength;
    let mul = 1;
    let val = this[offset + --i];
    while(i > 0 && (mul *= 0x100)){
        val += this[offset + --i] * mul;
    }
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24) // Overflow
    ;
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
});
Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
});
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
}
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        this[offset + i] = value / mul & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let i = byteLength - 1;
    let mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        this[offset + i] = value / mul & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
}
function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
}
Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'));
});
Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'));
});
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = byteLength - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
});
Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
});
function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
    if (offset < 0) throw new RangeError('Index out of range');
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
    }
    if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
    if (end < 0) throw new RangeError('sourceEnd out of bounds');
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
        // Use built-in when available, missing from IE11
        this.copyWithin(targetStart, start, end);
    } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    }
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
        if (typeof start === 'string') {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === 'string') {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== 'string') {
            throw new TypeError('encoding must be a string');
        }
        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
            throw new TypeError('Unknown encoding: ' + encoding);
        }
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
                // Fast path: If `val` fits into a single byte, use that numeric value.
                val = code;
            }
        }
    } else if (typeof val === 'number') {
        val = val & 255;
    } else if (typeof val === 'boolean') {
        val = Number(val);
    }
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
    }
    if (end <= start) {
        return this;
    }
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === 'number') {
        for(i = start; i < end; ++i){
            this[i] = val;
        }
    } else {
        const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for(i = 0; i < end - start; ++i){
            this[i + start] = bytes[i % len];
        }
    }
    return this;
};
// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage
const errors = {};
function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
        constructor(){
            super();
            Object.defineProperty(this, 'message', {
                value: getMessage.apply(this, arguments),
                writable: true,
                configurable: true
            });
            // Add the error code to the name to include it in the stack trace.
            this.name = `${this.name} [${sym}]`;
            // Access the stack to generate the error message including the error code
            // from the name.
            this.stack; // eslint-disable-line no-unused-expressions
            // Reset the name to the actual name.
            delete this.name;
        }
        get code() {
            return sym;
        }
        set code(value) {
            Object.defineProperty(this, 'code', {
                configurable: true,
                enumerable: true,
                value,
                writable: true
            });
        }
        toString() {
            return `${this.name} [${sym}]: ${this.message}`;
        }
    };
}
E('ERR_BUFFER_OUT_OF_BOUNDS', function(name) {
    if (name) {
        return `${name} is outside of buffer bounds`;
    }
    return 'Attempt to access memory outside buffer bounds';
}, RangeError);
E('ERR_INVALID_ARG_TYPE', function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
}, TypeError);
E('ERR_OUT_OF_RANGE', function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
    } else if (typeof input === 'bigint') {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
        }
        received += 'n';
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
}, RangeError);
function addNumericalSeparator(val) {
    let res = '';
    let i = val.length;
    const start = val[0] === '-' ? 1 : 0;
    for(; i >= start + 4; i -= 3){
        res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`;
}
// CHECK FUNCTIONS
// ===============
function checkBounds(buf, offset, byteLength) {
    validateNumber(offset, 'offset');
    if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
        boundsError(offset, buf.length - (byteLength + 1));
    }
}
function checkIntBI(value, min, max, buf, offset, byteLength) {
    if (value > max || value < min) {
        const n = typeof min === 'bigint' ? 'n' : '';
        let range;
        if (byteLength > 3) {
            if (min === 0 || min === BigInt(0)) {
                range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
            } else {
                range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` + `${(byteLength + 1) * 8 - 1}${n}`;
            }
        } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE('value', range, value);
    }
    checkBounds(buf, offset, byteLength);
}
function validateNumber(value, name) {
    if (typeof value !== 'number') {
        throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value);
    }
}
function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value);
    }
    if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', `>= ${type ? 1 : 0} and <= ${length}`, value);
}
// HELPER FUNCTIONS
// ================
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split('=')[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return '';
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0){
        str = str + '=';
    }
    return str;
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) {
            // valid bmp char, but last char was a lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else {
            throw new Error('Invalid code point');
        }
    }
    return bytes;
}
function asciiToBytes(str) {
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray;
}
function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
    let i;
    for(i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = function() {
    const alphabet = '0123456789abcdef';
    const table = new Array(256);
    for(let i = 0; i < 16; ++i){
        const i16 = i * 16;
        for(let j = 0; j < 16; ++j){
            table[i16 + j] = alphabet[i] + alphabet[j];
        }
    }
    return table;
}();
// Return not function with Error if BigInt not supported
function defineBigIntMethod(fn) {
    return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
    throw new Error('BigInt not supported');
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/safe-buffer/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/buffer/index.js [client] (ecmascript)");
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for(var key in src){
        dst[key] = src[key];
    }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
} else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
    }
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
    } else {
        buf.fill(0);
    }
    return buf;
};
SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return buffer.SlowBuffer(size);
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/string_decoder/lib/string_decoder.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/*<replacement>*/ var Buffer = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/safe-buffer/index.js [client] (ecmascript)").Buffer;
/*</replacement>*/ var isEncoding = Buffer.isEncoding || function(encoding) {
    encoding = '' + encoding;
    switch(encoding && encoding.toLowerCase()){
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
            return true;
        default:
            return false;
    }
};
function _normalizeEncoding(enc) {
    if (!enc) return 'utf8';
    var retried;
    while(true){
        switch(enc){
            case 'utf8':
            case 'utf-8':
                return 'utf8';
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return 'utf16le';
            case 'latin1':
            case 'binary':
                return 'latin1';
            case 'base64':
            case 'ascii':
            case 'hex':
                return enc;
            default:
                if (retried) return; // undefined
                enc = ('' + enc).toLowerCase();
                retried = true;
        }
    }
}
;
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
    return nenc || enc;
}
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch(this.encoding){
        case 'utf16le':
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
        case 'utf8':
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
        case 'base64':
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
        default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer.allocUnsafe(nb);
}
StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return '';
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
    } else {
        i = 0;
    }
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || '';
};
StringDecoder.prototype.end = utf8End;
// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
    if (byte <= 0x7F) return 0;
    else if (byte >> 5 === 0x06) return 2;
    else if (byte >> 4 === 0x0E) return 3;
    else if (byte >> 3 === 0x1E) return 4;
    return byte >> 6 === 0x02 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return '\ufffd';
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return '\ufffd';
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
                self.lastNeed = 2;
                return '\ufffd';
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString('utf8', i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString('utf8', i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + '\ufffd';
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString('utf16le', i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
    }
    return r;
}
function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString('base64', i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
    } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString('base64', i, buf.length - n);
}
function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : '';
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-connection-string/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
//Parse method copied from https://github.com/brianc/node-postgres
//Copyright (c) 2010-2014 Brian Carlson (brian.m.carlson@gmail.com)
//MIT License
//parses a connection string
function parse(str, options = {}) {
    //unix socket
    if (str.charAt(0) === '/') {
        const config = str.split(' ');
        return {
            host: config[0],
            database: config[1]
        };
    }
    // Check for empty host in URL
    const config = {};
    let result;
    let dummyHost = false;
    if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str)) {
        // Ensure spaces are encoded as %20
        str = encodeURI(str).replace(/%25(\d\d)/g, '%$1');
    }
    try {
        try {
            result = new URL(str, 'postgres://base');
        } catch (e) {
            // The URL is invalid so try again with a dummy host
            result = new URL(str.replace('@/', '@___DUMMY___/'), 'postgres://base');
            dummyHost = true;
        }
    } catch (err) {
        // Remove the input from the error message to avoid leaking sensitive information
        err.input && (err.input = '*****REDACTED*****');
        throw err;
    }
    // We'd like to use Object.fromEntries() here but Node.js 10 does not support it
    for (const entry of result.searchParams.entries()){
        config[entry[0]] = entry[1];
    }
    config.user = config.user || decodeURIComponent(result.username);
    config.password = config.password || decodeURIComponent(result.password);
    if (result.protocol == 'socket:') {
        config.host = decodeURI(result.pathname);
        config.database = result.searchParams.get('db');
        config.client_encoding = result.searchParams.get('encoding');
        return config;
    }
    const hostname = dummyHost ? '' : result.hostname;
    if (!config.host) {
        // Only set the host if there is no equivalent query param.
        config.host = decodeURIComponent(hostname);
    } else if (hostname && /^%2f/i.test(hostname)) {
        // Only prepend the hostname to the pathname if it is not a URL encoded Unix socket host.
        result.pathname = hostname + result.pathname;
    }
    if (!config.port) {
        // Only set the port if there is no equivalent query param.
        config.port = result.port;
    }
    const pathname = result.pathname.slice(1) || null;
    config.database = pathname ? decodeURI(pathname) : null;
    if (config.ssl === 'true' || config.ssl === '1') {
        config.ssl = true;
    }
    if (config.ssl === '0') {
        config.ssl = false;
    }
    if (config.sslcert || config.sslkey || config.sslrootcert || config.sslmode) {
        config.ssl = {};
    }
    // Only try to load fs if we expect to read from the disk
    const fs = config.sslcert || config.sslkey || config.sslrootcert ? (()=>{
        const e = new Error("Cannot find module 'fs'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })() : null;
    if (config.sslcert) {
        config.ssl.cert = fs.readFileSync(config.sslcert).toString();
    }
    if (config.sslkey) {
        config.ssl.key = fs.readFileSync(config.sslkey).toString();
    }
    if (config.sslrootcert) {
        config.ssl.ca = fs.readFileSync(config.sslrootcert).toString();
    }
    if (options.useLibpqCompat && config.uselibpqcompat) {
        throw new Error('Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.');
    }
    if (config.uselibpqcompat === 'true' || options.useLibpqCompat) {
        switch(config.sslmode){
            case 'disable':
                {
                    config.ssl = false;
                    break;
                }
            case 'prefer':
                {
                    config.ssl.rejectUnauthorized = false;
                    break;
                }
            case 'require':
                {
                    if (config.sslrootcert) {
                        // If a root CA is specified, behavior of `sslmode=require` will be the same as that of `verify-ca`
                        config.ssl.checkServerIdentity = function() {};
                    } else {
                        config.ssl.rejectUnauthorized = false;
                    }
                    break;
                }
            case 'verify-ca':
                {
                    if (!config.ssl.ca) {
                        throw new Error('SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security.');
                    }
                    config.ssl.checkServerIdentity = function() {};
                    break;
                }
            case 'verify-full':
                {
                    break;
                }
        }
    } else {
        switch(config.sslmode){
            case 'disable':
                {
                    config.ssl = false;
                    break;
                }
            case 'prefer':
            case 'require':
            case 'verify-ca':
            case 'verify-full':
                {
                    if (config.sslmode !== 'verify-full') {
                        deprecatedSslModeWarning(config.sslmode);
                    }
                    break;
                }
            case 'no-verify':
                {
                    config.ssl.rejectUnauthorized = false;
                    break;
                }
        }
    }
    return config;
}
// convert pg-connection-string ssl config to a ClientConfig.ConnectionOptions
function toConnectionOptions(sslConfig) {
    const connectionOptions = Object.entries(sslConfig).reduce((c, [key, value])=>{
        // we explicitly check for undefined and null instead of `if (value)` because some
        // options accept falsy values. Example: `ssl.rejectUnauthorized = false`
        if (value !== undefined && value !== null) {
            c[key] = value;
        }
        return c;
    }, {});
    return connectionOptions;
}
// convert pg-connection-string config to a ClientConfig
function toClientConfig(config) {
    const poolConfig = Object.entries(config).reduce((c, [key, value])=>{
        if (key === 'ssl') {
            const sslConfig = value;
            if (typeof sslConfig === 'boolean') {
                c[key] = sslConfig;
            }
            if (typeof sslConfig === 'object') {
                c[key] = toConnectionOptions(sslConfig);
            }
        } else if (value !== undefined && value !== null) {
            if (key === 'port') {
                // when port is not specified, it is converted into an empty string
                // we want to avoid NaN or empty string as a values in ClientConfig
                if (value !== '') {
                    const v = parseInt(value, 10);
                    if (isNaN(v)) {
                        throw new Error(`Invalid ${key}: ${value}`);
                    }
                    c[key] = v;
                }
            } else {
                c[key] = value;
            }
        }
        return c;
    }, {});
    return poolConfig;
}
// parses a connection string into ClientConfig
function parseIntoClientConfig(str) {
    return toClientConfig(parse(str));
}
function deprecatedSslModeWarning(sslmode) {
    if (!deprecatedSslModeWarning.warned && typeof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].emitWarning) {
        deprecatedSslModeWarning.warned = true;
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].emitWarning(`SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.
In the next major version (pg-connection-string v3.0.0 and pg v9.0.0), these modes will adopt standard libpq semantics, which have weaker security guarantees.

To prepare for this change:
- If you want the current behavior, explicitly use 'sslmode=verify-full'
- If you want libpq compatibility now, use 'uselibpqcompat=true&sslmode=${sslmode}'

See https://www.postgresql.org/docs/current/libpq-ssl.html for libpq SSL mode definitions.`);
    }
}
module.exports = parse;
parse.parse = parse;
parse.toClientConfig = toClientConfig;
parse.parseIntoClientConfig = parseIntoClientConfig;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/messages.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoticeMessage = exports.DataRowMessage = exports.CommandCompleteMessage = exports.ReadyForQueryMessage = exports.NotificationResponseMessage = exports.BackendKeyDataMessage = exports.AuthenticationMD5Password = exports.ParameterStatusMessage = exports.ParameterDescriptionMessage = exports.RowDescriptionMessage = exports.Field = exports.CopyResponse = exports.CopyDataMessage = exports.DatabaseError = exports.copyDone = exports.emptyQuery = exports.replicationStart = exports.portalSuspended = exports.noData = exports.closeComplete = exports.bindComplete = exports.parseComplete = void 0;
exports.parseComplete = {
    name: 'parseComplete',
    length: 5
};
exports.bindComplete = {
    name: 'bindComplete',
    length: 5
};
exports.closeComplete = {
    name: 'closeComplete',
    length: 5
};
exports.noData = {
    name: 'noData',
    length: 5
};
exports.portalSuspended = {
    name: 'portalSuspended',
    length: 5
};
exports.replicationStart = {
    name: 'replicationStart',
    length: 4
};
exports.emptyQuery = {
    name: 'emptyQuery',
    length: 4
};
exports.copyDone = {
    name: 'copyDone',
    length: 4
};
class DatabaseError extends Error {
    constructor(message, length, name){
        super(message);
        this.length = length;
        this.name = name;
    }
}
exports.DatabaseError = DatabaseError;
class CopyDataMessage {
    constructor(length, chunk){
        this.length = length;
        this.chunk = chunk;
        this.name = 'copyData';
    }
}
exports.CopyDataMessage = CopyDataMessage;
class CopyResponse {
    constructor(length, name, binary, columnCount){
        this.length = length;
        this.name = name;
        this.binary = binary;
        this.columnTypes = new Array(columnCount);
    }
}
exports.CopyResponse = CopyResponse;
class Field {
    constructor(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format){
        this.name = name;
        this.tableID = tableID;
        this.columnID = columnID;
        this.dataTypeID = dataTypeID;
        this.dataTypeSize = dataTypeSize;
        this.dataTypeModifier = dataTypeModifier;
        this.format = format;
    }
}
exports.Field = Field;
class RowDescriptionMessage {
    constructor(length, fieldCount){
        this.length = length;
        this.fieldCount = fieldCount;
        this.name = 'rowDescription';
        this.fields = new Array(this.fieldCount);
    }
}
exports.RowDescriptionMessage = RowDescriptionMessage;
class ParameterDescriptionMessage {
    constructor(length, parameterCount){
        this.length = length;
        this.parameterCount = parameterCount;
        this.name = 'parameterDescription';
        this.dataTypeIDs = new Array(this.parameterCount);
    }
}
exports.ParameterDescriptionMessage = ParameterDescriptionMessage;
class ParameterStatusMessage {
    constructor(length, parameterName, parameterValue){
        this.length = length;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.name = 'parameterStatus';
    }
}
exports.ParameterStatusMessage = ParameterStatusMessage;
class AuthenticationMD5Password {
    constructor(length, salt){
        this.length = length;
        this.salt = salt;
        this.name = 'authenticationMD5Password';
    }
}
exports.AuthenticationMD5Password = AuthenticationMD5Password;
class BackendKeyDataMessage {
    constructor(length, processID, secretKey){
        this.length = length;
        this.processID = processID;
        this.secretKey = secretKey;
        this.name = 'backendKeyData';
    }
}
exports.BackendKeyDataMessage = BackendKeyDataMessage;
class NotificationResponseMessage {
    constructor(length, processId, channel, payload){
        this.length = length;
        this.processId = processId;
        this.channel = channel;
        this.payload = payload;
        this.name = 'notification';
    }
}
exports.NotificationResponseMessage = NotificationResponseMessage;
class ReadyForQueryMessage {
    constructor(length, status){
        this.length = length;
        this.status = status;
        this.name = 'readyForQuery';
    }
}
exports.ReadyForQueryMessage = ReadyForQueryMessage;
class CommandCompleteMessage {
    constructor(length, text){
        this.length = length;
        this.text = text;
        this.name = 'commandComplete';
    }
}
exports.CommandCompleteMessage = CommandCompleteMessage;
class DataRowMessage {
    constructor(length, fields){
        this.length = length;
        this.fields = fields;
        this.name = 'dataRow';
        this.fieldCount = fields.length;
    }
}
exports.DataRowMessage = DataRowMessage;
class NoticeMessage {
    constructor(length, message){
        this.length = length;
        this.message = message;
        this.name = 'notice';
    }
}
exports.NoticeMessage = NoticeMessage; //# sourceMappingURL=messages.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/buffer-writer.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
"use strict";
//binary data writer tuned for encoding binary specific to the postgres binary protocol
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Writer = void 0;
class Writer {
    constructor(size = 256){
        this.size = size;
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(size);
    }
    ensure(size) {
        const remaining = this.buffer.length - this.offset;
        if (remaining < size) {
            const oldBuffer = this.buffer;
            // exponential growth factor of around ~ 1.5
            // https://stackoverflow.com/questions/2269063/buffer-growth-strategy
            const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
            this.buffer = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(newSize);
            oldBuffer.copy(this.buffer);
        }
    }
    addInt32(num) {
        this.ensure(4);
        this.buffer[this.offset++] = num >>> 24 & 0xff;
        this.buffer[this.offset++] = num >>> 16 & 0xff;
        this.buffer[this.offset++] = num >>> 8 & 0xff;
        this.buffer[this.offset++] = num >>> 0 & 0xff;
        return this;
    }
    addInt16(num) {
        this.ensure(2);
        this.buffer[this.offset++] = num >>> 8 & 0xff;
        this.buffer[this.offset++] = num >>> 0 & 0xff;
        return this;
    }
    addCString(string) {
        if (!string) {
            this.ensure(1);
        } else {
            const len = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].byteLength(string);
            this.ensure(len + 1); // +1 for null terminator
            this.buffer.write(string, this.offset, 'utf-8');
            this.offset += len;
        }
        this.buffer[this.offset++] = 0; // null terminator
        return this;
    }
    addString(string = '') {
        const len = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].byteLength(string);
        this.ensure(len);
        this.buffer.write(string, this.offset);
        this.offset += len;
        return this;
    }
    add(otherBuffer) {
        this.ensure(otherBuffer.length);
        otherBuffer.copy(this.buffer, this.offset);
        this.offset += otherBuffer.length;
        return this;
    }
    join(code) {
        if (code) {
            this.buffer[this.headerPosition] = code;
            //length is everything in this packet minus the code
            const length = this.offset - (this.headerPosition + 1);
            this.buffer.writeInt32BE(length, this.headerPosition + 1);
        }
        return this.buffer.slice(code ? 0 : 5, this.offset);
    }
    flush(code) {
        const result = this.join(code);
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(this.size);
        return result;
    }
}
exports.Writer = Writer; //# sourceMappingURL=buffer-writer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/serializer.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serialize = void 0;
const buffer_writer_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/buffer-writer.js [client] (ecmascript)");
const writer = new buffer_writer_1.Writer();
const startup = (opts)=>{
    // protocol version
    writer.addInt16(3).addInt16(0);
    for (const key of Object.keys(opts)){
        writer.addCString(key).addCString(opts[key]);
    }
    writer.addCString('client_encoding').addCString('UTF8');
    const bodyBuffer = writer.addCString('').flush();
    // this message is sent without a code
    const length = bodyBuffer.length + 4;
    return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
};
const requestSsl = ()=>{
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(8);
    response.writeInt32BE(8, 0);
    response.writeInt32BE(80877103, 4);
    return response;
};
const password = (password)=>{
    return writer.addCString(password).flush(112 /* code.startup */ );
};
const sendSASLInitialResponseMessage = function(mechanism, initialResponse) {
    // 0x70 = 'p'
    writer.addCString(mechanism).addInt32(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].byteLength(initialResponse)).addString(initialResponse);
    return writer.flush(112 /* code.startup */ );
};
const sendSCRAMClientFinalMessage = function(additionalData) {
    return writer.addString(additionalData).flush(112 /* code.startup */ );
};
const query = (text)=>{
    return writer.addCString(text).flush(81 /* code.query */ );
};
const emptyArray = [];
const parse = (query)=>{
    // expect something like this:
    // { name: 'queryName',
    //   text: 'select * from blah',
    //   types: ['int8', 'bool'] }
    // normalize missing query names to allow for null
    const name = query.name || '';
    if (name.length > 63) {
        console.error('Warning! Postgres only supports 63 characters for query names.');
        console.error('You supplied %s (%s)', name, name.length);
        console.error('This can cause conflicts and silent errors executing queries');
    }
    const types = query.types || emptyArray;
    const len = types.length;
    const buffer = writer.addCString(name) // name of query
    .addCString(query.text) // actual query text
    .addInt16(len);
    for(let i = 0; i < len; i++){
        buffer.addInt32(types[i]);
    }
    return writer.flush(80 /* code.parse */ );
};
const paramWriter = new buffer_writer_1.Writer();
const writeValues = function(values, valueMapper) {
    for(let i = 0; i < values.length; i++){
        const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
        if (mappedVal == null) {
            // add the param type (string) to the writer
            writer.addInt16(0 /* ParamType.STRING */ );
            // write -1 to the param writer to indicate null
            paramWriter.addInt32(-1);
        } else if (mappedVal instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"]) {
            // add the param type (binary) to the writer
            writer.addInt16(1 /* ParamType.BINARY */ );
            // add the buffer to the param writer
            paramWriter.addInt32(mappedVal.length);
            paramWriter.add(mappedVal);
        } else {
            // add the param type (string) to the writer
            writer.addInt16(0 /* ParamType.STRING */ );
            paramWriter.addInt32(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].byteLength(mappedVal));
            paramWriter.addString(mappedVal);
        }
    }
};
const bind = (config = {})=>{
    // normalize config
    const portal = config.portal || '';
    const statement = config.statement || '';
    const binary = config.binary || false;
    const values = config.values || emptyArray;
    const len = values.length;
    writer.addCString(portal).addCString(statement);
    writer.addInt16(len);
    writeValues(values, config.valueMapper);
    writer.addInt16(len);
    writer.add(paramWriter.flush());
    // all results use the same format code
    writer.addInt16(1);
    // format code
    writer.addInt16(binary ? 1 /* ParamType.BINARY */  : 0 /* ParamType.STRING */ );
    return writer.flush(66 /* code.bind */ );
};
const emptyExecute = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from([
    69 /* code.execute */ ,
    0x00,
    0x00,
    0x00,
    0x09,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00
]);
const execute = (config)=>{
    // this is the happy path for most queries
    if (!config || !config.portal && !config.rows) {
        return emptyExecute;
    }
    const portal = config.portal || '';
    const rows = config.rows || 0;
    const portalLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].byteLength(portal);
    const len = 4 + portalLength + 1 + 4;
    // one extra bit for code
    const buff = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(1 + len);
    buff[0] = 69 /* code.execute */ ;
    buff.writeInt32BE(len, 1);
    buff.write(portal, 5, 'utf-8');
    buff[portalLength + 5] = 0; // null terminate portal cString
    buff.writeUInt32BE(rows, buff.length - 4);
    return buff;
};
const cancel = (processID, secretKey)=>{
    const buffer = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(16);
    buffer.writeInt32BE(16, 0);
    buffer.writeInt16BE(1234, 4);
    buffer.writeInt16BE(5678, 6);
    buffer.writeInt32BE(processID, 8);
    buffer.writeInt32BE(secretKey, 12);
    return buffer;
};
const cstringMessage = (code, string)=>{
    const stringLen = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].byteLength(string);
    const len = 4 + stringLen + 1;
    // one extra bit for code
    const buffer = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(1 + len);
    buffer[0] = code;
    buffer.writeInt32BE(len, 1);
    buffer.write(string, 5, 'utf-8');
    buffer[len] = 0; // null terminate cString
    return buffer;
};
const emptyDescribePortal = writer.addCString('P').flush(68 /* code.describe */ );
const emptyDescribeStatement = writer.addCString('S').flush(68 /* code.describe */ );
const describe = (msg)=>{
    return msg.name ? cstringMessage(68 /* code.describe */ , `${msg.type}${msg.name || ''}`) : msg.type === 'P' ? emptyDescribePortal : emptyDescribeStatement;
};
const close = (msg)=>{
    const text = `${msg.type}${msg.name || ''}`;
    return cstringMessage(67 /* code.close */ , text);
};
const copyData = (chunk)=>{
    return writer.add(chunk).flush(100 /* code.copyFromChunk */ );
};
const copyFail = (message)=>{
    return cstringMessage(102 /* code.copyFail */ , message);
};
const codeOnlyBuffer = (code)=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].from([
        code,
        0x00,
        0x00,
        0x00,
        0x04
    ]);
const flushBuffer = codeOnlyBuffer(72 /* code.flush */ );
const syncBuffer = codeOnlyBuffer(83 /* code.sync */ );
const endBuffer = codeOnlyBuffer(88 /* code.end */ );
const copyDoneBuffer = codeOnlyBuffer(99 /* code.copyDone */ );
const serialize = {
    startup,
    password,
    requestSsl,
    sendSASLInitialResponseMessage,
    sendSCRAMClientFinalMessage,
    query,
    parse,
    bind,
    execute,
    describe,
    close,
    flush: ()=>flushBuffer,
    sync: ()=>syncBuffer,
    end: ()=>endBuffer,
    copyData,
    copyDone: ()=>copyDoneBuffer,
    copyFail,
    cancel
};
exports.serialize = serialize; //# sourceMappingURL=serializer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/buffer-reader.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BufferReader = void 0;
class BufferReader {
    constructor(offset = 0){
        this.offset = offset;
        this.buffer = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(0);
        // TODO(bmc): support non-utf8 encoding?
        this.encoding = 'utf-8';
    }
    setBuffer(offset, buffer) {
        this.offset = offset;
        this.buffer = buffer;
    }
    int16() {
        const result = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return result;
    }
    byte() {
        const result = this.buffer[this.offset];
        this.offset++;
        return result;
    }
    int32() {
        const result = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return result;
    }
    uint32() {
        const result = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return result;
    }
    string(length) {
        const result = this.buffer.toString(this.encoding, this.offset, this.offset + length);
        this.offset += length;
        return result;
    }
    cstring() {
        const start = this.offset;
        let end = start;
        // eslint-disable-next-line no-empty
        while(this.buffer[end++] !== 0){}
        this.offset = end;
        return this.buffer.toString(this.encoding, start, end - 1);
    }
    bytes(length) {
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
    }
}
exports.BufferReader = BufferReader; //# sourceMappingURL=buffer-reader.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/parser.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/buffer/index.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Parser = void 0;
const messages_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/messages.js [client] (ecmascript)");
const buffer_reader_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/buffer-reader.js [client] (ecmascript)");
// every message is prefixed with a single bye
const CODE_LENGTH = 1;
// every message has an int32 length which includes itself but does
// NOT include the code in the length
const LEN_LENGTH = 4;
const HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
// A placeholder for a `BackendMessage`’s length value that will be set after construction.
const LATEINIT_LENGTH = -1;
const emptyBuffer = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(0);
class Parser {
    constructor(opts){
        this.buffer = emptyBuffer;
        this.bufferLength = 0;
        this.bufferOffset = 0;
        this.reader = new buffer_reader_1.BufferReader();
        if ((opts === null || opts === void 0 ? void 0 : opts.mode) === 'binary') {
            throw new Error('Binary mode not supported yet');
        }
        this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || 'text';
    }
    parse(buffer, callback) {
        this.mergeBuffer(buffer);
        const bufferFullLength = this.bufferOffset + this.bufferLength;
        let offset = this.bufferOffset;
        while(offset + HEADER_LENGTH <= bufferFullLength){
            // code is 1 byte long - it identifies the message type
            const code = this.buffer[offset];
            // length is 1 Uint32BE - it is the length of the message EXCLUDING the code
            const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
            const fullMessageLength = CODE_LENGTH + length;
            if (fullMessageLength + offset <= bufferFullLength) {
                const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
                callback(message);
                offset += fullMessageLength;
            } else {
                break;
            }
        }
        if (offset === bufferFullLength) {
            // No more use for the buffer
            this.buffer = emptyBuffer;
            this.bufferLength = 0;
            this.bufferOffset = 0;
        } else {
            // Adjust the cursors of remainingBuffer
            this.bufferLength = bufferFullLength - offset;
            this.bufferOffset = offset;
        }
    }
    mergeBuffer(buffer) {
        if (this.bufferLength > 0) {
            const newLength = this.bufferLength + buffer.byteLength;
            const newFullLength = newLength + this.bufferOffset;
            if (newFullLength > this.buffer.byteLength) {
                // We can't concat the new buffer with the remaining one
                let newBuffer;
                if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
                    // We can move the relevant part to the beginning of the buffer instead of allocating a new buffer
                    newBuffer = this.buffer;
                } else {
                    // Allocate a new larger buffer
                    let newBufferLength = this.buffer.byteLength * 2;
                    while(newLength >= newBufferLength){
                        newBufferLength *= 2;
                    }
                    newBuffer = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(newBufferLength);
                }
                // Move the remaining buffer to the new one
                this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
                this.buffer = newBuffer;
                this.bufferOffset = 0;
            }
            // Concat the new buffer with the remaining one
            buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
            this.bufferLength = newLength;
        } else {
            this.buffer = buffer;
            this.bufferOffset = 0;
            this.bufferLength = buffer.byteLength;
        }
    }
    handlePacket(offset, code, length, bytes) {
        const { reader } = this;
        // NOTE: This undesirably retains the buffer in `this.reader` if the `parse*Message` calls below throw. However, those should only throw in the case of a protocol error, which normally results in the reader being discarded.
        reader.setBuffer(offset, bytes);
        let message;
        switch(code){
            case 50 /* MessageCodes.BindComplete */ :
                message = messages_1.bindComplete;
                break;
            case 49 /* MessageCodes.ParseComplete */ :
                message = messages_1.parseComplete;
                break;
            case 51 /* MessageCodes.CloseComplete */ :
                message = messages_1.closeComplete;
                break;
            case 110 /* MessageCodes.NoData */ :
                message = messages_1.noData;
                break;
            case 115 /* MessageCodes.PortalSuspended */ :
                message = messages_1.portalSuspended;
                break;
            case 99 /* MessageCodes.CopyDone */ :
                message = messages_1.copyDone;
                break;
            case 87 /* MessageCodes.ReplicationStart */ :
                message = messages_1.replicationStart;
                break;
            case 73 /* MessageCodes.EmptyQuery */ :
                message = messages_1.emptyQuery;
                break;
            case 68 /* MessageCodes.DataRow */ :
                message = parseDataRowMessage(reader);
                break;
            case 67 /* MessageCodes.CommandComplete */ :
                message = parseCommandCompleteMessage(reader);
                break;
            case 90 /* MessageCodes.ReadyForQuery */ :
                message = parseReadyForQueryMessage(reader);
                break;
            case 65 /* MessageCodes.NotificationResponse */ :
                message = parseNotificationMessage(reader);
                break;
            case 82 /* MessageCodes.AuthenticationResponse */ :
                message = parseAuthenticationResponse(reader, length);
                break;
            case 83 /* MessageCodes.ParameterStatus */ :
                message = parseParameterStatusMessage(reader);
                break;
            case 75 /* MessageCodes.BackendKeyData */ :
                message = parseBackendKeyData(reader);
                break;
            case 69 /* MessageCodes.ErrorMessage */ :
                message = parseErrorMessage(reader, 'error');
                break;
            case 78 /* MessageCodes.NoticeMessage */ :
                message = parseErrorMessage(reader, 'notice');
                break;
            case 84 /* MessageCodes.RowDescriptionMessage */ :
                message = parseRowDescriptionMessage(reader);
                break;
            case 116 /* MessageCodes.ParameterDescriptionMessage */ :
                message = parseParameterDescriptionMessage(reader);
                break;
            case 71 /* MessageCodes.CopyIn */ :
                message = parseCopyInMessage(reader);
                break;
            case 72 /* MessageCodes.CopyOut */ :
                message = parseCopyOutMessage(reader);
                break;
            case 100 /* MessageCodes.CopyData */ :
                message = parseCopyData(reader, length);
                break;
            default:
                return new messages_1.DatabaseError('received invalid response: ' + code.toString(16), length, 'error');
        }
        reader.setBuffer(0, emptyBuffer);
        message.length = length;
        return message;
    }
}
exports.Parser = Parser;
const parseReadyForQueryMessage = (reader)=>{
    const status = reader.string(1);
    return new messages_1.ReadyForQueryMessage(LATEINIT_LENGTH, status);
};
const parseCommandCompleteMessage = (reader)=>{
    const text = reader.cstring();
    return new messages_1.CommandCompleteMessage(LATEINIT_LENGTH, text);
};
const parseCopyData = (reader, length)=>{
    const chunk = reader.bytes(length - 4);
    return new messages_1.CopyDataMessage(LATEINIT_LENGTH, chunk);
};
const parseCopyInMessage = (reader)=>parseCopyMessage(reader, 'copyInResponse');
const parseCopyOutMessage = (reader)=>parseCopyMessage(reader, 'copyOutResponse');
const parseCopyMessage = (reader, messageName)=>{
    const isBinary = reader.byte() !== 0;
    const columnCount = reader.int16();
    const message = new messages_1.CopyResponse(LATEINIT_LENGTH, messageName, isBinary, columnCount);
    for(let i = 0; i < columnCount; i++){
        message.columnTypes[i] = reader.int16();
    }
    return message;
};
const parseNotificationMessage = (reader)=>{
    const processId = reader.int32();
    const channel = reader.cstring();
    const payload = reader.cstring();
    return new messages_1.NotificationResponseMessage(LATEINIT_LENGTH, processId, channel, payload);
};
const parseRowDescriptionMessage = (reader)=>{
    const fieldCount = reader.int16();
    const message = new messages_1.RowDescriptionMessage(LATEINIT_LENGTH, fieldCount);
    for(let i = 0; i < fieldCount; i++){
        message.fields[i] = parseField(reader);
    }
    return message;
};
const parseField = (reader)=>{
    const name = reader.cstring();
    const tableID = reader.uint32();
    const columnID = reader.int16();
    const dataTypeID = reader.uint32();
    const dataTypeSize = reader.int16();
    const dataTypeModifier = reader.int32();
    const mode = reader.int16() === 0 ? 'text' : 'binary';
    return new messages_1.Field(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
};
const parseParameterDescriptionMessage = (reader)=>{
    const parameterCount = reader.int16();
    const message = new messages_1.ParameterDescriptionMessage(LATEINIT_LENGTH, parameterCount);
    for(let i = 0; i < parameterCount; i++){
        message.dataTypeIDs[i] = reader.int32();
    }
    return message;
};
const parseDataRowMessage = (reader)=>{
    const fieldCount = reader.int16();
    const fields = new Array(fieldCount);
    for(let i = 0; i < fieldCount; i++){
        const len = reader.int32();
        // a -1 for length means the value of the field is null
        fields[i] = len === -1 ? null : reader.string(len);
    }
    return new messages_1.DataRowMessage(LATEINIT_LENGTH, fields);
};
const parseParameterStatusMessage = (reader)=>{
    const name = reader.cstring();
    const value = reader.cstring();
    return new messages_1.ParameterStatusMessage(LATEINIT_LENGTH, name, value);
};
const parseBackendKeyData = (reader)=>{
    const processID = reader.int32();
    const secretKey = reader.int32();
    return new messages_1.BackendKeyDataMessage(LATEINIT_LENGTH, processID, secretKey);
};
const parseAuthenticationResponse = (reader, length)=>{
    const code = reader.int32();
    // TODO(bmc): maybe better types here
    const message = {
        name: 'authenticationOk',
        length
    };
    switch(code){
        case 0:
            break;
        case 3:
            if (message.length === 8) {
                message.name = 'authenticationCleartextPassword';
            }
            break;
        case 5:
            if (message.length === 12) {
                message.name = 'authenticationMD5Password';
                const salt = reader.bytes(4);
                return new messages_1.AuthenticationMD5Password(LATEINIT_LENGTH, salt);
            }
            break;
        case 10:
            {
                message.name = 'authenticationSASL';
                message.mechanisms = [];
                let mechanism;
                do {
                    mechanism = reader.cstring();
                    if (mechanism) {
                        message.mechanisms.push(mechanism);
                    }
                }while (mechanism)
            }
            break;
        case 11:
            message.name = 'authenticationSASLContinue';
            message.data = reader.string(length - 8);
            break;
        case 12:
            message.name = 'authenticationSASLFinal';
            message.data = reader.string(length - 8);
            break;
        default:
            throw new Error('Unknown authenticationOk message type ' + code);
    }
    return message;
};
const parseErrorMessage = (reader, name)=>{
    const fields = {};
    let fieldType = reader.string(1);
    while(fieldType !== '\0'){
        fields[fieldType] = reader.cstring();
        fieldType = reader.string(1);
    }
    const messageValue = fields.M;
    const message = name === 'notice' ? new messages_1.NoticeMessage(LATEINIT_LENGTH, messageValue) : new messages_1.DatabaseError(messageValue, LATEINIT_LENGTH, name);
    message.severity = fields.S;
    message.code = fields.C;
    message.detail = fields.D;
    message.hint = fields.H;
    message.position = fields.P;
    message.internalPosition = fields.p;
    message.internalQuery = fields.q;
    message.where = fields.W;
    message.schema = fields.s;
    message.table = fields.t;
    message.column = fields.c;
    message.dataType = fields.d;
    message.constraint = fields.n;
    message.file = fields.F;
    message.line = fields.L;
    message.routine = fields.R;
    return message;
}; //# sourceMappingURL=parser.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatabaseError = exports.serialize = exports.parse = void 0;
const messages_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/messages.js [client] (ecmascript)");
Object.defineProperty(exports, "DatabaseError", {
    enumerable: true,
    get: function() {
        return messages_1.DatabaseError;
    }
});
const serializer_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/serializer.js [client] (ecmascript)");
Object.defineProperty(exports, "serialize", {
    enumerable: true,
    get: function() {
        return serializer_1.serialize;
    }
});
const parser_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/parser.js [client] (ecmascript)");
function parse(stream, callback) {
    const parser = new parser_1.Parser();
    stream.on('data', (buffer)=>parser.parse(buffer, callback));
    return new Promise((resolve)=>stream.on('end', ()=>resolve()));
}
exports.parse = parse; //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-cloudflare/dist/empty.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// This is an empty module that is served up when outside of a workerd environment
// See the `exports` field in package.json
exports.default = {}; //# sourceMappingURL=empty.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/split2/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*
Copyright (c) 2014-2021, Matteo Collina <hello@matteocollina.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/ const { Transform } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/stream-browserify/index.js [client] (ecmascript)");
const { StringDecoder } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/string_decoder/lib/string_decoder.js [client] (ecmascript)");
const kLast = Symbol('last');
const kDecoder = Symbol('decoder');
function transform(chunk, enc, cb) {
    let list;
    if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb() // Line ending not found. Discard entire chunk.
        ;
        // Line ending found. Discard trailing fragment of previous line and reset overflow state.
        list.shift();
        this.overflow = false;
    } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
    }
    this[kLast] = list.pop();
    for(let i = 0; i < list.length; i++){
        try {
            push(this, this.mapper(list[i]));
        } catch (error) {
            return cb(error);
        }
    }
    this.overflow = this[kLast].length > this.maxLength;
    if (this.overflow && !this.skipOverflow) {
        cb(new Error('maximum buffer reached'));
        return;
    }
    cb();
}
function flush(cb) {
    // forward any gibberish left in there
    this[kLast] += this[kDecoder].end();
    if (this[kLast]) {
        try {
            push(this, this.mapper(this[kLast]));
        } catch (error) {
            return cb(error);
        }
    }
    cb();
}
function push(self, val) {
    if (val !== undefined) {
        self.push(val);
    }
}
function noop(incoming) {
    return incoming;
}
function split(matcher, mapper, options) {
    // Set defaults for any arguments not supplied.
    matcher = matcher || /\r?\n/;
    mapper = mapper || noop;
    options = options || {};
    // Test arguments explicitly.
    switch(arguments.length){
        case 1:
            // If mapper is only argument.
            if (typeof matcher === 'function') {
                mapper = matcher;
                matcher = /\r?\n/;
            // If options is only argument.
            } else if (typeof matcher === 'object' && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
                options = matcher;
                matcher = /\r?\n/;
            }
            break;
        case 2:
            // If mapper and options are arguments.
            if (typeof matcher === 'function') {
                options = mapper;
                mapper = matcher;
                matcher = /\r?\n/;
            // If matcher and options are arguments.
            } else if (typeof mapper === 'object') {
                options = mapper;
                mapper = noop;
            }
    }
    options = Object.assign({}, options);
    options.autoDestroy = true;
    options.transform = transform;
    options.flush = flush;
    options.readableObjectMode = true;
    const stream = new Transform(options);
    stream[kLast] = '';
    stream[kDecoder] = new StringDecoder('utf8');
    stream.matcher = matcher;
    stream.mapper = mapper;
    stream.maxLength = options.maxLength;
    stream.skipOverflow = options.skipOverflow || false;
    stream.overflow = false;
    stream._destroy = function(err, cb) {
        // Weird Node v12 bug that we need to work around
        this._writableState.errorEmitted = false;
        cb(err);
    };
    return stream;
}
module.exports = split;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pgpass/lib/helper.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
var path = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/path-browserify/index.js [client] (ecmascript)"), Stream = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/stream-browserify/index.js [client] (ecmascript)").Stream, split = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/split2/index.js [client] (ecmascript)"), util = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/util/util.js [client] (ecmascript)"), defaultPort = 5432, isWin = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].platform === 'win32', warnStream = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].stderr;
var S_IRWXG = 56 //    00070(8)
, S_IRWXO = 7 //    00007(8)
, S_IFMT = 61440 // 00170000(8)
, S_IFREG = 32768 //  0100000(8)
;
function isRegFile(mode) {
    return (mode & S_IFMT) == S_IFREG;
}
var fieldNames = [
    'host',
    'port',
    'database',
    'user',
    'password'
];
var nrOfFields = fieldNames.length;
var passKey = fieldNames[nrOfFields - 1];
function warn() {
    var isWritable = warnStream instanceof Stream && true === warnStream.writable;
    if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util.format.apply(util, args));
    }
}
Object.defineProperty(module.exports, 'isWin', {
    get: function() {
        return isWin;
    },
    set: function(val) {
        isWin = val;
    }
});
module.exports.warnTo = function(stream) {
    var old = warnStream;
    warnStream = stream;
    return old;
};
module.exports.getFileName = function(rawEnv) {
    var env = rawEnv || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env;
    var file = env.PGPASSFILE || (isWin ? path.join(env.APPDATA || './', 'postgresql', 'pgpass.conf') : path.join(env.HOME || './', '.pgpass'));
    return file;
};
module.exports.usePgPass = function(stats, fname) {
    if (Object.prototype.hasOwnProperty.call(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env, 'PGPASSWORD')) {
        return false;
    }
    if (isWin) {
        return true;
    }
    fname = fname || '<unkn>';
    if (!isRegFile(stats.mode)) {
        warn('WARNING: password file "%s" is not a plain file', fname);
        return false;
    }
    if (stats.mode & (S_IRWXG | S_IRWXO)) {
        /* If password file is insecure, alert the user and ignore it. */ warn('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
    }
    return true;
};
var matcher = module.exports.match = function(connInfo, entry) {
    return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
            // the port
            if (Number(connInfo[field] || defaultPort) === Number(entry[field])) {
                return prev && true;
            }
        }
        return prev && (entry[field] === '*' || entry[field] === connInfo[field]);
    }, true);
};
module.exports.getPassword = function(connInfo, stream, cb) {
    var pass;
    var lineStream = stream.pipe(split());
    function onLine(line) {
        var entry = parseLine(line);
        if (entry && isValidEntry(entry) && matcher(connInfo, entry)) {
            pass = entry[passKey];
            lineStream.end(); // -> calls onEnd(), but pass is set now
        }
    }
    var onEnd = function() {
        stream.destroy();
        cb(pass);
    };
    var onErr = function(err) {
        stream.destroy();
        warn('WARNING: error on reading file: %s', err);
        cb(undefined);
    };
    stream.on('error', onErr);
    lineStream.on('data', onLine).on('end', onEnd).on('error', onErr);
};
var parseLine = module.exports.parseLine = function(line) {
    if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
    }
    var curChar = '';
    var prevChar = '';
    var fieldIdx = 0;
    var startIdx = 0;
    var endIdx = 0;
    var obj = {};
    var isLastField = false;
    var addToObj = function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env, 'PGPASS_NO_DEESCAPE')) {
            field = field.replace(/\\([:\\])/g, '$1');
        }
        obj[fieldNames[idx]] = field;
    };
    for(var i = 0; i < line.length - 1; i += 1){
        curChar = line.charAt(i + 1);
        prevChar = line.charAt(i);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
            addToObj(fieldIdx, startIdx);
            break;
        }
        if (i >= 0 && curChar == ':' && prevChar !== '\\') {
            addToObj(fieldIdx, startIdx, i + 1);
            startIdx = i + 2;
            fieldIdx += 1;
        }
    }
    obj = Object.keys(obj).length === nrOfFields ? obj : null;
    return obj;
};
var isValidEntry = module.exports.isValidEntry = function(entry) {
    var rules = {
        // host
        0: function(x) {
            return x.length > 0;
        },
        // port
        1: function(x) {
            if (x === '*') {
                return true;
            }
            x = Number(x);
            return isFinite(x) && x > 0 && x < 9007199254740992 && Math.floor(x) === x;
        },
        // database
        2: function(x) {
            return x.length > 0;
        },
        // username
        3: function(x) {
            return x.length > 0;
        },
        // password
        4: function(x) {
            return x.length > 0;
        }
    };
    for(var idx = 0; idx < fieldNames.length; idx += 1){
        var rule = rules[idx];
        var value = entry[fieldNames[idx]] || '';
        var res = rule(value);
        if (!res) {
            return false;
        }
    }
    return true;
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pgpass/lib/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var path = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/path-browserify/index.js [client] (ecmascript)"), fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})(), helper = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pgpass/lib/helper.js [client] (ecmascript)");
module.exports = function(connInfo, cb) {
    var file = helper.getFileName();
    fs.stat(file, function(err, stat) {
        if (err || !helper.usePgPass(stat, file)) {
            return cb(undefined);
        }
        var st = fs.createReadStream(file);
        helper.getPassword(connInfo, st, cb);
    });
};
module.exports.warnTo = helper.warnTo;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-pool/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
const EventEmitter = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/events/events.js [client] (ecmascript)").EventEmitter;
const NOOP = function() {};
const removeWhere = (list, predicate)=>{
    const i = list.findIndex(predicate);
    return i === -1 ? undefined : list.splice(i, 1)[0];
};
class IdleItem {
    constructor(client, idleListener, timeoutId){
        this.client = client;
        this.idleListener = idleListener;
        this.timeoutId = timeoutId;
    }
}
class PendingItem {
    constructor(callback){
        this.callback = callback;
    }
}
function throwOnDoubleRelease() {
    throw new Error('Release called on client which has already been released to the pool.');
}
function promisify(Promise, callback) {
    if (callback) {
        return {
            callback: callback,
            result: undefined
        };
    }
    let rej;
    let res;
    const cb = function(err, client) {
        err ? rej(err) : res(client);
    };
    const result = new Promise(function(resolve, reject) {
        res = resolve;
        rej = reject;
    }).catch((err)=>{
        // replace the stack trace that leads to `TCP.onStreamRead` with one that leads back to the
        // application that created the query
        Error.captureStackTrace(err);
        throw err;
    });
    return {
        callback: cb,
        result: result
    };
}
function makeIdleListener(pool, client) {
    return function idleListener(err) {
        err.client = client;
        client.removeListener('error', idleListener);
        client.on('error', ()=>{
            pool.log('additional client error after disconnection due to error', err);
        });
        pool._remove(client);
        // TODO - document that once the pool emits an error
        // the client has already been closed & purged and is unusable
        pool.emit('error', err, client);
    };
}
class Pool extends EventEmitter {
    constructor(options, Client){
        super();
        this.options = Object.assign({}, options);
        if (options != null && 'password' in options) {
            // "hiding" the password so it doesn't show up in stack traces
            // or if the client is console.logged
            Object.defineProperty(this.options, 'password', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: options.password
            });
        }
        if (options != null && options.ssl && options.ssl.key) {
            // "hiding" the ssl->key so it doesn't show up in stack traces
            // or if the client is console.logged
            Object.defineProperty(this.options.ssl, 'key', {
                enumerable: false
            });
        }
        this.options.max = this.options.max || this.options.poolSize || 10;
        this.options.min = this.options.min || 0;
        this.options.maxUses = this.options.maxUses || Infinity;
        this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
        this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
        this.log = this.options.log || function() {};
        this.Client = this.options.Client || Client || __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/index.js [client] (ecmascript)").Client;
        this.Promise = this.options.Promise || /*TURBOPACK member replacement*/ __turbopack_context__.g.Promise;
        if (typeof this.options.idleTimeoutMillis === 'undefined') {
            this.options.idleTimeoutMillis = 10000;
        }
        this._clients = [];
        this._idle = [];
        this._expired = new WeakSet();
        this._pendingQueue = [];
        this._endCallback = undefined;
        this.ending = false;
        this.ended = false;
    }
    _isFull() {
        return this._clients.length >= this.options.max;
    }
    _isAboveMin() {
        return this._clients.length > this.options.min;
    }
    _pulseQueue() {
        this.log('pulse queue');
        if (this.ended) {
            this.log('pulse queue ended');
            return;
        }
        if (this.ending) {
            this.log('pulse queue on ending');
            if (this._idle.length) {
                this._idle.slice().map((item)=>{
                    this._remove(item.client);
                });
            }
            if (!this._clients.length) {
                this.ended = true;
                this._endCallback();
            }
            return;
        }
        // if we don't have any waiting, do nothing
        if (!this._pendingQueue.length) {
            this.log('no queued requests');
            return;
        }
        // if we don't have any idle clients and we have no more room do nothing
        if (!this._idle.length && this._isFull()) {
            return;
        }
        const pendingItem = this._pendingQueue.shift();
        if (this._idle.length) {
            const idleItem = this._idle.pop();
            clearTimeout(idleItem.timeoutId);
            const client = idleItem.client;
            client.ref && client.ref();
            const idleListener = idleItem.idleListener;
            return this._acquireClient(client, pendingItem, idleListener, false);
        }
        if (!this._isFull()) {
            return this.newClient(pendingItem);
        }
        throw new Error('unexpected condition');
    }
    _remove(client, callback) {
        const removed = removeWhere(this._idle, (item)=>item.client === client);
        if (removed !== undefined) {
            clearTimeout(removed.timeoutId);
        }
        this._clients = this._clients.filter((c)=>c !== client);
        const context = this;
        client.end(()=>{
            context.emit('remove', client);
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
    connect(cb) {
        if (this.ending) {
            const err = new Error('Cannot use a pool after calling end on the pool');
            return cb ? cb(err) : this.Promise.reject(err);
        }
        const response = promisify(this.Promise, cb);
        const result = response.result;
        // if we don't have to connect a new client, don't do so
        if (this._isFull() || this._idle.length) {
            // if we have idle clients schedule a pulse immediately
            if (this._idle.length) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].nextTick(()=>this._pulseQueue());
            }
            if (!this.options.connectionTimeoutMillis) {
                this._pendingQueue.push(new PendingItem(response.callback));
                return result;
            }
            const queueCallback = (err, res, done)=>{
                clearTimeout(tid);
                response.callback(err, res, done);
            };
            const pendingItem = new PendingItem(queueCallback);
            // set connection timeout on checking out an existing client
            const tid = setTimeout(()=>{
                // remove the callback from pending waiters because
                // we're going to call it with a timeout error
                removeWhere(this._pendingQueue, (i)=>i.callback === queueCallback);
                pendingItem.timedOut = true;
                response.callback(new Error('timeout exceeded when trying to connect'));
            }, this.options.connectionTimeoutMillis);
            if (tid.unref) {
                tid.unref();
            }
            this._pendingQueue.push(pendingItem);
            return result;
        }
        this.newClient(new PendingItem(response.callback));
        return result;
    }
    newClient(pendingItem) {
        const client = new this.Client(this.options);
        this._clients.push(client);
        const idleListener = makeIdleListener(this, client);
        this.log('checking client timeout');
        // connection timeout logic
        let tid;
        let timeoutHit = false;
        if (this.options.connectionTimeoutMillis) {
            tid = setTimeout(()=>{
                if (client.connection) {
                    this.log('ending client due to timeout');
                    timeoutHit = true;
                    client.connection.stream.destroy();
                } else if (!client.isConnected()) {
                    this.log('ending client due to timeout');
                    timeoutHit = true;
                    // force kill the node driver, and let libpq do its teardown
                    client.end();
                }
            }, this.options.connectionTimeoutMillis);
        }
        this.log('connecting new client');
        client.connect((err)=>{
            if (tid) {
                clearTimeout(tid);
            }
            client.on('error', idleListener);
            if (err) {
                this.log('client failed to connect', err);
                // remove the dead client from our list of clients
                this._clients = this._clients.filter((c)=>c !== client);
                if (timeoutHit) {
                    err = new Error('Connection terminated due to connection timeout', {
                        cause: err
                    });
                }
                // this client won’t be released, so move on immediately
                this._pulseQueue();
                if (!pendingItem.timedOut) {
                    pendingItem.callback(err, undefined, NOOP);
                }
            } else {
                this.log('new client connected');
                if (this.options.maxLifetimeSeconds !== 0) {
                    const maxLifetimeTimeout = setTimeout(()=>{
                        this.log('ending client due to expired lifetime');
                        this._expired.add(client);
                        const idleIndex = this._idle.findIndex((idleItem)=>idleItem.client === client);
                        if (idleIndex !== -1) {
                            this._acquireClient(client, new PendingItem((err, client, clientRelease)=>clientRelease()), idleListener, false);
                        }
                    }, this.options.maxLifetimeSeconds * 1000);
                    maxLifetimeTimeout.unref();
                    client.once('end', ()=>clearTimeout(maxLifetimeTimeout));
                }
                return this._acquireClient(client, pendingItem, idleListener, true);
            }
        });
    }
    // acquire a client for a pending work item
    _acquireClient(client, pendingItem, idleListener, isNew) {
        if (isNew) {
            this.emit('connect', client);
        }
        this.emit('acquire', client);
        client.release = this._releaseOnce(client, idleListener);
        client.removeListener('error', idleListener);
        if (!pendingItem.timedOut) {
            if (isNew && this.options.verify) {
                this.options.verify(client, (err)=>{
                    if (err) {
                        client.release(err);
                        return pendingItem.callback(err, undefined, NOOP);
                    }
                    pendingItem.callback(undefined, client, client.release);
                });
            } else {
                pendingItem.callback(undefined, client, client.release);
            }
        } else {
            if (isNew && this.options.verify) {
                this.options.verify(client, client.release);
            } else {
                client.release();
            }
        }
    }
    // returns a function that wraps _release and throws if called more than once
    _releaseOnce(client, idleListener) {
        let released = false;
        return (err)=>{
            if (released) {
                throwOnDoubleRelease();
            }
            released = true;
            this._release(client, idleListener, err);
        };
    }
    // release a client back to the poll, include an error
    // to remove it from the pool
    _release(client, idleListener, err) {
        client.on('error', idleListener);
        client._poolUseCount = (client._poolUseCount || 0) + 1;
        this.emit('release', err, client);
        // TODO(bmc): expose a proper, public interface _queryable and _ending
        if (err || this.ending || !client._queryable || client._ending || client._poolUseCount >= this.options.maxUses) {
            if (client._poolUseCount >= this.options.maxUses) {
                this.log('remove expended client');
            }
            return this._remove(client, this._pulseQueue.bind(this));
        }
        const isExpired = this._expired.has(client);
        if (isExpired) {
            this.log('remove expired client');
            this._expired.delete(client);
            return this._remove(client, this._pulseQueue.bind(this));
        }
        // idle timeout
        let tid;
        if (this.options.idleTimeoutMillis && this._isAboveMin()) {
            tid = setTimeout(()=>{
                if (this._isAboveMin()) {
                    this.log('remove idle client');
                    this._remove(client, this._pulseQueue.bind(this));
                }
            }, this.options.idleTimeoutMillis);
            if (this.options.allowExitOnIdle) {
                // allow Node to exit if this is all that's left
                tid.unref();
            }
        }
        if (this.options.allowExitOnIdle) {
            client.unref();
        }
        this._idle.push(new IdleItem(client, idleListener, tid));
        this._pulseQueue();
    }
    query(text, values, cb) {
        // guard clause against passing a function as the first parameter
        if (typeof text === 'function') {
            const response = promisify(this.Promise, text);
            setImmediate(function() {
                return response.callback(new Error('Passing a function as the first parameter to pool.query is not supported'));
            });
            return response.result;
        }
        // allow plain text query without values
        if (typeof values === 'function') {
            cb = values;
            values = undefined;
        }
        const response = promisify(this.Promise, cb);
        cb = response.callback;
        this.connect((err, client)=>{
            if (err) {
                return cb(err);
            }
            let clientReleased = false;
            const onError = (err)=>{
                if (clientReleased) {
                    return;
                }
                clientReleased = true;
                client.release(err);
                cb(err);
            };
            client.once('error', onError);
            this.log('dispatching query');
            try {
                client.query(text, values, (err, res)=>{
                    this.log('query dispatched');
                    client.removeListener('error', onError);
                    if (clientReleased) {
                        return;
                    }
                    clientReleased = true;
                    client.release(err);
                    if (err) {
                        return cb(err);
                    }
                    return cb(undefined, res);
                });
            } catch (err) {
                client.release(err);
                return cb(err);
            }
        });
        return response.result;
    }
    end(cb) {
        this.log('ending');
        if (this.ending) {
            const err = new Error('Called end on pool more than once');
            return cb ? cb(err) : this.Promise.reject(err);
        }
        this.ending = true;
        const promised = promisify(this.Promise, cb);
        this._endCallback = promised.callback;
        this._pulseQueue();
        return promised.result;
    }
    get waitingCount() {
        return this._pendingQueue.length;
    }
    get idleCount() {
        return this._idle.length;
    }
    get expiredCount() {
        return this._clients.reduce((acc, client)=>acc + (this._expired.has(client) ? 1 : 0), 0);
    }
    get totalCount() {
        return this._clients.length;
    }
}
module.exports = Pool;
}),
]);

//# debugId=b0ce7392-fac7-7912-f4fc-b84185c1eb1d
//# sourceMappingURL=c427b_e963b9c0._.js.map