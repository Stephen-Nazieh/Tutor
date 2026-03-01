;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="1be07685-47f4-6dd1-dfba-fb79586c5f8c")}catch(e){}}();
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
]);

//# debugId=1be07685-47f4-6dd1-dfba-fb79586c5f8c
//# sourceMappingURL=c427b_2283f7b9._.js.map