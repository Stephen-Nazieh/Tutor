;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="5e451ca9-8c50-631c-62b8-e14172dc9379")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMPTY_ARRAY",
    ()=>EMPTY_ARRAY,
    "attach",
    ()=>attach,
    "detach",
    ()=>detach,
    "equals",
    ()=>equals,
    "hasReactors",
    ()=>hasReactors,
    "haveParentsChanged",
    ()=>haveParentsChanged,
    "singleton",
    ()=>singleton
]);
function isChild(x) {
    return x && typeof x === "object" && "parents" in x;
}
function haveParentsChanged(child) {
    for(let i = 0, n = child.parents.length; i < n; i++){
        child.parents[i].__unsafe__getWithoutCapture(true);
        if (child.parents[i].lastChangedEpoch !== child.parentEpochs[i]) {
            return true;
        }
    }
    return false;
}
function detach(parent, child) {
    if (!parent.children.remove(child)) {
        return;
    }
    if (parent.children.isEmpty && isChild(parent)) {
        for(let i = 0, n = parent.parents.length; i < n; i++){
            detach(parent.parents[i], parent);
        }
    }
}
function attach(parent, child) {
    if (!parent.children.add(child)) {
        return;
    }
    if (isChild(parent)) {
        for(let i = 0, n = parent.parents.length; i < n; i++){
            attach(parent.parents[i], parent);
        }
    }
}
function equals(a, b) {
    const shallowEquals = a === b || Object.is(a, b) || Boolean(a && b && typeof a.equals === "function" && a.equals(b));
    return shallowEquals;
}
function singleton(key, init) {
    const symbol = Symbol.for(`com.tldraw.state/${key}`);
    const global = globalThis;
    global[symbol] ??= init();
    return global[symbol];
}
const EMPTY_ARRAY = singleton("empty_array", ()=>Object.freeze([]));
function hasReactors(signal) {
    for (const child of signal.children){
        if (child.isActivelyListening) {
            return true;
        }
    }
    return false;
}
;
 //# sourceMappingURL=helpers.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/ArraySet.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ARRAY_SIZE_THRESHOLD",
    ()=>ARRAY_SIZE_THRESHOLD,
    "ArraySet",
    ()=>ArraySet
]);
const ARRAY_SIZE_THRESHOLD = 8;
class ArraySet {
    arraySize = 0;
    array = Array(ARRAY_SIZE_THRESHOLD);
    set = null;
    /**
   * Get whether this ArraySet has any elements.
   *
   * @returns True if this ArraySet has any elements, false otherwise.
   */ // eslint-disable-next-line no-restricted-syntax
    get isEmpty() {
        if (this.array) {
            return this.arraySize === 0;
        }
        if (this.set) {
            return this.set.size === 0;
        }
        throw new Error("no set or array");
    }
    /**
   * Add an element to the ArraySet if it is not already present.
   *
   * @param elem - The element to add to the set
   * @returns `true` if the element was added, `false` if it was already present
   * @example
   * ```ts
   * const arraySet = new ArraySet<string>()
   *
   * console.log(arraySet.add('hello')) // true
   * console.log(arraySet.add('hello')) // false (already exists)
   * ```
   */ add(elem) {
        if (this.array) {
            const idx = this.array.indexOf(elem);
            if (idx !== -1) {
                return false;
            }
            if (this.arraySize < ARRAY_SIZE_THRESHOLD) {
                this.array[this.arraySize] = elem;
                this.arraySize++;
                return true;
            } else {
                this.set = new Set(this.array);
                this.array = null;
                this.set.add(elem);
                return true;
            }
        }
        if (this.set) {
            if (this.set.has(elem)) {
                return false;
            }
            this.set.add(elem);
            return true;
        }
        throw new Error("no set or array");
    }
    /**
   * Remove an element from the ArraySet if it is present.
   *
   * @param elem - The element to remove from the set
   * @returns `true` if the element was removed, `false` if it was not present
   * @example
   * ```ts
   * const arraySet = new ArraySet<string>()
   * arraySet.add('hello')
   *
   * console.log(arraySet.remove('hello')) // true
   * console.log(arraySet.remove('hello')) // false (not present)
   * ```
   */ remove(elem) {
        if (this.array) {
            const idx = this.array.indexOf(elem);
            if (idx === -1) {
                return false;
            }
            this.array[idx] = void 0;
            this.arraySize--;
            if (idx !== this.arraySize) {
                this.array[idx] = this.array[this.arraySize];
                this.array[this.arraySize] = void 0;
            }
            return true;
        }
        if (this.set) {
            if (!this.set.has(elem)) {
                return false;
            }
            this.set.delete(elem);
            return true;
        }
        throw new Error("no set or array");
    }
    /**
   * Execute a callback function for each element in the ArraySet.
   *
   * @param visitor - A function to call for each element in the set
   * @example
   * ```ts
   * const arraySet = new ArraySet<string>()
   * arraySet.add('hello')
   * arraySet.add('world')
   *
   * arraySet.visit((item) => {
   *   console.log(item) // 'hello', 'world'
   * })
   * ```
   */ visit(visitor) {
        if (this.array) {
            for(let i = 0; i < this.arraySize; i++){
                const elem = this.array[i];
                if (typeof elem !== "undefined") {
                    visitor(elem);
                }
            }
            return;
        }
        if (this.set) {
            this.set.forEach(visitor);
            return;
        }
        throw new Error("no set or array");
    }
    /**
   * Make the ArraySet iterable, allowing it to be used in for...of loops and with spread syntax.
   *
   * @returns An iterator that yields each element in the set
   * @example
   * ```ts
   * const arraySet = new ArraySet<number>()
   * arraySet.add(1)
   * arraySet.add(2)
   *
   * for (const item of arraySet) {
   *   console.log(item) // 1, 2
   * }
   *
   * const items = [...arraySet] // [1, 2]
   * ```
   */ *[Symbol.iterator]() {
        if (this.array) {
            for(let i = 0; i < this.arraySize; i++){
                const elem = this.array[i];
                if (typeof elem !== "undefined") {
                    yield elem;
                }
            }
        } else if (this.set) {
            yield* this.set;
        } else {
            throw new Error("no set or array");
        }
    }
    /**
   * Check whether an element is present in the ArraySet.
   *
   * @param elem - The element to check for
   * @returns `true` if the element is present, `false` otherwise
   * @example
   * ```ts
   * const arraySet = new ArraySet<string>()
   * arraySet.add('hello')
   *
   * console.log(arraySet.has('hello')) // true
   * console.log(arraySet.has('world')) // false
   * ```
   */ has(elem) {
        if (this.array) {
            return this.array.indexOf(elem) !== -1;
        } else {
            return this.set.has(elem);
        }
    }
    /**
   * Remove all elements from the ArraySet.
   *
   * @example
   * ```ts
   * const arraySet = new ArraySet<string>()
   * arraySet.add('hello')
   * arraySet.add('world')
   *
   * arraySet.clear()
   * console.log(arraySet.size()) // 0
   * ```
   */ clear() {
        if (this.set) {
            this.set.clear();
        } else {
            this.arraySize = 0;
            this.array = [];
        }
    }
    /**
   * Get the number of elements in the ArraySet.
   *
   * @returns The number of elements in the set
   * @example
   * ```ts
   * const arraySet = new ArraySet<string>()
   * console.log(arraySet.size()) // 0
   *
   * arraySet.add('hello')
   * console.log(arraySet.size()) // 1
   * ```
   */ size() {
        if (this.set) {
            return this.set.size;
        } else {
            return this.arraySize;
        }
    }
}
;
 //# sourceMappingURL=ArraySet.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/types.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RESET_VALUE",
    ()=>RESET_VALUE
]);
const RESET_VALUE = Symbol.for("com.tldraw.state/RESET_VALUE");
;
 //# sourceMappingURL=types.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/HistoryBuffer.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HistoryBuffer",
    ()=>HistoryBuffer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/types.mjs [app-client] (ecmascript)");
;
class HistoryBuffer {
    /**
   * Creates a new HistoryBuffer with the specified capacity.
   *
   * capacity - Maximum number of diffs to store in the buffer
   * @example
   * ```ts
   * const buffer = new HistoryBuffer<number>(10) // Store up to 10 diffs
   * ```
   */ constructor(capacity){
        this.capacity = capacity;
        this.buffer = new Array(capacity);
    }
    /**
   * Current write position in the circular buffer.
   * @internal
   */ index = 0;
    /**
   * Circular buffer storing range tuples. Uses undefined to represent empty slots.
   * @internal
   */ buffer;
    /**
   * Adds a diff entry to the history buffer, representing a change between two epochs.
   *
   * If the diff is undefined, the operation is ignored. If the diff is RESET_VALUE,
   * the entire buffer is cleared to indicate that historical tracking should restart.
   *
   * @param lastComputedEpoch - The epoch when the previous value was computed
   * @param currentEpoch - The epoch when the current value was computed
   * @param diff - The diff representing the change, or RESET_VALUE to clear history
   * @example
   * ```ts
   * const buffer = new HistoryBuffer<string>(5)
   * buffer.pushEntry(0, 1, 'added text')
   * buffer.pushEntry(1, 2, RESET_VALUE) // Clears the buffer
   * ```
   */ pushEntry(lastComputedEpoch, currentEpoch, diff) {
        if (diff === void 0) {
            return;
        }
        if (diff === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESET_VALUE"]) {
            this.clear();
            return;
        }
        this.buffer[this.index] = [
            lastComputedEpoch,
            currentEpoch,
            diff
        ];
        this.index = (this.index + 1) % this.capacity;
    }
    /**
   * Clears all entries from the history buffer and resets the write position.
   * This is called when a RESET_VALUE diff is encountered.
   *
   * @example
   * ```ts
   * const buffer = new HistoryBuffer<string>(5)
   * buffer.pushEntry(0, 1, 'change')
   * buffer.clear()
   * console.log(buffer.getChangesSince(0)) // RESET_VALUE
   * ```
   */ clear() {
        this.index = 0;
        this.buffer.fill(void 0);
    }
    /**
   * Retrieves all diffs that occurred since the specified epoch.
   *
   * The method searches backwards through the circular buffer to find changes
   * that occurred after the given epoch. If insufficient history is available
   * or the requested epoch is too old, returns RESET_VALUE indicating that
   * a complete state rebuild is required.
   *
   * @param sinceEpoch - The epoch from which to retrieve changes
   * @returns Array of diffs since the epoch, or RESET_VALUE if history is insufficient
   * @example
   * ```ts
   * const buffer = new HistoryBuffer<string>(5)
   * buffer.pushEntry(0, 1, 'first')
   * buffer.pushEntry(1, 2, 'second')
   * const changes = buffer.getChangesSince(0) // ['first', 'second']
   * const recentChanges = buffer.getChangesSince(1) // ['second']
   * const tooOld = buffer.getChangesSince(-100) // RESET_VALUE
   * ```
   */ getChangesSince(sinceEpoch) {
        const { index, capacity, buffer } = this;
        for(let i = 0; i < capacity; i++){
            const offset = (index - 1 + capacity - i) % capacity;
            const elem = buffer[offset];
            if (!elem) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESET_VALUE"];
            }
            const [fromEpoch, toEpoch] = elem;
            if (i === 0 && sinceEpoch >= toEpoch) {
                return [];
            }
            if (fromEpoch <= sinceEpoch && sinceEpoch < toEpoch) {
                const len = i + 1;
                const result = new Array(len);
                for(let j = 0; j < len; j++){
                    result[j] = buffer[(offset + j) % capacity][2];
                }
                return result;
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESET_VALUE"];
    }
}
;
 //# sourceMappingURL=HistoryBuffer.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/constants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GLOBAL_START_EPOCH",
    ()=>GLOBAL_START_EPOCH
]);
const GLOBAL_START_EPOCH = -1;
;
 //# sourceMappingURL=constants.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EffectScheduler",
    ()=>EffectScheduler,
    "react",
    ()=>react,
    "reactor",
    ()=>reactor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/ArraySet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/capture.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/transactions.mjs [app-client] (ecmascript)");
;
;
;
;
;
class __EffectScheduler__ {
    constructor(name, runEffect, options){
        this.name = name;
        this.runEffect = runEffect;
        this._scheduleEffect = options?.scheduleEffect;
    }
    /** @internal */ _isActivelyListening = false;
    /**
   * Whether this scheduler is attached and actively listening to its parents.
   * @public
   */ // eslint-disable-next-line no-restricted-syntax
    get isActivelyListening() {
        return this._isActivelyListening;
    }
    /** @internal */ lastTraversedEpoch = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_START_EPOCH"];
    /** @internal */ lastReactedEpoch = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_START_EPOCH"];
    /** @internal */ _scheduleCount = 0;
    /** @internal */ __debug_ancestor_epochs__ = null;
    /**
   * The number of times this effect has been scheduled.
   * @public
   */ // eslint-disable-next-line no-restricted-syntax
    get scheduleCount() {
        return this._scheduleCount;
    }
    /** @internal */ parentSet = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySet"]();
    /** @internal */ parentEpochs = [];
    /** @internal */ parents = [];
    /** @internal */ _scheduleEffect;
    /** @internal */ maybeScheduleEffect() {
        if (!this._isActivelyListening) return;
        if (this.lastReactedEpoch === (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])()) return;
        if (this.parents.length && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haveParentsChanged"])(this)) {
            this.lastReactedEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])();
            return;
        }
        this.scheduleEffect();
    }
    /** @internal */ scheduleEffect() {
        this._scheduleCount++;
        if (this._scheduleEffect) {
            this._scheduleEffect(this.maybeExecute);
        } else {
            this.execute();
        }
    }
    /** @internal */ // eslint-disable-next-line local/prefer-class-methods
    maybeExecute = ()=>{
        if (!this._isActivelyListening) return;
        this.execute();
    };
    /**
   * Makes this scheduler become 'actively listening' to its parents.
   * If it has been executed before it will immediately become eligible to receive 'maybeScheduleEffect' calls.
   * If it has not executed before it will need to be manually executed once to become eligible for scheduling, i.e. by calling `EffectScheduler.execute`.
   * @public
   */ attach() {
        this._isActivelyListening = true;
        for(let i = 0, n = this.parents.length; i < n; i++){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attach"])(this.parents[i], this);
        }
    }
    /**
   * Makes this scheduler stop 'actively listening' to its parents.
   * It will no longer be eligible to receive 'maybeScheduleEffect' calls until `EffectScheduler.attach` is called again.
   * @public
   */ detach() {
        this._isActivelyListening = false;
        for(let i = 0, n = this.parents.length; i < n; i++){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detach"])(this.parents[i], this);
        }
    }
    /**
   * Executes the effect immediately and returns the result.
   * @returns The result of the effect.
   * @public
   */ execute() {
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startCapturingParents"])(this);
            const currentEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])();
            const result = this.runEffect(this.lastReactedEpoch);
            this.lastReactedEpoch = currentEpoch;
            return result;
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopCapturingParents"])();
        }
    }
}
const EffectScheduler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleton"])("EffectScheduler", ()=>__EffectScheduler__);
function react(name, fn, options) {
    const scheduler = new EffectScheduler(name, fn, options);
    scheduler.attach();
    scheduler.scheduleEffect();
    return ()=>{
        scheduler.detach();
    };
}
function reactor(name, fn, options) {
    const scheduler = new EffectScheduler(name, fn, options);
    return {
        scheduler,
        start: (options2)=>{
            const force = options2?.force ?? false;
            scheduler.attach();
            if (force) {
                scheduler.scheduleEffect();
            } else {
                scheduler.maybeScheduleEffect();
            }
        },
        stop: ()=>{
            scheduler.detach();
        }
    };
}
;
 //# sourceMappingURL=EffectScheduler.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/transactions.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "advanceGlobalEpoch",
    ()=>advanceGlobalEpoch,
    "atomDidChange",
    ()=>atomDidChange,
    "deferAsyncEffects",
    ()=>deferAsyncEffects,
    "getGlobalEpoch",
    ()=>getGlobalEpoch,
    "getIsReacting",
    ()=>getIsReacting,
    "getReactionEpoch",
    ()=>getReactionEpoch,
    "transact",
    ()=>transact,
    "transaction",
    ()=>transaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)");
;
;
;
class Transaction {
    constructor(parent, isSync){
        this.parent = parent;
        this.isSync = isSync;
    }
    asyncProcessCount = 0;
    initialAtomValues = /* @__PURE__ */ new Map();
    /**
   * Get whether this transaction is a root (no parents).
   *
   * @public
   */ // eslint-disable-next-line no-restricted-syntax
    get isRoot() {
        return this.parent === null;
    }
    /**
   * Commit the transaction's changes.
   *
   * @public
   */ commit() {
        if (inst.globalIsReacting) {
            for (const atom of this.initialAtomValues.keys()){
                traverseAtomForCleanup(atom);
            }
        } else if (this.isRoot) {
            flushChanges(this.initialAtomValues.keys());
        } else {
            this.initialAtomValues.forEach((value, atom)=>{
                if (!this.parent.initialAtomValues.has(atom)) {
                    this.parent.initialAtomValues.set(atom, value);
                }
            });
        }
    }
    /**
   * Abort the transaction.
   *
   * @public
   */ abort() {
        inst.globalEpoch++;
        this.initialAtomValues.forEach((value, atom)=>{
            atom.set(value);
            atom.historyBuffer?.clear();
        });
        this.commit();
    }
}
const inst = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleton"])("transactions", ()=>({
        // The current epoch (global to all atoms).
        globalEpoch: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_START_EPOCH"] + 1,
        // Whether any transaction is reacting.
        globalIsReacting: false,
        currentTransaction: null,
        cleanupReactors: null,
        reactionEpoch: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_START_EPOCH"] + 1
    }));
function getReactionEpoch() {
    return inst.reactionEpoch;
}
function getGlobalEpoch() {
    return inst.globalEpoch;
}
function getIsReacting() {
    return inst.globalIsReacting;
}
let traverseReactors;
function traverseChild(child) {
    if (child.lastTraversedEpoch === inst.globalEpoch) {
        return;
    }
    child.lastTraversedEpoch = inst.globalEpoch;
    if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectScheduler"]) {
        traverseReactors.add(child);
    } else {
        ;
        child.children.visit(traverseChild);
    }
}
function traverse(reactors, child) {
    traverseReactors = reactors;
    traverseChild(child);
}
function flushChanges(atoms) {
    if (inst.globalIsReacting) {
        throw new Error("flushChanges cannot be called during a reaction");
    }
    const outerTxn = inst.currentTransaction;
    try {
        inst.currentTransaction = null;
        inst.globalIsReacting = true;
        inst.reactionEpoch = inst.globalEpoch;
        const reactors = /* @__PURE__ */ new Set();
        for (const atom of atoms){
            atom.children.visit((child)=>traverse(reactors, child));
        }
        for (const r of reactors){
            r.maybeScheduleEffect();
        }
        let updateDepth = 0;
        while(inst.cleanupReactors?.size){
            if (updateDepth++ > 1e3) {
                throw new Error("Reaction update depth limit exceeded");
            }
            const reactors2 = inst.cleanupReactors;
            inst.cleanupReactors = null;
            for (const r of reactors2){
                r.maybeScheduleEffect();
            }
        }
    } finally{
        inst.cleanupReactors = null;
        inst.globalIsReacting = false;
        inst.currentTransaction = outerTxn;
        traverseReactors = void 0;
    }
}
function atomDidChange(atom, previousValue) {
    if (inst.currentTransaction) {
        if (!inst.currentTransaction.initialAtomValues.has(atom)) {
            inst.currentTransaction.initialAtomValues.set(atom, previousValue);
        }
    } else if (inst.globalIsReacting) {
        traverseAtomForCleanup(atom);
    } else {
        flushChanges([
            atom
        ]);
    }
}
function traverseAtomForCleanup(atom) {
    const rs = inst.cleanupReactors ??= /* @__PURE__ */ new Set();
    atom.children.visit((child)=>traverse(rs, child));
}
function advanceGlobalEpoch() {
    inst.globalEpoch++;
}
function transaction(fn) {
    const txn = new Transaction(inst.currentTransaction, true);
    inst.currentTransaction = txn;
    try {
        let result = void 0;
        let rollback = false;
        try {
            result = fn(()=>rollback = true);
        } catch (e) {
            txn.abort();
            throw e;
        }
        if (inst.currentTransaction !== txn) {
            throw new Error("Transaction boundaries overlap");
        }
        if (rollback) {
            txn.abort();
        } else {
            txn.commit();
        }
        return result;
    } finally{
        inst.currentTransaction = txn.parent;
    }
}
function transact(fn) {
    if (inst.currentTransaction) {
        return fn();
    }
    return transaction(fn);
}
async function deferAsyncEffects(fn) {
    if (inst.currentTransaction?.isSync) {
        throw new Error("deferAsyncEffects cannot be called during a sync transaction");
    }
    while(inst.globalIsReacting){
        await new Promise((r)=>queueMicrotask(()=>r(null)));
    }
    const txn = inst.currentTransaction ?? new Transaction(null, false);
    if (txn.isSync) throw new Error("deferAsyncEffects cannot be called during a sync transaction");
    inst.currentTransaction = txn;
    txn.asyncProcessCount++;
    let result = void 0;
    let error = void 0;
    try {
        result = await fn();
    } catch (e) {
        error = e ?? null;
    }
    if (--txn.asyncProcessCount > 0) {
        if (typeof error !== "undefined") {
            throw error;
        } else {
            return result;
        }
    }
    inst.currentTransaction = null;
    if (typeof error !== "undefined") {
        txn.abort();
        throw error;
    } else {
        txn.commit();
        return result;
    }
}
;
 //# sourceMappingURL=transactions.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/warnings.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logComputedGetterWarning",
    ()=>logComputedGetterWarning
]);
let didWarnComputedGetter = false;
function logComputedGetterWarning() {
    if (didWarnComputedGetter) return;
    didWarnComputedGetter = true;
    console.warn(`Using \`@computed\` as a decorator for getters is deprecated and will be removed in the near future. Please refactor to use \`@computed\` as a decorator for methods.

// Before
@computed
get foo() {
	return 'foo'
}

// After
@computed
getFoo() {
	return 'foo'
}
`);
}
;
 //# sourceMappingURL=warnings.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Computed.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UNINITIALIZED",
    ()=>UNINITIALIZED,
    "WithDiff",
    ()=>WithDiff,
    "_Computed",
    ()=>_Computed,
    "computed",
    ()=>computed,
    "getComputedInstance",
    ()=>getComputedInstance,
    "isComputed",
    ()=>isComputed,
    "isUninitialized",
    ()=>isUninitialized,
    "withDiff",
    ()=>withDiff
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/control.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/ArraySet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$HistoryBuffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/HistoryBuffer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/capture.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/transactions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/types.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$warnings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/warnings.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const UNINITIALIZED = Symbol.for("com.tldraw.state/UNINITIALIZED");
function isUninitialized(value) {
    return value === UNINITIALIZED;
}
const WithDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleton"])("WithDiff", ()=>class WithDiff {
        constructor(value, diff){
            this.value = value;
            this.diff = diff;
        }
    });
function withDiff(value, diff) {
    return new WithDiff(value, diff);
}
class __UNSAFE__Computed {
    constructor(name, derive, options){
        this.name = name;
        this.derive = derive;
        if (options?.historyLength) {
            this.historyBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$HistoryBuffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HistoryBuffer"](options.historyLength);
        }
        this.computeDiff = options?.computeDiff;
        this.isEqual = options?.isEqual ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"];
    }
    lastChangedEpoch = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_START_EPOCH"];
    lastTraversedEpoch = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_START_EPOCH"];
    __debug_ancestor_epochs__ = null;
    /**
   * The epoch when the reactor was last checked.
   */ lastCheckedEpoch = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_START_EPOCH"];
    parentSet = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySet"]();
    parents = [];
    parentEpochs = [];
    children = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySet"]();
    // eslint-disable-next-line no-restricted-syntax
    get isActivelyListening() {
        return !this.children.isEmpty;
    }
    historyBuffer;
    // The last-computed value of this signal.
    state = UNINITIALIZED;
    // If the signal throws an error we stash it so we can rethrow it on the next get()
    error = null;
    computeDiff;
    isEqual;
    __unsafe__getWithoutCapture(ignoreErrors) {
        const isNew = this.lastChangedEpoch === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_START_EPOCH"];
        const globalEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])();
        if (!isNew && (this.lastCheckedEpoch === globalEpoch || this.isActivelyListening && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsReacting"])() && this.lastTraversedEpoch < (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReactionEpoch"])() || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haveParentsChanged"])(this))) {
            this.lastCheckedEpoch = globalEpoch;
            if (this.error) {
                if (!ignoreErrors) {
                    throw this.error.thrownValue;
                } else {
                    return this.state;
                }
            } else {
                return this.state;
            }
        }
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startCapturingParents"])(this);
            const result = this.derive(this.state, this.lastCheckedEpoch);
            const newState = result instanceof WithDiff ? result.value : result;
            const isUninitialized2 = this.state === UNINITIALIZED;
            if (isUninitialized2 || !this.isEqual(newState, this.state)) {
                if (this.historyBuffer && !isUninitialized2) {
                    const diff = result instanceof WithDiff ? result.diff : void 0;
                    this.historyBuffer.pushEntry(this.lastChangedEpoch, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])(), diff ?? this.computeDiff?.(this.state, newState, this.lastCheckedEpoch, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])()) ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESET_VALUE"]);
                }
                this.lastChangedEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])();
                this.state = newState;
            }
            this.error = null;
            this.lastCheckedEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])();
            return this.state;
        } catch (e) {
            if (this.state !== UNINITIALIZED) {
                this.state = UNINITIALIZED;
                this.lastChangedEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])();
            }
            this.lastCheckedEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])();
            if (this.historyBuffer) {
                this.historyBuffer.clear();
            }
            this.error = {
                thrownValue: e
            };
            if (!ignoreErrors) throw e;
            return this.state;
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopCapturingParents"])();
        }
    }
    get() {
        try {
            return this.__unsafe__getWithoutCapture();
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCaptureParent"])(this);
        }
    }
    getDiffSince(epoch) {
        this.__unsafe__getWithoutCapture(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCaptureParent"])(this);
        if (epoch >= this.lastChangedEpoch) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
        }
        return this.historyBuffer?.getChangesSince(epoch) ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESET_VALUE"];
    }
}
const _Computed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleton"])("Computed", ()=>__UNSAFE__Computed);
function computedMethodLegacyDecorator(options = {}, _target, key, descriptor) {
    const originalMethod = descriptor.value;
    const derivationKey = Symbol.for("__@tldraw/state__computed__" + key);
    descriptor.value = function() {
        let d = this[derivationKey];
        if (!d) {
            d = new _Computed(key, originalMethod.bind(this), options);
            Object.defineProperty(this, derivationKey, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: d
            });
        }
        return d.get();
    };
    descriptor.value[isComputedMethodKey] = true;
    return descriptor;
}
function computedGetterLegacyDecorator(options = {}, _target, key, descriptor) {
    const originalMethod = descriptor.get;
    const derivationKey = Symbol.for("__@tldraw/state__computed__" + key);
    descriptor.get = function() {
        let d = this[derivationKey];
        if (!d) {
            d = new _Computed(key, originalMethod.bind(this), options);
            Object.defineProperty(this, derivationKey, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: d
            });
        }
        return d.get();
    };
    return descriptor;
}
function computedMethodTc39Decorator(options, compute, context) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(context.kind === "method", "@computed can only be used on methods");
    const derivationKey = Symbol.for("__@tldraw/state__computed__" + String(context.name));
    const fn = function() {
        let d = this[derivationKey];
        if (!d) {
            d = new _Computed(String(context.name), compute.bind(this), options);
            Object.defineProperty(this, derivationKey, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: d
            });
        }
        return d.get();
    };
    fn[isComputedMethodKey] = true;
    return fn;
}
function computedDecorator(options = {}, args) {
    if (args.length === 2) {
        const [originalMethod, context] = args;
        return computedMethodTc39Decorator(options, originalMethod, context);
    } else {
        const [_target, key, descriptor] = args;
        if (descriptor.get) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$warnings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logComputedGetterWarning"])();
            return computedGetterLegacyDecorator(options, _target, key, descriptor);
        } else {
            return computedMethodLegacyDecorator(options, _target, key, descriptor);
        }
    }
}
const isComputedMethodKey = "@@__isComputedMethod__@@";
function getComputedInstance(obj, propertyName) {
    const key = Symbol.for("__@tldraw/state__computed__" + propertyName.toString());
    let inst = obj[key];
    if (!inst) {
        const val = obj[propertyName];
        if (typeof val === "function" && val[isComputedMethodKey]) {
            val.call(obj);
        }
        inst = obj[key];
    }
    return inst;
}
function computed() {
    if (arguments.length === 1) {
        const options = arguments[0];
        return (...args)=>computedDecorator(options, args);
    } else if (typeof arguments[0] === "string") {
        return new _Computed(arguments[0], arguments[1], arguments[2]);
    } else {
        return computedDecorator(void 0, arguments);
    }
}
function isComputed(value) {
    return !!(value && value instanceof _Computed);
}
;
 //# sourceMappingURL=Computed.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/capture.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "maybeCaptureParent",
    ()=>maybeCaptureParent,
    "startCapturingParents",
    ()=>startCapturingParents,
    "stopCapturingParents",
    ()=>stopCapturingParents,
    "unsafe__withoutCapture",
    ()=>unsafe__withoutCapture,
    "whyAmIRunning",
    ()=>whyAmIRunning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Computed.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)");
;
;
class CaptureStackFrame {
    constructor(below, child){
        this.below = below;
        this.child = child;
    }
    offset = 0;
    maybeRemoved;
}
const inst = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleton"])("capture", ()=>({
        stack: null
    }));
function unsafe__withoutCapture(fn) {
    const oldStack = inst.stack;
    inst.stack = null;
    try {
        return fn();
    } finally{
        inst.stack = oldStack;
    }
}
function startCapturingParents(child) {
    inst.stack = new CaptureStackFrame(inst.stack, child);
    if (child.__debug_ancestor_epochs__) {
        const previousAncestorEpochs = child.__debug_ancestor_epochs__;
        child.__debug_ancestor_epochs__ = null;
        for (const p of child.parents){
            p.__unsafe__getWithoutCapture(true);
        }
        logChangedAncestors(child, previousAncestorEpochs);
    }
    child.parentSet.clear();
}
function stopCapturingParents() {
    const frame = inst.stack;
    inst.stack = frame.below;
    if (frame.offset < frame.child.parents.length) {
        for(let i = frame.offset; i < frame.child.parents.length; i++){
            const maybeRemovedParent = frame.child.parents[i];
            if (!frame.child.parentSet.has(maybeRemovedParent)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detach"])(maybeRemovedParent, frame.child);
            }
        }
        frame.child.parents.length = frame.offset;
        frame.child.parentEpochs.length = frame.offset;
    }
    if (frame.maybeRemoved) {
        for(let i = 0; i < frame.maybeRemoved.length; i++){
            const maybeRemovedParent = frame.maybeRemoved[i];
            if (!frame.child.parentSet.has(maybeRemovedParent)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detach"])(maybeRemovedParent, frame.child);
            }
        }
    }
    if (frame.child.__debug_ancestor_epochs__) {
        captureAncestorEpochs(frame.child, frame.child.__debug_ancestor_epochs__);
    }
}
function maybeCaptureParent(p) {
    if (inst.stack) {
        const wasCapturedAlready = inst.stack.child.parentSet.has(p);
        if (wasCapturedAlready) {
            return;
        }
        inst.stack.child.parentSet.add(p);
        if (inst.stack.child.isActivelyListening) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attach"])(p, inst.stack.child);
        }
        if (inst.stack.offset < inst.stack.child.parents.length) {
            const maybeRemovedParent = inst.stack.child.parents[inst.stack.offset];
            if (maybeRemovedParent !== p) {
                if (!inst.stack.maybeRemoved) {
                    inst.stack.maybeRemoved = [
                        maybeRemovedParent
                    ];
                } else {
                    inst.stack.maybeRemoved.push(maybeRemovedParent);
                }
            }
        }
        inst.stack.child.parents[inst.stack.offset] = p;
        inst.stack.child.parentEpochs[inst.stack.offset] = p.lastChangedEpoch;
        inst.stack.offset++;
    }
}
function whyAmIRunning() {
    const child = inst.stack?.child;
    if (!child) {
        throw new Error("whyAmIRunning() called outside of a reactive context");
    }
    child.__debug_ancestor_epochs__ = /* @__PURE__ */ new Map();
}
function captureAncestorEpochs(child, ancestorEpochs) {
    for(let i = 0; i < child.parents.length; i++){
        const parent = child.parents[i];
        const epoch = child.parentEpochs[i];
        ancestorEpochs.set(parent, epoch);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isComputed"])(parent)) {
            captureAncestorEpochs(parent, ancestorEpochs);
        }
    }
    return ancestorEpochs;
}
function collectChangedAncestors(child, ancestorEpochs) {
    const changeTree = {};
    for(let i = 0; i < child.parents.length; i++){
        const parent = child.parents[i];
        if (!ancestorEpochs.has(parent)) {
            continue;
        }
        const prevEpoch = ancestorEpochs.get(parent);
        const currentEpoch = parent.lastChangedEpoch;
        if (currentEpoch !== prevEpoch) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isComputed"])(parent)) {
                changeTree[parent.name] = collectChangedAncestors(parent, ancestorEpochs);
            } else {
                changeTree[parent.name] = null;
            }
        }
    }
    return changeTree;
}
function logChangedAncestors(child, ancestorEpochs) {
    const changeTree = collectChangedAncestors(child, ancestorEpochs);
    if (Object.keys(changeTree).length === 0) {
        console.log(`Effect(${child.name}) was executed manually.`);
        return;
    }
    let str = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isComputed"])(child) ? `Computed(${child.name}) is recomputing because:` : `Effect(${child.name}) is executing because:`;
    function logParent(tree, indent) {
        const indentStr = "\n" + " ".repeat(indent) + "\u21B3 ";
        for (const [name, val] of Object.entries(tree)){
            if (val) {
                str += `${indentStr}Computed(${name}) changed`;
                logParent(val, indent + 2);
            } else {
                str += `${indentStr}Atom(${name}) changed`;
            }
        }
    }
    logParent(changeTree, 1);
    console.log(str);
}
;
 //# sourceMappingURL=capture.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Atom.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_Atom",
    ()=>_Atom,
    "atom",
    ()=>atom,
    "isAtom",
    ()=>isAtom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/ArraySet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$HistoryBuffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/HistoryBuffer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/capture.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/transactions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/types.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
class __Atom__ {
    constructor(name, current, options){
        this.name = name;
        this.current = current;
        this.isEqual = options?.isEqual ?? null;
        if (!options) return;
        if (options.historyLength) {
            this.historyBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$HistoryBuffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HistoryBuffer"](options.historyLength);
        }
        this.computeDiff = options.computeDiff;
    }
    /**
   * Custom equality function for comparing values, or null to use default equality.
   * @internal
   */ isEqual;
    /**
   * Optional function to compute diffs between old and new values.
   * @internal
   */ computeDiff;
    /**
   * The global epoch when this atom was last changed.
   * @internal
   */ lastChangedEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])();
    /**
   * Set of child signals that depend on this atom.
   * @internal
   */ children = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySet"]();
    /**
   * Optional history buffer for tracking changes over time.
   * @internal
   */ historyBuffer;
    /**
   * Gets the current value without capturing it as a dependency in the current reactive context.
   * This is unsafe because it breaks the reactivity chain - use with caution.
   *
   * @param _ignoreErrors - Unused parameter for API compatibility
   * @returns The current value
   * @internal
   */ __unsafe__getWithoutCapture(_ignoreErrors) {
        return this.current;
    }
    /**
   * Gets the current value of this atom. When called within a computed signal or reaction,
   * this atom will be automatically captured as a dependency.
   *
   * @returns The current value
   * @example
   * ```ts
   * const count = atom('count', 5)
   * console.log(count.get()) // 5
   * ```
   */ get() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCaptureParent"])(this);
        return this.current;
    }
    /**
   * Sets the value of this atom to the given value. If the value is the same as the current value, this is a no-op.
   *
   * @param value - The new value to set
   * @param diff - The diff to use for the update. If not provided, the diff will be computed using {@link AtomOptions.computeDiff}
   * @returns The new value
   * @example
   * ```ts
   * const count = atom('count', 0)
   * count.set(5) // count.get() is now 5
   * ```
   */ set(value, diff) {
        if (this.isEqual?.(this.current, value) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"])(this.current, value)) {
            return this.current;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["advanceGlobalEpoch"])();
        if (this.historyBuffer) {
            this.historyBuffer.pushEntry(this.lastChangedEpoch, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])(), diff ?? this.computeDiff?.(this.current, value, this.lastChangedEpoch, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])()) ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESET_VALUE"]);
        }
        this.lastChangedEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalEpoch"])();
        const oldValue = this.current;
        this.current = value;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atomDidChange"])(this, oldValue);
        return value;
    }
    /**
   * Updates the value of this atom using the given updater function. If the returned value is the same as the current value, this is a no-op.
   *
   * @param updater - A function that takes the current value and returns the new value
   * @returns The new value
   * @example
   * ```ts
   * const count = atom('count', 5)
   * count.update(n => n + 1) // count.get() is now 6
   * ```
   */ update(updater) {
        return this.set(updater(this.current));
    }
    /**
   * Gets all the diffs that have occurred since the given epoch. When called within a computed
   * signal or reaction, this atom will be automatically captured as a dependency.
   *
   * @param epoch - The epoch to get changes since
   * @returns An array of diffs, or RESET_VALUE if history is insufficient
   * @internal
   */ getDiffSince(epoch) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCaptureParent"])(this);
        if (epoch >= this.lastChangedEpoch) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
        }
        return this.historyBuffer?.getChangesSince(epoch) ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESET_VALUE"];
    }
}
const _Atom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleton"])("Atom", ()=>__Atom__);
function atom(name, initialValue, options) {
    return new _Atom(name, initialValue, options);
}
function isAtom(value) {
    return value instanceof _Atom;
}
;
 //# sourceMappingURL=Atom.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/isSignal.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSignal",
    ()=>isSignal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Atom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Computed.mjs [app-client] (ecmascript)");
;
;
function isSignal(value) {
    return value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_Atom"] || value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_Computed"];
}
;
 //# sourceMappingURL=isSignal.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/localStorageAtom.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "localStorageAtom",
    ()=>localStorageAtom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/storage.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Atom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)");
;
;
;
function localStorageAtom(name, initialValue, options) {
    let _initialValue = initialValue;
    try {
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFromLocalStorage"])(name);
        if (value) {
            _initialValue = JSON.parse(value);
        }
    } catch  {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteFromLocalStorage"])(name);
    }
    const outAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atom"])(name, _initialValue, options);
    const reactCleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["react"])(`save ${name} to localStorage`, ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInLocalStorage"])(name, JSON.stringify(outAtom.get()));
    });
    const handleStorageEvent = (event)=>{
        if (event.key !== name) return;
        if (event.newValue === null) {
            outAtom.set(initialValue);
            return;
        }
        try {
            const newValue = JSON.parse(event.newValue);
            outAtom.set(newValue);
        } catch  {}
    };
    window.addEventListener("storage", handleStorageEvent);
    const cleanup = ()=>{
        reactCleanup();
        window.removeEventListener("storage", handleStorageEvent);
    };
    return [
        outAtom,
        cleanup
    ];
}
;
 //# sourceMappingURL=localStorageAtom.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$version$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/version.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/ArraySet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Atom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/capture.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Computed.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$isSignal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/isSignal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$localStorageAtom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/localStorageAtom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/transactions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/types.mjs [app-client] (ecmascript)");
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
const currentApiVersion = 1;
const actualApiVersion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleton"])("apiVersion", ()=>currentApiVersion);
if (actualApiVersion !== currentApiVersion) {
    throw new Error(`You have multiple incompatible versions of @tldraw/state in your app. Please deduplicate the package.`);
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$version$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerTldrawLibraryVersion"])("@tldraw/state", "4.4.0", "esm");
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArraySet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySet"],
    "EMPTY_ARRAY",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"],
    "EffectScheduler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectScheduler"],
    "RESET_VALUE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESET_VALUE"],
    "UNINITIALIZED",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNINITIALIZED"],
    "atom",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atom"],
    "computed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computed"],
    "deferAsyncEffects",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deferAsyncEffects"],
    "getComputedInstance",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedInstance"],
    "isAtom",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAtom"],
    "isSignal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$isSignal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSignal"],
    "isUninitialized",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUninitialized"],
    "localStorageAtom",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$localStorageAtom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localStorageAtom"],
    "react",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["react"],
    "reactor",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reactor"],
    "transact",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transact"],
    "transaction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transaction"],
    "unsafe__withoutCapture",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unsafe__withoutCapture"],
    "whyAmIRunning",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["whyAmIRunning"],
    "withDiff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withDiff"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$ArraySet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/ArraySet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Atom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$capture$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/capture.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Computed.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$isSignal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/isSignal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$localStorageAtom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/localStorageAtom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/transactions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/types.mjs [app-client] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useStateTracking.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStateTracking",
    ()=>useStateTracking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useStateTracking(name, render, deps = []) {
    const renderRef = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(render);
    renderRef.current = render;
    const [scheduler, subscribe, getSnapshot] = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "useStateTracking.useMemo": ()=>{
            let scheduleUpdate = null;
            const subscribe2 = {
                "useStateTracking.useMemo.subscribe2": (cb)=>{
                    scheduleUpdate = cb;
                    return ({
                        "useStateTracking.useMemo.subscribe2": ()=>{
                            scheduleUpdate = null;
                        }
                    })["useStateTracking.useMemo.subscribe2"];
                }
            }["useStateTracking.useMemo.subscribe2"];
            const scheduler2 = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectScheduler"](`useStateTracking(${name})`, {
                "useStateTracking.useMemo": // this is what `scheduler.execute()` will call
                ()=>renderRef.current?.()
            }["useStateTracking.useMemo"], // this is what will be invoked when @tldraw/state detects a change in an upstream reactive value
            {
                scheduleEffect () {
                    scheduleUpdate?.();
                }
            });
            const getSnapshot2 = {
                "useStateTracking.useMemo.getSnapshot2": ()=>scheduler2.scheduleCount
            }["useStateTracking.useMemo.getSnapshot2"];
            return [
                scheduler2,
                subscribe2,
                getSnapshot2
            ];
        }
    }["useStateTracking.useMemo"], [
        name,
        ...deps
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "useStateTracking.useEffect": ()=>{
            scheduler.attach();
            scheduler.maybeScheduleEffect();
            return ({
                "useStateTracking.useEffect": ()=>{
                    scheduler.detach();
                }
            })["useStateTracking.useEffect"];
        }
    }["useStateTracking.useEffect"], [
        scheduler
    ]);
    return scheduler.execute();
}
;
 //# sourceMappingURL=useStateTracking.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/track.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProxyHandlers",
    ()=>ProxyHandlers,
    "ReactForwardRefSymbol",
    ()=>ReactForwardRefSymbol,
    "ReactMemoSymbol",
    ()=>ReactMemoSymbol,
    "track",
    ()=>track
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useStateTracking$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useStateTracking.mjs [app-client] (ecmascript)");
;
;
const ProxyHandlers = {
    /**
   * This is a function call trap for functional components. When this is called, we know it means
   * React did run 'Component()', that means we can use any hooks here to setup our effect and
   * store.
   *
   * With the native Proxy, all other calls such as access/setting to/of properties will be
   * forwarded to the target Component, so we don't need to copy the Component's own or inherited
   * properties.
   *
   * @see https://github.com/facebook/react/blob/2d80a0cd690bb5650b6c8a6c079a87b5dc42bd15/packages/react-reconciler/src/ReactFiberHooks.old.js#L460
   */ apply (Component, thisArg, argumentsList) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useStateTracking$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStateTracking"])(Component.displayName ?? Component.name ?? "tracked(???)", ()=>Component.apply(thisArg, argumentsList));
    }
};
const ReactMemoSymbol = Symbol.for("react.memo");
const ReactForwardRefSymbol = Symbol.for("react.forward_ref");
function track(baseComponent) {
    let compare = null;
    const $$typeof = baseComponent["$$typeof"];
    if ($$typeof === ReactMemoSymbol) {
        baseComponent = baseComponent.type;
        compare = baseComponent.compare;
    }
    if ($$typeof === ReactForwardRefSymbol) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(new Proxy(baseComponent.render, ProxyHandlers)));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(new Proxy(baseComponent, ProxyHandlers), compare);
}
;
 //# sourceMappingURL=track.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useAtom.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAtom",
    ()=>useAtom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Atom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useAtom(name, valueOrInitialiser, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useAtom.useState": ()=>{
            const initialValue = typeof valueOrInitialiser === "function" ? valueOrInitialiser() : valueOrInitialiser;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atom"])(`useAtom(${name})`, initialValue, options);
        }
    }["useAtom.useState"])[0];
}
;
 //# sourceMappingURL=useAtom.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useComputed.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useComputed",
    ()=>useComputed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Computed.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useComputed() {
    const name = arguments[0];
    const compute = arguments[1];
    const opts = arguments.length === 3 ? void 0 : arguments[2];
    const deps = arguments.length === 3 ? arguments[2] : arguments[3];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useComputed.useMemo": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computed"])(`useComputed(${name})`, compute, opts)
    }["useComputed.useMemo"], deps);
}
;
 //# sourceMappingURL=useComputed.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useQuickReactor.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useQuickReactor",
    ()=>useQuickReactor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useQuickReactor(name, reactFn, deps = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"]) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useQuickReactor.useEffect": ()=>{
            const scheduler = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectScheduler"](name, reactFn);
            scheduler.attach();
            scheduler.execute();
            return ({
                "useQuickReactor.useEffect": ()=>{
                    scheduler.detach();
                }
            })["useQuickReactor.useEffect"];
        }
    }["useQuickReactor.useEffect"], deps);
}
;
 //# sourceMappingURL=useQuickReactor.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useReactor.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useReactor",
    ()=>useReactor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$throttle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/throttle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
function useReactor(name, reactFn, deps = []) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useReactor.useEffect": ()=>{
            let cancelFn;
            const scheduler = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectScheduler"](name, reactFn, {
                scheduleEffect: {
                    "useReactor.useEffect": (cb)=>{
                        cancelFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$throttle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["throttleToNextFrame"])(cb);
                    }
                }["useReactor.useEffect"]
            });
            scheduler.attach();
            scheduler.execute();
            return ({
                "useReactor.useEffect": ()=>{
                    scheduler.detach();
                    cancelFn?.();
                }
            })["useReactor.useEffect"];
        }
    }["useReactor.useEffect"], deps);
}
;
 //# sourceMappingURL=useReactor.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useValue.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useValue",
    ()=>useValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Computed.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useValue() {
    const args = arguments;
    const deps = args.length === 3 ? args[2] : [
        args[0]
    ];
    const name = args.length === 3 ? args[0] : `useValue(${args[0].name})`;
    const { $val, subscribe, getSnapshot } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useValue.useMemo": ()=>{
            const $val2 = args.length === 1 ? args[0] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computed"])(name, args[1]);
            return {
                $val: $val2,
                subscribe: ({
                    "useValue.useMemo": (notify)=>{
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["react"])(`useValue(${name})`, {
                            "useValue.useMemo": ()=>{
                                try {
                                    $val2.get();
                                } catch  {}
                                notify();
                            }
                        }["useValue.useMemo"]);
                    }
                })["useValue.useMemo"],
                getSnapshot: ({
                    "useValue.useMemo": ()=>$val2.lastChangedEpoch
                })["useValue.useMemo"]
            };
        }
    }["useValue.useMemo"], deps);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, getSnapshot);
    return $val.__unsafe__getWithoutCapture();
}
;
 //# sourceMappingURL=useValue.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$version$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/version.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$track$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/track.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useAtom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useAtom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useComputed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useComputed.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useQuickReactor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useQuickReactor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useReactor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useReactor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useStateTracking$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useStateTracking.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useValue$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useValue.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$version$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerTldrawLibraryVersion"])("@tldraw/state-react", "4.4.0", "esm");
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "track",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$track$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"],
    "useAtom",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useAtom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"],
    "useComputed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useComputed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComputed"],
    "useQuickReactor",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useQuickReactor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuickReactor"],
    "useReactor",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useReactor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReactor"],
    "useStateTracking",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useStateTracking$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStateTracking"],
    "useValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useValue$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$track$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/track.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useAtom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useAtom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useComputed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useComputed.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useQuickReactor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useQuickReactor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useReactor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useReactor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useStateTracking$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useStateTracking.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$lib$2f$useValue$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/lib/useValue.mjs [app-client] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/validate/dist-esm/lib/validation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrayOfValidator",
    ()=>ArrayOfValidator,
    "DictValidator",
    ()=>DictValidator,
    "ObjectValidator",
    ()=>ObjectValidator,
    "UnionValidator",
    ()=>UnionValidator,
    "ValidationError",
    ()=>ValidationError,
    "Validator",
    ()=>Validator,
    "any",
    ()=>any,
    "array",
    ()=>array,
    "arrayOf",
    ()=>arrayOf,
    "bigint",
    ()=>bigint,
    "boolean",
    ()=>boolean,
    "dict",
    ()=>dict,
    "httpUrl",
    ()=>httpUrl,
    "indexKey",
    ()=>indexKey,
    "integer",
    ()=>integer,
    "jsonDict",
    ()=>jsonDict,
    "jsonValue",
    ()=>jsonValue,
    "linkUrl",
    ()=>linkUrl,
    "literal",
    ()=>literal,
    "literalEnum",
    ()=>literalEnum,
    "model",
    ()=>model,
    "nonZeroFiniteNumber",
    ()=>nonZeroFiniteNumber,
    "nonZeroInteger",
    ()=>nonZeroInteger,
    "nonZeroNumber",
    ()=>nonZeroNumber,
    "nullable",
    ()=>nullable,
    "number",
    ()=>number,
    "numberUnion",
    ()=>numberUnion,
    "object",
    ()=>object,
    "optional",
    ()=>optional,
    "or",
    ()=>or,
    "positiveInteger",
    ()=>positiveInteger,
    "positiveNumber",
    ()=>positiveNumber,
    "setEnum",
    ()=>setEnum,
    "srcUrl",
    ()=>srcUrl,
    "string",
    ()=>string,
    "union",
    ()=>union,
    "unitInterval",
    ()=>unitInterval,
    "unknown",
    ()=>unknown,
    "unknownObject",
    ()=>unknownObject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/control.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/object.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/reordering.mjs [app-client] (ecmascript)");
;
const IS_DEV = ("TURBOPACK compile-time value", "development") !== "production";
function formatPath(path) {
    if (!path.length) {
        return null;
    }
    let formattedPath = "";
    for (const item of path){
        if (typeof item === "number") {
            formattedPath += `.${item}`;
        } else if (item.startsWith("(")) {
            if (formattedPath.endsWith(")")) {
                formattedPath = `${formattedPath.slice(0, -1)}, ${item.slice(1)}`;
            } else {
                formattedPath += item;
            }
        } else {
            formattedPath += `.${item}`;
        }
    }
    formattedPath = formattedPath.replace(/id = [^,]+, /, "").replace(/id = [^)]+/, "");
    if (formattedPath.startsWith(".")) {
        return formattedPath.slice(1);
    }
    return formattedPath;
}
class ValidationError extends Error {
    /**
   * Creates a new ValidationError with contextual information about where the error occurred.
   *
   * rawMessage - The raw error message without path information
   * path - Array indicating the location in the data structure where validation failed
   */ constructor(rawMessage, path = []){
        const formattedPath = formatPath(path);
        const indentedMessage = rawMessage.split("\n").map((line, i)=>i === 0 ? line : `  ${line}`).join("\n");
        super(path ? `At ${formattedPath}: ${indentedMessage}` : indentedMessage);
        this.rawMessage = rawMessage;
        this.path = path;
    }
    name = "ValidationError";
}
function prefixError(path, fn) {
    try {
        return fn();
    } catch (err) {
        if (err instanceof ValidationError) {
            throw new ValidationError(err.rawMessage, [
                path,
                ...err.path
            ]);
        }
        throw new ValidationError(err.toString(), [
            path
        ]);
    }
}
function typeToString(value) {
    if (value === null) return "null";
    if (Array.isArray(value)) return "an array";
    const type = typeof value;
    switch(type){
        case "bigint":
        case "boolean":
        case "function":
        case "number":
        case "string":
        case "symbol":
            return `a ${type}`;
        case "object":
            return `an ${type}`;
        case "undefined":
            return "undefined";
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(type);
    }
}
class Validator {
    /**
   * Creates a new Validator instance.
   *
   * validationFn - Function that validates and returns a value of type T
   * validateUsingKnownGoodVersionFn - Optional performance-optimized validation function
   * skipSameValueCheck - Internal flag to skip dev check for validators that transform values
   */ constructor(validationFn, validateUsingKnownGoodVersionFn, skipSameValueCheck = false){
        this.validationFn = validationFn;
        this.validateUsingKnownGoodVersionFn = validateUsingKnownGoodVersionFn;
        this.skipSameValueCheck = skipSameValueCheck;
    }
    /**
   * Validates an unknown value and returns it with the correct type. The returned value is
   * guaranteed to be referentially equal to the passed value.
   *
   * @param value - The unknown value to validate
   * @returns The validated value with type T
   * @throws ValidationError When validation fails
   * @example
   * ```ts
   * import { T } from '@tldraw/validate'
   *
   * const name = T.string.validate("Alice") // Returns "Alice" as string
   * const title = T.string.validate("") // Returns "" (empty strings are valid)
   *
   * // These will throw ValidationError:
   * T.string.validate(123) // Expected string, got a number
   * T.string.validate(null) // Expected string, got null
   * T.string.validate(undefined) // Expected string, got undefined
   * ```
   */ validate(value) {
        const validated = this.validationFn(value);
        if (IS_DEV && !this.skipSameValueCheck && !Object.is(value, validated)) {
            throw new ValidationError("Validator functions must return the same value they were passed");
        }
        return validated;
    }
    /**
   * Performance-optimized validation using a previously validated value. If the new value
   * is referentially equal to the known good value, returns the known good value immediately.
   *
   * @param knownGoodValue - A previously validated value
   * @param newValue - The new value to validate
   * @returns The validated value, potentially reusing the known good value
   * @throws ValidationError When validation fails
   * @example
   * ```ts
   * import { T } from '@tldraw/validate'
   *
   * const userValidator = T.object({
   *   name: T.string,
   *   settings: T.object({ theme: T.literalEnum('light', 'dark') })
   * })
   *
   * const user = userValidator.validate({ name: "Alice", settings: { theme: "light" } })
   *
   * // Later, with partially changed data:
   * const newData = { name: "Alice", settings: { theme: "dark" } }
   * const updated = userValidator.validateUsingKnownGoodVersion(user, newData)
   * // Only validates the changed 'theme' field for better performance
   * ```
   */ validateUsingKnownGoodVersion(knownGoodValue, newValue) {
        if (Object.is(knownGoodValue, newValue)) {
            return knownGoodValue;
        }
        if (this.validateUsingKnownGoodVersionFn) {
            return this.validateUsingKnownGoodVersionFn(knownGoodValue, newValue);
        }
        return this.validate(newValue);
    }
    /**
   * Type guard that checks if a value is valid without throwing an error.
   *
   * @param value - The value to check
   * @returns True if the value is valid, false otherwise
   * @example
   * ```ts
   * import { T } from '@tldraw/validate'
   *
   * function processUserInput(input: unknown) {
   *   if (T.string.isValid(input)) {
   *     // input is now typed as string within this block
   *     return input.toUpperCase()
   *   }
   *   if (T.number.isValid(input)) {
   *     // input is now typed as number within this block
   *     return input.toFixed(2)
   *   }
   *   throw new Error('Expected string or number')
   * }
   * ```
   */ isValid(value) {
        try {
            this.validate(value);
            return true;
        } catch  {
            return false;
        }
    }
    /**
   * Returns a new validator that also accepts null values.
   *
   * @returns A new validator that accepts T or null
   * @example
   * ```ts
   * import { T } from '@tldraw/validate'
   *
   * const assetValidator = T.object({
   *   id: T.string,
   *   name: T.string,
   *   src: T.srcUrl.nullable(), // Can be null if not loaded yet
   *   mimeType: T.string.nullable()
   * })
   *
   * const asset = assetValidator.validate({
   *   id: "image-123",
   *   name: "photo.jpg",
   *   src: null, // Valid - asset not loaded yet
   *   mimeType: "image/jpeg"
   * })
   * ```
   */ nullable() {
        return nullable(this);
    }
    /**
   * Returns a new validator that also accepts undefined values.
   *
   * @returns A new validator that accepts T or undefined
   * @example
   * ```ts
   * import { T } from '@tldraw/validate'
   *
   * const shapeConfigValidator = T.object({
   *   type: T.literal('rectangle'),
   *   x: T.number,
   *   y: T.number,
   *   label: T.string.optional(), // Optional property
   *   metadata: T.object({ created: T.string }).optional()
   * })
   *
   * // Both of these are valid:
   * const shape1 = shapeConfigValidator.validate({ type: 'rectangle', x: 0, y: 0 })
   * const shape2 = shapeConfigValidator.validate({
   *   type: 'rectangle', x: 0, y: 0, label: "My Shape"
   * })
   * ```
   */ optional() {
        return optional(this);
    }
    /**
   * Creates a new validator by refining this validator with additional logic that can transform
   * the validated value to a new type.
   *
   * @param otherValidationFn - Function that transforms/validates the value to type U
   * @returns A new validator that validates to type U
   * @throws ValidationError When validation or refinement fails
   * @example
   * ```ts
   * import { T, ValidationError } from '@tldraw/validate'
   *
   * // Transform string to ensure it starts with a prefix
   * const prefixedIdValidator = T.string.refine((id) => {
   *   return id.startsWith('shape:') ? id : `shape:${id}`
   * })
   *
   * const id1 = prefixedIdValidator.validate("rectangle-123") // Returns "shape:rectangle-123"
   * const id2 = prefixedIdValidator.validate("shape:circle-456") // Returns "shape:circle-456"
   *
   * // Parse and validate JSON strings
   * const jsonValidator = T.string.refine((str) => {
   *   try {
   *     return JSON.parse(str)
   *   } catch {
   *     throw new ValidationError('Invalid JSON string')
   *   }
   * })
   * ```
   */ refine(otherValidationFn) {
        return new Validator((value)=>{
            return otherValidationFn(this.validate(value));
        }, (knownGoodValue, newValue)=>{
            const validated = this.validateUsingKnownGoodVersion(knownGoodValue, newValue);
            if (Object.is(knownGoodValue, validated)) {
                return knownGoodValue;
            }
            return otherValidationFn(validated);
        }, true);
    }
    check(nameOrCheckFn, checkFn) {
        if (typeof nameOrCheckFn === "string") {
            return this.refine((value)=>{
                prefixError(`(check ${nameOrCheckFn})`, ()=>checkFn(value));
                return value;
            });
        } else {
            return this.refine((value)=>{
                nameOrCheckFn(value);
                return value;
            });
        }
    }
}
class ArrayOfValidator extends Validator {
    /**
   * Creates a new ArrayOfValidator.
   *
   * itemValidator - Validator used to validate each array element
   */ constructor(itemValidator){
        super((value)=>{
            const arr = array.validate(value);
            for(let i = 0; i < arr.length; i++){
                if ("TURBOPACK compile-time truthy", 1) {
                    prefixError(i, ()=>itemValidator.validate(arr[i]));
                } else //TURBOPACK unreachable
                ;
            }
            return arr;
        }, (knownGoodValue, newValue)=>{
            if (Object.is(knownGoodValue, newValue)) {
                return knownGoodValue;
            }
            if (!itemValidator.validateUsingKnownGoodVersion) return this.validate(newValue);
            const arr = array.validate(newValue);
            let isDifferent = knownGoodValue.length !== arr.length;
            for(let i = 0; i < arr.length; i++){
                const item = arr[i];
                if (i >= knownGoodValue.length) {
                    isDifferent = true;
                    if ("TURBOPACK compile-time truthy", 1) {
                        prefixError(i, ()=>itemValidator.validate(item));
                    } else //TURBOPACK unreachable
                    ;
                    continue;
                }
                if (Object.is(knownGoodValue[i], item)) {
                    continue;
                }
                if ("TURBOPACK compile-time truthy", 1) {
                    const checkedItem = prefixError(i, ()=>itemValidator.validateUsingKnownGoodVersion(knownGoodValue[i], item));
                    if (!Object.is(checkedItem, knownGoodValue[i])) {
                        isDifferent = true;
                    }
                } else //TURBOPACK unreachable
                ;
            }
            return isDifferent ? newValue : knownGoodValue;
        });
        this.itemValidator = itemValidator;
    }
    /**
   * Returns a new validator that ensures the array is not empty.
   *
   * @returns A new validator that rejects empty arrays
   * @throws ValidationError When the array is empty
   * @example
   * ```ts
   * const nonEmptyStrings = T.arrayOf(T.string).nonEmpty()
   * nonEmptyStrings.validate(["hello"]) // Valid
   * nonEmptyStrings.validate([]) // Throws ValidationError
   * ```
   */ nonEmpty() {
        return this.check((value)=>{
            if (value.length === 0) {
                throw new ValidationError("Expected a non-empty array");
            }
        });
    }
    /**
   * Returns a new validator that ensures the array has more than one element.
   *
   * @returns A new validator that requires at least 2 elements
   * @throws ValidationError When the array has 1 or fewer elements
   * @example
   * ```ts
   * const multipleItems = T.arrayOf(T.string).lengthGreaterThan1()
   * multipleItems.validate(["a", "b"]) // Valid
   * multipleItems.validate(["a"]) // Throws ValidationError
   * ```
   */ lengthGreaterThan1() {
        return this.check((value)=>{
            if (value.length <= 1) {
                throw new ValidationError("Expected an array with length greater than 1");
            }
        });
    }
}
class ObjectValidator extends Validator {
    /**
   * Creates a new ObjectValidator.
   *
   * config - Object mapping property names to their validators
   * shouldAllowUnknownProperties - Whether to allow properties not defined in config
   */ constructor(config, shouldAllowUnknownProperties = false){
        super((object2)=>{
            if (typeof object2 !== "object" || object2 === null) {
                throw new ValidationError(`Expected object, got ${typeToString(object2)}`);
            }
            for(const key in config){
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(config, key)) continue;
                const validator = config[key];
                if ("TURBOPACK compile-time truthy", 1) {
                    prefixError(key, ()=>{
                        ;
                        validator.validate((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnProperty"])(object2, key));
                    });
                } else //TURBOPACK unreachable
                ;
            }
            if (!shouldAllowUnknownProperties) {
                for (const key of Object.keys(object2)){
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(config, key)) {
                        throw new ValidationError(`Unexpected property`, [
                            key
                        ]);
                    }
                }
            }
            return object2;
        }, (knownGoodValue, newValue)=>{
            if (Object.is(knownGoodValue, newValue)) {
                return knownGoodValue;
            }
            if (typeof newValue !== "object" || newValue === null) {
                throw new ValidationError(`Expected object, got ${typeToString(newValue)}`);
            }
            let isDifferent = false;
            for(const key in config){
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(config, key)) continue;
                const validator = config[key];
                const prev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnProperty"])(knownGoodValue, key);
                const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnProperty"])(newValue, key);
                if (Object.is(prev, next)) {
                    continue;
                }
                if ("TURBOPACK compile-time truthy", 1) {
                    const checked = prefixError(key, ()=>{
                        const validatable = validator;
                        if (validatable.validateUsingKnownGoodVersion) {
                            return validatable.validateUsingKnownGoodVersion(prev, next);
                        } else {
                            return validatable.validate(next);
                        }
                    });
                    if (!Object.is(checked, prev)) {
                        isDifferent = true;
                    }
                } else //TURBOPACK unreachable
                ;
            }
            if (!shouldAllowUnknownProperties) {
                for (const key of Object.keys(newValue)){
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(config, key)) {
                        throw new ValidationError(`Unexpected property`, [
                            key
                        ]);
                    }
                }
            }
            for (const key of Object.keys(knownGoodValue)){
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(newValue, key)) {
                    isDifferent = true;
                    break;
                }
            }
            return isDifferent ? newValue : knownGoodValue;
        });
        this.config = config;
        this.shouldAllowUnknownProperties = shouldAllowUnknownProperties;
    }
    /**
   * Returns a new validator that allows unknown properties in the validated object.
   *
   * @returns A new ObjectValidator that accepts extra properties
   * @example
   * ```ts
   * const flexibleUser = T.object({ name: T.string }).allowUnknownProperties()
   * flexibleUser.validate({ name: "Alice", extra: "allowed" }) // Valid
   * ```
   */ allowUnknownProperties() {
        return new ObjectValidator(this.config, true);
    }
    /**
   * Creates a new ObjectValidator by extending this validator with additional properties.
   *
   * @param extension - Object mapping new property names to their validators
   * @returns A new ObjectValidator that validates both original and extended properties
   * @example
   * ```ts
   * const baseUser = T.object({ name: T.string, age: T.number })
   * const adminUser = baseUser.extend({
   *   permissions: T.arrayOf(T.string),
   *   isAdmin: T.boolean
   * })
   * // adminUser validates: { name: string; age: number; permissions: string[]; isAdmin: boolean }
   * ```
   */ extend(extension) {
        return new ObjectValidator({
            ...this.config,
            ...extension
        });
    }
}
class UnionValidator extends Validator {
    /**
   * Creates a new UnionValidator.
   *
   * key - The discriminator property name used to determine the variant
   * config - Object mapping variant names to their validators
   * unknownValueValidation - Function to handle unknown variants
   * useNumberKeys - Whether the discriminator uses number keys instead of strings
   */ constructor(key, config, unknownValueValidation, useNumberKeys){
        super((input)=>{
            this.expectObject(input);
            const { matchingSchema, variant } = this.getMatchingSchemaAndVariant(input);
            if (matchingSchema === void 0) {
                return this.unknownValueValidation(input, variant);
            }
            return prefixError(`(${key} = ${variant})`, ()=>matchingSchema.validate(input));
        }, (prevValue, newValue)=>{
            this.expectObject(newValue);
            this.expectObject(prevValue);
            const { matchingSchema, variant } = this.getMatchingSchemaAndVariant(newValue);
            if (matchingSchema === void 0) {
                return this.unknownValueValidation(newValue, variant);
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnProperty"])(prevValue, key) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnProperty"])(newValue, key)) {
                return prefixError(`(${key} = ${variant})`, ()=>matchingSchema.validate(newValue));
            }
            return prefixError(`(${key} = ${variant})`, ()=>{
                if (matchingSchema.validateUsingKnownGoodVersion) {
                    return matchingSchema.validateUsingKnownGoodVersion(prevValue, newValue);
                } else {
                    return matchingSchema.validate(newValue);
                }
            });
        });
        this.key = key;
        this.config = config;
        this.unknownValueValidation = unknownValueValidation;
        this.useNumberKeys = useNumberKeys;
    }
    expectObject(value) {
        if (typeof value !== "object" || value === null) {
            throw new ValidationError(`Expected an object, got ${typeToString(value)}`, []);
        }
    }
    getMatchingSchemaAndVariant(object2) {
        const variant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnProperty"])(object2, this.key);
        if (!this.useNumberKeys && typeof variant !== "string") {
            throw new ValidationError(`Expected a string for key "${this.key}", got ${typeToString(variant)}`);
        } else if (this.useNumberKeys) {
            const numVariant = Number(variant);
            if (numVariant - numVariant !== 0) {
                throw new ValidationError(`Expected a number for key "${this.key}", got "${variant}"`);
            }
        }
        const matchingSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(this.config, variant) ? this.config[variant] : void 0;
        return {
            matchingSchema,
            variant
        };
    }
    /**
   * Returns a new UnionValidator that can handle unknown variants using the provided function.
   *
   * @param unknownValueValidation - Function to validate/transform unknown variants
   * @returns A new UnionValidator that accepts unknown variants
   * @example
   * ```ts
   * const shapeValidator = T.union('type', { circle: circleValidator })
   *   .validateUnknownVariants((obj, variant) => {
   *     console.warn(`Unknown shape type: ${variant}`)
   *     return obj as UnknownShape
   *   })
   * ```
   */ validateUnknownVariants(unknownValueValidation) {
        return new UnionValidator(this.key, this.config, unknownValueValidation, this.useNumberKeys);
    }
}
class DictValidator extends Validator {
    /**
   * Creates a new DictValidator.
   *
   * keyValidator - Validator for object keys
   * valueValidator - Validator for object values
   */ constructor(keyValidator, valueValidator){
        super((object2)=>{
            if (typeof object2 !== "object" || object2 === null) {
                throw new ValidationError(`Expected object, got ${typeToString(object2)}`);
            }
            for(const key in object2){
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(object2, key)) continue;
                if ("TURBOPACK compile-time truthy", 1) {
                    prefixError(key, ()=>{
                        keyValidator.validate(key);
                        valueValidator.validate(object2[key]);
                    });
                } else //TURBOPACK unreachable
                ;
            }
            return object2;
        }, (knownGoodValue, newValue)=>{
            if (typeof newValue !== "object" || newValue === null) {
                throw new ValidationError(`Expected object, got ${typeToString(newValue)}`);
            }
            const newObj = newValue;
            let isDifferent = false;
            let newKeyCount = 0;
            for(const key in newObj){
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(newObj, key)) continue;
                newKeyCount++;
                const next = newObj[key];
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(knownGoodValue, key)) {
                    isDifferent = true;
                    if ("TURBOPACK compile-time truthy", 1) {
                        prefixError(key, ()=>{
                            keyValidator.validate(key);
                            valueValidator.validate(next);
                        });
                    } else //TURBOPACK unreachable
                    ;
                    continue;
                }
                const prev = knownGoodValue[key];
                if (Object.is(prev, next)) {
                    continue;
                }
                if ("TURBOPACK compile-time truthy", 1) {
                    const checked = prefixError(key, ()=>{
                        if (valueValidator.validateUsingKnownGoodVersion) {
                            return valueValidator.validateUsingKnownGoodVersion(prev, next);
                        } else {
                            return valueValidator.validate(next);
                        }
                    });
                    if (!Object.is(checked, prev)) {
                        isDifferent = true;
                    }
                } else //TURBOPACK unreachable
                ;
            }
            if (!isDifferent) {
                let oldKeyCount = 0;
                for(const key in knownGoodValue){
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(knownGoodValue, key)) {
                        oldKeyCount++;
                    }
                }
                if (oldKeyCount !== newKeyCount) {
                    isDifferent = true;
                }
            }
            return isDifferent ? newValue : knownGoodValue;
        });
        this.keyValidator = keyValidator;
        this.valueValidator = valueValidator;
    }
}
function typeofValidator(type) {
    return new Validator((value)=>{
        if (typeof value !== type) {
            throw new ValidationError(`Expected ${type}, got ${typeToString(value)}`);
        }
        return value;
    });
}
const unknown = new Validator((value)=>value);
const any = new Validator((value)=>value);
const string = typeofValidator("string");
const number = new Validator((value)=>{
    if (Number.isFinite(value)) {
        return value;
    }
    if (typeof value !== "number") {
        throw new ValidationError(`Expected number, got ${typeToString(value)}`);
    }
    if (value !== value) {
        throw new ValidationError("Expected a number, got NaN");
    }
    throw new ValidationError(`Expected a finite number, got ${value}`);
});
const positiveNumber = new Validator((value)=>{
    if (Number.isFinite(value) && value >= 0) {
        return value;
    }
    if (typeof value !== "number") {
        throw new ValidationError(`Expected number, got ${typeToString(value)}`);
    }
    if (value !== value) {
        throw new ValidationError("Expected a number, got NaN");
    }
    if (value < 0) {
        throw new ValidationError(`Expected a positive number, got ${value}`);
    }
    throw new ValidationError(`Expected a finite number, got ${value}`);
});
const nonZeroNumber = new Validator((value)=>{
    if (Number.isFinite(value) && value > 0) {
        return value;
    }
    if (typeof value !== "number") {
        throw new ValidationError(`Expected number, got ${typeToString(value)}`);
    }
    if (value !== value) {
        throw new ValidationError("Expected a number, got NaN");
    }
    if (value <= 0) {
        throw new ValidationError(`Expected a non-zero positive number, got ${value}`);
    }
    throw new ValidationError(`Expected a finite number, got ${value}`);
});
const nonZeroFiniteNumber = new Validator((value)=>{
    if (Number.isFinite(value) && value !== 0) {
        return value;
    }
    if (typeof value !== "number") {
        throw new ValidationError(`Expected number, got ${typeToString(value)}`);
    }
    if (value !== value) {
        throw new ValidationError("Expected a number, got NaN");
    }
    if (value === 0) {
        throw new ValidationError(`Expected a non-zero number, got 0`);
    }
    throw new ValidationError(`Expected a finite number, got ${value}`);
});
const unitInterval = new Validator((value)=>{
    if (Number.isFinite(value) && value >= 0 && value <= 1) {
        return value;
    }
    if (typeof value !== "number") {
        throw new ValidationError(`Expected number, got ${typeToString(value)}`);
    }
    if (value !== value) {
        throw new ValidationError("Expected a number, got NaN");
    }
    throw new ValidationError(`Expected a number between 0 and 1, got ${value}`);
});
const integer = new Validator((value)=>{
    if (Number.isInteger(value)) {
        return value;
    }
    if (typeof value !== "number") {
        throw new ValidationError(`Expected number, got ${typeToString(value)}`);
    }
    if (value !== value) {
        throw new ValidationError("Expected a number, got NaN");
    }
    if (value - value !== 0) {
        throw new ValidationError(`Expected a finite number, got ${value}`);
    }
    throw new ValidationError(`Expected an integer, got ${value}`);
});
const positiveInteger = new Validator((value)=>{
    if (Number.isInteger(value) && value >= 0) {
        return value;
    }
    if (typeof value !== "number") {
        throw new ValidationError(`Expected number, got ${typeToString(value)}`);
    }
    if (value !== value) {
        throw new ValidationError("Expected a number, got NaN");
    }
    if (value - value !== 0) {
        throw new ValidationError(`Expected a finite number, got ${value}`);
    }
    if (value < 0) {
        throw new ValidationError(`Expected a positive integer, got ${value}`);
    }
    throw new ValidationError(`Expected an integer, got ${value}`);
});
const nonZeroInteger = new Validator((value)=>{
    if (Number.isInteger(value) && value > 0) {
        return value;
    }
    if (typeof value !== "number") {
        throw new ValidationError(`Expected number, got ${typeToString(value)}`);
    }
    if (value !== value) {
        throw new ValidationError("Expected a number, got NaN");
    }
    if (value - value !== 0) {
        throw new ValidationError(`Expected a finite number, got ${value}`);
    }
    if (value <= 0) {
        throw new ValidationError(`Expected a non-zero positive integer, got ${value}`);
    }
    throw new ValidationError(`Expected an integer, got ${value}`);
});
const boolean = typeofValidator("boolean");
const bigint = typeofValidator("bigint");
function literal(expectedValue) {
    return new Validator((actualValue)=>{
        if (actualValue !== expectedValue) {
            throw new ValidationError(`Expected ${expectedValue}, got ${JSON.stringify(actualValue)}`);
        }
        return expectedValue;
    });
}
const array = new Validator((value)=>{
    if (!Array.isArray(value)) {
        throw new ValidationError(`Expected an array, got ${typeToString(value)}`);
    }
    return value;
});
function arrayOf(itemValidator) {
    return new ArrayOfValidator(itemValidator);
}
const unknownObject = new Validator((value)=>{
    if (typeof value !== "object" || value === null) {
        throw new ValidationError(`Expected object, got ${typeToString(value)}`);
    }
    return value;
});
function object(config) {
    return new ObjectValidator(config);
}
function isPlainObject(value) {
    return typeof value === "object" && value !== null && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null || Object.getPrototypeOf(value) === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STRUCTURED_CLONE_OBJECT_PROTOTYPE"]);
}
function isValidJson(value) {
    if (value === null || typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(isValidJson);
    }
    if (isPlainObject(value)) {
        return Object.values(value).every(isValidJson);
    }
    return false;
}
const jsonValue = new Validator((value)=>{
    if (isValidJson(value)) {
        return value;
    }
    throw new ValidationError(`Expected json serializable value, got ${typeof value}`);
}, (knownGoodValue, newValue)=>{
    if (Array.isArray(knownGoodValue) && Array.isArray(newValue)) {
        let isDifferent = knownGoodValue.length !== newValue.length;
        for(let i = 0; i < newValue.length; i++){
            if (i >= knownGoodValue.length) {
                isDifferent = true;
                jsonValue.validate(newValue[i]);
                continue;
            }
            const prev = knownGoodValue[i];
            const next = newValue[i];
            if (Object.is(prev, next)) {
                continue;
            }
            const checked = jsonValue.validateUsingKnownGoodVersion(prev, next);
            if (!Object.is(checked, prev)) {
                isDifferent = true;
            }
        }
        return isDifferent ? newValue : knownGoodValue;
    } else if (isPlainObject(knownGoodValue) && isPlainObject(newValue)) {
        let isDifferent = false;
        for (const key of Object.keys(newValue)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(knownGoodValue, key)) {
                isDifferent = true;
                jsonValue.validate(newValue[key]);
                continue;
            }
            const prev = knownGoodValue[key];
            const next = newValue[key];
            if (Object.is(prev, next)) {
                continue;
            }
            const checked = jsonValue.validateUsingKnownGoodVersion(prev, next);
            if (!Object.is(checked, prev)) {
                isDifferent = true;
            }
        }
        for (const key of Object.keys(knownGoodValue)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOwnProperty"])(newValue, key)) {
                isDifferent = true;
                break;
            }
        }
        return isDifferent ? newValue : knownGoodValue;
    } else {
        return jsonValue.validate(newValue);
    }
});
function jsonDict() {
    return dict(string, jsonValue);
}
function dict(keyValidator, valueValidator) {
    return new DictValidator(keyValidator, valueValidator);
}
function union(key, config) {
    return new UnionValidator(key, config, (_unknownValue, unknownVariant)=>{
        throw new ValidationError(`Expected one of ${Object.keys(config).map((key2)=>JSON.stringify(key2)).join(" or ")}, got ${JSON.stringify(unknownVariant)}`, [
            key
        ]);
    }, false);
}
function numberUnion(key, config) {
    return new UnionValidator(key, config, (unknownValue, unknownVariant)=>{
        throw new ValidationError(`Expected one of ${Object.keys(config).map((key2)=>JSON.stringify(key2)).join(" or ")}, got ${JSON.stringify(unknownVariant)}`, [
            key
        ]);
    }, true);
}
function model(name, validator) {
    return new Validator((value)=>{
        return prefixError(name, ()=>validator.validate(value));
    }, (prevValue, newValue)=>{
        return prefixError(name, ()=>{
            if (validator.validateUsingKnownGoodVersion) {
                return validator.validateUsingKnownGoodVersion(prevValue, newValue);
            } else {
                return validator.validate(newValue);
            }
        });
    });
}
function setEnum(values) {
    return new Validator((value)=>{
        if (!values.has(value)) {
            const valuesString = Array.from(values, (value2)=>JSON.stringify(value2)).join(" or ");
            throw new ValidationError(`Expected ${valuesString}, got ${value}`);
        }
        return value;
    });
}
function optional(validator) {
    return new Validator((value)=>{
        if (value === void 0) return void 0;
        return validator.validate(value);
    }, (knownGoodValue, newValue)=>{
        if (newValue === void 0) return void 0;
        if (validator.validateUsingKnownGoodVersion && knownGoodValue !== void 0) {
            return validator.validateUsingKnownGoodVersion(knownGoodValue, newValue);
        }
        return validator.validate(newValue);
    }, // Propagate skipSameValueCheck from inner validator to allow refine wrappers
    validator instanceof Validator && validator.skipSameValueCheck);
}
function nullable(validator) {
    return new Validator((value)=>{
        if (value === null) return null;
        return validator.validate(value);
    }, (knownGoodValue, newValue)=>{
        if (newValue === null) return null;
        if (validator.validateUsingKnownGoodVersion && knownGoodValue !== null) {
            return validator.validateUsingKnownGoodVersion(knownGoodValue, newValue);
        }
        return validator.validate(newValue);
    }, // Propagate skipSameValueCheck from inner validator to allow refine wrappers
    validator instanceof Validator && validator.skipSameValueCheck);
}
function literalEnum(...values) {
    return setEnum(new Set(values));
}
function parseUrl(str) {
    try {
        return new URL(str);
    } catch  {
        if (str.startsWith("/") || str.startsWith("./")) {
            try {
                return new URL(str, "http://example.com");
            } catch  {
                throw new ValidationError(`Expected a valid url, got ${JSON.stringify(str)}`);
            }
        }
        throw new ValidationError(`Expected a valid url, got ${JSON.stringify(str)}`);
    }
}
const validLinkProtocols = /* @__PURE__ */ new Set([
    "http:",
    "https:",
    "mailto:"
]);
const linkUrl = string.check((value)=>{
    if (value === "") return;
    const url = parseUrl(value);
    if (!validLinkProtocols.has(url.protocol.toLowerCase())) {
        throw new ValidationError(`Expected a valid url, got ${JSON.stringify(value)} (invalid protocol)`);
    }
});
const validSrcProtocols = /* @__PURE__ */ new Set([
    "http:",
    "https:",
    "data:",
    "asset:"
]);
const srcUrl = string.check((value)=>{
    if (value === "") return;
    const url = parseUrl(value);
    if (!validSrcProtocols.has(url.protocol.toLowerCase())) {
        throw new ValidationError(`Expected a valid url, got ${JSON.stringify(value)} (invalid protocol)`);
    }
});
const httpUrl = string.check((value)=>{
    if (value === "") return;
    const url = parseUrl(value);
    if (!url.protocol.toLowerCase().match(/^https?:$/)) {
        throw new ValidationError(`Expected a valid url, got ${JSON.stringify(value)} (invalid protocol)`);
    }
});
const indexKey = string.refine((key)=>{
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateIndexKey"])(key);
        return key;
    } catch  {
        throw new ValidationError(`Expected an index key, got ${JSON.stringify(key)}`);
    }
});
function or(v1, v2) {
    return new Validator((value)=>{
        try {
            return v1.validate(value);
        } catch  {
            return v2.validate(value);
        }
    });
}
;
 //# sourceMappingURL=validation.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/validate/dist-esm/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$version$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/version.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/validate/dist-esm/lib/validation.mjs [app-client] (ecmascript)");
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$version$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerTldrawLibraryVersion"])("@tldraw/validate", "4.4.0", "esm");
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/validate/dist-esm/lib/validation.mjs [app-client] (ecmascript) <export * as T>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "T",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/validate/dist-esm/lib/validation.mjs [app-client] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/validate/dist-esm/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrayOfValidator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrayOfValidator"],
    "DictValidator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DictValidator"],
    "ObjectValidator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObjectValidator"],
    "T",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    "UnionValidator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnionValidator"],
    "Validator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Validator"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/validate/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$lib$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/validate/dist-esm/lib/validation.mjs [app-client] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/node_modules/eventemitter3/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var has = Object.prototype.hasOwnProperty, prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */ function Events() {}
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    Events.prototype = Object.create(null);
    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */ function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */ function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [
        emitter._events[evt],
        listener
    ];
    return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */ function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */ function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for(name in events = this._events){
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [
        handlers.fn
    ];
    for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++){
        ee[i] = handlers[i].fn;
    }
    return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
        switch(len){
            case 1:
                return listeners.fn.call(listeners.context), true;
            case 2:
                return listeners.fn.call(listeners.context, a1), true;
            case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for(i = 1, args = new Array(len - 1); i < len; i++){
            args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
    } else {
        var length = listeners.length, j;
        for(i = 0; i < length; i++){
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
            switch(len){
                case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;
                case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;
                case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;
                case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;
                default:
                    if (!args) for(j = 1, args = new Array(len - 1); j < len; j++){
                        args[j - 1] = arguments[j];
                    }
                    listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }
    return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
        clearEvent(this, evt);
        return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
        }
    } else {
        for(var i = 0, events = [], length = listeners.length; i < length; i++){
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
                events.push(listeners[i]);
            }
        }
        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
    }
    return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
    } else {
        this._events = new Events();
        this._eventsCount = 0;
    }
    return this;
};
//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;
//
// Expose the module.
//
if ("TURBOPACK compile-time truthy", 1) {
    module.exports = EventEmitter;
}
}),
]);

//# debugId=5e451ca9-8c50-631c-62b8-e14172dc9379
//# sourceMappingURL=c427b_%40tldraw_ed2aa847._.js.map