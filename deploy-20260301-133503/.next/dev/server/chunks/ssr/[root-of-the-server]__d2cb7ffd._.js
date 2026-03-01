;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="b65e5813-e8f9-8b40-e433-26e5088fc109")}catch(e){}}();
module.exports = [
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[externals]/pg [external] (pg, esm_import, [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg-db6d965ecbff73b5");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "entityKind",
    ()=>entityKind,
    "hasOwnEntityKind",
    ()=>hasOwnEntityKind,
    "is",
    ()=>is
]);
const entityKind = Symbol.for("drizzle:entityKind");
const hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");
function is(value, type) {
    if (!value || typeof value !== "object") {
        return false;
    }
    if (value instanceof type) {
        return true;
    }
    if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
        throw new Error(`Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
    }
    let cls = Object.getPrototypeOf(value).constructor;
    if (cls) {
        while(cls){
            if (entityKind in cls && cls[entityKind] === type[entityKind]) {
                return true;
            }
            cls = Object.getPrototypeOf(cls);
        }
    }
    return false;
}
;
 //# sourceMappingURL=entity.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/logger.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConsoleLogWriter",
    ()=>ConsoleLogWriter,
    "DefaultLogger",
    ()=>DefaultLogger,
    "NoopLogger",
    ()=>NoopLogger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
;
class ConsoleLogWriter {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "ConsoleLogWriter";
    write(message) {
        console.log(message);
    }
}
class DefaultLogger {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "DefaultLogger";
    writer;
    constructor(config){
        this.writer = config?.writer ?? new ConsoleLogWriter();
    }
    logQuery(query, params) {
        const stringifiedParams = params.map((p)=>{
            try {
                return JSON.stringify(p);
            } catch  {
                return String(p);
            }
        });
        const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
        this.writer.write(`Query: ${query}${paramsStr}`);
    }
}
class NoopLogger {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "NoopLogger";
    logQuery() {}
}
;
 //# sourceMappingURL=logger.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryPromise",
    ()=>QueryPromise
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
;
class QueryPromise {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "QueryPromise";
    [Symbol.toStringTag] = "QueryPromise";
    catch(onRejected) {
        return this.then(void 0, onRejected);
    }
    finally(onFinally) {
        return this.then((value)=>{
            onFinally?.();
            return value;
        }, (reason)=>{
            onFinally?.();
            throw reason;
        });
    }
    then(onFulfilled, onRejected) {
        return this.execute().then(onFulfilled, onRejected);
    }
}
;
 //# sourceMappingURL=query-promise.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TableName",
    ()=>TableName
]);
const TableName = Symbol.for("drizzle:Name");
;
 //# sourceMappingURL=table.utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseName",
    ()=>BaseName,
    "Columns",
    ()=>Columns,
    "ExtraConfigBuilder",
    ()=>ExtraConfigBuilder,
    "ExtraConfigColumns",
    ()=>ExtraConfigColumns,
    "IsAlias",
    ()=>IsAlias,
    "OriginalName",
    ()=>OriginalName,
    "Schema",
    ()=>Schema,
    "Table",
    ()=>Table,
    "getTableName",
    ()=>getTableName,
    "getTableUniqueName",
    ()=>getTableUniqueName,
    "isTable",
    ()=>isTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.utils.js [app-rsc] (ecmascript)");
;
;
const Schema = Symbol.for("drizzle:Schema");
const Columns = Symbol.for("drizzle:Columns");
const ExtraConfigColumns = Symbol.for("drizzle:ExtraConfigColumns");
const OriginalName = Symbol.for("drizzle:OriginalName");
const BaseName = Symbol.for("drizzle:BaseName");
const IsAlias = Symbol.for("drizzle:IsAlias");
const ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
const IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");
class Table {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "Table";
    /** @internal */ static Symbol = {
        Name: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"],
        Schema,
        OriginalName,
        Columns,
        ExtraConfigColumns,
        BaseName,
        IsAlias,
        ExtraConfigBuilder
    };
    /**
   * @internal
   * Can be changed if the table is aliased.
   */ [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]];
    /**
   * @internal
   * Used to store the original name of the table, before any aliasing.
   */ [OriginalName];
    /** @internal */ [Schema];
    /** @internal */ [Columns];
    /** @internal */ [ExtraConfigColumns];
    /**
   *  @internal
   * Used to store the table name before the transformation via the `tableCreator` functions.
   */ [BaseName];
    /** @internal */ [IsAlias] = false;
    /** @internal */ [IsDrizzleTable] = true;
    /** @internal */ [ExtraConfigBuilder] = void 0;
    constructor(name, schema, baseName){
        this[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]] = this[OriginalName] = name;
        this[Schema] = schema;
        this[BaseName] = baseName;
    }
}
function isTable(table) {
    return typeof table === "object" && table !== null && IsDrizzleTable in table;
}
function getTableName(table) {
    return table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]];
}
function getTableUniqueName(table) {
    return `${table[Schema] ?? "public"}.${table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]]}`;
}
;
 //# sourceMappingURL=table.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "iife",
    ()=>iife
]);
function iife(fn, ...args) {
    return fn(...args);
}
;
 //# sourceMappingURL=tracing-utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/version.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compatibilityVersion",
    ()=>compatibilityVersion,
    "npmVersion",
    ()=>version
]);
// package.json
var version = "0.38.4";
// src/version.ts
var compatibilityVersion = 10;
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tracer",
    ()=>tracer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/version.js [app-rsc] (ecmascript)");
;
;
let otel;
let rawTracer;
const tracer = {
    startActiveSpan (name, fn) {
        if (!otel) {
            return fn();
        }
        if (!rawTracer) {
            rawTracer = otel.trace.getTracer("drizzle-orm", __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["npmVersion"]);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["iife"])((otel2, rawTracer2)=>rawTracer2.startActiveSpan(name, (span)=>{
                try {
                    return fn(span);
                } catch (e) {
                    span.setStatus({
                        code: otel2.SpanStatusCode.ERROR,
                        message: e instanceof Error ? e.message : "Unknown error"
                    });
                    throw e;
                } finally{
                    span.end();
                }
            }), otel, rawTracer);
    }
};
;
 //# sourceMappingURL=tracing.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Column",
    ()=>Column
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
;
class Column {
    constructor(table, config){
        this.table = table;
        this.config = config;
        this.name = config.name;
        this.keyAsName = config.keyAsName;
        this.notNull = config.notNull;
        this.default = config.default;
        this.defaultFn = config.defaultFn;
        this.onUpdateFn = config.onUpdateFn;
        this.hasDefault = config.hasDefault;
        this.primary = config.primaryKey;
        this.isUnique = config.isUnique;
        this.uniqueName = config.uniqueName;
        this.uniqueType = config.uniqueType;
        this.dataType = config.dataType;
        this.columnType = config.columnType;
        this.generated = config.generated;
        this.generatedIdentity = config.generatedIdentity;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "Column";
    name;
    keyAsName;
    primary;
    notNull;
    default;
    defaultFn;
    onUpdateFn;
    hasDefault;
    isUnique;
    uniqueName;
    uniqueType;
    dataType;
    columnType;
    enumValues = void 0;
    generated = void 0;
    generatedIdentity = void 0;
    config;
    mapFromDriverValue(value) {
        return value;
    }
    mapToDriverValue(value) {
        return value;
    }
    // ** @internal */
    shouldDisableInsert() {
        return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
    }
}
;
 //# sourceMappingURL=column.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column-builder.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColumnBuilder",
    ()=>ColumnBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
;
class ColumnBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "ColumnBuilder";
    config;
    constructor(name, dataType, columnType){
        this.config = {
            name,
            keyAsName: name === "",
            notNull: false,
            default: void 0,
            hasDefault: false,
            primaryKey: false,
            isUnique: false,
            uniqueName: void 0,
            uniqueType: void 0,
            dataType,
            columnType,
            generated: void 0
        };
    }
    /**
   * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
   *
   * @example
   * ```ts
   * const users = pgTable('users', {
   * 	id: integer('id').$type<UserId>().primaryKey(),
   * 	details: json('details').$type<UserDetails>().notNull(),
   * });
   * ```
   */ $type() {
        return this;
    }
    /**
   * Adds a `not null` clause to the column definition.
   *
   * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
   */ notNull() {
        this.config.notNull = true;
        return this;
    }
    /**
   * Adds a `default <value>` clause to the column definition.
   *
   * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
   *
   * If you need to set a dynamic default value, use {@link $defaultFn} instead.
   */ default(value) {
        this.config.default = value;
        this.config.hasDefault = true;
        return this;
    }
    /**
   * Adds a dynamic default value to the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */ $defaultFn(fn) {
        this.config.defaultFn = fn;
        this.config.hasDefault = true;
        return this;
    }
    /**
   * Alias for {@link $defaultFn}.
   */ $default = this.$defaultFn;
    /**
   * Adds a dynamic update value to the column.
   * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
   * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */ $onUpdateFn(fn) {
        this.config.onUpdateFn = fn;
        this.config.hasDefault = true;
        return this;
    }
    /**
   * Alias for {@link $onUpdateFn}.
   */ $onUpdate = this.$onUpdateFn;
    /**
   * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
   *
   * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
   */ primaryKey() {
        this.config.primaryKey = true;
        this.config.notNull = true;
        return this;
    }
    /** @internal Sets the name of the column to the key within the table definition if a name was not given. */ setName(name) {
        if (this.config.name !== "") return;
        this.config.name = name;
    }
}
;
 //# sourceMappingURL=column-builder.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/foreign-keys.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ForeignKey",
    ()=>ForeignKey,
    "ForeignKeyBuilder",
    ()=>ForeignKeyBuilder,
    "foreignKey",
    ()=>foreignKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.utils.js [app-rsc] (ecmascript)");
;
;
class ForeignKeyBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgForeignKeyBuilder";
    /** @internal */ reference;
    /** @internal */ _onUpdate = "no action";
    /** @internal */ _onDelete = "no action";
    constructor(config, actions){
        this.reference = ()=>{
            const { name, columns, foreignColumns } = config();
            return {
                name,
                columns,
                foreignTable: foreignColumns[0].table,
                foreignColumns
            };
        };
        if (actions) {
            this._onUpdate = actions.onUpdate;
            this._onDelete = actions.onDelete;
        }
    }
    onUpdate(action) {
        this._onUpdate = action === void 0 ? "no action" : action;
        return this;
    }
    onDelete(action) {
        this._onDelete = action === void 0 ? "no action" : action;
        return this;
    }
    /** @internal */ build(table) {
        return new ForeignKey(table, this);
    }
}
class ForeignKey {
    constructor(table, builder){
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgForeignKey";
    reference;
    onUpdate;
    onDelete;
    getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column)=>column.name);
        const foreignColumnNames = foreignColumns.map((column)=>column.name);
        const chunks = [
            this.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]],
            ...columnNames,
            foreignColumns[0].table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]],
            ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
    }
}
function foreignKey(config) {
    function mappedConfig() {
        const { name, columns, foreignColumns } = config;
        return {
            name,
            columns,
            foreignColumns
        };
    }
    return new ForeignKeyBuilder(mappedConfig);
}
;
 //# sourceMappingURL=foreign-keys.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/unique-constraint.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UniqueConstraint",
    ()=>UniqueConstraint,
    "UniqueConstraintBuilder",
    ()=>UniqueConstraintBuilder,
    "UniqueOnConstraintBuilder",
    ()=>UniqueOnConstraintBuilder,
    "unique",
    ()=>unique,
    "uniqueKeyName",
    ()=>uniqueKeyName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.utils.js [app-rsc] (ecmascript)");
;
;
function unique(name) {
    return new UniqueOnConstraintBuilder(name);
}
function uniqueKeyName(table, columns) {
    return `${table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]]}_${columns.join("_")}_unique`;
}
class UniqueConstraintBuilder {
    constructor(columns, name){
        this.name = name;
        this.columns = columns;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgUniqueConstraintBuilder";
    /** @internal */ columns;
    /** @internal */ nullsNotDistinctConfig = false;
    nullsNotDistinct() {
        this.nullsNotDistinctConfig = true;
        return this;
    }
    /** @internal */ build(table) {
        return new UniqueConstraint(table, this.columns, this.nullsNotDistinctConfig, this.name);
    }
}
class UniqueOnConstraintBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgUniqueOnConstraintBuilder";
    /** @internal */ name;
    constructor(name){
        this.name = name;
    }
    on(...columns) {
        return new UniqueConstraintBuilder(columns, this.name);
    }
}
class UniqueConstraint {
    constructor(table, columns, nullsNotDistinct, name){
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName(this.table, this.columns.map((column)=>column.name));
        this.nullsNotDistinct = nullsNotDistinct;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgUniqueConstraint";
    columns;
    name;
    nullsNotDistinct = false;
    getName() {
        return this.name;
    }
}
;
 //# sourceMappingURL=unique-constraint.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/utils/array.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makePgArray",
    ()=>makePgArray,
    "parsePgArray",
    ()=>parsePgArray,
    "parsePgNestedArray",
    ()=>parsePgNestedArray
]);
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
    for(let i = startFrom; i < arrayString.length; i++){
        const char = arrayString[i];
        if (char === "\\") {
            i++;
            continue;
        }
        if (char === '"') {
            return [
                arrayString.slice(startFrom, i).replace(/\\/g, ""),
                i + 1
            ];
        }
        if (inQuotes) {
            continue;
        }
        if (char === "," || char === "}") {
            return [
                arrayString.slice(startFrom, i).replace(/\\/g, ""),
                i
            ];
        }
    }
    return [
        arrayString.slice(startFrom).replace(/\\/g, ""),
        arrayString.length
    ];
}
function parsePgNestedArray(arrayString, startFrom = 0) {
    const result = [];
    let i = startFrom;
    let lastCharIsComma = false;
    while(i < arrayString.length){
        const char = arrayString[i];
        if (char === ",") {
            if (lastCharIsComma || i === startFrom) {
                result.push("");
            }
            lastCharIsComma = true;
            i++;
            continue;
        }
        lastCharIsComma = false;
        if (char === "\\") {
            i += 2;
            continue;
        }
        if (char === '"') {
            const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
            result.push(value2);
            i = startFrom2;
            continue;
        }
        if (char === "}") {
            return [
                result,
                i + 1
            ];
        }
        if (char === "{") {
            const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
            result.push(value2);
            i = startFrom2;
            continue;
        }
        const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
        result.push(value);
        i = newStartFrom;
    }
    return [
        result,
        i
    ];
}
function parsePgArray(arrayString) {
    const [result] = parsePgNestedArray(arrayString, 1);
    return result;
}
function makePgArray(array) {
    return `{${array.map((item)=>{
        if (Array.isArray(item)) {
            return makePgArray(item);
        }
        if (typeof item === "string") {
            return `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
        }
        return `${item}`;
    }).join(",")}}`;
}
;
 //# sourceMappingURL=array.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExtraConfigColumn",
    ()=>ExtraConfigColumn,
    "IndexedColumn",
    ()=>IndexedColumn,
    "PgArray",
    ()=>PgArray,
    "PgArrayBuilder",
    ()=>PgArrayBuilder,
    "PgColumn",
    ()=>PgColumn,
    "PgColumnBuilder",
    ()=>PgColumnBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column-builder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$foreign$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/foreign-keys.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/unique-constraint.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$utils$2f$array$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/utils/array.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
class PgColumnBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColumnBuilder"] {
    foreignKeyConfigs = [];
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgColumnBuilder";
    array(size) {
        return new PgArrayBuilder(this.config.name, this, size);
    }
    references(ref, actions = {}) {
        this.foreignKeyConfigs.push({
            ref,
            actions
        });
        return this;
    }
    unique(name, config) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        this.config.uniqueType = config?.nulls;
        return this;
    }
    generatedAlwaysAs(as) {
        this.config.generated = {
            as,
            type: "always",
            mode: "stored"
        };
        return this;
    }
    /** @internal */ buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["iife"])((ref2, actions2)=>{
                const builder = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$foreign$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ForeignKeyBuilder"](()=>{
                    const foreignColumn = ref2();
                    return {
                        columns: [
                            column
                        ],
                        foreignColumns: [
                            foreignColumn
                        ]
                    };
                });
                if (actions2.onUpdate) {
                    builder.onUpdate(actions2.onUpdate);
                }
                if (actions2.onDelete) {
                    builder.onDelete(actions2.onDelete);
                }
                return builder.build(table);
            }, ref, actions);
        });
    }
    /** @internal */ buildExtraConfigColumn(table) {
        return new ExtraConfigColumn(table, this.config);
    }
}
class PgColumn extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"] {
    constructor(table, config){
        if (!config.uniqueName) {
            config.uniqueName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uniqueKeyName"])(table, [
                config.name
            ]);
        }
        super(table, config);
        this.table = table;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgColumn";
}
class ExtraConfigColumn extends PgColumn {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "ExtraConfigColumn";
    getSQLType() {
        return this.getSQLType();
    }
    indexConfig = {
        order: this.config.order ?? "asc",
        nulls: this.config.nulls ?? "last",
        opClass: this.config.opClass
    };
    defaultConfig = {
        order: "asc",
        nulls: "last",
        opClass: void 0
    };
    asc() {
        this.indexConfig.order = "asc";
        return this;
    }
    desc() {
        this.indexConfig.order = "desc";
        return this;
    }
    nullsFirst() {
        this.indexConfig.nulls = "first";
        return this;
    }
    nullsLast() {
        this.indexConfig.nulls = "last";
        return this;
    }
    /**
   * ### PostgreSQL documentation quote
   *
   * > An operator class with optional parameters can be specified for each column of an index.
   * The operator class identifies the operators to be used by the index for that column.
   * For example, a B-tree index on four-byte integers would use the int4_ops class;
   * this operator class includes comparison functions for four-byte integers.
   * In practice the default operator class for the column's data type is usually sufficient.
   * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
   * For example, we might want to sort a complex-number data type either by absolute value or by real part.
   * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
   * More information about operator classes check:
   *
   * ### Useful links
   * https://www.postgresql.org/docs/current/sql-createindex.html
   *
   * https://www.postgresql.org/docs/current/indexes-opclass.html
   *
   * https://www.postgresql.org/docs/current/xindex.html
   *
   * ### Additional types
   * If you have the `pg_vector` extension installed in your database, you can use the
   * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
   *
   * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
   *
   * @param opClass
   * @returns
   */ op(opClass) {
        this.indexConfig.opClass = opClass;
        return this;
    }
}
class IndexedColumn {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "IndexedColumn";
    constructor(name, keyAsName, type, indexConfig){
        this.name = name;
        this.keyAsName = keyAsName;
        this.type = type;
        this.indexConfig = indexConfig;
    }
    name;
    keyAsName;
    type;
    indexConfig;
}
class PgArrayBuilder extends PgColumnBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgArrayBuilder";
    constructor(name, baseBuilder, size){
        super(name, "array", "PgArray");
        this.config.baseBuilder = baseBuilder;
        this.config.size = size;
    }
    /** @internal */ build(table) {
        const baseColumn = this.config.baseBuilder.build(table);
        return new PgArray(table, this.config, baseColumn);
    }
}
class PgArray extends PgColumn {
    constructor(table, config, baseColumn, range){
        super(table, config);
        this.baseColumn = baseColumn;
        this.range = range;
        this.size = config.size;
    }
    size;
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgArray";
    getSQLType() {
        return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
    }
    mapFromDriverValue(value) {
        if (typeof value === "string") {
            value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$utils$2f$array$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parsePgArray"])(value);
        }
        return value.map((v)=>this.baseColumn.mapFromDriverValue(v));
    }
    mapToDriverValue(value, isNestedArray = false) {
        const a = value.map((v)=>v === null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(this.baseColumn, PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v));
        if (isNestedArray) return a;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$utils$2f$array$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["makePgArray"])(a);
    }
}
;
 //# sourceMappingURL=common.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/enum.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgEnumColumn",
    ()=>PgEnumColumn,
    "PgEnumColumnBuilder",
    ()=>PgEnumColumnBuilder,
    "isPgEnum",
    ()=>isPgEnum,
    "pgEnum",
    ()=>pgEnum,
    "pgEnumWithSchema",
    ()=>pgEnumWithSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
const isPgEnumSym = Symbol.for("drizzle:isPgEnum");
function isPgEnum(obj) {
    return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
class PgEnumColumnBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgEnumColumnBuilder";
    constructor(name, enumInstance){
        super(name, "string", "PgEnumColumn");
        this.config.enum = enumInstance;
    }
    /** @internal */ build(table) {
        return new PgEnumColumn(table, this.config);
    }
}
class PgEnumColumn extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgEnumColumn";
    enum = this.config.enum;
    enumValues = this.config.enum.enumValues;
    constructor(table, config){
        super(table, config);
        this.enum = config.enum;
    }
    getSQLType() {
        return this.enum.enumName;
    }
}
function pgEnum(enumName, values) {
    return pgEnumWithSchema(enumName, values, void 0);
}
function pgEnumWithSchema(enumName, values, schema) {
    const enumInstance = Object.assign((name)=>new PgEnumColumnBuilder(name ?? "", enumInstance), {
        enumName,
        enumValues: values,
        schema,
        [isPgEnumSym]: true
    });
    return enumInstance;
}
;
 //# sourceMappingURL=enum.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Subquery",
    ()=>Subquery,
    "WithSubquery",
    ()=>WithSubquery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
;
class Subquery {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "Subquery";
    constructor(sql, selection, alias, isWith = false){
        this._ = {
            brand: "Subquery",
            sql,
            selectedFields: selection,
            alias,
            isWith
        };
    }
}
class WithSubquery extends Subquery {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "WithSubquery";
}
;
 //# sourceMappingURL=subquery.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ViewBaseConfig",
    ()=>ViewBaseConfig
]);
const ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");
;
 //# sourceMappingURL=view-common.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FakePrimitiveParam",
    ()=>FakePrimitiveParam,
    "Name",
    ()=>Name,
    "Param",
    ()=>Param,
    "Placeholder",
    ()=>Placeholder,
    "SQL",
    ()=>SQL,
    "StringChunk",
    ()=>StringChunk,
    "View",
    ()=>View,
    "fillPlaceholders",
    ()=>fillPlaceholders,
    "isDriverValueEncoder",
    ()=>isDriverValueEncoder,
    "isSQLWrapper",
    ()=>isSQLWrapper,
    "isView",
    ()=>isView,
    "name",
    ()=>name,
    "noopDecoder",
    ()=>noopDecoder,
    "noopEncoder",
    ()=>noopEncoder,
    "noopMapper",
    ()=>noopMapper,
    "param",
    ()=>param,
    "placeholder",
    ()=>placeholder,
    "sql",
    ()=>sql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/enum.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
class FakePrimitiveParam {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "FakePrimitiveParam";
}
function isSQLWrapper(value) {
    return value !== null && value !== void 0 && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
    const result = {
        sql: "",
        params: []
    };
    for (const query of queries){
        result.sql += query.sql;
        result.params.push(...query.params);
        if (query.typings?.length) {
            if (!result.typings) {
                result.typings = [];
            }
            result.typings.push(...query.typings);
        }
    }
    return result;
}
class StringChunk {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "StringChunk";
    value;
    constructor(value){
        this.value = Array.isArray(value) ? value : [
            value
        ];
    }
    getSQL() {
        return new SQL([
            this
        ]);
    }
}
class SQL {
    constructor(queryChunks){
        this.queryChunks = queryChunks;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQL";
    /** @internal */ decoder = noopDecoder;
    shouldInlineParams = false;
    append(query) {
        this.queryChunks.push(...query.queryChunks);
        return this;
    }
    toQuery(config) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.buildSQL", (span)=>{
            const query = this.buildQueryFromSourceParams(this.queryChunks, config);
            span?.setAttributes({
                "drizzle.query.text": query.sql,
                "drizzle.query.params": JSON.stringify(query.params)
            });
            return query;
        });
    }
    buildQueryFromSourceParams(chunks, _config) {
        const config = Object.assign({}, _config, {
            inlineParams: _config.inlineParams || this.shouldInlineParams,
            paramStartIndex: _config.paramStartIndex || {
                value: 0
            }
        });
        const { casing, escapeName, escapeParam, prepareTyping, inlineParams, paramStartIndex } = config;
        return mergeQueries(chunks.map((chunk)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, StringChunk)) {
                return {
                    sql: chunk.value.join(""),
                    params: []
                };
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, Name)) {
                return {
                    sql: escapeName(chunk.value),
                    params: []
                };
            }
            if (chunk === void 0) {
                return {
                    sql: "",
                    params: []
                };
            }
            if (Array.isArray(chunk)) {
                const result = [
                    new StringChunk("(")
                ];
                for (const [i, p] of chunk.entries()){
                    result.push(p);
                    if (i < chunk.length - 1) {
                        result.push(new StringChunk(", "));
                    }
                }
                result.push(new StringChunk(")"));
                return this.buildQueryFromSourceParams(result, config);
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, SQL)) {
                return this.buildQueryFromSourceParams(chunk.queryChunks, {
                    ...config,
                    inlineParams: inlineParams || chunk.shouldInlineParams
                });
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"])) {
                const schemaName = chunk[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Schema];
                const tableName = chunk[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name];
                return {
                    sql: schemaName === void 0 ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
                    params: []
                };
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
                const columnName = casing.getColumnCasing(chunk);
                if (_config.invokeSource === "indexes") {
                    return {
                        sql: escapeName(columnName),
                        params: []
                    };
                }
                const schemaName = chunk.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Schema];
                return {
                    sql: chunk.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IsAlias"]] || schemaName === void 0 ? escapeName(chunk.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name]) + "." + escapeName(columnName),
                    params: []
                };
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, View)) {
                const schemaName = chunk[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].schema;
                const viewName = chunk[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].name;
                return {
                    sql: schemaName === void 0 ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
                    params: []
                };
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, Param)) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk.value, Placeholder)) {
                    return {
                        sql: escapeParam(paramStartIndex.value++, chunk),
                        params: [
                            chunk
                        ],
                        typings: [
                            "none"
                        ]
                    };
                }
                const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(mappedValue, SQL)) {
                    return this.buildQueryFromSourceParams([
                        mappedValue
                    ], config);
                }
                if (inlineParams) {
                    return {
                        sql: this.mapInlineParam(mappedValue, config),
                        params: []
                    };
                }
                let typings = [
                    "none"
                ];
                if (prepareTyping) {
                    typings = [
                        prepareTyping(chunk.encoder)
                    ];
                }
                return {
                    sql: escapeParam(paramStartIndex.value++, mappedValue),
                    params: [
                        mappedValue
                    ],
                    typings
                };
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, Placeholder)) {
                return {
                    sql: escapeParam(paramStartIndex.value++, chunk),
                    params: [
                        chunk
                    ],
                    typings: [
                        "none"
                    ]
                };
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, SQL.Aliased) && chunk.fieldAlias !== void 0) {
                return {
                    sql: escapeName(chunk.fieldAlias),
                    params: []
                };
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"])) {
                if (chunk._.isWith) {
                    return {
                        sql: escapeName(chunk._.alias),
                        params: []
                    };
                }
                return this.buildQueryFromSourceParams([
                    new StringChunk("("),
                    chunk._.sql,
                    new StringChunk(") "),
                    new Name(chunk._.alias)
                ], config);
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPgEnum"])(chunk)) {
                if (chunk.schema) {
                    return {
                        sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName),
                        params: []
                    };
                }
                return {
                    sql: escapeName(chunk.enumName),
                    params: []
                };
            }
            if (isSQLWrapper(chunk)) {
                if (chunk.shouldOmitSQLParens?.()) {
                    return this.buildQueryFromSourceParams([
                        chunk.getSQL()
                    ], config);
                }
                return this.buildQueryFromSourceParams([
                    new StringChunk("("),
                    chunk.getSQL(),
                    new StringChunk(")")
                ], config);
            }
            if (inlineParams) {
                return {
                    sql: this.mapInlineParam(chunk, config),
                    params: []
                };
            }
            return {
                sql: escapeParam(paramStartIndex.value++, chunk),
                params: [
                    chunk
                ],
                typings: [
                    "none"
                ]
            };
        }));
    }
    mapInlineParam(chunk, { escapeString }) {
        if (chunk === null) {
            return "null";
        }
        if (typeof chunk === "number" || typeof chunk === "boolean") {
            return chunk.toString();
        }
        if (typeof chunk === "string") {
            return escapeString(chunk);
        }
        if (typeof chunk === "object") {
            const mappedValueAsString = chunk.toString();
            if (mappedValueAsString === "[object Object]") {
                return escapeString(JSON.stringify(chunk));
            }
            return escapeString(mappedValueAsString);
        }
        throw new Error("Unexpected param value: " + chunk);
    }
    getSQL() {
        return this;
    }
    as(alias) {
        if (alias === void 0) {
            return this;
        }
        return new SQL.Aliased(this, alias);
    }
    mapWith(decoder) {
        this.decoder = typeof decoder === "function" ? {
            mapFromDriverValue: decoder
        } : decoder;
        return this;
    }
    inlineParams() {
        this.shouldInlineParams = true;
        return this;
    }
    /**
   * This method is used to conditionally include a part of the query.
   *
   * @param condition - Condition to check
   * @returns itself if the condition is `true`, otherwise `undefined`
   */ if(condition) {
        return condition ? this : void 0;
    }
}
class Name {
    constructor(value){
        this.value = value;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "Name";
    brand;
    getSQL() {
        return new SQL([
            this
        ]);
    }
}
function name(value) {
    return new Name(value);
}
function isDriverValueEncoder(value) {
    return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
const noopDecoder = {
    mapFromDriverValue: (value)=>value
};
const noopEncoder = {
    mapToDriverValue: (value)=>value
};
const noopMapper = {
    ...noopDecoder,
    ...noopEncoder
};
class Param {
    /**
   * @param value - Parameter value
   * @param encoder - Encoder to convert the value to a driver parameter
   */ constructor(value, encoder = noopEncoder){
        this.value = value;
        this.encoder = encoder;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "Param";
    brand;
    getSQL() {
        return new SQL([
            this
        ]);
    }
}
function param(value, encoder) {
    return new Param(value, encoder);
}
function sql(strings, ...params) {
    const queryChunks = [];
    if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
        queryChunks.push(new StringChunk(strings[0]));
    }
    for (const [paramIndex, param2] of params.entries()){
        queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
    }
    return new SQL(queryChunks);
}
((sql2)=>{
    function empty() {
        return new SQL([]);
    }
    sql2.empty = empty;
    function fromList(list) {
        return new SQL(list);
    }
    sql2.fromList = fromList;
    function raw(str) {
        return new SQL([
            new StringChunk(str)
        ]);
    }
    sql2.raw = raw;
    function join(chunks, separator) {
        const result = [];
        for (const [i, chunk] of chunks.entries()){
            if (i > 0 && separator !== void 0) {
                result.push(separator);
            }
            result.push(chunk);
        }
        return new SQL(result);
    }
    sql2.join = join;
    function identifier(value) {
        return new Name(value);
    }
    sql2.identifier = identifier;
    function placeholder2(name2) {
        return new Placeholder(name2);
    }
    sql2.placeholder = placeholder2;
    function param2(value, encoder) {
        return new Param(value, encoder);
    }
    sql2.param = param2;
})(sql || (sql = {}));
((SQL2)=>{
    class Aliased {
        constructor(sql2, fieldAlias){
            this.sql = sql2;
            this.fieldAlias = fieldAlias;
        }
        static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQL.Aliased";
        /** @internal */ isSelectionField = false;
        getSQL() {
            return this.sql;
        }
        /** @internal */ clone() {
            return new Aliased(this.sql, this.fieldAlias);
        }
    }
    SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));
class Placeholder {
    constructor(name2){
        this.name = name2;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "Placeholder";
    getSQL() {
        return new SQL([
            this
        ]);
    }
}
function placeholder(name2) {
    return new Placeholder(name2);
}
function fillPlaceholders(params, values) {
    return params.map((p)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(p, Placeholder)) {
            if (!(p.name in values)) {
                throw new Error(`No value for placeholder "${p.name}" was provided`);
            }
            return values[p.name];
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(p, Param) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(p.value, Placeholder)) {
            if (!(p.value.name in values)) {
                throw new Error(`No value for placeholder "${p.value.name}" was provided`);
            }
            return p.encoder.mapToDriverValue(values[p.value.name]);
        }
        return p;
    });
}
const IsDrizzleView = Symbol.for("drizzle:IsDrizzleView");
class View {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "View";
    /** @internal */ [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]];
    /** @internal */ [IsDrizzleView] = true;
    constructor({ name: name2, schema, selectedFields, query }){
        this[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]] = {
            name: name2,
            originalName: name2,
            schema,
            selectedFields,
            query,
            isExisting: !query,
            isAlias: false
        };
    }
    getSQL() {
        return new SQL([
            this
        ]);
    }
}
function isView(view) {
    return typeof view === "object" && view !== null && IsDrizzleView in view;
}
__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"].prototype.getSQL = function() {
    return new SQL([
        this
    ]);
};
__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].prototype.getSQL = function() {
    return new SQL([
        this
    ]);
};
__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"].prototype.getSQL = function() {
    return new SQL([
        this
    ]);
};
;
 //# sourceMappingURL=sql.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyMixins",
    ()=>applyMixins,
    "getColumnNameAndConfig",
    ()=>getColumnNameAndConfig,
    "getTableColumns",
    ()=>getTableColumns,
    "getTableLikeName",
    ()=>getTableLikeName,
    "getViewSelectedFields",
    ()=>getViewSelectedFields,
    "haveSameKeys",
    ()=>haveSameKeys,
    "isConfig",
    ()=>isConfig,
    "mapResultRow",
    ()=>mapResultRow,
    "mapUpdateSet",
    ()=>mapUpdateSet,
    "orderSelectedFields",
    ()=>orderSelectedFields
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
function mapResultRow(columns, row, joinsNotNullableMap) {
    const nullifyMap = {};
    const result = columns.reduce((result2, { path, field }, columnIndex)=>{
        let decoder;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
            decoder = field;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
            decoder = field.decoder;
        } else {
            decoder = field.sql.decoder;
        }
        let node = result2;
        for (const [pathChunkIndex, pathChunk] of path.entries()){
            if (pathChunkIndex < path.length - 1) {
                if (!(pathChunk in node)) {
                    node[pathChunk] = {};
                }
                node = node[pathChunk];
            } else {
                const rawValue = row[columnIndex];
                const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
                if (joinsNotNullableMap && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) && path.length === 2) {
                    const objectName = path[0];
                    if (!(objectName in nullifyMap)) {
                        nullifyMap[objectName] = value === null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(field.table) : false;
                    } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(field.table)) {
                        nullifyMap[objectName] = false;
                    }
                }
            }
        }
        return result2;
    }, {});
    if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
        for (const [objectName, tableName] of Object.entries(nullifyMap)){
            if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
                result[objectName] = null;
            }
        }
    }
    return result;
}
function orderSelectedFields(fields, pathPrefix) {
    return Object.entries(fields).reduce((result, [name, field])=>{
        if (typeof name !== "string") {
            return result;
        }
        const newPath = pathPrefix ? [
            ...pathPrefix,
            name
        ] : [
            name
        ];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased)) {
            result.push({
                path: newPath,
                field
            });
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"])) {
            result.push(...orderSelectedFields(field[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns], newPath));
        } else {
            result.push(...orderSelectedFields(field, newPath));
        }
        return result;
    }, []);
}
function haveSameKeys(left, right) {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    if (leftKeys.length !== rightKeys.length) {
        return false;
    }
    for (const [index, key] of leftKeys.entries()){
        if (key !== rightKeys[index]) {
            return false;
        }
    }
    return true;
}
function mapUpdateSet(table, values) {
    const entries = Object.entries(values).filter(([, value])=>value !== void 0).map(([key, value])=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
            return [
                key,
                value
            ];
        } else {
            return [
                key,
                new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Param"](value, table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns][key])
            ];
        }
    });
    if (entries.length === 0) {
        throw new Error("No values to set");
    }
    return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
    for (const extendedClass of extendedClasses){
        for (const name of Object.getOwnPropertyNames(extendedClass.prototype)){
            if (name === "constructor") continue;
            Object.defineProperty(baseClass.prototype, name, Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || /* @__PURE__ */ Object.create(null));
        }
    }
}
function getTableColumns(table) {
    return table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
}
function getViewSelectedFields(view) {
    return view[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].selectedFields;
}
function getTableLikeName(table) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"]) ? table._.alias : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["View"]) ? table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].name : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? void 0 : table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.IsAlias] ? table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name] : table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.BaseName];
}
function getColumnNameAndConfig(a, b) {
    return {
        name: typeof a === "string" && a.length > 0 ? a : "",
        config: typeof a === "object" ? a : b
    };
}
const _ = {};
const __ = {};
function isConfig(data) {
    if (typeof data !== "object" || data === null) return false;
    if (data.constructor.name !== "Object") return false;
    if ("logger" in data) {
        const type = typeof data["logger"];
        if (type !== "boolean" && (type !== "object" || typeof data["logger"]["logQuery"] !== "function") && type !== "undefined") return false;
        return true;
    }
    if ("schema" in data) {
        const type = typeof data["logger"];
        if (type !== "object" && type !== "undefined") return false;
        return true;
    }
    if ("casing" in data) {
        const type = typeof data["logger"];
        if (type !== "string" && type !== "undefined") return false;
        return true;
    }
    if ("mode" in data) {
        if (data["mode"] !== "default" || data["mode"] !== "planetscale" || data["mode"] !== void 0) return false;
        return true;
    }
    if ("connection" in data) {
        const type = typeof data["connection"];
        if (type !== "string" && type !== "object" && type !== "undefined") return false;
        return true;
    }
    if ("client" in data) {
        const type = typeof data["client"];
        if (type !== "object" && type !== "function" && type !== "undefined") return false;
        return true;
    }
    if (Object.keys(data).length === 0) return true;
    return false;
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/delete.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgDeleteBase",
    ()=>PgDeleteBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
class PgDeleteBase extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(table, session, dialect, withList){
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = {
            table,
            withList
        };
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDelete";
    config;
    /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will delete only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be deleted.
   *
   * ```ts
   * // Delete all cars with green color
   * await db.delete(cars).where(eq(cars.color, 'green'));
   * // or
   * await db.delete(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Delete all BMW cars with a green color
   * await db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Delete all cars with the green or blue color
   * await db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */ where(where) {
        this.config.where = where;
        return this;
    }
    returning(fields = this.config.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns]) {
        this.config.returning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(fields);
        return this;
    }
    /** @internal */ getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
    }
    toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
    }
    /** @internal */ _prepare(name) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.prepareQuery", ()=>{
            return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name, true);
        });
    }
    prepare(name) {
        return this._prepare(name);
    }
    authToken;
    /** @internal */ setToken(token) {
        this.authToken = token;
        return this;
    }
    execute = (placeholderValues)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.operation", ()=>{
            return this._prepare().execute(placeholderValues, this.authToken);
        });
    };
    $dynamic() {
        return this;
    }
}
;
 //# sourceMappingURL=delete.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/alias.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColumnAliasProxyHandler",
    ()=>ColumnAliasProxyHandler,
    "RelationTableAliasProxyHandler",
    ()=>RelationTableAliasProxyHandler,
    "TableAliasProxyHandler",
    ()=>TableAliasProxyHandler,
    "aliasedRelation",
    ()=>aliasedRelation,
    "aliasedTable",
    ()=>aliasedTable,
    "aliasedTableColumn",
    ()=>aliasedTableColumn,
    "mapColumnsInAliasedSQLToAlias",
    ()=>mapColumnsInAliasedSQLToAlias,
    "mapColumnsInSQLToAlias",
    ()=>mapColumnsInSQLToAlias
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
;
;
;
;
;
class ColumnAliasProxyHandler {
    constructor(table){
        this.table = table;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "ColumnAliasProxyHandler";
    get(columnObj, prop) {
        if (prop === "table") {
            return this.table;
        }
        return columnObj[prop];
    }
}
class TableAliasProxyHandler {
    constructor(alias, replaceOriginalName){
        this.alias = alias;
        this.replaceOriginalName = replaceOriginalName;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "TableAliasProxyHandler";
    get(target, prop) {
        if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.IsAlias) {
            return true;
        }
        if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name) {
            return this.alias;
        }
        if (this.replaceOriginalName && prop === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.OriginalName) {
            return this.alias;
        }
        if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]) {
            return {
                ...target[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]],
                name: this.alias,
                isAlias: true
            };
        }
        if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns) {
            const columns = target[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
            if (!columns) {
                return columns;
            }
            const proxiedColumns = {};
            Object.keys(columns).map((key)=>{
                proxiedColumns[key] = new Proxy(columns[key], new ColumnAliasProxyHandler(new Proxy(target, this)));
            });
            return proxiedColumns;
        }
        const value = target[prop];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
            return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
        }
        return value;
    }
}
class RelationTableAliasProxyHandler {
    constructor(alias){
        this.alias = alias;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "RelationTableAliasProxyHandler";
    get(target, prop) {
        if (prop === "sourceTable") {
            return aliasedTable(target.sourceTable, this.alias);
        }
        return target[prop];
    }
}
function aliasedTable(table, tableAlias) {
    return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
function aliasedRelation(relation, tableAlias) {
    return new Proxy(relation, new RelationTableAliasProxyHandler(tableAlias));
}
function aliasedTableColumn(column, tableAlias) {
    return new Proxy(column, new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false))));
}
function mapColumnsInAliasedSQLToAlias(query, alias) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
function mapColumnsInSQLToAlias(query, alias) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(query.queryChunks.map((c)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(c, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
            return aliasedTableColumn(c, alias);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(c, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
            return mapColumnsInSQLToAlias(c, alias);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(c, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased)) {
            return mapColumnsInAliasedSQLToAlias(c, alias);
        }
        return c;
    }));
}
;
 //# sourceMappingURL=alias.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/casing.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CasingCache",
    ()=>CasingCache,
    "toCamelCase",
    ()=>toCamelCase,
    "toSnakeCase",
    ()=>toSnakeCase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
;
;
function toSnakeCase(input) {
    const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
    return words.map((word)=>word.toLowerCase()).join("_");
}
function toCamelCase(input) {
    const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
    return words.reduce((acc, word, i)=>{
        const formattedWord = i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`;
        return acc + formattedWord;
    }, "");
}
function noopCase(input) {
    return input;
}
class CasingCache {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "CasingCache";
    /** @internal */ cache = {};
    cachedTables = {};
    convert;
    constructor(casing){
        this.convert = casing === "snake_case" ? toSnakeCase : casing === "camelCase" ? toCamelCase : noopCase;
    }
    getColumnCasing(column) {
        if (!column.keyAsName) return column.name;
        const schema = column.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Schema] ?? "public";
        const tableName = column.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.OriginalName];
        const key = `${schema}.${tableName}.${column.name}`;
        if (!this.cache[key]) {
            this.cacheTable(column.table);
        }
        return this.cache[key];
    }
    cacheTable(table) {
        const schema = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Schema] ?? "public";
        const tableName = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.OriginalName];
        const tableKey = `${schema}.${tableName}`;
        if (!this.cachedTables[tableKey]) {
            for (const column of Object.values(table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns])){
                const columnKey = `${tableKey}.${column.name}`;
                this.cache[columnKey] = this.convert(column.name);
            }
            this.cachedTables[tableKey] = true;
        }
    }
    clearCache() {
        this.cache = {};
        this.cachedTables = {};
    }
}
;
 //# sourceMappingURL=casing.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/errors.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DrizzleError",
    ()=>DrizzleError,
    "TransactionRollbackError",
    ()=>TransactionRollbackError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
;
class DrizzleError extends Error {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "DrizzleError";
    constructor({ message, cause }){
        super(message);
        this.name = "DrizzleError";
        this.cause = cause;
    }
}
class TransactionRollbackError extends DrizzleError {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "TransactionRollbackError";
    constructor(){
        super({
            message: "Rollback"
        });
    }
}
;
 //# sourceMappingURL=errors.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/date.common.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgDateColumnBaseBuilder",
    ()=>PgDateColumnBaseBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgDateColumnBaseBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDateColumnBaseBuilder";
    defaultNow() {
        return this.default(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`now()`);
    }
}
;
 //# sourceMappingURL=date.common.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/date.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgDate",
    ()=>PgDate,
    "PgDateBuilder",
    ()=>PgDateBuilder,
    "PgDateString",
    ()=>PgDateString,
    "PgDateStringBuilder",
    ()=>PgDateStringBuilder,
    "date",
    ()=>date
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/date.common.js [app-rsc] (ecmascript)");
;
;
;
;
class PgDateBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDateColumnBaseBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDateBuilder";
    constructor(name){
        super(name, "date", "PgDate");
    }
    /** @internal */ build(table) {
        return new PgDate(table, this.config);
    }
}
class PgDate extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDate";
    getSQLType() {
        return "date";
    }
    mapFromDriverValue(value) {
        return new Date(value);
    }
    mapToDriverValue(value) {
        return value.toISOString();
    }
}
class PgDateStringBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDateColumnBaseBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDateStringBuilder";
    constructor(name){
        super(name, "string", "PgDateString");
    }
    /** @internal */ build(table) {
        return new PgDateString(table, this.config);
    }
}
class PgDateString extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDateString";
    getSQLType() {
        return "date";
    }
}
function date(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (config?.mode === "date") {
        return new PgDateBuilder(name);
    }
    return new PgDateStringBuilder(name);
}
;
 //# sourceMappingURL=date.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/json.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgJson",
    ()=>PgJson,
    "PgJsonBuilder",
    ()=>PgJsonBuilder,
    "json",
    ()=>json
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgJsonBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgJsonBuilder";
    constructor(name){
        super(name, "json", "PgJson");
    }
    /** @internal */ build(table) {
        return new PgJson(table, this.config);
    }
}
class PgJson extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgJson";
    constructor(table, config){
        super(table, config);
    }
    getSQLType() {
        return "json";
    }
    mapToDriverValue(value) {
        return JSON.stringify(value);
    }
    mapFromDriverValue(value) {
        if (typeof value === "string") {
            try {
                return JSON.parse(value);
            } catch  {
                return value;
            }
        }
        return value;
    }
}
function json(name) {
    return new PgJsonBuilder(name ?? "");
}
;
 //# sourceMappingURL=json.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/jsonb.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgJsonb",
    ()=>PgJsonb,
    "PgJsonbBuilder",
    ()=>PgJsonbBuilder,
    "jsonb",
    ()=>jsonb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgJsonbBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgJsonbBuilder";
    constructor(name){
        super(name, "json", "PgJsonb");
    }
    /** @internal */ build(table) {
        return new PgJsonb(table, this.config);
    }
}
class PgJsonb extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgJsonb";
    constructor(table, config){
        super(table, config);
    }
    getSQLType() {
        return "jsonb";
    }
    mapToDriverValue(value) {
        return JSON.stringify(value);
    }
    mapFromDriverValue(value) {
        if (typeof value === "string") {
            try {
                return JSON.parse(value);
            } catch  {
                return value;
            }
        }
        return value;
    }
}
function jsonb(name) {
    return new PgJsonbBuilder(name ?? "");
}
;
 //# sourceMappingURL=jsonb.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/numeric.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgNumeric",
    ()=>PgNumeric,
    "PgNumericBuilder",
    ()=>PgNumericBuilder,
    "decimal",
    ()=>decimal,
    "numeric",
    ()=>numeric
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgNumericBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgNumericBuilder";
    constructor(name, precision, scale){
        super(name, "string", "PgNumeric");
        this.config.precision = precision;
        this.config.scale = scale;
    }
    /** @internal */ build(table) {
        return new PgNumeric(table, this.config);
    }
}
class PgNumeric extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgNumeric";
    precision;
    scale;
    constructor(table, config){
        super(table, config);
        this.precision = config.precision;
        this.scale = config.scale;
    }
    getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
            return `numeric(${this.precision}, ${this.scale})`;
        } else if (this.precision === void 0) {
            return "numeric";
        } else {
            return `numeric(${this.precision})`;
        }
    }
}
function numeric(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgNumericBuilder(name, config?.precision, config?.scale);
}
const decimal = numeric;
;
 //# sourceMappingURL=numeric.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/time.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgTime",
    ()=>PgTime,
    "PgTimeBuilder",
    ()=>PgTimeBuilder,
    "time",
    ()=>time
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/date.common.js [app-rsc] (ecmascript)");
;
;
;
;
class PgTimeBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDateColumnBaseBuilder"] {
    constructor(name, withTimezone, precision){
        super(name, "string", "PgTime");
        this.withTimezone = withTimezone;
        this.precision = precision;
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgTimeBuilder";
    /** @internal */ build(table) {
        return new PgTime(table, this.config);
    }
}
class PgTime extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgTime";
    withTimezone;
    precision;
    constructor(table, config){
        super(table, config);
        this.withTimezone = config.withTimezone;
        this.precision = config.precision;
    }
    getSQLType() {
        const precision = this.precision === void 0 ? "" : `(${this.precision})`;
        return `time${precision}${this.withTimezone ? " with time zone" : ""}`;
    }
}
function time(a, b = {}) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgTimeBuilder(name, config.withTimezone ?? false, config.precision);
}
;
 //# sourceMappingURL=time.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgTimestamp",
    ()=>PgTimestamp,
    "PgTimestampBuilder",
    ()=>PgTimestampBuilder,
    "PgTimestampString",
    ()=>PgTimestampString,
    "PgTimestampStringBuilder",
    ()=>PgTimestampStringBuilder,
    "timestamp",
    ()=>timestamp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/date.common.js [app-rsc] (ecmascript)");
;
;
;
;
class PgTimestampBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDateColumnBaseBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgTimestampBuilder";
    constructor(name, withTimezone, precision){
        super(name, "date", "PgTimestamp");
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
    }
    /** @internal */ build(table) {
        return new PgTimestamp(table, this.config);
    }
}
class PgTimestamp extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgTimestamp";
    withTimezone;
    precision;
    constructor(table, config){
        super(table, config);
        this.withTimezone = config.withTimezone;
        this.precision = config.precision;
    }
    getSQLType() {
        const precision = this.precision === void 0 ? "" : ` (${this.precision})`;
        return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
    }
    mapFromDriverValue = (value)=>{
        return new Date(this.withTimezone ? value : value + "+0000");
    };
    mapToDriverValue = (value)=>{
        return value.toISOString();
    };
}
class PgTimestampStringBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDateColumnBaseBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgTimestampStringBuilder";
    constructor(name, withTimezone, precision){
        super(name, "string", "PgTimestampString");
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
    }
    /** @internal */ build(table) {
        return new PgTimestampString(table, this.config);
    }
}
class PgTimestampString extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgTimestampString";
    withTimezone;
    precision;
    constructor(table, config){
        super(table, config);
        this.withTimezone = config.withTimezone;
        this.precision = config.precision;
    }
    getSQLType() {
        const precision = this.precision === void 0 ? "" : `(${this.precision})`;
        return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
    }
}
function timestamp(a, b = {}) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (config?.mode === "string") {
        return new PgTimestampStringBuilder(name, config.withTimezone ?? false, config.precision);
    }
    return new PgTimestampBuilder(name, config?.withTimezone ?? false, config?.precision);
}
;
 //# sourceMappingURL=timestamp.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/uuid.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgUUID",
    ()=>PgUUID,
    "PgUUIDBuilder",
    ()=>PgUUIDBuilder,
    "uuid",
    ()=>uuid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgUUIDBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgUUIDBuilder";
    constructor(name){
        super(name, "string", "PgUUID");
    }
    /**
   * Adds `default gen_random_uuid()` to the column definition.
   */ defaultRandom() {
        return this.default(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`gen_random_uuid()`);
    }
    /** @internal */ build(table) {
        return new PgUUID(table, this.config);
    }
}
class PgUUID extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgUUID";
    getSQLType() {
        return "uuid";
    }
}
function uuid(name) {
    return new PgUUIDBuilder(name ?? "");
}
;
 //# sourceMappingURL=uuid.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/int.common.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgIntColumnBaseBuilder",
    ()=>PgIntColumnBaseBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgIntColumnBaseBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgIntColumnBaseBuilder";
    generatedAlwaysAsIdentity(sequence) {
        if (sequence) {
            const { name, ...options } = sequence;
            this.config.generatedIdentity = {
                type: "always",
                sequenceName: name,
                sequenceOptions: options
            };
        } else {
            this.config.generatedIdentity = {
                type: "always"
            };
        }
        this.config.hasDefault = true;
        this.config.notNull = true;
        return this;
    }
    generatedByDefaultAsIdentity(sequence) {
        if (sequence) {
            const { name, ...options } = sequence;
            this.config.generatedIdentity = {
                type: "byDefault",
                sequenceName: name,
                sequenceOptions: options
            };
        } else {
            this.config.generatedIdentity = {
                type: "byDefault"
            };
        }
        this.config.hasDefault = true;
        this.config.notNull = true;
        return this;
    }
}
;
 //# sourceMappingURL=int.common.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/bigint.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgBigInt53",
    ()=>PgBigInt53,
    "PgBigInt53Builder",
    ()=>PgBigInt53Builder,
    "PgBigInt64",
    ()=>PgBigInt64,
    "PgBigInt64Builder",
    ()=>PgBigInt64Builder,
    "bigint",
    ()=>bigint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$int$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/int.common.js [app-rsc] (ecmascript)");
;
;
;
;
class PgBigInt53Builder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$int$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgIntColumnBaseBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBigInt53Builder";
    constructor(name){
        super(name, "number", "PgBigInt53");
    }
    /** @internal */ build(table) {
        return new PgBigInt53(table, this.config);
    }
}
class PgBigInt53 extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBigInt53";
    getSQLType() {
        return "bigint";
    }
    mapFromDriverValue(value) {
        if (typeof value === "number") {
            return value;
        }
        return Number(value);
    }
}
class PgBigInt64Builder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$int$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgIntColumnBaseBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBigInt64Builder";
    constructor(name){
        super(name, "bigint", "PgBigInt64");
    }
    /** @internal */ build(table) {
        return new PgBigInt64(table, this.config);
    }
}
class PgBigInt64 extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBigInt64";
    getSQLType() {
        return "bigint";
    }
    // eslint-disable-next-line unicorn/prefer-native-coercion-functions
    mapFromDriverValue(value) {
        return BigInt(value);
    }
}
function bigint(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (config.mode === "number") {
        return new PgBigInt53Builder(name);
    }
    return new PgBigInt64Builder(name);
}
;
 //# sourceMappingURL=bigint.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/bigserial.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgBigSerial53",
    ()=>PgBigSerial53,
    "PgBigSerial53Builder",
    ()=>PgBigSerial53Builder,
    "PgBigSerial64",
    ()=>PgBigSerial64,
    "PgBigSerial64Builder",
    ()=>PgBigSerial64Builder,
    "bigserial",
    ()=>bigserial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgBigSerial53Builder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBigSerial53Builder";
    constructor(name){
        super(name, "number", "PgBigSerial53");
        this.config.hasDefault = true;
        this.config.notNull = true;
    }
    /** @internal */ build(table) {
        return new PgBigSerial53(table, this.config);
    }
}
class PgBigSerial53 extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBigSerial53";
    getSQLType() {
        return "bigserial";
    }
    mapFromDriverValue(value) {
        if (typeof value === "number") {
            return value;
        }
        return Number(value);
    }
}
class PgBigSerial64Builder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBigSerial64Builder";
    constructor(name){
        super(name, "bigint", "PgBigSerial64");
        this.config.hasDefault = true;
    }
    /** @internal */ build(table) {
        return new PgBigSerial64(table, this.config);
    }
}
class PgBigSerial64 extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBigSerial64";
    getSQLType() {
        return "bigserial";
    }
    // eslint-disable-next-line unicorn/prefer-native-coercion-functions
    mapFromDriverValue(value) {
        return BigInt(value);
    }
}
function bigserial(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (config.mode === "number") {
        return new PgBigSerial53Builder(name);
    }
    return new PgBigSerial64Builder(name);
}
;
 //# sourceMappingURL=bigserial.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/boolean.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgBoolean",
    ()=>PgBoolean,
    "PgBooleanBuilder",
    ()=>PgBooleanBuilder,
    "boolean",
    ()=>boolean
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgBooleanBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBooleanBuilder";
    constructor(name){
        super(name, "boolean", "PgBoolean");
    }
    /** @internal */ build(table) {
        return new PgBoolean(table, this.config);
    }
}
class PgBoolean extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBoolean";
    getSQLType() {
        return "boolean";
    }
}
function boolean(name) {
    return new PgBooleanBuilder(name ?? "");
}
;
 //# sourceMappingURL=boolean.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/char.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgChar",
    ()=>PgChar,
    "PgCharBuilder",
    ()=>PgCharBuilder,
    "char",
    ()=>char
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgCharBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgCharBuilder";
    constructor(name, config){
        super(name, "string", "PgChar");
        this.config.length = config.length;
        this.config.enumValues = config.enum;
    }
    /** @internal */ build(table) {
        return new PgChar(table, this.config);
    }
}
class PgChar extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgChar";
    length = this.config.length;
    enumValues = this.config.enumValues;
    getSQLType() {
        return this.length === void 0 ? `char` : `char(${this.length})`;
    }
}
function char(a, b = {}) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgCharBuilder(name, config);
}
;
 //# sourceMappingURL=char.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/cidr.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgCidr",
    ()=>PgCidr,
    "PgCidrBuilder",
    ()=>PgCidrBuilder,
    "cidr",
    ()=>cidr
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgCidrBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgCidrBuilder";
    constructor(name){
        super(name, "string", "PgCidr");
    }
    /** @internal */ build(table) {
        return new PgCidr(table, this.config);
    }
}
class PgCidr extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgCidr";
    getSQLType() {
        return "cidr";
    }
}
function cidr(name) {
    return new PgCidrBuilder(name ?? "");
}
;
 //# sourceMappingURL=cidr.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/custom.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgCustomColumn",
    ()=>PgCustomColumn,
    "PgCustomColumnBuilder",
    ()=>PgCustomColumnBuilder,
    "customType",
    ()=>customType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgCustomColumnBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgCustomColumnBuilder";
    constructor(name, fieldConfig, customTypeParams){
        super(name, "custom", "PgCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
    }
    /** @internal */ build(table) {
        return new PgCustomColumn(table, this.config);
    }
}
class PgCustomColumn extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgCustomColumn";
    sqlName;
    mapTo;
    mapFrom;
    constructor(table, config){
        super(table, config);
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
    }
    getSQLType() {
        return this.sqlName;
    }
    mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
    }
    mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
    }
}
function customType(customTypeParams) {
    return (a, b)=>{
        const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
        return new PgCustomColumnBuilder(name, config, customTypeParams);
    };
}
;
 //# sourceMappingURL=custom.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/double-precision.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgDoublePrecision",
    ()=>PgDoublePrecision,
    "PgDoublePrecisionBuilder",
    ()=>PgDoublePrecisionBuilder,
    "doublePrecision",
    ()=>doublePrecision
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgDoublePrecisionBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDoublePrecisionBuilder";
    constructor(name){
        super(name, "number", "PgDoublePrecision");
    }
    /** @internal */ build(table) {
        return new PgDoublePrecision(table, this.config);
    }
}
class PgDoublePrecision extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDoublePrecision";
    getSQLType() {
        return "double precision";
    }
    mapFromDriverValue(value) {
        if (typeof value === "string") {
            return Number.parseFloat(value);
        }
        return value;
    }
}
function doublePrecision(name) {
    return new PgDoublePrecisionBuilder(name ?? "");
}
;
 //# sourceMappingURL=double-precision.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/inet.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgInet",
    ()=>PgInet,
    "PgInetBuilder",
    ()=>PgInetBuilder,
    "inet",
    ()=>inet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgInetBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgInetBuilder";
    constructor(name){
        super(name, "string", "PgInet");
    }
    /** @internal */ build(table) {
        return new PgInet(table, this.config);
    }
}
class PgInet extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgInet";
    getSQLType() {
        return "inet";
    }
}
function inet(name) {
    return new PgInetBuilder(name ?? "");
}
;
 //# sourceMappingURL=inet.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/integer.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgInteger",
    ()=>PgInteger,
    "PgIntegerBuilder",
    ()=>PgIntegerBuilder,
    "integer",
    ()=>integer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$int$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/int.common.js [app-rsc] (ecmascript)");
;
;
;
class PgIntegerBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$int$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgIntColumnBaseBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgIntegerBuilder";
    constructor(name){
        super(name, "number", "PgInteger");
    }
    /** @internal */ build(table) {
        return new PgInteger(table, this.config);
    }
}
class PgInteger extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgInteger";
    getSQLType() {
        return "integer";
    }
    mapFromDriverValue(value) {
        if (typeof value === "string") {
            return Number.parseInt(value);
        }
        return value;
    }
}
function integer(name) {
    return new PgIntegerBuilder(name ?? "");
}
;
 //# sourceMappingURL=integer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/interval.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgInterval",
    ()=>PgInterval,
    "PgIntervalBuilder",
    ()=>PgIntervalBuilder,
    "interval",
    ()=>interval
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgIntervalBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgIntervalBuilder";
    constructor(name, intervalConfig){
        super(name, "string", "PgInterval");
        this.config.intervalConfig = intervalConfig;
    }
    /** @internal */ build(table) {
        return new PgInterval(table, this.config);
    }
}
class PgInterval extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgInterval";
    fields = this.config.intervalConfig.fields;
    precision = this.config.intervalConfig.precision;
    getSQLType() {
        const fields = this.fields ? ` ${this.fields}` : "";
        const precision = this.precision ? `(${this.precision})` : "";
        return `interval${fields}${precision}`;
    }
}
function interval(a, b = {}) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgIntervalBuilder(name, config);
}
;
 //# sourceMappingURL=interval.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/line.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgLineABC",
    ()=>PgLineABC,
    "PgLineABCBuilder",
    ()=>PgLineABCBuilder,
    "PgLineBuilder",
    ()=>PgLineBuilder,
    "PgLineTuple",
    ()=>PgLineTuple,
    "line",
    ()=>line
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgLineBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgLineBuilder";
    constructor(name){
        super(name, "array", "PgLine");
    }
    /** @internal */ build(table) {
        return new PgLineTuple(table, this.config);
    }
}
class PgLineTuple extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgLine";
    getSQLType() {
        return "line";
    }
    mapFromDriverValue(value) {
        const [a, b, c] = value.slice(1, -1).split(",");
        return [
            Number.parseFloat(a),
            Number.parseFloat(b),
            Number.parseFloat(c)
        ];
    }
    mapToDriverValue(value) {
        return `{${value[0]},${value[1]},${value[2]}}`;
    }
}
class PgLineABCBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgLineABCBuilder";
    constructor(name){
        super(name, "json", "PgLineABC");
    }
    /** @internal */ build(table) {
        return new PgLineABC(table, this.config);
    }
}
class PgLineABC extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgLineABC";
    getSQLType() {
        return "line";
    }
    mapFromDriverValue(value) {
        const [a, b, c] = value.slice(1, -1).split(",");
        return {
            a: Number.parseFloat(a),
            b: Number.parseFloat(b),
            c: Number.parseFloat(c)
        };
    }
    mapToDriverValue(value) {
        return `{${value.a},${value.b},${value.c}}`;
    }
}
function line(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (!config?.mode || config.mode === "tuple") {
        return new PgLineBuilder(name);
    }
    return new PgLineABCBuilder(name);
}
;
 //# sourceMappingURL=line.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/macaddr.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgMacaddr",
    ()=>PgMacaddr,
    "PgMacaddrBuilder",
    ()=>PgMacaddrBuilder,
    "macaddr",
    ()=>macaddr
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgMacaddrBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgMacaddrBuilder";
    constructor(name){
        super(name, "string", "PgMacaddr");
    }
    /** @internal */ build(table) {
        return new PgMacaddr(table, this.config);
    }
}
class PgMacaddr extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgMacaddr";
    getSQLType() {
        return "macaddr";
    }
}
function macaddr(name) {
    return new PgMacaddrBuilder(name ?? "");
}
;
 //# sourceMappingURL=macaddr.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/macaddr8.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgMacaddr8",
    ()=>PgMacaddr8,
    "PgMacaddr8Builder",
    ()=>PgMacaddr8Builder,
    "macaddr8",
    ()=>macaddr8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgMacaddr8Builder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgMacaddr8Builder";
    constructor(name){
        super(name, "string", "PgMacaddr8");
    }
    /** @internal */ build(table) {
        return new PgMacaddr8(table, this.config);
    }
}
class PgMacaddr8 extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgMacaddr8";
    getSQLType() {
        return "macaddr8";
    }
}
function macaddr8(name) {
    return new PgMacaddr8Builder(name ?? "");
}
;
 //# sourceMappingURL=macaddr8.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/point.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgPointObject",
    ()=>PgPointObject,
    "PgPointObjectBuilder",
    ()=>PgPointObjectBuilder,
    "PgPointTuple",
    ()=>PgPointTuple,
    "PgPointTupleBuilder",
    ()=>PgPointTupleBuilder,
    "point",
    ()=>point
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgPointTupleBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgPointTupleBuilder";
    constructor(name){
        super(name, "array", "PgPointTuple");
    }
    /** @internal */ build(table) {
        return new PgPointTuple(table, this.config);
    }
}
class PgPointTuple extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgPointTuple";
    getSQLType() {
        return "point";
    }
    mapFromDriverValue(value) {
        if (typeof value === "string") {
            const [x, y] = value.slice(1, -1).split(",");
            return [
                Number.parseFloat(x),
                Number.parseFloat(y)
            ];
        }
        return [
            value.x,
            value.y
        ];
    }
    mapToDriverValue(value) {
        return `(${value[0]},${value[1]})`;
    }
}
class PgPointObjectBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgPointObjectBuilder";
    constructor(name){
        super(name, "json", "PgPointObject");
    }
    /** @internal */ build(table) {
        return new PgPointObject(table, this.config);
    }
}
class PgPointObject extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgPointObject";
    getSQLType() {
        return "point";
    }
    mapFromDriverValue(value) {
        if (typeof value === "string") {
            const [x, y] = value.slice(1, -1).split(",");
            return {
                x: Number.parseFloat(x),
                y: Number.parseFloat(y)
            };
        }
        return value;
    }
    mapToDriverValue(value) {
        return `(${value.x},${value.y})`;
    }
}
function point(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (!config?.mode || config.mode === "tuple") {
        return new PgPointTupleBuilder(name);
    }
    return new PgPointObjectBuilder(name);
}
;
 //# sourceMappingURL=point.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/postgis_extension/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseEWKB",
    ()=>parseEWKB
]);
function hexToBytes(hex) {
    const bytes = [];
    for(let c = 0; c < hex.length; c += 2){
        bytes.push(Number.parseInt(hex.slice(c, c + 2), 16));
    }
    return new Uint8Array(bytes);
}
function bytesToFloat64(bytes, offset) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    for(let i = 0; i < 8; i++){
        view.setUint8(i, bytes[offset + i]);
    }
    return view.getFloat64(0, true);
}
function parseEWKB(hex) {
    const bytes = hexToBytes(hex);
    let offset = 0;
    const byteOrder = bytes[offset];
    offset += 1;
    const view = new DataView(bytes.buffer);
    const geomType = view.getUint32(offset, byteOrder === 1);
    offset += 4;
    let _srid;
    if (geomType & 536870912) {
        _srid = view.getUint32(offset, byteOrder === 1);
        offset += 4;
    }
    if ((geomType & 65535) === 1) {
        const x = bytesToFloat64(bytes, offset);
        offset += 8;
        const y = bytesToFloat64(bytes, offset);
        offset += 8;
        return [
            x,
            y
        ];
    }
    throw new Error("Unsupported geometry type");
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgGeometry",
    ()=>PgGeometry,
    "PgGeometryBuilder",
    ()=>PgGeometryBuilder,
    "PgGeometryObject",
    ()=>PgGeometryObject,
    "PgGeometryObjectBuilder",
    ()=>PgGeometryObjectBuilder,
    "geometry",
    ()=>geometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$postgis_extension$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/postgis_extension/utils.js [app-rsc] (ecmascript)");
;
;
;
;
class PgGeometryBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgGeometryBuilder";
    constructor(name){
        super(name, "array", "PgGeometry");
    }
    /** @internal */ build(table) {
        return new PgGeometry(table, this.config);
    }
}
class PgGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgGeometry";
    getSQLType() {
        return "geometry(point)";
    }
    mapFromDriverValue(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$postgis_extension$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseEWKB"])(value);
    }
    mapToDriverValue(value) {
        return `point(${value[0]} ${value[1]})`;
    }
}
class PgGeometryObjectBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgGeometryObjectBuilder";
    constructor(name){
        super(name, "json", "PgGeometryObject");
    }
    /** @internal */ build(table) {
        return new PgGeometryObject(table, this.config);
    }
}
class PgGeometryObject extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgGeometryObject";
    getSQLType() {
        return "geometry(point)";
    }
    mapFromDriverValue(value) {
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$postgis_extension$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseEWKB"])(value);
        return {
            x: parsed[0],
            y: parsed[1]
        };
    }
    mapToDriverValue(value) {
        return `point(${value.x} ${value.y})`;
    }
}
function geometry(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (!config?.mode || config.mode === "tuple") {
        return new PgGeometryBuilder(name);
    }
    return new PgGeometryObjectBuilder(name);
}
;
 //# sourceMappingURL=geometry.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/real.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgReal",
    ()=>PgReal,
    "PgRealBuilder",
    ()=>PgRealBuilder,
    "real",
    ()=>real
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgRealBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgRealBuilder";
    constructor(name, length){
        super(name, "number", "PgReal");
        this.config.length = length;
    }
    /** @internal */ build(table) {
        return new PgReal(table, this.config);
    }
}
class PgReal extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgReal";
    constructor(table, config){
        super(table, config);
    }
    getSQLType() {
        return "real";
    }
    mapFromDriverValue = (value)=>{
        if (typeof value === "string") {
            return Number.parseFloat(value);
        }
        return value;
    };
}
function real(name) {
    return new PgRealBuilder(name ?? "");
}
;
 //# sourceMappingURL=real.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/serial.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgSerial",
    ()=>PgSerial,
    "PgSerialBuilder",
    ()=>PgSerialBuilder,
    "serial",
    ()=>serial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgSerialBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSerialBuilder";
    constructor(name){
        super(name, "number", "PgSerial");
        this.config.hasDefault = true;
        this.config.notNull = true;
    }
    /** @internal */ build(table) {
        return new PgSerial(table, this.config);
    }
}
class PgSerial extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSerial";
    getSQLType() {
        return "serial";
    }
}
function serial(name) {
    return new PgSerialBuilder(name ?? "");
}
;
 //# sourceMappingURL=serial.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/smallint.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgSmallInt",
    ()=>PgSmallInt,
    "PgSmallIntBuilder",
    ()=>PgSmallIntBuilder,
    "smallint",
    ()=>smallint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$int$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/int.common.js [app-rsc] (ecmascript)");
;
;
;
class PgSmallIntBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$int$2e$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgIntColumnBaseBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSmallIntBuilder";
    constructor(name){
        super(name, "number", "PgSmallInt");
    }
    /** @internal */ build(table) {
        return new PgSmallInt(table, this.config);
    }
}
class PgSmallInt extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSmallInt";
    getSQLType() {
        return "smallint";
    }
    mapFromDriverValue = (value)=>{
        if (typeof value === "string") {
            return Number(value);
        }
        return value;
    };
}
function smallint(name) {
    return new PgSmallIntBuilder(name ?? "");
}
;
 //# sourceMappingURL=smallint.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/smallserial.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgSmallSerial",
    ()=>PgSmallSerial,
    "PgSmallSerialBuilder",
    ()=>PgSmallSerialBuilder,
    "smallserial",
    ()=>smallserial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class PgSmallSerialBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSmallSerialBuilder";
    constructor(name){
        super(name, "number", "PgSmallSerial");
        this.config.hasDefault = true;
        this.config.notNull = true;
    }
    /** @internal */ build(table) {
        return new PgSmallSerial(table, this.config);
    }
}
class PgSmallSerial extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSmallSerial";
    getSQLType() {
        return "smallserial";
    }
}
function smallserial(name) {
    return new PgSmallSerialBuilder(name ?? "");
}
;
 //# sourceMappingURL=smallserial.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/text.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgText",
    ()=>PgText,
    "PgTextBuilder",
    ()=>PgTextBuilder,
    "text",
    ()=>text
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgTextBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgTextBuilder";
    constructor(name, config){
        super(name, "string", "PgText");
        this.config.enumValues = config.enum;
    }
    /** @internal */ build(table) {
        return new PgText(table, this.config);
    }
}
class PgText extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgText";
    enumValues = this.config.enumValues;
    getSQLType() {
        return "text";
    }
}
function text(a, b = {}) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgTextBuilder(name, config);
}
;
 //# sourceMappingURL=text.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/varchar.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgVarchar",
    ()=>PgVarchar,
    "PgVarcharBuilder",
    ()=>PgVarcharBuilder,
    "varchar",
    ()=>varchar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgVarcharBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgVarcharBuilder";
    constructor(name, config){
        super(name, "string", "PgVarchar");
        this.config.length = config.length;
        this.config.enumValues = config.enum;
    }
    /** @internal */ build(table) {
        return new PgVarchar(table, this.config);
    }
}
class PgVarchar extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgVarchar";
    length = this.config.length;
    enumValues = this.config.enumValues;
    getSQLType() {
        return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
    }
}
function varchar(a, b = {}) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgVarcharBuilder(name, config);
}
;
 //# sourceMappingURL=varchar.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgBinaryVector",
    ()=>PgBinaryVector,
    "PgBinaryVectorBuilder",
    ()=>PgBinaryVectorBuilder,
    "bit",
    ()=>bit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgBinaryVectorBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBinaryVectorBuilder";
    constructor(name, config){
        super(name, "string", "PgBinaryVector");
        this.config.dimensions = config.dimensions;
    }
    /** @internal */ build(table) {
        return new PgBinaryVector(table, this.config);
    }
}
class PgBinaryVector extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgBinaryVector";
    dimensions = this.config.dimensions;
    getSQLType() {
        return `bit(${this.dimensions})`;
    }
}
function bit(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgBinaryVectorBuilder(name, config);
}
;
 //# sourceMappingURL=bit.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgHalfVector",
    ()=>PgHalfVector,
    "PgHalfVectorBuilder",
    ()=>PgHalfVectorBuilder,
    "halfvec",
    ()=>halfvec
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgHalfVectorBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgHalfVectorBuilder";
    constructor(name, config){
        super(name, "array", "PgHalfVector");
        this.config.dimensions = config.dimensions;
    }
    /** @internal */ build(table) {
        return new PgHalfVector(table, this.config);
    }
}
class PgHalfVector extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgHalfVector";
    dimensions = this.config.dimensions;
    getSQLType() {
        return `halfvec(${this.dimensions})`;
    }
    mapToDriverValue(value) {
        return JSON.stringify(value);
    }
    mapFromDriverValue(value) {
        return value.slice(1, -1).split(",").map((v)=>Number.parseFloat(v));
    }
}
function halfvec(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgHalfVectorBuilder(name, config);
}
;
 //# sourceMappingURL=halfvec.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgSparseVector",
    ()=>PgSparseVector,
    "PgSparseVectorBuilder",
    ()=>PgSparseVectorBuilder,
    "sparsevec",
    ()=>sparsevec
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgSparseVectorBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSparseVectorBuilder";
    constructor(name, config){
        super(name, "string", "PgSparseVector");
        this.config.dimensions = config.dimensions;
    }
    /** @internal */ build(table) {
        return new PgSparseVector(table, this.config);
    }
}
class PgSparseVector extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSparseVector";
    dimensions = this.config.dimensions;
    getSQLType() {
        return `sparsevec(${this.dimensions})`;
    }
}
function sparsevec(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgSparseVectorBuilder(name, config);
}
;
 //# sourceMappingURL=sparsevec.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgVector",
    ()=>PgVector,
    "PgVectorBuilder",
    ()=>PgVectorBuilder,
    "vector",
    ()=>vector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class PgVectorBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgVectorBuilder";
    constructor(name, config){
        super(name, "array", "PgVector");
        this.config.dimensions = config.dimensions;
    }
    /** @internal */ build(table) {
        return new PgVector(table, this.config);
    }
}
class PgVector extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgVector";
    dimensions = this.config.dimensions;
    getSQLType() {
        return `vector(${this.dimensions})`;
    }
    mapToDriverValue(value) {
        return JSON.stringify(value);
    }
    mapFromDriverValue(value) {
        return value.slice(1, -1).split(",").map((v)=>Number.parseFloat(v));
    }
}
function vector(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    return new PgVectorBuilder(name, config);
}
;
 //# sourceMappingURL=vector.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/all.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPgColumnBuilders",
    ()=>getPgColumnBuilders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/bigint.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigserial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/bigserial.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/boolean.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$char$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/char.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$cidr$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/cidr.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$custom$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/custom.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/date.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/double-precision.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$inet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/inet.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/integer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$interval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/interval.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$json$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/json.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/jsonb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$line$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/line.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$macaddr$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/macaddr.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$macaddr8$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/macaddr8.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/numeric.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$point$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/point.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$postgis_extension$2f$geometry$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/real.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/serial.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$smallint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/smallint.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$smallserial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/smallserial.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/text.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/time.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/uuid.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/varchar.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$vector_extension$2f$bit$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$vector_extension$2f$halfvec$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$vector_extension$2f$sparsevec$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$vector_extension$2f$vector$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.js [app-rsc] (ecmascript)");
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
function getPgColumnBuilders() {
    return {
        bigint: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["bigint"],
        bigserial: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigserial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["bigserial"],
        boolean: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["boolean"],
        char: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$char$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["char"],
        cidr: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$cidr$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cidr"],
        customType: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$custom$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["customType"],
        date: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["date"],
        doublePrecision: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["doublePrecision"],
        inet: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$inet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["inet"],
        integer: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"],
        interval: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$interval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interval"],
        json: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$json$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["json"],
        jsonb: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonb"],
        line: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$line$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["line"],
        macaddr: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$macaddr$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["macaddr"],
        macaddr8: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$macaddr8$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["macaddr8"],
        numeric: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["numeric"],
        point: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$point$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["point"],
        geometry: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$postgis_extension$2f$geometry$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["geometry"],
        real: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["real"],
        serial: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"],
        smallint: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$smallint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["smallint"],
        smallserial: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$smallserial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["smallserial"],
        text: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"],
        time: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["time"],
        timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"],
        uuid: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uuid"],
        varchar: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"],
        bit: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$vector_extension$2f$bit$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["bit"],
        halfvec: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$vector_extension$2f$halfvec$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["halfvec"],
        sparsevec: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$vector_extension$2f$sparsevec$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sparsevec"],
        vector: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$vector_extension$2f$vector$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["vector"]
    };
}
;
 //# sourceMappingURL=all.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/table.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EnableRLS",
    ()=>EnableRLS,
    "InlineForeignKeys",
    ()=>InlineForeignKeys,
    "PgTable",
    ()=>PgTable,
    "pgTable",
    ()=>pgTable,
    "pgTableCreator",
    ()=>pgTableCreator,
    "pgTableWithSchema",
    ()=>pgTableWithSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$all$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/all.js [app-rsc] (ecmascript)");
;
;
;
const InlineForeignKeys = Symbol.for("drizzle:PgInlineForeignKeys");
const EnableRLS = Symbol.for("drizzle:EnableRLS");
class PgTable extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgTable";
    /** @internal */ static Symbol = Object.assign({}, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol, {
        InlineForeignKeys,
        EnableRLS
    });
    /**@internal */ [InlineForeignKeys] = [];
    /** @internal */ [EnableRLS] = false;
    /** @internal */ [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.ExtraConfigBuilder] = void 0;
}
function pgTableWithSchema(name, columns, extraConfig, schema, baseName = name) {
    const rawTable = new PgTable(name, schema, baseName);
    const parsedColumns = typeof columns === "function" ? columns((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$all$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPgColumnBuilders"])()) : columns;
    const builtColumns = Object.fromEntries(Object.entries(parsedColumns).map(([name2, colBuilderBase])=>{
        const colBuilder = colBuilderBase;
        colBuilder.setName(name2);
        const column = colBuilder.build(rawTable);
        rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
        return [
            name2,
            column
        ];
    }));
    const builtColumnsForExtraConfig = Object.fromEntries(Object.entries(parsedColumns).map(([name2, colBuilderBase])=>{
        const colBuilder = colBuilderBase;
        colBuilder.setName(name2);
        const column = colBuilder.buildExtraConfigColumn(rawTable);
        return [
            name2,
            column
        ];
    }));
    const table = Object.assign(rawTable, builtColumns);
    table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns] = builtColumns;
    table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.ExtraConfigColumns] = builtColumnsForExtraConfig;
    if (extraConfig) {
        table[PgTable.Symbol.ExtraConfigBuilder] = extraConfig;
    }
    return Object.assign(table, {
        enableRLS: ()=>{
            table[PgTable.Symbol.EnableRLS] = true;
            return table;
        }
    });
}
const pgTable = (name, columns, extraConfig)=>{
    return pgTableWithSchema(name, columns, extraConfig, void 0);
};
function pgTableCreator(customizeTableName) {
    return (name, columns, extraConfig)=>{
        return pgTableWithSchema(customizeTableName(name), columns, extraConfig, void 0, name);
    };
}
;
 //# sourceMappingURL=table.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/primary-keys.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrimaryKey",
    ()=>PrimaryKey,
    "PrimaryKeyBuilder",
    ()=>PrimaryKeyBuilder,
    "primaryKey",
    ()=>primaryKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/table.js [app-rsc] (ecmascript)");
;
;
function primaryKey(...config) {
    if (config[0].columns) {
        return new PrimaryKeyBuilder(config[0].columns, config[0].name);
    }
    return new PrimaryKeyBuilder(config);
}
class PrimaryKeyBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgPrimaryKeyBuilder";
    /** @internal */ columns;
    /** @internal */ name;
    constructor(columns, name){
        this.columns = columns;
        this.name = name;
    }
    /** @internal */ build(table) {
        return new PrimaryKey(table, this.columns, this.name);
    }
}
class PrimaryKey {
    constructor(table, columns, name){
        this.table = table;
        this.columns = columns;
        this.name = name;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgPrimaryKey";
    columns;
    name;
    getName() {
        return this.name ?? `${this.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"].Symbol.Name]}_${this.columns.map((column)=>column.name).join("_")}_pk`;
    }
}
;
 //# sourceMappingURL=primary-keys.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/expressions/conditions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "and",
    ()=>and,
    "arrayContained",
    ()=>arrayContained,
    "arrayContains",
    ()=>arrayContains,
    "arrayOverlaps",
    ()=>arrayOverlaps,
    "between",
    ()=>between,
    "bindIfParam",
    ()=>bindIfParam,
    "eq",
    ()=>eq,
    "exists",
    ()=>exists,
    "gt",
    ()=>gt,
    "gte",
    ()=>gte,
    "ilike",
    ()=>ilike,
    "inArray",
    ()=>inArray,
    "isNotNull",
    ()=>isNotNull,
    "isNull",
    ()=>isNull,
    "like",
    ()=>like,
    "lt",
    ()=>lt,
    "lte",
    ()=>lte,
    "ne",
    ()=>ne,
    "not",
    ()=>not,
    "notBetween",
    ()=>notBetween,
    "notExists",
    ()=>notExists,
    "notIlike",
    ()=>notIlike,
    "notInArray",
    ()=>notInArray,
    "notLike",
    ()=>notLike,
    "or",
    ()=>or
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
;
;
;
;
function bindIfParam(value, column) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isDriverValueEncoder"])(column) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSQLWrapper"])(value) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Param"]) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Placeholder"]) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"]) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["View"])) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Param"](value, column);
    }
    return value;
}
const eq = (left, right)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${left} = ${bindIfParam(right, left)}`;
};
const ne = (left, right)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${left} <> ${bindIfParam(right, left)}`;
};
function and(...unfilteredConditions) {
    const conditions = unfilteredConditions.filter((c)=>c !== void 0);
    if (conditions.length === 0) {
        return void 0;
    }
    if (conditions.length === 1) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"](conditions);
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]([
        new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StringChunk"]("("),
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(conditions, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StringChunk"](" and ")),
        new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StringChunk"](")")
    ]);
}
function or(...unfilteredConditions) {
    const conditions = unfilteredConditions.filter((c)=>c !== void 0);
    if (conditions.length === 0) {
        return void 0;
    }
    if (conditions.length === 1) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"](conditions);
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]([
        new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StringChunk"]("("),
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(conditions, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StringChunk"](" or ")),
        new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StringChunk"](")")
    ]);
}
function not(condition) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`not ${condition}`;
}
const gt = (left, right)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${left} > ${bindIfParam(right, left)}`;
};
const gte = (left, right)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${left} >= ${bindIfParam(right, left)}`;
};
const lt = (left, right)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${left} < ${bindIfParam(right, left)}`;
};
const lte = (left, right)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${left} <= ${bindIfParam(right, left)}`;
};
function inArray(column, values) {
    if (Array.isArray(values)) {
        if (values.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`false`;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} in ${values.map((v)=>bindIfParam(v, column))}`;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} in ${bindIfParam(values, column)}`;
}
function notInArray(column, values) {
    if (Array.isArray(values)) {
        if (values.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`true`;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} not in ${values.map((v)=>bindIfParam(v, column))}`;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} not in ${bindIfParam(values, column)}`;
}
function isNull(value) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${value} is null`;
}
function isNotNull(value) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${value} is not null`;
}
function exists(subquery) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`exists ${subquery}`;
}
function notExists(subquery) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`not exists ${subquery}`;
}
function between(column, min, max) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function notBetween(column, min, max) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} not between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function like(column, value) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} like ${value}`;
}
function notLike(column, value) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} not like ${value}`;
}
function ilike(column, value) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} ilike ${value}`;
}
function notIlike(column, value) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} not ilike ${value}`;
}
function arrayContains(column, values) {
    if (Array.isArray(values)) {
        if (values.length === 0) {
            throw new Error("arrayContains requires at least one value");
        }
        const array = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${bindIfParam(values, column)}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} @> ${array}`;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} @> ${bindIfParam(values, column)}`;
}
function arrayContained(column, values) {
    if (Array.isArray(values)) {
        if (values.length === 0) {
            throw new Error("arrayContained requires at least one value");
        }
        const array = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${bindIfParam(values, column)}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} <@ ${array}`;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} <@ ${bindIfParam(values, column)}`;
}
function arrayOverlaps(column, values) {
    if (Array.isArray(values)) {
        if (values.length === 0) {
            throw new Error("arrayOverlaps requires at least one value");
        }
        const array = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${bindIfParam(values, column)}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} && ${array}`;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} && ${bindIfParam(values, column)}`;
}
;
 //# sourceMappingURL=conditions.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/expressions/select.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "asc",
    ()=>asc,
    "desc",
    ()=>desc
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
;
function asc(column) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} asc`;
}
function desc(column) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} desc`;
}
;
 //# sourceMappingURL=select.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/relations.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Many",
    ()=>Many,
    "One",
    ()=>One,
    "Relation",
    ()=>Relation,
    "Relations",
    ()=>Relations,
    "createMany",
    ()=>createMany,
    "createOne",
    ()=>createOne,
    "createTableRelationsHelpers",
    ()=>createTableRelationsHelpers,
    "extractTablesRelationalConfig",
    ()=>extractTablesRelationalConfig,
    "getOperators",
    ()=>getOperators,
    "getOrderByOperators",
    ()=>getOrderByOperators,
    "mapRelationalRow",
    ()=>mapRelationalRow,
    "normalizeRelation",
    ()=>normalizeRelation,
    "relations",
    ()=>relations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$primary$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/primary-keys.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/expressions/conditions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/expressions/select.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
class Relation {
    constructor(sourceTable, referencedTable, relationName){
        this.sourceTable = sourceTable;
        this.referencedTable = referencedTable;
        this.relationName = relationName;
        this.referencedTableName = referencedTable[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name];
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "Relation";
    referencedTableName;
    fieldName;
}
class Relations {
    constructor(table, config){
        this.table = table;
        this.config = config;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "Relations";
}
class One extends Relation {
    constructor(sourceTable, referencedTable, config, isNullable){
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
        this.isNullable = isNullable;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "One";
    withFieldName(fieldName) {
        const relation = new One(this.sourceTable, this.referencedTable, this.config, this.isNullable);
        relation.fieldName = fieldName;
        return relation;
    }
}
class Many extends Relation {
    constructor(sourceTable, referencedTable, config){
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "Many";
    withFieldName(fieldName) {
        const relation = new Many(this.sourceTable, this.referencedTable, this.config);
        relation.fieldName = fieldName;
        return relation;
    }
}
function getOperators() {
    return {
        and: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["and"],
        between: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["between"],
        eq: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"],
        exists: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["exists"],
        gt: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gt"],
        gte: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gte"],
        ilike: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ilike"],
        inArray: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["inArray"],
        isNull: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNull"],
        isNotNull: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNotNull"],
        like: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"],
        lt: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lt"],
        lte: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lte"],
        ne: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ne"],
        not: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["not"],
        notBetween: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notBetween"],
        notExists: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notExists"],
        notLike: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notLike"],
        notIlike: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notIlike"],
        notInArray: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notInArray"],
        or: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["or"],
        sql: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]
    };
}
function getOrderByOperators() {
    return {
        sql: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"],
        asc: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asc"],
        desc: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["desc"]
    };
}
function extractTablesRelationalConfig(schema, configHelpers) {
    if (Object.keys(schema).length === 1 && "default" in schema && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(schema["default"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"])) {
        schema = schema["default"];
    }
    const tableNamesMap = {};
    const relationsBuffer = {};
    const tablesConfig = {};
    for (const [key, value] of Object.entries(schema)){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"])) {
            const dbName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableUniqueName"])(value);
            const bufferedRelations = relationsBuffer[dbName];
            tableNamesMap[dbName] = key;
            tablesConfig[key] = {
                tsName: key,
                dbName: value[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name],
                schema: value[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Schema],
                columns: value[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns],
                relations: bufferedRelations?.relations ?? {},
                primaryKey: bufferedRelations?.primaryKey ?? []
            };
            for (const column of Object.values(value[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns])){
                if (column.primary) {
                    tablesConfig[key].primaryKey.push(column);
                }
            }
            const extraConfig = value[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.ExtraConfigBuilder]?.(value[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.ExtraConfigColumns]);
            if (extraConfig) {
                for (const configEntry of Object.values(extraConfig)){
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(configEntry, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$primary$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrimaryKeyBuilder"])) {
                        tablesConfig[key].primaryKey.push(...configEntry.columns);
                    }
                }
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, Relations)) {
            const dbName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableUniqueName"])(value.table);
            const tableName = tableNamesMap[dbName];
            const relations2 = value.config(configHelpers(value.table));
            let primaryKey;
            for (const [relationName, relation] of Object.entries(relations2)){
                if (tableName) {
                    const tableConfig = tablesConfig[tableName];
                    tableConfig.relations[relationName] = relation;
                    if (primaryKey) {
                        tableConfig.primaryKey.push(...primaryKey);
                    }
                } else {
                    if (!(dbName in relationsBuffer)) {
                        relationsBuffer[dbName] = {
                            relations: {},
                            primaryKey
                        };
                    }
                    relationsBuffer[dbName].relations[relationName] = relation;
                }
            }
        }
    }
    return {
        tables: tablesConfig,
        tableNamesMap
    };
}
function relations(table, relations2) {
    return new Relations(table, (helpers)=>Object.fromEntries(Object.entries(relations2(helpers)).map(([key, value])=>[
                key,
                value.withFieldName(key)
            ])));
}
function createOne(sourceTable) {
    return function one(table, config) {
        return new One(sourceTable, table, config, config?.fields.reduce((res, f)=>res && f.notNull, true) ?? false);
    };
}
function createMany(sourceTable) {
    return function many(referencedTable, config) {
        return new Many(sourceTable, referencedTable, config);
    };
}
function normalizeRelation(schema, tableNamesMap, relation) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(relation, One) && relation.config) {
        return {
            fields: relation.config.fields,
            references: relation.config.references
        };
    }
    const referencedTableTsName = tableNamesMap[(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableUniqueName"])(relation.referencedTable)];
    if (!referencedTableTsName) {
        throw new Error(`Table "${relation.referencedTable[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name]}" not found in schema`);
    }
    const referencedTableConfig = schema[referencedTableTsName];
    if (!referencedTableConfig) {
        throw new Error(`Table "${referencedTableTsName}" not found in schema`);
    }
    const sourceTable = relation.sourceTable;
    const sourceTableTsName = tableNamesMap[(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableUniqueName"])(sourceTable)];
    if (!sourceTableTsName) {
        throw new Error(`Table "${sourceTable[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name]}" not found in schema`);
    }
    const reverseRelations = [];
    for (const referencedTableRelation of Object.values(referencedTableConfig.relations)){
        if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
            reverseRelations.push(referencedTableRelation);
        }
    }
    if (reverseRelations.length > 1) {
        throw relation.relationName ? new Error(`There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`) : new Error(`There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name]}". Please specify relation name`);
    }
    if (reverseRelations[0] && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(reverseRelations[0], One) && reverseRelations[0].config) {
        return {
            fields: reverseRelations[0].config.references,
            references: reverseRelations[0].config.fields
        };
    }
    throw new Error(`There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`);
}
function createTableRelationsHelpers(sourceTable) {
    return {
        one: createOne(sourceTable),
        many: createMany(sourceTable)
    };
}
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value)=>value) {
    const result = {};
    for (const [selectionItemIndex, selectionItem] of buildQueryResultSelection.entries()){
        if (selectionItem.isJson) {
            const relation = tableConfig.relations[selectionItem.tsKey];
            const rawSubRows = row[selectionItemIndex];
            const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
            result[selectionItem.tsKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(relation, One) ? subRows && mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRows, selectionItem.selection, mapColumnValue) : subRows.map((subRow)=>mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRow, selectionItem.selection, mapColumnValue));
        } else {
            const value = mapColumnValue(row[selectionItemIndex]);
            const field = selectionItem.field;
            let decoder;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
                decoder = field;
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                decoder = field.decoder;
            } else {
                decoder = field.sql.decoder;
            }
            result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
        }
    }
    return result;
}
;
 //# sourceMappingURL=relations.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/view-base.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgViewBase",
    ()=>PgViewBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
;
;
class PgViewBase extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["View"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgViewBase";
}
;
 //# sourceMappingURL=view-base.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/dialect.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgDialect",
    ()=>PgDialect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/alias.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$casing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/casing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/errors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/date.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$json$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/json.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/jsonb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/numeric.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/time.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/uuid.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/relations.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/expressions/conditions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/view-base.js [app-rsc] (ecmascript)");
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
class PgDialect {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDialect";
    /** @internal */ casing;
    constructor(config){
        this.casing = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$casing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CasingCache"](config?.casing);
    }
    async migrate(migrations, session, config) {
        const migrationsTable = typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
        const migrationsSchema = typeof config === "string" ? "drizzle" : config.migrationsSchema ?? "drizzle";
        const migrationTableCreate = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`
			CREATE TABLE IF NOT EXISTS ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsSchema)}.${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
        await session.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`CREATE SCHEMA IF NOT EXISTS ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsSchema)}`);
        await session.execute(migrationTableCreate);
        const dbMigrations = await session.all(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`select id, hash, created_at from ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsSchema)}.${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsTable)} order by created_at desc limit 1`);
        const lastDbMigration = dbMigrations[0];
        await session.transaction(async (tx)=>{
            for await (const migration of migrations){
                if (!lastDbMigration || Number(lastDbMigration.created_at) < migration.folderMillis) {
                    for (const stmt of migration.sql){
                        await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(stmt));
                    }
                    await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`insert into ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsSchema)}.${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsTable)} ("hash", "created_at") values(${migration.hash}, ${migration.folderMillis})`);
                }
            }
        });
    }
    escapeName(name) {
        return `"${name}"`;
    }
    escapeParam(num) {
        return `$${num + 1}`;
    }
    escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
    }
    buildWithCTE(queries) {
        if (!queries?.length) return void 0;
        const withSqlChunks = [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`with `
        ];
        for (const [i, w] of queries.entries()){
            withSqlChunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(w._.alias)} as (${w._.sql})`);
            if (i < queries.length - 1) {
                withSqlChunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `);
            }
        }
        withSqlChunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` `);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(withSqlChunks);
    }
    buildDeleteQuery({ table, where, returning, withList }) {
        const withSql = this.buildWithCTE(withList);
        const returningSql = returning ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` returning ${this.buildSelection(returning, {
            isSingleTable: true
        })}` : void 0;
        const whereSql = where ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${where}` : void 0;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${withSql}delete from ${table}${whereSql}${returningSql}`;
    }
    buildUpdateSet(table, set) {
        const tableColumns = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
        const columnNames = Object.keys(tableColumns).filter((colName)=>set[colName] !== void 0 || tableColumns[colName]?.onUpdateFn !== void 0);
        const setSize = columnNames.length;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(columnNames.flatMap((colName, i)=>{
            const col = tableColumns[colName];
            const value = set[colName] ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].param(col.onUpdateFn(), col);
            const res = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(col))} = ${value}`;
            if (i < setSize - 1) {
                return [
                    res,
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(", ")
                ];
            }
            return [
                res
            ];
        }));
    }
    buildUpdateQuery({ table, set, where, returning, withList, from, joins }) {
        const withSql = this.buildWithCTE(withList);
        const tableName = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"].Symbol.Name];
        const tableSchema = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"].Symbol.Schema];
        const origTableName = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"].Symbol.OriginalName];
        const alias = tableName === origTableName ? void 0 : tableName;
        const tableSql = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${tableSchema ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(tableSchema)}.` : void 0}${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(origTableName)}${alias && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(alias)}`}`;
        const setSql = this.buildUpdateSet(table, set);
        const fromSql = from && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join([
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(" from "),
            this.buildFromTable(from)
        ]);
        const joinsSql = this.buildJoins(joins);
        const returningSql = returning ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` returning ${this.buildSelection(returning, {
            isSingleTable: !from
        })}` : void 0;
        const whereSql = where ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${where}` : void 0;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${withSql}update ${tableSql} set ${setSql}${fromSql}${joinsSql}${whereSql}${returningSql}`;
    }
    /**
   * Builds selection SQL with provided fields/expressions
   *
   * Examples:
   *
   * `select <selection> from`
   *
   * `insert ... returning <selection>`
   *
   * If `isSingleTable` is true, then columns won't be prefixed with table name
   */ buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i)=>{
            const chunk = [];
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) && field.isSelectionField) {
                chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(field.fieldAlias));
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) ? field.sql : field;
                if (isSingleTable) {
                    chunk.push(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"](query.queryChunks.map((c)=>{
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(c, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"])) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(c));
                        }
                        return c;
                    })));
                } else {
                    chunk.push(query);
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased)) {
                    chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` as ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(field.fieldAlias)}`);
                }
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
                if (isSingleTable) {
                    chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(field)));
                } else {
                    chunk.push(field);
                }
            }
            if (i < columnsLen - 1) {
                chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `);
            }
            return chunk;
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(chunks);
    }
    buildJoins(joins) {
        if (!joins || joins.length === 0) {
            return void 0;
        }
        const joinsArray = [];
        for (const [index, joinMeta] of joins.entries()){
            if (index === 0) {
                joinsArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` `);
            }
            const table = joinMeta.table;
            const lateralSql = joinMeta.lateral ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` lateral` : void 0;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"])) {
                const tableName = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"].Symbol.Name];
                const tableSchema = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"].Symbol.Schema];
                const origTableName = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"].Symbol.OriginalName];
                const alias = tableName === origTableName ? void 0 : joinMeta.alias;
                joinsArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(joinMeta.joinType)} join${lateralSql} ${tableSchema ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(tableSchema)}.` : void 0}${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(origTableName)}${alias && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(alias)}`} on ${joinMeta.on}`);
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["View"])) {
                const viewName = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].name;
                const viewSchema = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].schema;
                const origViewName = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].originalName;
                const alias = viewName === origViewName ? void 0 : joinMeta.alias;
                joinsArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(joinMeta.joinType)} join${lateralSql} ${viewSchema ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(viewSchema)}.` : void 0}${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(origViewName)}${alias && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(alias)}`} on ${joinMeta.on}`);
            } else {
                joinsArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(joinMeta.joinType)} join${lateralSql} ${table} on ${joinMeta.on}`);
            }
            if (index < joins.length - 1) {
                joinsArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` `);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(joinsArray);
    }
    buildFromTable(table) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"]) && table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.OriginalName] !== table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name]) {
            let fullName = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.OriginalName])}`;
            if (table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Schema]) {
                fullName = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Schema])}.${fullName}`;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${fullName} ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name])}`;
        }
        return table;
    }
    buildSelectQuery({ withList, fields, fieldsFlat, where, having, table, joins, orderBy, groupBy, limit, offset, lockingClause, distinct, setOperators }) {
        const fieldsList = fieldsFlat ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(fields);
        for (const f of fieldsList){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(f.field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(f.field.table) !== ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"]) ? table._.alias : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgViewBase"]) ? table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].name : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? void 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(table)) && !((table2)=>joins?.some(({ alias })=>alias === (table2[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.IsAlias] ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(table2) : table2[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.BaseName])))(f.field.table)) {
                const tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(f.field.table);
                throw new Error(`Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
            }
        }
        const isSingleTable = !joins || joins.length === 0;
        const withSql = this.buildWithCTE(withList);
        let distinctSql;
        if (distinct) {
            distinctSql = distinct === true ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` distinct` : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` distinct on (${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(distinct.on, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)})`;
        }
        const selection = this.buildSelection(fieldsList, {
            isSingleTable
        });
        const tableSql = this.buildFromTable(table);
        const joinsSql = this.buildJoins(joins);
        const whereSql = where ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${where}` : void 0;
        const havingSql = having ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` having ${having}` : void 0;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
            orderBySql = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` order by ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(orderBy, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)}`;
        }
        let groupBySql;
        if (groupBy && groupBy.length > 0) {
            groupBySql = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` group by ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(groupBy, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)}`;
        }
        const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` limit ${limit}` : void 0;
        const offsetSql = offset ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` offset ${offset}` : void 0;
        const lockingClauseSql = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].empty();
        if (lockingClause) {
            const clauseSql = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` for ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(lockingClause.strength)}`;
            if (lockingClause.config.of) {
                clauseSql.append(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` of ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(Array.isArray(lockingClause.config.of) ? lockingClause.config.of : [
                    lockingClause.config.of
                ], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)}`);
            }
            if (lockingClause.config.noWait) {
                clauseSql.append(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` no wait`);
            } else if (lockingClause.config.skipLocked) {
                clauseSql.append(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` skip locked`);
            }
            lockingClauseSql.append(clauseSql);
        }
        const finalQuery = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}${lockingClauseSql}`;
        if (setOperators.length > 0) {
            return this.buildSetOperations(finalQuery, setOperators);
        }
        return finalQuery;
    }
    buildSetOperations(leftSelect, setOperators) {
        const [setOperator, ...rest] = setOperators;
        if (!setOperator) {
            throw new Error("Cannot pass undefined values to any set operator");
        }
        if (rest.length === 0) {
            return this.buildSetOperationQuery({
                leftSelect,
                setOperator
            });
        }
        return this.buildSetOperations(this.buildSetOperationQuery({
            leftSelect,
            setOperator
        }), rest);
    }
    buildSetOperationQuery({ leftSelect, setOperator: { type, isAll, rightSelect, limit, orderBy, offset } }) {
        const leftChunk = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`(${leftSelect.getSQL()}) `;
        const rightChunk = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`(${rightSelect.getSQL()})`;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
            const orderByValues = [];
            for (const singleOrderBy of orderBy){
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(singleOrderBy, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"])) {
                    orderByValues.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(singleOrderBy.name));
                } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(singleOrderBy, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                    for(let i = 0; i < singleOrderBy.queryChunks.length; i++){
                        const chunk = singleOrderBy.queryChunks[i];
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgColumn"])) {
                            singleOrderBy.queryChunks[i] = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(chunk.name);
                        }
                    }
                    orderByValues.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${singleOrderBy}`);
                } else {
                    orderByValues.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${singleOrderBy}`);
                }
            }
            orderBySql = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` order by ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(orderByValues, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)} `;
        }
        const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` limit ${limit}` : void 0;
        const operatorChunk = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(`${type} ${isAll ? "all " : ""}`);
        const offsetSql = offset ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` offset ${offset}` : void 0;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
    }
    buildInsertQuery({ table, values: valuesOrSelect, onConflict, returning, withList, select, overridingSystemValue_ }) {
        const valuesSqlList = [];
        const columns = table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
        const colEntries = Object.entries(columns).filter(([_, col])=>!col.shouldDisableInsert());
        const insertOrder = colEntries.map(([, column])=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(column)));
        if (select) {
            const select2 = valuesOrSelect;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(select2, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                valuesSqlList.push(select2);
            } else {
                valuesSqlList.push(select2.getSQL());
            }
        } else {
            const values = valuesOrSelect;
            valuesSqlList.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw("values "));
            for (const [valueIndex, value] of values.entries()){
                const valueList = [];
                for (const [fieldName, col] of colEntries){
                    const colValue = value[fieldName];
                    if (colValue === void 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(colValue, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Param"]) && colValue.value === void 0) {
                        if (col.defaultFn !== void 0) {
                            const defaultFnResult = col.defaultFn();
                            const defaultValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(defaultFnResult, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? defaultFnResult : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].param(defaultFnResult, col);
                            valueList.push(defaultValue);
                        } else if (!col.default && col.onUpdateFn !== void 0) {
                            const onUpdateFnResult = col.onUpdateFn();
                            const newValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(onUpdateFnResult, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? onUpdateFnResult : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].param(onUpdateFnResult, col);
                            valueList.push(newValue);
                        } else {
                            valueList.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`default`);
                        }
                    } else {
                        valueList.push(colValue);
                    }
                }
                valuesSqlList.push(valueList);
                if (valueIndex < values.length - 1) {
                    valuesSqlList.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `);
                }
            }
        }
        const withSql = this.buildWithCTE(withList);
        const valuesSql = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(valuesSqlList);
        const returningSql = returning ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` returning ${this.buildSelection(returning, {
            isSingleTable: true
        })}` : void 0;
        const onConflictSql = onConflict ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` on conflict ${onConflict}` : void 0;
        const overridingSql = overridingSystemValue_ === true ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`overriding system value ` : void 0;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${withSql}insert into ${table} ${insertOrder} ${overridingSql}${valuesSql}${onConflictSql}${returningSql}`;
    }
    buildRefreshMaterializedViewQuery({ view, concurrently, withNoData }) {
        const concurrentlySql = concurrently ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` concurrently` : void 0;
        const withNoDataSql = withNoData ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` with no data` : void 0;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`refresh materialized view${concurrentlySql} ${view}${withNoDataSql}`;
    }
    prepareTyping(encoder) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(encoder, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgJsonb"]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(encoder, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$json$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgJson"])) {
            return "json";
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(encoder, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgNumeric"])) {
            return "decimal";
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(encoder, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTime"])) {
            return "time";
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(encoder, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTimestamp"]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(encoder, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTimestampString"])) {
            return "timestamp";
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(encoder, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDate"]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(encoder, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDateString"])) {
            return "date";
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(encoder, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgUUID"])) {
            return "uuid";
        } else {
            return "none";
        }
    }
    sqlToQuery(sql2, invokeSource) {
        return sql2.toQuery({
            casing: this.casing,
            escapeName: this.escapeName,
            escapeParam: this.escapeParam,
            escapeString: this.escapeString,
            prepareTyping: this.prepareTyping,
            invokeSource
        });
    }
    // buildRelationalQueryWithPK({
    // 	fullSchema,
    // 	schema,
    // 	tableNamesMap,
    // 	table,
    // 	tableConfig,
    // 	queryConfig: config,
    // 	tableAlias,
    // 	isRoot = false,
    // 	joinOn,
    // }: {
    // 	fullSchema: Record<string, unknown>;
    // 	schema: TablesRelationalConfig;
    // 	tableNamesMap: Record<string, string>;
    // 	table: PgTable;
    // 	tableConfig: TableRelationalConfig;
    // 	queryConfig: true | DBQueryConfig<'many', true>;
    // 	tableAlias: string;
    // 	isRoot?: boolean;
    // 	joinOn?: SQL;
    // }): BuildRelationalQueryResult<PgTable, PgColumn> {
    // 	// For { "<relation>": true }, return a table with selection of all columns
    // 	if (config === true) {
    // 		const selectionEntries = Object.entries(tableConfig.columns);
    // 		const selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = selectionEntries.map((
    // 			[key, value],
    // 		) => ({
    // 			dbKey: value.name,
    // 			tsKey: key,
    // 			field: value as PgColumn,
    // 			relationTableTsKey: undefined,
    // 			isJson: false,
    // 			selection: [],
    // 		}));
    // 		return {
    // 			tableTsKey: tableConfig.tsName,
    // 			sql: table,
    // 			selection,
    // 		};
    // 	}
    // 	// let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
    // 	// let selectionForBuild = selection;
    // 	const aliasedColumns = Object.fromEntries(
    // 		Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)]),
    // 	);
    // 	const aliasedRelations = Object.fromEntries(
    // 		Object.entries(tableConfig.relations).map(([key, value]) => [key, aliasedRelation(value, tableAlias)]),
    // 	);
    // 	const aliasedFields = Object.assign({}, aliasedColumns, aliasedRelations);
    // 	let where, hasUserDefinedWhere;
    // 	if (config.where) {
    // 		const whereSql = typeof config.where === 'function' ? config.where(aliasedFields, operators) : config.where;
    // 		where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
    // 		hasUserDefinedWhere = !!where;
    // 	}
    // 	where = and(joinOn, where);
    // 	// const fieldsSelection: { tsKey: string; value: PgColumn | SQL.Aliased; isExtra?: boolean }[] = [];
    // 	let joins: Join[] = [];
    // 	let selectedColumns: string[] = [];
    // 	// Figure out which columns to select
    // 	if (config.columns) {
    // 		let isIncludeMode = false;
    // 		for (const [field, value] of Object.entries(config.columns)) {
    // 			if (value === undefined) {
    // 				continue;
    // 			}
    // 			if (field in tableConfig.columns) {
    // 				if (!isIncludeMode && value === true) {
    // 					isIncludeMode = true;
    // 				}
    // 				selectedColumns.push(field);
    // 			}
    // 		}
    // 		if (selectedColumns.length > 0) {
    // 			selectedColumns = isIncludeMode
    // 				? selectedColumns.filter((c) => config.columns?.[c] === true)
    // 				: Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
    // 		}
    // 	} else {
    // 		// Select all columns if selection is not specified
    // 		selectedColumns = Object.keys(tableConfig.columns);
    // 	}
    // 	// for (const field of selectedColumns) {
    // 	// 	const column = tableConfig.columns[field]! as PgColumn;
    // 	// 	fieldsSelection.push({ tsKey: field, value: column });
    // 	// }
    // 	let initiallySelectedRelations: {
    // 		tsKey: string;
    // 		queryConfig: true | DBQueryConfig<'many', false>;
    // 		relation: Relation;
    // 	}[] = [];
    // 	// let selectedRelations: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
    // 	// Figure out which relations to select
    // 	if (config.with) {
    // 		initiallySelectedRelations = Object.entries(config.with)
    // 			.filter((entry): entry is [typeof entry[0], NonNullable<typeof entry[1]>] => !!entry[1])
    // 			.map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey]! }));
    // 	}
    // 	const manyRelations = initiallySelectedRelations.filter((r) =>
    // 		is(r.relation, Many)
    // 		&& (schema[tableNamesMap[r.relation.referencedTable[Table.Symbol.Name]]!]?.primaryKey.length ?? 0) > 0
    // 	);
    // 	// If this is the last Many relation (or there are no Many relations), we are on the innermost subquery level
    // 	const isInnermostQuery = manyRelations.length < 2;
    // 	const selectedExtras: {
    // 		tsKey: string;
    // 		value: SQL.Aliased;
    // 	}[] = [];
    // 	// Figure out which extras to select
    // 	if (isInnermostQuery && config.extras) {
    // 		const extras = typeof config.extras === 'function'
    // 			? config.extras(aliasedFields, { sql })
    // 			: config.extras;
    // 		for (const [tsKey, value] of Object.entries(extras)) {
    // 			selectedExtras.push({
    // 				tsKey,
    // 				value: mapColumnsInAliasedSQLToAlias(value, tableAlias),
    // 			});
    // 		}
    // 	}
    // 	// Transform `fieldsSelection` into `selection`
    // 	// `fieldsSelection` shouldn't be used after this point
    // 	// for (const { tsKey, value, isExtra } of fieldsSelection) {
    // 	// 	selection.push({
    // 	// 		dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey]!.name,
    // 	// 		tsKey,
    // 	// 		field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
    // 	// 		relationTableTsKey: undefined,
    // 	// 		isJson: false,
    // 	// 		isExtra,
    // 	// 		selection: [],
    // 	// 	});
    // 	// }
    // 	let orderByOrig = typeof config.orderBy === 'function'
    // 		? config.orderBy(aliasedFields, orderByOperators)
    // 		: config.orderBy ?? [];
    // 	if (!Array.isArray(orderByOrig)) {
    // 		orderByOrig = [orderByOrig];
    // 	}
    // 	const orderBy = orderByOrig.map((orderByValue) => {
    // 		if (is(orderByValue, Column)) {
    // 			return aliasedTableColumn(orderByValue, tableAlias) as PgColumn;
    // 		}
    // 		return mapColumnsInSQLToAlias(orderByValue, tableAlias);
    // 	});
    // 	const limit = isInnermostQuery ? config.limit : undefined;
    // 	const offset = isInnermostQuery ? config.offset : undefined;
    // 	// For non-root queries without additional config except columns, return a table with selection
    // 	if (
    // 		!isRoot
    // 		&& initiallySelectedRelations.length === 0
    // 		&& selectedExtras.length === 0
    // 		&& !where
    // 		&& orderBy.length === 0
    // 		&& limit === undefined
    // 		&& offset === undefined
    // 	) {
    // 		return {
    // 			tableTsKey: tableConfig.tsName,
    // 			sql: table,
    // 			selection: selectedColumns.map((key) => ({
    // 				dbKey: tableConfig.columns[key]!.name,
    // 				tsKey: key,
    // 				field: tableConfig.columns[key] as PgColumn,
    // 				relationTableTsKey: undefined,
    // 				isJson: false,
    // 				selection: [],
    // 			})),
    // 		};
    // 	}
    // 	const selectedRelationsWithoutPK:
    // 	// Process all relations without primary keys, because they need to be joined differently and will all be on the same query level
    // 	for (
    // 		const {
    // 			tsKey: selectedRelationTsKey,
    // 			queryConfig: selectedRelationConfigValue,
    // 			relation,
    // 		} of initiallySelectedRelations
    // 	) {
    // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
    // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
    // 		const relationTableTsName = tableNamesMap[relationTableName]!;
    // 		const relationTable = schema[relationTableTsName]!;
    // 		if (relationTable.primaryKey.length > 0) {
    // 			continue;
    // 		}
    // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
    // 		const joinOn = and(
    // 			...normalizedRelation.fields.map((field, i) =>
    // 				eq(
    // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
    // 					aliasedTableColumn(field, tableAlias),
    // 				)
    // 			),
    // 		);
    // 		const builtRelation = this.buildRelationalQueryWithoutPK({
    // 			fullSchema,
    // 			schema,
    // 			tableNamesMap,
    // 			table: fullSchema[relationTableTsName] as PgTable,
    // 			tableConfig: schema[relationTableTsName]!,
    // 			queryConfig: selectedRelationConfigValue,
    // 			tableAlias: relationTableAlias,
    // 			joinOn,
    // 			nestedQueryRelation: relation,
    // 		});
    // 		const field = sql`${sql.identifier(relationTableAlias)}.${sql.identifier('data')}`.as(selectedRelationTsKey);
    // 		joins.push({
    // 			on: sql`true`,
    // 			table: new Subquery(builtRelation.sql as SQL, {}, relationTableAlias),
    // 			alias: relationTableAlias,
    // 			joinType: 'left',
    // 			lateral: true,
    // 		});
    // 		selectedRelations.push({
    // 			dbKey: selectedRelationTsKey,
    // 			tsKey: selectedRelationTsKey,
    // 			field,
    // 			relationTableTsKey: relationTableTsName,
    // 			isJson: true,
    // 			selection: builtRelation.selection,
    // 		});
    // 	}
    // 	const oneRelations = initiallySelectedRelations.filter((r): r is typeof r & { relation: One } =>
    // 		is(r.relation, One)
    // 	);
    // 	// Process all One relations with PKs, because they can all be joined on the same level
    // 	for (
    // 		const {
    // 			tsKey: selectedRelationTsKey,
    // 			queryConfig: selectedRelationConfigValue,
    // 			relation,
    // 		} of oneRelations
    // 	) {
    // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
    // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
    // 		const relationTableTsName = tableNamesMap[relationTableName]!;
    // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
    // 		const relationTable = schema[relationTableTsName]!;
    // 		if (relationTable.primaryKey.length === 0) {
    // 			continue;
    // 		}
    // 		const joinOn = and(
    // 			...normalizedRelation.fields.map((field, i) =>
    // 				eq(
    // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
    // 					aliasedTableColumn(field, tableAlias),
    // 				)
    // 			),
    // 		);
    // 		const builtRelation = this.buildRelationalQueryWithPK({
    // 			fullSchema,
    // 			schema,
    // 			tableNamesMap,
    // 			table: fullSchema[relationTableTsName] as PgTable,
    // 			tableConfig: schema[relationTableTsName]!,
    // 			queryConfig: selectedRelationConfigValue,
    // 			tableAlias: relationTableAlias,
    // 			joinOn,
    // 		});
    // 		const field = sql`case when ${sql.identifier(relationTableAlias)} is null then null else json_build_array(${
    // 			sql.join(
    // 				builtRelation.selection.map(({ field }) =>
    // 					is(field, SQL.Aliased)
    // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
    // 						: is(field, Column)
    // 						? aliasedTableColumn(field, relationTableAlias)
    // 						: field
    // 				),
    // 				sql`, `,
    // 			)
    // 		}) end`.as(selectedRelationTsKey);
    // 		const isLateralJoin = is(builtRelation.sql, SQL);
    // 		joins.push({
    // 			on: isLateralJoin ? sql`true` : joinOn,
    // 			table: is(builtRelation.sql, SQL)
    // 				? new Subquery(builtRelation.sql, {}, relationTableAlias)
    // 				: aliasedTable(builtRelation.sql, relationTableAlias),
    // 			alias: relationTableAlias,
    // 			joinType: 'left',
    // 			lateral: is(builtRelation.sql, SQL),
    // 		});
    // 		selectedRelations.push({
    // 			dbKey: selectedRelationTsKey,
    // 			tsKey: selectedRelationTsKey,
    // 			field,
    // 			relationTableTsKey: relationTableTsName,
    // 			isJson: true,
    // 			selection: builtRelation.selection,
    // 		});
    // 	}
    // 	let distinct: PgSelectConfig['distinct'];
    // 	let tableFrom: PgTable | Subquery = table;
    // 	// Process first Many relation - each one requires a nested subquery
    // 	const manyRelation = manyRelations[0];
    // 	if (manyRelation) {
    // 		const {
    // 			tsKey: selectedRelationTsKey,
    // 			queryConfig: selectedRelationQueryConfig,
    // 			relation,
    // 		} = manyRelation;
    // 		distinct = {
    // 			on: tableConfig.primaryKey.map((c) => aliasedTableColumn(c as PgColumn, tableAlias)),
    // 		};
    // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
    // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
    // 		const relationTableTsName = tableNamesMap[relationTableName]!;
    // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
    // 		const joinOn = and(
    // 			...normalizedRelation.fields.map((field, i) =>
    // 				eq(
    // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
    // 					aliasedTableColumn(field, tableAlias),
    // 				)
    // 			),
    // 		);
    // 		const builtRelationJoin = this.buildRelationalQueryWithPK({
    // 			fullSchema,
    // 			schema,
    // 			tableNamesMap,
    // 			table: fullSchema[relationTableTsName] as PgTable,
    // 			tableConfig: schema[relationTableTsName]!,
    // 			queryConfig: selectedRelationQueryConfig,
    // 			tableAlias: relationTableAlias,
    // 			joinOn,
    // 		});
    // 		const builtRelationSelectionField = sql`case when ${
    // 			sql.identifier(relationTableAlias)
    // 		} is null then '[]' else json_agg(json_build_array(${
    // 			sql.join(
    // 				builtRelationJoin.selection.map(({ field }) =>
    // 					is(field, SQL.Aliased)
    // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
    // 						: is(field, Column)
    // 						? aliasedTableColumn(field, relationTableAlias)
    // 						: field
    // 				),
    // 				sql`, `,
    // 			)
    // 		})) over (partition by ${sql.join(distinct.on, sql`, `)}) end`.as(selectedRelationTsKey);
    // 		const isLateralJoin = is(builtRelationJoin.sql, SQL);
    // 		joins.push({
    // 			on: isLateralJoin ? sql`true` : joinOn,
    // 			table: isLateralJoin
    // 				? new Subquery(builtRelationJoin.sql as SQL, {}, relationTableAlias)
    // 				: aliasedTable(builtRelationJoin.sql as PgTable, relationTableAlias),
    // 			alias: relationTableAlias,
    // 			joinType: 'left',
    // 			lateral: isLateralJoin,
    // 		});
    // 		// Build the "from" subquery with the remaining Many relations
    // 		const builtTableFrom = this.buildRelationalQueryWithPK({
    // 			fullSchema,
    // 			schema,
    // 			tableNamesMap,
    // 			table,
    // 			tableConfig,
    // 			queryConfig: {
    // 				...config,
    // 				where: undefined,
    // 				orderBy: undefined,
    // 				limit: undefined,
    // 				offset: undefined,
    // 				with: manyRelations.slice(1).reduce<NonNullable<typeof config['with']>>(
    // 					(result, { tsKey, queryConfig: configValue }) => {
    // 						result[tsKey] = configValue;
    // 						return result;
    // 					},
    // 					{},
    // 				),
    // 			},
    // 			tableAlias,
    // 		});
    // 		selectedRelations.push({
    // 			dbKey: selectedRelationTsKey,
    // 			tsKey: selectedRelationTsKey,
    // 			field: builtRelationSelectionField,
    // 			relationTableTsKey: relationTableTsName,
    // 			isJson: true,
    // 			selection: builtRelationJoin.selection,
    // 		});
    // 		// selection = builtTableFrom.selection.map((item) =>
    // 		// 	is(item.field, SQL.Aliased)
    // 		// 		? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
    // 		// 		: item
    // 		// );
    // 		// selectionForBuild = [{
    // 		// 	dbKey: '*',
    // 		// 	tsKey: '*',
    // 		// 	field: sql`${sql.identifier(tableAlias)}.*`,
    // 		// 	selection: [],
    // 		// 	isJson: false,
    // 		// 	relationTableTsKey: undefined,
    // 		// }];
    // 		// const newSelectionItem: (typeof selection)[number] = {
    // 		// 	dbKey: selectedRelationTsKey,
    // 		// 	tsKey: selectedRelationTsKey,
    // 		// 	field,
    // 		// 	relationTableTsKey: relationTableTsName,
    // 		// 	isJson: true,
    // 		// 	selection: builtRelationJoin.selection,
    // 		// };
    // 		// selection.push(newSelectionItem);
    // 		// selectionForBuild.push(newSelectionItem);
    // 		tableFrom = is(builtTableFrom.sql, PgTable)
    // 			? builtTableFrom.sql
    // 			: new Subquery(builtTableFrom.sql, {}, tableAlias);
    // 	}
    // 	if (selectedColumns.length === 0 && selectedRelations.length === 0 && selectedExtras.length === 0) {
    // 		throw new DrizzleError(`No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")`);
    // 	}
    // 	let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'];
    // 	function prepareSelectedColumns() {
    // 		return selectedColumns.map((key) => ({
    // 			dbKey: tableConfig.columns[key]!.name,
    // 			tsKey: key,
    // 			field: tableConfig.columns[key] as PgColumn,
    // 			relationTableTsKey: undefined,
    // 			isJson: false,
    // 			selection: [],
    // 		}));
    // 	}
    // 	function prepareSelectedExtras() {
    // 		return selectedExtras.map((item) => ({
    // 			dbKey: item.value.fieldAlias,
    // 			tsKey: item.tsKey,
    // 			field: item.value,
    // 			relationTableTsKey: undefined,
    // 			isJson: false,
    // 			selection: [],
    // 		}));
    // 	}
    // 	if (isRoot) {
    // 		selection = [
    // 			...prepareSelectedColumns(),
    // 			...prepareSelectedExtras(),
    // 		];
    // 	}
    // 	if (hasUserDefinedWhere || orderBy.length > 0) {
    // 		tableFrom = new Subquery(
    // 			this.buildSelectQuery({
    // 				table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
    // 				fields: {},
    // 				fieldsFlat: selectionForBuild.map(({ field }) => ({
    // 					path: [],
    // 					field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
    // 				})),
    // 				joins,
    // 				distinct,
    // 			}),
    // 			{},
    // 			tableAlias,
    // 		);
    // 		selectionForBuild = selection.map((item) =>
    // 			is(item.field, SQL.Aliased)
    // 				? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
    // 				: item
    // 		);
    // 		joins = [];
    // 		distinct = undefined;
    // 	}
    // 	const result = this.buildSelectQuery({
    // 		table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
    // 		fields: {},
    // 		fieldsFlat: selectionForBuild.map(({ field }) => ({
    // 			path: [],
    // 			field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
    // 		})),
    // 		where,
    // 		limit,
    // 		offset,
    // 		joins,
    // 		orderBy,
    // 		distinct,
    // 	});
    // 	return {
    // 		tableTsKey: tableConfig.tsName,
    // 		sql: result,
    // 		selection,
    // 	};
    // }
    buildRelationalQueryWithoutPK({ fullSchema, schema, tableNamesMap, table, tableConfig, queryConfig: config, tableAlias, nestedQueryRelation, joinOn }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        const joins = [];
        if (config === true) {
            const selectionEntries = Object.entries(tableConfig.columns);
            selection = selectionEntries.map(([key, value])=>({
                    dbKey: value.name,
                    tsKey: key,
                    field: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(value, tableAlias),
                    relationTableTsKey: void 0,
                    isJson: false,
                    selection: []
                }));
        } else {
            const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key, value])=>[
                    key,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(value, tableAlias)
                ]));
            if (config.where) {
                const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOperators"])()) : config.where;
                where = whereSql && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapColumnsInSQLToAlias"])(whereSql, tableAlias);
            }
            const fieldsSelection = [];
            let selectedColumns = [];
            if (config.columns) {
                let isIncludeMode = false;
                for (const [field, value] of Object.entries(config.columns)){
                    if (value === void 0) {
                        continue;
                    }
                    if (field in tableConfig.columns) {
                        if (!isIncludeMode && value === true) {
                            isIncludeMode = true;
                        }
                        selectedColumns.push(field);
                    }
                }
                if (selectedColumns.length > 0) {
                    selectedColumns = isIncludeMode ? selectedColumns.filter((c)=>config.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key)=>!selectedColumns.includes(key));
                }
            } else {
                selectedColumns = Object.keys(tableConfig.columns);
            }
            for (const field of selectedColumns){
                const column = tableConfig.columns[field];
                fieldsSelection.push({
                    tsKey: field,
                    value: column
                });
            }
            let selectedRelations = [];
            if (config.with) {
                selectedRelations = Object.entries(config.with).filter((entry)=>!!entry[1]).map(([tsKey, queryConfig])=>({
                        tsKey,
                        queryConfig,
                        relation: tableConfig.relations[tsKey]
                    }));
            }
            let extras;
            if (config.extras) {
                extras = typeof config.extras === "function" ? config.extras(aliasedColumns, {
                    sql: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]
                }) : config.extras;
                for (const [tsKey, value] of Object.entries(extras)){
                    fieldsSelection.push({
                        tsKey,
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapColumnsInAliasedSQLToAlias"])(value, tableAlias)
                    });
                }
            }
            for (const { tsKey, value } of fieldsSelection){
                selection.push({
                    dbKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
                    tsKey,
                    field: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(value, tableAlias) : value,
                    relationTableTsKey: void 0,
                    isJson: false,
                    selection: []
                });
            }
            let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrderByOperators"])()) : config.orderBy ?? [];
            if (!Array.isArray(orderByOrig)) {
                orderByOrig = [
                    orderByOrig
                ];
            }
            orderBy = orderByOrig.map((orderByValue)=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(orderByValue, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(orderByValue, tableAlias);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapColumnsInSQLToAlias"])(orderByValue, tableAlias);
            });
            limit = config.limit;
            offset = config.offset;
            for (const { tsKey: selectedRelationTsKey, queryConfig: selectedRelationConfigValue, relation } of selectedRelations){
                const normalizedRelation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeRelation"])(schema, tableNamesMap, relation);
                const relationTableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableUniqueName"])(relation.referencedTable);
                const relationTableTsName = tableNamesMap[relationTableName];
                const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
                const joinOn2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["and"])(...normalizedRelation.fields.map((field2, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(normalizedRelation.references[i], relationTableAlias), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(field2, tableAlias))));
                const builtRelation = this.buildRelationalQueryWithoutPK({
                    fullSchema,
                    schema,
                    tableNamesMap,
                    table: fullSchema[relationTableTsName],
                    tableConfig: schema[relationTableTsName],
                    queryConfig: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(relation, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["One"]) ? selectedRelationConfigValue === true ? {
                        limit: 1
                    } : {
                        ...selectedRelationConfigValue,
                        limit: 1
                    } : selectedRelationConfigValue,
                    tableAlias: relationTableAlias,
                    joinOn: joinOn2,
                    nestedQueryRelation: relation
                });
                const field = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(relationTableAlias)}.${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier("data")}`.as(selectedRelationTsKey);
                joins.push({
                    on: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`true`,
                    table: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"](builtRelation.sql, {}, relationTableAlias),
                    alias: relationTableAlias,
                    joinType: "left",
                    lateral: true
                });
                selection.push({
                    dbKey: selectedRelationTsKey,
                    tsKey: selectedRelationTsKey,
                    field,
                    relationTableTsKey: relationTableTsName,
                    isJson: true,
                    selection: builtRelation.selection
                });
            }
        }
        if (selection.length === 0) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DrizzleError"]({
                message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")`
            });
        }
        let result;
        where = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["and"])(joinOn, where);
        if (nestedQueryRelation) {
            let field = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`json_build_array(${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(selection.map(({ field: field2, tsKey, isJson })=>isJson ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(`${tableAlias}_${tsKey}`)}.${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier("data")}` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field2, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) ? field2.sql : field2), __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)})`;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(nestedQueryRelation, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Many"])) {
                field = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`coalesce(json_agg(${field}${orderBy.length > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` order by ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(orderBy, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)}` : void 0}), '[]'::json)`;
            }
            const nestedSelection = [
                {
                    dbKey: "data",
                    tsKey: "data",
                    field: field.as("data"),
                    isJson: true,
                    relationTableTsKey: tableConfig.tsName,
                    selection
                }
            ];
            const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
            if (needsSubquery) {
                result = this.buildSelectQuery({
                    table: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTable"])(table, tableAlias),
                    fields: {},
                    fieldsFlat: [
                        {
                            path: [],
                            field: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw("*")
                        }
                    ],
                    where,
                    limit,
                    offset,
                    orderBy,
                    setOperators: []
                });
                where = void 0;
                limit = void 0;
                offset = void 0;
                orderBy = [];
            } else {
                result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTable"])(table, tableAlias);
            }
            result = this.buildSelectQuery({
                table: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(result, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"]) ? result : new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"](result, {}, tableAlias),
                fields: {},
                fieldsFlat: nestedSelection.map(({ field: field2 })=>({
                        path: [],
                        field: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field2, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(field2, tableAlias) : field2
                    })),
                joins,
                where,
                limit,
                offset,
                orderBy,
                setOperators: []
            });
        } else {
            result = this.buildSelectQuery({
                table: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTable"])(table, tableAlias),
                fields: {},
                fieldsFlat: selection.map(({ field })=>({
                        path: [],
                        field: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(field, tableAlias) : field
                    })),
                joins,
                where,
                limit,
                offset,
                orderBy,
                setOperators: []
            });
        }
        return {
            tableTsKey: tableConfig.tsName,
            sql: result,
            selection
        };
    }
}
;
 //# sourceMappingURL=dialect.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectionProxyHandler",
    ()=>SelectionProxyHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/alias.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
class SelectionProxyHandler {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SelectionProxyHandler";
    config;
    constructor(config){
        this.config = {
            ...config
        };
    }
    get(subquery, prop) {
        if (prop === "_") {
            return {
                ...subquery["_"],
                selectedFields: new Proxy(subquery._.selectedFields, this)
            };
        }
        if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]) {
            return {
                ...subquery[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]],
                selectedFields: new Proxy(subquery[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].selectedFields, this)
            };
        }
        if (typeof prop === "symbol") {
            return subquery[prop];
        }
        const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(subquery, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"]) ? subquery._.selectedFields : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(subquery, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["View"]) ? subquery[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].selectedFields : subquery;
        const value = columns[prop];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased)) {
            if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
                return value.sql;
            }
            const newValue = value.clone();
            newValue.isSelectionField = true;
            return newValue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
            if (this.config.sqlBehavior === "sql") {
                return value;
            }
            throw new Error(`You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
            if (this.config.alias) {
                return new Proxy(value, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColumnAliasProxyHandler"](new Proxy(value.table, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableAliasProxyHandler"](this.config.alias, this.config.replaceOriginalName ?? false))));
            }
            return value;
        }
        if (typeof value !== "object" || value === null) {
            return value;
        }
        return new Proxy(value, new SelectionProxyHandler(this.config));
    }
}
;
 //# sourceMappingURL=selection-proxy.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-builders/query-builder.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypedQueryBuilder",
    ()=>TypedQueryBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
;
class TypedQueryBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "TypedQueryBuilder";
    /** @internal */ getSelectedFields() {
        return this._.selectedFields;
    }
}
;
 //# sourceMappingURL=query-builder.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/select.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgSelectBase",
    ()=>PgSelectBase,
    "PgSelectBuilder",
    ()=>PgSelectBuilder,
    "PgSelectQueryBuilderBase",
    ()=>PgSelectQueryBuilderBase,
    "except",
    ()=>except,
    "exceptAll",
    ()=>exceptAll,
    "intersect",
    ()=>intersect,
    "intersectAll",
    ()=>intersectAll,
    "union",
    ()=>union,
    "unionAll",
    ()=>unionAll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/view-base.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-builders/query-builder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
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
class PgSelectBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSelectBuilder";
    fields;
    session;
    dialect;
    withList = [];
    distinct;
    constructor(config){
        this.fields = config.fields;
        this.session = config.session;
        this.dialect = config.dialect;
        if (config.withList) {
            this.withList = config.withList;
        }
        this.distinct = config.distinct;
    }
    authToken;
    /** @internal */ setToken(token) {
        this.authToken = token;
        return this;
    }
    /**
   * Specify the table, subquery, or other target that you're
   * building a select query against.
   *
   * {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FROM | Postgres from documentation}
   */ from(source) {
        const isPartialSelect = !!this.fields;
        let fields;
        if (this.fields) {
            fields = this.fields;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(source, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"])) {
            fields = Object.fromEntries(Object.keys(source._.selectedFields).map((key)=>[
                    key,
                    source[key]
                ]));
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(source, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgViewBase"])) {
            fields = source[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].selectedFields;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(source, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
            fields = {};
        } else {
            fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableColumns"])(source);
        }
        return new PgSelectBase({
            table: source,
            fields,
            isPartialSelect,
            session: this.session,
            dialect: this.dialect,
            withList: this.withList,
            distinct: this.distinct
        }).setToken(this.authToken);
    }
}
class PgSelectQueryBuilderBase extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TypedQueryBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSelectQueryBuilder";
    _;
    config;
    joinsNotNullableMap;
    tableName;
    isPartialSelect;
    session;
    dialect;
    constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }){
        super();
        this.config = {
            withList,
            table,
            fields: {
                ...fields
            },
            distinct,
            setOperators: []
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
            selectedFields: fields
        };
        this.tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? {
            [this.tableName]: true
        } : {};
    }
    createJoin(joinType) {
        return (table, on)=>{
            const baseTableName = this.tableName;
            const tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(table);
            if (typeof tableName === "string" && this.config.joins?.some((join)=>join.alias === tableName)) {
                throw new Error(`Alias "${tableName}" is already used in this query`);
            }
            if (!this.isPartialSelect) {
                if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
                    this.config.fields = {
                        [baseTableName]: this.config.fields
                    };
                }
                if (typeof tableName === "string" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"]) ? table._.selectedFields : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["View"]) ? table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].selectedFields : table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
                    this.config.fields[tableName] = selection;
                }
            }
            if (typeof on === "function") {
                on = on(new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                    sqlAliasedBehavior: "sql",
                    sqlBehavior: "sql"
                })));
            }
            if (!this.config.joins) {
                this.config.joins = [];
            }
            this.config.joins.push({
                on,
                table,
                joinType,
                alias: tableName
            });
            if (typeof tableName === "string") {
                switch(joinType){
                    case "left":
                        {
                            this.joinsNotNullableMap[tableName] = false;
                            break;
                        }
                    case "right":
                        {
                            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key])=>[
                                    key,
                                    false
                                ]));
                            this.joinsNotNullableMap[tableName] = true;
                            break;
                        }
                    case "inner":
                        {
                            this.joinsNotNullableMap[tableName] = true;
                            break;
                        }
                    case "full":
                        {
                            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key])=>[
                                    key,
                                    false
                                ]));
                            this.joinsNotNullableMap[tableName] = false;
                            break;
                        }
                }
            }
            return this;
        };
    }
    /**
   * Executes a `left join` operation by adding another table to the current query.
   *
   * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User; pets: Pet | null }[] = await db.select()
   *   .from(users)
   *   .leftJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number | null }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .leftJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */ leftJoin = this.createJoin("left");
    /**
   * Executes a `right join` operation by adding another table to the current query.
   *
   * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User | null; pets: Pet }[] = await db.select()
   *   .from(users)
   *   .rightJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number | null; petId: number }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .rightJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */ rightJoin = this.createJoin("right");
    /**
   * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
   *
   * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User; pets: Pet }[] = await db.select()
   *   .from(users)
   *   .innerJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .innerJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */ innerJoin = this.createJoin("inner");
    /**
   * Executes a `full join` operation by combining rows from two tables into a new table.
   *
   * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User | null; pets: Pet | null }[] = await db.select()
   *   .from(users)
   *   .fullJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number | null; petId: number | null }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .fullJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */ fullJoin = this.createJoin("full");
    createSetOperator(type, isAll) {
        return (rightSelection)=>{
            const rightSelect = typeof rightSelection === "function" ? rightSelection(getPgSetOperators()) : rightSelection;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["haveSameKeys"])(this.getSelectedFields(), rightSelect.getSelectedFields())) {
                throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
            }
            this.config.setOperators.push({
                type,
                isAll,
                rightSelect
            });
            return this;
        };
    }
    /**
   * Adds `union` set operator to the query.
   *
   * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
   *
   * @example
   *
   * ```ts
   * // Select all unique names from customers and users tables
   * await db.select({ name: users.name })
   *   .from(users)
   *   .union(
   *     db.select({ name: customers.name }).from(customers)
   *   );
   * // or
   * import { union } from 'drizzle-orm/pg-core'
   *
   * await union(
   *   db.select({ name: users.name }).from(users),
   *   db.select({ name: customers.name }).from(customers)
   * );
   * ```
   */ union = this.createSetOperator("union", false);
    /**
   * Adds `union all` set operator to the query.
   *
   * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
   *
   * @example
   *
   * ```ts
   * // Select all transaction ids from both online and in-store sales
   * await db.select({ transaction: onlineSales.transactionId })
   *   .from(onlineSales)
   *   .unionAll(
   *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
   *   );
   * // or
   * import { unionAll } from 'drizzle-orm/pg-core'
   *
   * await unionAll(
   *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
   *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
   * );
   * ```
   */ unionAll = this.createSetOperator("union", true);
    /**
   * Adds `intersect` set operator to the query.
   *
   * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
   *
   * @example
   *
   * ```ts
   * // Select course names that are offered in both departments A and B
   * await db.select({ courseName: depA.courseName })
   *   .from(depA)
   *   .intersect(
   *     db.select({ courseName: depB.courseName }).from(depB)
   *   );
   * // or
   * import { intersect } from 'drizzle-orm/pg-core'
   *
   * await intersect(
   *   db.select({ courseName: depA.courseName }).from(depA),
   *   db.select({ courseName: depB.courseName }).from(depB)
   * );
   * ```
   */ intersect = this.createSetOperator("intersect", false);
    /**
   * Adds `intersect all` set operator to the query.
   *
   * Calling this method will retain only the rows that are present in both result sets including all duplicates.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect-all}
   *
   * @example
   *
   * ```ts
   * // Select all products and quantities that are ordered by both regular and VIP customers
   * await db.select({
   *   productId: regularCustomerOrders.productId,
   *   quantityOrdered: regularCustomerOrders.quantityOrdered
   * })
   * .from(regularCustomerOrders)
   * .intersectAll(
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered
   *   })
   *   .from(vipCustomerOrders)
   * );
   * // or
   * import { intersectAll } from 'drizzle-orm/pg-core'
   *
   * await intersectAll(
   *   db.select({
   *     productId: regularCustomerOrders.productId,
   *     quantityOrdered: regularCustomerOrders.quantityOrdered
   *   })
   *   .from(regularCustomerOrders),
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered
   *   })
   *   .from(vipCustomerOrders)
   * );
   * ```
   */ intersectAll = this.createSetOperator("intersect", true);
    /**
   * Adds `except` set operator to the query.
   *
   * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
   *
   * @example
   *
   * ```ts
   * // Select all courses offered in department A but not in department B
   * await db.select({ courseName: depA.courseName })
   *   .from(depA)
   *   .except(
   *     db.select({ courseName: depB.courseName }).from(depB)
   *   );
   * // or
   * import { except } from 'drizzle-orm/pg-core'
   *
   * await except(
   *   db.select({ courseName: depA.courseName }).from(depA),
   *   db.select({ courseName: depB.courseName }).from(depB)
   * );
   * ```
   */ except = this.createSetOperator("except", false);
    /**
   * Adds `except all` set operator to the query.
   *
   * Calling this method will retrieve all rows from the left query, except for the rows that are present in the result set of the right query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#except-all}
   *
   * @example
   *
   * ```ts
   * // Select all products that are ordered by regular customers but not by VIP customers
   * await db.select({
   *   productId: regularCustomerOrders.productId,
   *   quantityOrdered: regularCustomerOrders.quantityOrdered,
   * })
   * .from(regularCustomerOrders)
   * .exceptAll(
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered,
   *   })
   *   .from(vipCustomerOrders)
   * );
   * // or
   * import { exceptAll } from 'drizzle-orm/pg-core'
   *
   * await exceptAll(
   *   db.select({
   *     productId: regularCustomerOrders.productId,
   *     quantityOrdered: regularCustomerOrders.quantityOrdered
   *   })
   *   .from(regularCustomerOrders),
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered
   *   })
   *   .from(vipCustomerOrders)
   * );
   * ```
   */ exceptAll = this.createSetOperator("except", true);
    /** @internal */ addSetOperators(setOperators) {
        this.config.setOperators.push(...setOperators);
        return this;
    }
    /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be selected.
   *
   * ```ts
   * // Select all cars with green color
   * await db.select().from(cars).where(eq(cars.color, 'green'));
   * // or
   * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Select all BMW cars with a green color
   * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Select all cars with the green or blue color
   * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */ where(where) {
        if (typeof where === "function") {
            where = where(new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "sql",
                sqlBehavior: "sql"
            })));
        }
        this.config.where = where;
        return this;
    }
    /**
   * Adds a `having` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
   *
   * @param having the `having` clause.
   *
   * @example
   *
   * ```ts
   * // Select all brands with more than one car
   * await db.select({
   * 	brand: cars.brand,
   * 	count: sql<number>`cast(count(${cars.id}) as int)`,
   * })
   *   .from(cars)
   *   .groupBy(cars.brand)
   *   .having(({ count }) => gt(count, 1));
   * ```
   */ having(having) {
        if (typeof having === "function") {
            having = having(new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "sql",
                sqlBehavior: "sql"
            })));
        }
        this.config.having = having;
        return this;
    }
    groupBy(...columns) {
        if (typeof columns[0] === "function") {
            const groupBy = columns[0](new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "alias",
                sqlBehavior: "sql"
            })));
            this.config.groupBy = Array.isArray(groupBy) ? groupBy : [
                groupBy
            ];
        } else {
            this.config.groupBy = columns;
        }
        return this;
    }
    orderBy(...columns) {
        if (typeof columns[0] === "function") {
            const orderBy = columns[0](new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "alias",
                sqlBehavior: "sql"
            })));
            const orderByArray = Array.isArray(orderBy) ? orderBy : [
                orderBy
            ];
            if (this.config.setOperators.length > 0) {
                this.config.setOperators.at(-1).orderBy = orderByArray;
            } else {
                this.config.orderBy = orderByArray;
            }
        } else {
            const orderByArray = columns;
            if (this.config.setOperators.length > 0) {
                this.config.setOperators.at(-1).orderBy = orderByArray;
            } else {
                this.config.orderBy = orderByArray;
            }
        }
        return this;
    }
    /**
   * Adds a `limit` clause to the query.
   *
   * Calling this method will set the maximum number of rows that will be returned by this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param limit the `limit` clause.
   *
   * @example
   *
   * ```ts
   * // Get the first 10 people from this query.
   * await db.select().from(people).limit(10);
   * ```
   */ limit(limit) {
        if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).limit = limit;
        } else {
            this.config.limit = limit;
        }
        return this;
    }
    /**
   * Adds an `offset` clause to the query.
   *
   * Calling this method will skip a number of rows when returning results from this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param offset the `offset` clause.
   *
   * @example
   *
   * ```ts
   * // Get the 10th-20th people from this query.
   * await db.select().from(people).offset(10).limit(10);
   * ```
   */ offset(offset) {
        if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).offset = offset;
        } else {
            this.config.offset = offset;
        }
        return this;
    }
    /**
   * Adds a `for` clause to the query.
   *
   * Calling this method will specify a lock strength for this query that controls how strictly it acquires exclusive access to the rows being queried.
   *
   * See docs: {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE}
   *
   * @param strength the lock strength.
   * @param config the lock configuration.
   */ for(strength, config = {}) {
        this.config.lockingClause = {
            strength,
            config
        };
        return this;
    }
    /** @internal */ getSQL() {
        return this.dialect.buildSelectQuery(this.config);
    }
    toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
    }
    as(alias) {
        return new Proxy(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"](this.getSQL(), this.config.fields, alias), new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
            alias,
            sqlAliasedBehavior: "alias",
            sqlBehavior: "error"
        }));
    }
    /** @internal */ getSelectedFields() {
        return new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
            alias: this.tableName,
            sqlAliasedBehavior: "alias",
            sqlBehavior: "error"
        }));
    }
    $dynamic() {
        return this;
    }
}
class PgSelectBase extends PgSelectQueryBuilderBase {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSelect";
    /** @internal */ _prepare(name) {
        const { session, config, dialect, joinsNotNullableMap, authToken } = this;
        if (!session) {
            throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.prepareQuery", ()=>{
            const fieldsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(config.fields);
            const query = session.prepareQuery(dialect.sqlToQuery(this.getSQL()), fieldsList, name, true);
            query.joinsNotNullableMap = joinsNotNullableMap;
            return query.setToken(authToken);
        });
    }
    /**
   * Create a prepared statement for this query. This allows
   * the database to remember this query for the given session
   * and call it by name, rather than specifying the full query.
   *
   * {@link https://www.postgresql.org/docs/current/sql-prepare.html | Postgres prepare documentation}
   */ prepare(name) {
        return this._prepare(name);
    }
    authToken;
    /** @internal */ setToken(token) {
        this.authToken = token;
        return this;
    }
    execute = (placeholderValues)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.operation", ()=>{
            return this._prepare().execute(placeholderValues, this.authToken);
        });
    };
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["applyMixins"])(PgSelectBase, [
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"]
]);
function createSetOperator(type, isAll) {
    return (leftSelect, rightSelect, ...restSelects)=>{
        const setOperators = [
            rightSelect,
            ...restSelects
        ].map((select)=>({
                type,
                isAll,
                rightSelect: select
            }));
        for (const setOperator of setOperators){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["haveSameKeys"])(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
                throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
            }
        }
        return leftSelect.addSetOperators(setOperators);
    };
}
const getPgSetOperators = ()=>({
        union,
        unionAll,
        intersect,
        intersectAll,
        except,
        exceptAll
    });
const union = createSetOperator("union", false);
const unionAll = createSetOperator("union", true);
const intersect = createSetOperator("intersect", false);
const intersectAll = createSetOperator("intersect", true);
const except = createSetOperator("except", false);
const exceptAll = createSetOperator("except", true);
;
 //# sourceMappingURL=select.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/query-builder.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryBuilder",
    ()=>QueryBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/dialect.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/select.js [app-rsc] (ecmascript)");
;
;
;
;
;
class QueryBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgQueryBuilder";
    dialect;
    dialectConfig;
    constructor(dialect){
        this.dialect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(dialect, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDialect"]) ? dialect : void 0;
        this.dialectConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(dialect, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDialect"]) ? void 0 : dialect;
    }
    $with(alias) {
        const queryBuilder = this;
        return {
            as (qb) {
                if (typeof qb === "function") {
                    qb = qb(queryBuilder);
                }
                return new Proxy(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithSubquery"](qb.getSQL(), qb.getSelectedFields(), alias, true), new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                    alias,
                    sqlAliasedBehavior: "alias",
                    sqlBehavior: "error"
                }));
            }
        };
    }
    with(...queries) {
        const self = this;
        function select(fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
                fields: fields ?? void 0,
                session: void 0,
                dialect: self.getDialect(),
                withList: queries
            });
        }
        function selectDistinct(fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
                fields: fields ?? void 0,
                session: void 0,
                dialect: self.getDialect(),
                distinct: true
            });
        }
        function selectDistinctOn(on, fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
                fields: fields ?? void 0,
                session: void 0,
                dialect: self.getDialect(),
                distinct: {
                    on
                }
            });
        }
        return {
            select,
            selectDistinct,
            selectDistinctOn
        };
    }
    select(fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
            fields: fields ?? void 0,
            session: void 0,
            dialect: this.getDialect()
        });
    }
    selectDistinct(fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
            fields: fields ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
            distinct: true
        });
    }
    selectDistinctOn(on, fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
            fields: fields ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
            distinct: {
                on
            }
        });
    }
    // Lazy load dialect to avoid circular dependency
    getDialect() {
        if (!this.dialect) {
            this.dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDialect"](this.dialectConfig);
        }
        return this.dialect;
    }
}
;
 //# sourceMappingURL=query-builder.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/insert.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgInsertBase",
    ()=>PgInsertBase,
    "PgInsertBuilder",
    ()=>PgInsertBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/query-builder.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
class PgInsertBuilder {
    constructor(table, session, dialect, withList, overridingSystemValue_){
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
        this.overridingSystemValue_ = overridingSystemValue_;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgInsertBuilder";
    authToken;
    /** @internal */ setToken(token) {
        this.authToken = token;
        return this;
    }
    overridingSystemValue() {
        this.overridingSystemValue_ = true;
        return this;
    }
    values(values) {
        values = Array.isArray(values) ? values : [
            values
        ];
        if (values.length === 0) {
            throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry)=>{
            const result = {};
            const cols = this.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
            for (const colKey of Object.keys(entry)){
                const colValue = entry[colKey];
                result[colKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(colValue, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? colValue : new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Param"](colValue, cols[colKey]);
            }
            return result;
        });
        return new PgInsertBase(this.table, mappedValues, this.session, this.dialect, this.withList, false, this.overridingSystemValue_).setToken(this.authToken);
    }
    select(selectQuery) {
        const select = typeof selectQuery === "function" ? selectQuery(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryBuilder"]()) : selectQuery;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(select, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["haveSameKeys"])(this.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Columns"]], select._.selectedFields)) {
            throw new Error("Insert select error: selected fields are not the same or are in a different order compared to the table definition");
        }
        return new PgInsertBase(this.table, select, this.session, this.dialect, this.withList, true);
    }
}
class PgInsertBase extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(table, values, session, dialect, withList, select, overridingSystemValue_){
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = {
            table,
            values,
            withList,
            select,
            overridingSystemValue_
        };
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgInsert";
    config;
    returning(fields = this.config.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns]) {
        this.config.returning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(fields);
        return this;
    }
    /**
   * Adds an `on conflict do nothing` clause to the query.
   *
   * Calling this method simply avoids inserting a row as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
   *
   * @param config The `target` and `where` clauses.
   *
   * @example
   * ```ts
   * // Insert one row and cancel the insert if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing();
   *
   * // Explicitly specify conflict target
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing({ target: cars.id });
   * ```
   */ onConflictDoNothing(config = {}) {
        if (config.target === void 0) {
            this.config.onConflict = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`do nothing`;
        } else {
            let targetColumn = "";
            targetColumn = Array.isArray(config.target) ? config.target.map((it)=>this.dialect.escapeName(this.dialect.casing.getColumnCasing(it))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(config.target));
            const whereSql = config.where ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${config.where}` : void 0;
            this.config.onConflict = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`(${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(targetColumn)})${whereSql} do nothing`;
        }
        return this;
    }
    /**
   * Adds an `on conflict do update` clause to the query.
   *
   * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
   *
   * @param config The `target`, `set` and `where` clauses.
   *
   * @example
   * ```ts
   * // Update the row if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'Porsche' }
   *   });
   *
   * // Upsert with 'where' clause
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'newBMW' },
   *     targetWhere: sql`${cars.createdAt} > '2023-01-01'::date`,
   *   });
   * ```
   */ onConflictDoUpdate(config) {
        if (config.where && (config.targetWhere || config.setWhere)) {
            throw new Error('You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.');
        }
        const whereSql = config.where ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${config.where}` : void 0;
        const targetWhereSql = config.targetWhere ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${config.targetWhere}` : void 0;
        const setWhereSql = config.setWhere ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${config.setWhere}` : void 0;
        const setSql = this.dialect.buildUpdateSet(this.config.table, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapUpdateSet"])(this.config.table, config.set));
        let targetColumn = "";
        targetColumn = Array.isArray(config.target) ? config.target.map((it)=>this.dialect.escapeName(this.dialect.casing.getColumnCasing(it))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(config.target));
        this.config.onConflict = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`(${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(targetColumn)})${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`;
        return this;
    }
    /** @internal */ getSQL() {
        return this.dialect.buildInsertQuery(this.config);
    }
    toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
    }
    /** @internal */ _prepare(name) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.prepareQuery", ()=>{
            return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name, true);
        });
    }
    prepare(name) {
        return this._prepare(name);
    }
    authToken;
    /** @internal */ setToken(token) {
        this.authToken = token;
        return this;
    }
    execute = (placeholderValues)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.operation", ()=>{
            return this._prepare().execute(placeholderValues, this.authToken);
        });
    };
    $dynamic() {
        return this;
    }
}
;
 //# sourceMappingURL=insert.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/update.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgUpdateBase",
    ()=>PgUpdateBase,
    "PgUpdateBuilder",
    ()=>PgUpdateBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
class PgUpdateBuilder {
    constructor(table, session, dialect, withList){
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgUpdateBuilder";
    authToken;
    setToken(token) {
        this.authToken = token;
        return this;
    }
    set(values) {
        return new PgUpdateBase(this.table, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapUpdateSet"])(this.table, values), this.session, this.dialect, this.withList).setToken(this.authToken);
    }
}
class PgUpdateBase extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(table, set, session, dialect, withList){
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = {
            set,
            table,
            withList,
            joins: []
        };
        this.tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? {
            [this.tableName]: true
        } : {};
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgUpdate";
    config;
    tableName;
    joinsNotNullableMap;
    from(source) {
        const tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(source);
        if (typeof tableName === "string") {
            this.joinsNotNullableMap[tableName] = true;
        }
        this.config.from = source;
        return this;
    }
    getTableLikeFields(table) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTable"])) {
            return table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"])) {
            return table._.selectedFields;
        }
        return table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].selectedFields;
    }
    createJoin(joinType) {
        return (table, on)=>{
            const tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(table);
            if (typeof tableName === "string" && this.config.joins.some((join)=>join.alias === tableName)) {
                throw new Error(`Alias "${tableName}" is already used in this query`);
            }
            if (typeof on === "function") {
                const from = this.config.from && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(this.config.from, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? this.getTableLikeFields(this.config.from) : void 0;
                on = on(new Proxy(this.config.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns], new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                    sqlAliasedBehavior: "sql",
                    sqlBehavior: "sql"
                })), from && new Proxy(from, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                    sqlAliasedBehavior: "sql",
                    sqlBehavior: "sql"
                })));
            }
            this.config.joins.push({
                on,
                table,
                joinType,
                alias: tableName
            });
            if (typeof tableName === "string") {
                switch(joinType){
                    case "left":
                        {
                            this.joinsNotNullableMap[tableName] = false;
                            break;
                        }
                    case "right":
                        {
                            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key])=>[
                                    key,
                                    false
                                ]));
                            this.joinsNotNullableMap[tableName] = true;
                            break;
                        }
                    case "inner":
                        {
                            this.joinsNotNullableMap[tableName] = true;
                            break;
                        }
                    case "full":
                        {
                            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key])=>[
                                    key,
                                    false
                                ]));
                            this.joinsNotNullableMap[tableName] = false;
                            break;
                        }
                }
            }
            return this;
        };
    }
    leftJoin = this.createJoin("left");
    rightJoin = this.createJoin("right");
    innerJoin = this.createJoin("inner");
    fullJoin = this.createJoin("full");
    /**
   * Adds a 'where' clause to the query.
   *
   * Calling this method will update only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param where the 'where' clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be updated.
   *
   * ```ts
   * // Update all cars with green color
   * await db.update(cars).set({ color: 'red' })
   *   .where(eq(cars.color, 'green'));
   * // or
   * await db.update(cars).set({ color: 'red' })
   *   .where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Update all BMW cars with a green color
   * await db.update(cars).set({ color: 'red' })
   *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Update all cars with the green or blue color
   * await db.update(cars).set({ color: 'red' })
   *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */ where(where) {
        this.config.where = where;
        return this;
    }
    returning(fields) {
        if (!fields) {
            fields = Object.assign({}, this.config.table[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns]);
            if (this.config.from) {
                const tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(this.config.from);
                if (typeof tableName === "string" && this.config.from && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(this.config.from, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                    const fromFields = this.getTableLikeFields(this.config.from);
                    fields[tableName] = fromFields;
                }
                for (const join of this.config.joins){
                    const tableName2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(join.table);
                    if (typeof tableName2 === "string" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(join.table, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                        const fromFields = this.getTableLikeFields(join.table);
                        fields[tableName2] = fromFields;
                    }
                }
            }
        }
        this.config.returning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(fields);
        return this;
    }
    /** @internal */ getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
    }
    toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
    }
    /** @internal */ _prepare(name) {
        const query = this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name, true);
        query.joinsNotNullableMap = this.joinsNotNullableMap;
        return query;
    }
    prepare(name) {
        return this._prepare(name);
    }
    authToken;
    /** @internal */ setToken(token) {
        this.authToken = token;
        return this;
    }
    execute = (placeholderValues)=>{
        return this._prepare().execute(placeholderValues, this.authToken);
    };
    $dynamic() {
        return this;
    }
}
;
 //# sourceMappingURL=update.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/count.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgCountBuilder",
    ()=>PgCountBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
;
;
class PgCountBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"] {
    constructor(params){
        super(PgCountBuilder.buildEmbeddedCount(params.source, params.filters).queryChunks);
        this.params = params;
        this.mapWith(Number);
        this.session = params.session;
        this.sql = PgCountBuilder.buildCount(params.source, params.filters);
    }
    sql;
    token;
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgCountBuilder";
    [Symbol.toStringTag] = "PgCountBuilder";
    session;
    static buildEmbeddedCount(source, filters) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`(select count(*) from ${source}${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(" where ").if(filters)}${filters})`;
    }
    static buildCount(source, filters) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`select count(*) as count from ${source}${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(" where ").if(filters)}${filters};`;
    }
    /** @intrnal */ setToken(token) {
        this.token = token;
        return this;
    }
    then(onfulfilled, onrejected) {
        return Promise.resolve(this.session.count(this.sql, this.token)).then(onfulfilled, onrejected);
    }
    catch(onRejected) {
        return this.then(void 0, onRejected);
    }
    finally(onFinally) {
        return this.then((value)=>{
            onFinally?.();
            return value;
        }, (reason)=>{
            onFinally?.();
            throw reason;
        });
    }
}
;
 //# sourceMappingURL=count.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/query.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgRelationalQuery",
    ()=>PgRelationalQuery,
    "RelationalQueryBuilder",
    ()=>RelationalQueryBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/relations.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing.js [app-rsc] (ecmascript)");
;
;
;
;
class RelationalQueryBuilder {
    constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session){
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgRelationalQueryBuilder";
    findMany(config) {
        return new PgRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many");
    }
    findFirst(config) {
        return new PgRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? {
            ...config,
            limit: 1
        } : {
            limit: 1
        }, "first");
    }
}
class PgRelationalQuery extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode){
        super();
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config;
        this.mode = mode;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgRelationalQuery";
    /** @internal */ _prepare(name) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.prepareQuery", ()=>{
            const { query, builtQuery } = this._toSQL();
            return this.session.prepareQuery(builtQuery, void 0, name, true, (rawRows, mapColumnValue)=>{
                const rows = rawRows.map((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapRelationalRow"])(this.schema, this.tableConfig, row, query.selection, mapColumnValue));
                if (this.mode === "first") {
                    return rows[0];
                }
                return rows;
            });
        });
    }
    prepare(name) {
        return this._prepare(name);
    }
    _getQuery() {
        return this.dialect.buildRelationalQueryWithoutPK({
            fullSchema: this.fullSchema,
            schema: this.schema,
            tableNamesMap: this.tableNamesMap,
            table: this.table,
            tableConfig: this.tableConfig,
            queryConfig: this.config,
            tableAlias: this.tableConfig.tsName
        });
    }
    /** @internal */ getSQL() {
        return this._getQuery().sql;
    }
    _toSQL() {
        const query = this._getQuery();
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return {
            query,
            builtQuery
        };
    }
    toSQL() {
        return this._toSQL().builtQuery;
    }
    authToken;
    /** @internal */ setToken(token) {
        this.authToken = token;
        return this;
    }
    execute() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.operation", ()=>{
            return this._prepare().execute(void 0, this.authToken);
        });
    }
}
;
 //# sourceMappingURL=query.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/raw.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgRaw",
    ()=>PgRaw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
;
;
class PgRaw extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(execute, sql, query, mapBatchResult){
        super();
        this.execute = execute;
        this.sql = sql;
        this.query = query;
        this.mapBatchResult = mapBatchResult;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgRaw";
    /** @internal */ getSQL() {
        return this.sql;
    }
    getQuery() {
        return this.query;
    }
    mapResult(result, isFromBatch) {
        return isFromBatch ? this.mapBatchResult(result) : result;
    }
    _prepare() {
        return this;
    }
    /** @internal */ isResponseInArrayMode() {
        return false;
    }
}
;
 //# sourceMappingURL=raw.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/refresh-materialized-view.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgRefreshMaterializedView",
    ()=>PgRefreshMaterializedView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing.js [app-rsc] (ecmascript)");
;
;
;
class PgRefreshMaterializedView extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(view, session, dialect){
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = {
            view
        };
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgRefreshMaterializedView";
    config;
    concurrently() {
        if (this.config.withNoData !== void 0) {
            throw new Error("Cannot use concurrently and withNoData together");
        }
        this.config.concurrently = true;
        return this;
    }
    withNoData() {
        if (this.config.concurrently !== void 0) {
            throw new Error("Cannot use concurrently and withNoData together");
        }
        this.config.withNoData = true;
        return this;
    }
    /** @internal */ getSQL() {
        return this.dialect.buildRefreshMaterializedViewQuery(this.config);
    }
    toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
    }
    /** @internal */ _prepare(name) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.prepareQuery", ()=>{
            return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), void 0, name, true);
        });
    }
    prepare(name) {
        return this._prepare(name);
    }
    authToken;
    /** @internal */ setToken(token) {
        this.authToken = token;
        return this;
    }
    execute = (placeholderValues)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.operation", ()=>{
            return this._prepare().execute(placeholderValues, this.authToken);
        });
    };
}
;
 //# sourceMappingURL=refresh-materialized-view.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/db.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgDatabase",
    ()=>PgDatabase,
    "withReplicas",
    ()=>withReplicas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$delete$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/delete.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$insert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/insert.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/select.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$update$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/update.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/query-builder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$count$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/count.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$query$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/query.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$raw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/raw.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$refresh$2d$materialized$2d$view$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/query-builders/refresh-materialized-view.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
class PgDatabase {
    constructor(dialect, session, schema){
        this.dialect = dialect;
        this.session = session;
        this._ = schema ? {
            schema: schema.schema,
            fullSchema: schema.fullSchema,
            tableNamesMap: schema.tableNamesMap,
            session
        } : {
            schema: void 0,
            fullSchema: {},
            tableNamesMap: {},
            session
        };
        this.query = {};
        if (this._.schema) {
            for (const [tableName, columns] of Object.entries(this._.schema)){
                this.query[tableName] = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$query$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RelationalQueryBuilder"](schema.fullSchema, this._.schema, this._.tableNamesMap, schema.fullSchema[tableName], columns, dialect, session);
            }
        }
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgDatabase";
    query;
    /**
   * Creates a subquery that defines a temporary named result set as a CTE.
   *
   * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param alias The alias for the subquery.
   *
   * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
   *
   * @example
   *
   * ```ts
   * // Create a subquery with alias 'sq' and use it in the select query
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * const result = await db.with(sq).select().from(sq);
   * ```
   *
   * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
   *
   * ```ts
   * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
   * const sq = db.$with('sq').as(db.select({
   *   name: sql<string>`upper(${users.name})`.as('name'),
   * })
   * .from(users));
   *
   * const result = await db.with(sq).select({ name: sq.name }).from(sq);
   * ```
   */ $with(alias) {
        const self = this;
        return {
            as (qb) {
                if (typeof qb === "function") {
                    qb = qb(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryBuilder"](self.dialect));
                }
                return new Proxy(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithSubquery"](qb.getSQL(), qb.getSelectedFields(), alias, true), new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                    alias,
                    sqlAliasedBehavior: "alias",
                    sqlBehavior: "error"
                }));
            }
        };
    }
    $count(source, filters) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$count$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgCountBuilder"]({
            source,
            filters,
            session: this.session
        });
    }
    /**
   * Incorporates a previously defined CTE (using `$with`) into the main query.
   *
   * This method allows the main query to reference a temporary named result set.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param queries The CTEs to incorporate into the main query.
   *
   * @example
   *
   * ```ts
   * // Define a subquery 'sq' as a CTE using $with
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * // Incorporate the CTE 'sq' into the main query and select from it
   * const result = await db.with(sq).select().from(sq);
   * ```
   */ with(...queries) {
        const self = this;
        function select(fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
                fields: fields ?? void 0,
                session: self.session,
                dialect: self.dialect,
                withList: queries
            });
        }
        function selectDistinct(fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
                fields: fields ?? void 0,
                session: self.session,
                dialect: self.dialect,
                withList: queries,
                distinct: true
            });
        }
        function selectDistinctOn(on, fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
                fields: fields ?? void 0,
                session: self.session,
                dialect: self.dialect,
                withList: queries,
                distinct: {
                    on
                }
            });
        }
        function update(table) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$update$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgUpdateBuilder"](table, self.session, self.dialect, queries);
        }
        function insert(table) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$insert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgInsertBuilder"](table, self.session, self.dialect, queries);
        }
        function delete_(table) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$delete$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDeleteBase"](table, self.session, self.dialect, queries);
        }
        return {
            select,
            selectDistinct,
            selectDistinctOn,
            update,
            insert,
            delete: delete_
        };
    }
    select(fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
            fields: fields ?? void 0,
            session: this.session,
            dialect: this.dialect
        });
    }
    selectDistinct(fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
            fields: fields ?? void 0,
            session: this.session,
            dialect: this.dialect,
            distinct: true
        });
    }
    selectDistinctOn(on, fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSelectBuilder"]({
            fields: fields ?? void 0,
            session: this.session,
            dialect: this.dialect,
            distinct: {
                on
            }
        });
    }
    /**
   * Creates an update query.
   *
   * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
   *
   * Use `.set()` method to specify which values to update.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param table The table to update.
   *
   * @example
   *
   * ```ts
   * // Update all rows in the 'cars' table
   * await db.update(cars).set({ color: 'red' });
   *
   * // Update rows with filters and conditions
   * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
   *
   * // Update with returning clause
   * const updatedCar: Car[] = await db.update(cars)
   *   .set({ color: 'red' })
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */ update(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$update$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgUpdateBuilder"](table, this.session, this.dialect);
    }
    /**
   * Creates an insert query.
   *
   * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert}
   *
   * @param table The table to insert into.
   *
   * @example
   *
   * ```ts
   * // Insert one row
   * await db.insert(cars).values({ brand: 'BMW' });
   *
   * // Insert multiple rows
   * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
   *
   * // Insert with returning clause
   * const insertedCar: Car[] = await db.insert(cars)
   *   .values({ brand: 'BMW' })
   *   .returning();
   * ```
   */ insert(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$insert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgInsertBuilder"](table, this.session, this.dialect);
    }
    /**
   * Creates a delete query.
   *
   * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param table The table to delete from.
   *
   * @example
   *
   * ```ts
   * // Delete all rows in the 'cars' table
   * await db.delete(cars);
   *
   * // Delete rows with filters and conditions
   * await db.delete(cars).where(eq(cars.color, 'green'));
   *
   * // Delete with returning clause
   * const deletedCar: Car[] = await db.delete(cars)
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */ delete(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$delete$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDeleteBase"](table, this.session, this.dialect);
    }
    refreshMaterializedView(view) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$refresh$2d$materialized$2d$view$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgRefreshMaterializedView"](view, this.session, this.dialect);
    }
    authToken;
    execute(query) {
        const sequel = typeof query === "string" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(query) : query.getSQL();
        const builtQuery = this.dialect.sqlToQuery(sequel);
        const prepared = this.session.prepareQuery(builtQuery, void 0, void 0, false);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$query$2d$builders$2f$raw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgRaw"](()=>prepared.execute(void 0, this.authToken), sequel, builtQuery, (result)=>prepared.mapResult(result, true));
    }
    transaction(transaction, config) {
        return this.session.transaction(transaction, config);
    }
}
const withReplicas = (primary, replicas, getReplica = ()=>replicas[Math.floor(Math.random() * replicas.length)])=>{
    const select = (...args)=>getReplica(replicas).select(...args);
    const selectDistinct = (...args)=>getReplica(replicas).selectDistinct(...args);
    const selectDistinctOn = (...args)=>getReplica(replicas).selectDistinctOn(...args);
    const _with = (...args)=>getReplica(replicas).with(...args);
    const $with = (arg)=>getReplica(replicas).$with(arg);
    const update = (...args)=>primary.update(...args);
    const insert = (...args)=>primary.insert(...args);
    const $delete = (...args)=>primary.delete(...args);
    const execute = (...args)=>primary.execute(...args);
    const transaction = (...args)=>primary.transaction(...args);
    const refreshMaterializedView = (...args)=>primary.refreshMaterializedView(...args);
    return {
        ...primary,
        update,
        insert,
        delete: $delete,
        execute,
        transaction,
        refreshMaterializedView,
        $primary: primary,
        select,
        selectDistinct,
        selectDistinctOn,
        $with,
        with: _with,
        get query () {
            return getReplica(replicas).query;
        }
    };
};
;
 //# sourceMappingURL=db.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/session.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PgPreparedQuery",
    ()=>PgPreparedQuery,
    "PgSession",
    ()=>PgSession,
    "PgTransaction",
    ()=>PgTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/errors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/db.js [app-rsc] (ecmascript)");
;
;
;
;
;
class PgPreparedQuery {
    constructor(query){
        this.query = query;
    }
    authToken;
    getQuery() {
        return this.query;
    }
    mapResult(response, _isFromBatch) {
        return response;
    }
    /** @internal */ setToken(token) {
        this.authToken = token;
        return this;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgPreparedQuery";
    /** @internal */ joinsNotNullableMap;
}
class PgSession {
    constructor(dialect){
        this.dialect = dialect;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgSession";
    /** @internal */ execute(query, token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.operation", ()=>{
            const prepared = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.prepareQuery", ()=>{
                return this.prepareQuery(this.dialect.sqlToQuery(query), void 0, void 0, false);
            });
            return prepared.setToken(token).execute(void 0, token);
        });
    }
    all(query) {
        return this.prepareQuery(this.dialect.sqlToQuery(query), void 0, void 0, false).all();
    }
    /** @internal */ async count(sql2, token) {
        const res = await this.execute(sql2, token);
        return Number(res[0]["count"]);
    }
}
class PgTransaction extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDatabase"] {
    constructor(dialect, session, schema, nestedIndex = 0){
        super(dialect, session, schema);
        this.schema = schema;
        this.nestedIndex = nestedIndex;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgTransaction";
    rollback() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TransactionRollbackError"]();
    }
    /** @internal */ getTransactionConfigSQL(config) {
        const chunks = [];
        if (config.isolationLevel) {
            chunks.push(`isolation level ${config.isolationLevel}`);
        }
        if (config.accessMode) {
            chunks.push(config.accessMode);
        }
        if (typeof config.deferrable === "boolean") {
            chunks.push(config.deferrable ? "deferrable" : "not deferrable");
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(chunks.join(" "));
    }
    setTransaction(config) {
        return this.session.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`set transaction ${this.getTransactionConfigSQL(config)}`);
    }
}
;
 //# sourceMappingURL=session.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/node-postgres/session.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "NodePgPreparedQuery",
    ()=>NodePgPreparedQuery,
    "NodePgSession",
    ()=>NodePgSession,
    "NodePgTransaction",
    ()=>NodePgTransaction
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$logger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/logger.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/session.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/tracing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
const { Pool, types } = __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__["default"];
class NodePgPreparedQuery extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgPreparedQuery"] {
    constructor(client, queryString, params, logger, fields, name, _isResponseInArrayMode, customResultMapper){
        super({
            sql: queryString,
            params
        });
        this.client = client;
        this.params = params;
        this.logger = logger;
        this.fields = fields;
        this._isResponseInArrayMode = _isResponseInArrayMode;
        this.customResultMapper = customResultMapper;
        this.rawQueryConfig = {
            name,
            text: queryString,
            types: {
                // @ts-ignore
                getTypeParser: (typeId, format)=>{
                    if (typeId === types.builtins.TIMESTAMPTZ) {
                        return (val)=>val;
                    }
                    if (typeId === types.builtins.TIMESTAMP) {
                        return (val)=>val;
                    }
                    if (typeId === types.builtins.DATE) {
                        return (val)=>val;
                    }
                    if (typeId === types.builtins.INTERVAL) {
                        return (val)=>val;
                    }
                    return types.getTypeParser(typeId, format);
                }
            }
        };
        this.queryConfig = {
            name,
            text: queryString,
            rowMode: "array",
            types: {
                // @ts-ignore
                getTypeParser: (typeId, format)=>{
                    if (typeId === types.builtins.TIMESTAMPTZ) {
                        return (val)=>val;
                    }
                    if (typeId === types.builtins.TIMESTAMP) {
                        return (val)=>val;
                    }
                    if (typeId === types.builtins.DATE) {
                        return (val)=>val;
                    }
                    if (typeId === types.builtins.INTERVAL) {
                        return (val)=>val;
                    }
                    return types.getTypeParser(typeId, format);
                }
            }
        };
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "NodePgPreparedQuery";
    rawQueryConfig;
    queryConfig;
    async execute(placeholderValues = {}) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.execute", async ()=>{
            const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillPlaceholders"])(this.params, placeholderValues);
            this.logger.logQuery(this.rawQueryConfig.text, params);
            const { fields, rawQueryConfig: rawQuery, client, queryConfig: query, joinsNotNullableMap, customResultMapper } = this;
            if (!fields && !customResultMapper) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.driver.execute", async (span)=>{
                    span?.setAttributes({
                        "drizzle.query.name": rawQuery.name,
                        "drizzle.query.text": rawQuery.text,
                        "drizzle.query.params": JSON.stringify(params)
                    });
                    return client.query(rawQuery, params);
                });
            }
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.driver.execute", (span)=>{
                span?.setAttributes({
                    "drizzle.query.name": query.name,
                    "drizzle.query.text": query.text,
                    "drizzle.query.params": JSON.stringify(params)
                });
                return client.query(query, params);
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.mapResponse", ()=>{
                return customResultMapper ? customResultMapper(result.rows) : result.rows.map((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapResultRow"])(fields, row, joinsNotNullableMap));
            });
        });
    }
    all(placeholderValues = {}) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.execute", ()=>{
            const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillPlaceholders"])(this.params, placeholderValues);
            this.logger.logQuery(this.rawQueryConfig.text, params);
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracer"].startActiveSpan("drizzle.driver.execute", (span)=>{
                span?.setAttributes({
                    "drizzle.query.name": this.rawQueryConfig.name,
                    "drizzle.query.text": this.rawQueryConfig.text,
                    "drizzle.query.params": JSON.stringify(params)
                });
                return this.client.query(this.rawQueryConfig, params).then((result)=>result.rows);
            });
        });
    }
    /** @internal */ isResponseInArrayMode() {
        return this._isResponseInArrayMode;
    }
}
class NodePgSession extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgSession"] {
    constructor(client, dialect, schema, options = {}){
        super(dialect);
        this.client = client;
        this.schema = schema;
        this.options = options;
        this.logger = options.logger ?? new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$logger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NoopLogger"]();
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "NodePgSession";
    logger;
    prepareQuery(query, fields, name, isResponseInArrayMode, customResultMapper) {
        return new NodePgPreparedQuery(this.client, query.sql, query.params, this.logger, fields, name, isResponseInArrayMode, customResultMapper);
    }
    async transaction(transaction, config) {
        const session = this.client instanceof Pool ? new NodePgSession(await this.client.connect(), this.dialect, this.schema, this.options) : this;
        const tx = new NodePgTransaction(this.dialect, session, this.schema);
        await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`begin${config ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` ${tx.getTransactionConfigSQL(config)}` : void 0}`);
        try {
            const result = await transaction(tx);
            await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`commit`);
            return result;
        } catch (error) {
            await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`rollback`);
            throw error;
        } finally{
            if (this.client instanceof Pool) {
                session.client.release();
            }
        }
    }
    async count(sql2) {
        const res = await this.execute(sql2);
        return Number(res["rows"][0]["count"]);
    }
}
class NodePgTransaction extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgTransaction"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "NodePgTransaction";
    async transaction(transaction) {
        const savepointName = `sp${this.nestedIndex + 1}`;
        const tx = new NodePgTransaction(this.dialect, this.session, this.schema, this.nestedIndex + 1);
        await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(`savepoint ${savepointName}`));
        try {
            const result = await transaction(tx);
            await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(`release savepoint ${savepointName}`));
            return result;
        } catch (err) {
            await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(`rollback to savepoint ${savepointName}`));
            throw err;
        }
    }
}
;
 //# sourceMappingURL=session.js.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/node-postgres/driver.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "NodePgDatabase",
    ()=>NodePgDatabase,
    "NodePgDriver",
    ()=>NodePgDriver,
    "drizzle",
    ()=>drizzle
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$logger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/logger.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/db.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/dialect.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/relations.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/node-postgres/session.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
class NodePgDriver {
    constructor(client, dialect, options = {}){
        this.client = client;
        this.dialect = dialect;
        this.options = options;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "NodePgDriver";
    createSession(schema) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodePgSession"](this.client, this.dialect, schema, {
            logger: this.options.logger
        });
    }
}
class NodePgDatabase extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDatabase"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "NodePgDatabase";
}
function construct(client, config = {}) {
    const dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PgDialect"]({
        casing: config.casing
    });
    let logger;
    if (config.logger === true) {
        logger = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$logger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultLogger"]();
    } else if (config.logger !== false) {
        logger = config.logger;
    }
    let schema;
    if (config.schema) {
        const tablesConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractTablesRelationalConfig"])(config.schema, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTableRelationsHelpers"]);
        schema = {
            fullSchema: config.schema,
            schema: tablesConfig.tables,
            tableNamesMap: tablesConfig.tableNamesMap
        };
    }
    const driver = new NodePgDriver(client, dialect, {
        logger
    });
    const session = driver.createSession(schema);
    const db = new NodePgDatabase(dialect, session, schema);
    db.$client = client;
    return db;
}
function drizzle(...params) {
    if (typeof params[0] === "string") {
        const instance = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__["default"].Pool({
            connectionString: params[0]
        });
        return construct(instance, params[1]);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isConfig"])(params[0])) {
        const { connection, client, ...drizzleConfig } = params[0];
        if (client) return construct(client, drizzleConfig);
        const instance = typeof connection === "string" ? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__["default"].Pool({
            connectionString: connection
        }) : new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$29$__["default"].Pool(connection);
        return construct(instance, drizzleConfig);
    }
    return construct(params[0], params[1]);
}
((drizzle2)=>{
    function mock(config) {
        return construct({}, config);
    }
    drizzle2.mock = mock;
})(drizzle || (drizzle = {}));
;
 //# sourceMappingURL=driver.js.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/indexes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Index",
    ()=>Index,
    "IndexBuilder",
    ()=>IndexBuilder,
    "IndexBuilderOn",
    ()=>IndexBuilderOn,
    "index",
    ()=>index,
    "uniqueIndex",
    ()=>uniqueIndex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class IndexBuilderOn {
    constructor(unique, name){
        this.unique = unique;
        this.name = name;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgIndexBuilderOn";
    on(...columns) {
        return new IndexBuilder(columns.map((it)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(it, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                return it;
            }
            it = it;
            const clonedIndexedColumn = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IndexedColumn"](it.name, !!it.keyAsName, it.columnType, it.indexConfig);
            it.indexConfig = JSON.parse(JSON.stringify(it.defaultConfig));
            return clonedIndexedColumn;
        }), this.unique, false, this.name);
    }
    onOnly(...columns) {
        return new IndexBuilder(columns.map((it)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(it, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                return it;
            }
            it = it;
            const clonedIndexedColumn = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IndexedColumn"](it.name, !!it.keyAsName, it.columnType, it.indexConfig);
            it.indexConfig = it.defaultConfig;
            return clonedIndexedColumn;
        }), this.unique, true, this.name);
    }
    /**
   * Specify what index method to use. Choices are `btree`, `hash`, `gist`, `spgist`, `gin`, `brin`, or user-installed access methods like `bloom`. The default method is `btree.
   *
   * If you have the `pg_vector` extension installed in your database, you can use the `hnsw` and `ivfflat` options, which are predefined types.
   *
   * **You can always specify any string you want in the method, in case Drizzle doesn't have it natively in its types**
   *
   * @param method The name of the index method to be used
   * @param columns
   * @returns
   */ using(method, ...columns) {
        return new IndexBuilder(columns.map((it)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(it, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                return it;
            }
            it = it;
            const clonedIndexedColumn = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IndexedColumn"](it.name, !!it.keyAsName, it.columnType, it.indexConfig);
            it.indexConfig = JSON.parse(JSON.stringify(it.defaultConfig));
            return clonedIndexedColumn;
        }), this.unique, true, this.name, method);
    }
}
class IndexBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgIndexBuilder";
    /** @internal */ config;
    constructor(columns, unique, only, name, method = "btree"){
        this.config = {
            name,
            columns,
            unique,
            only,
            method
        };
    }
    concurrently() {
        this.config.concurrently = true;
        return this;
    }
    with(obj) {
        this.config.with = obj;
        return this;
    }
    where(condition) {
        this.config.where = condition;
        return this;
    }
    /** @internal */ build(table) {
        return new Index(this.config, table);
    }
}
class Index {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PgIndex";
    config;
    constructor(config, table){
        this.config = {
            ...config,
            table
        };
    }
}
function index(name) {
    return new IndexBuilderOn(false, name);
}
function uniqueIndex(name) {
    return new IndexBuilderOn(true, name);
}
;
 //# sourceMappingURL=indexes.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    AppRenderSpan: null,
    AppRouteRouteHandlersSpan: null,
    BaseServerSpan: null,
    LoadComponentsSpan: null,
    LogSpanAllowList: null,
    MiddlewareSpan: null,
    NextNodeServerSpan: null,
    NextServerSpan: null,
    NextVanillaSpanAllowlist: null,
    NodeSpan: null,
    RenderSpan: null,
    ResolveMetadataSpan: null,
    RouterSpan: null,
    StartServerSpan: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppRenderSpan: function() {
        return AppRenderSpan;
    },
    AppRouteRouteHandlersSpan: function() {
        return AppRouteRouteHandlersSpan;
    },
    BaseServerSpan: function() {
        return BaseServerSpan;
    },
    LoadComponentsSpan: function() {
        return LoadComponentsSpan;
    },
    LogSpanAllowList: function() {
        return LogSpanAllowList;
    },
    MiddlewareSpan: function() {
        return MiddlewareSpan;
    },
    NextNodeServerSpan: function() {
        return NextNodeServerSpan;
    },
    NextServerSpan: function() {
        return NextServerSpan;
    },
    NextVanillaSpanAllowlist: function() {
        return NextVanillaSpanAllowlist;
    },
    NodeSpan: function() {
        return NodeSpan;
    },
    RenderSpan: function() {
        return RenderSpan;
    },
    ResolveMetadataSpan: function() {
        return ResolveMetadataSpan;
    },
    RouterSpan: function() {
        return RouterSpan;
    },
    StartServerSpan: function() {
        return StartServerSpan;
    }
});
var BaseServerSpan = /*#__PURE__*/ function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
    return BaseServerSpan;
}(BaseServerSpan || {});
var LoadComponentsSpan = /*#__PURE__*/ function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
    return LoadComponentsSpan;
}(LoadComponentsSpan || {});
var NextServerSpan = /*#__PURE__*/ function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getRequestHandlerWithMetadata"] = "NextServer.getRequestHandlerWithMetadata";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
    return NextServerSpan;
}(NextServerSpan || {});
var NextNodeServerSpan = /*#__PURE__*/ function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["createComponentTree"] = "NextNodeServer.createComponentTree";
    NextNodeServerSpan["clientComponentLoading"] = "NextNodeServer.clientComponentLoading";
    NextNodeServerSpan["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["startResponse"] = "NextNodeServer.startResponse";
    // nested inner span, does not require parent scope name
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
    NextNodeServerSpan["internalFetch"] = "internalFetch";
    return NextNodeServerSpan;
}(NextNodeServerSpan || {});
var StartServerSpan = /*#__PURE__*/ function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
    return StartServerSpan;
}(StartServerSpan || {});
var RenderSpan = /*#__PURE__*/ function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
    return RenderSpan;
}(RenderSpan || {});
var AppRenderSpan = /*#__PURE__*/ function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
    return AppRenderSpan;
}(AppRenderSpan || {});
var RouterSpan = /*#__PURE__*/ function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
    return RouterSpan;
}(RouterSpan || {});
var NodeSpan = /*#__PURE__*/ function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
    return NodeSpan;
}(NodeSpan || {});
var AppRouteRouteHandlersSpan = /*#__PURE__*/ function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
    return AppRouteRouteHandlersSpan;
}(AppRouteRouteHandlersSpan || {});
var ResolveMetadataSpan = /*#__PURE__*/ function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
    ResolveMetadataSpan["generateViewport"] = "ResolveMetadata.generateViewport";
    return ResolveMetadataSpan;
}(ResolveMetadataSpan || {});
var MiddlewareSpan = /*#__PURE__*/ function(MiddlewareSpan) {
    MiddlewareSpan["execute"] = "Middleware.execute";
    return MiddlewareSpan;
}(MiddlewareSpan || {});
const NextVanillaSpanAllowlist = new Set([
    "Middleware.execute",
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata",
    "ResolveMetadata.generateViewport",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.findPageComponents",
    "NextNodeServer.getLayoutOrPageModule",
    "NextNodeServer.startResponse",
    "NextNodeServer.clientComponentLoading"
]);
const LogSpanAllowList = new Set([
    "NextNodeServer.findPageComponents",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.clientComponentLoading"
]); //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/is-thenable.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Check to see if a value is Thenable.
 *
 * @param promise the maybe-thenable value
 * @returns true if the value is thenable
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isThenable", {
    enumerable: true,
    get: function() {
        return isThenable;
    }
});
function isThenable(promise) {
    return promise !== null && typeof promise === 'object' && 'then' in promise && typeof promise.then === 'function';
} //# sourceMappingURL=is-thenable.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/trace/tracer.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BubbledError: null,
    SpanKind: null,
    SpanStatusCode: null,
    getTracer: null,
    isBubbledError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BubbledError: function() {
        return BubbledError;
    },
    SpanKind: function() {
        return SpanKind;
    },
    SpanStatusCode: function() {
        return SpanStatusCode;
    },
    getTracer: function() {
        return getTracer;
    },
    isBubbledError: function() {
        return isBubbledError;
    }
});
const _constants = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)");
const _isthenable = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/is-thenable.js [app-rsc] (ecmascript)");
const NEXT_OTEL_PERFORMANCE_PREFIX = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
let api;
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    try {
        api = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
    } catch (err) {
        api = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/@opentelemetry/api/index.js [app-rsc] (ecmascript)");
    }
}
const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
class BubbledError extends Error {
    constructor(bubble, result){
        super(), this.bubble = bubble, this.result = result;
    }
}
function isBubbledError(error) {
    if (typeof error !== 'object' || error === null) return false;
    return error instanceof BubbledError;
}
const closeSpanWithError = (span, error)=>{
    if (isBubbledError(error) && error.bubble) {
        span.setAttribute('next.bubble', true);
    } else {
        if (error) {
            span.recordException(error);
            span.setAttribute('error.type', error.name);
        }
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error == null ? void 0 : error.message
        });
    }
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey('next.rootSpanId');
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
const clientTraceDataSetter = {
    set (carrier, key, value) {
        carrier.push({
            key,
            value
        });
    }
};
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer('next.js', '0.0.1');
    }
    getContext() {
        return context;
    }
    getTracePropagationData() {
        const activeContext = context.active();
        const entries = [];
        propagation.inject(activeContext, entries, clientTraceDataSetter);
        return entries;
    }
    getActiveScopeSpan() {
        return trace.getSpan(context == null ? void 0 : context.active());
    }
    withPropagatedContext(carrier, fn, getter) {
        const activeContext = context.active();
        if (trace.getSpanContext(activeContext)) {
            // Active span is already set, too late to propagate.
            return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
    }
    trace(...args) {
        const [type, fnOrOptions, fnOrEmpty] = args;
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === 'function' ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        const spanName = options.spanName ?? type;
        if (!_constants.NextVanillaSpanAllowlist.has(type) && process.env.NEXT_OTEL_VERBOSE !== '1' || options.hideSpan) {
            return fn();
        }
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        if (!spanContext) {
            spanContext = (context == null ? void 0 : context.active()) ?? ROOT_CONTEXT;
        }
        // Check if there's already a root span in the store for this trace
        // We are intentionally not checking whether there is an active context
        // from outside of nextjs to ensure that we can provide the same level
        // of telemetry when using a custom server
        const existingRootSpanId = spanContext.getValue(rootSpanIdKey);
        const isRootSpan = typeof existingRootSpanId !== 'number' || !rootSpanAttributesStore.has(existingRootSpanId);
        const spanId = getSpanId();
        options.attributes = {
            'next.span_name': spanName,
            'next.span_type': type,
            ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.getTracerInstance().startActiveSpan(spanName, options, (span)=>{
                let startTime;
                if (NEXT_OTEL_PERFORMANCE_PREFIX && type && _constants.LogSpanAllowList.has(type)) {
                    startTime = 'performance' in globalThis && 'measure' in performance ? globalThis.performance.now() : undefined;
                }
                let cleanedUp = false;
                const onCleanup = ()=>{
                    if (cleanedUp) return;
                    cleanedUp = true;
                    rootSpanAttributesStore.delete(spanId);
                    if (startTime) {
                        performance.measure(`${NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(type.split('.').pop() || '').replace(/[A-Z]/g, (match)=>'-' + match.toLowerCase())}`, {
                            start: startTime,
                            end: performance.now()
                        });
                    }
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                if (fn.length > 1) {
                    try {
                        return fn(span, (err)=>closeSpanWithError(span, err));
                    } catch (err) {
                        closeSpanWithError(span, err);
                        throw err;
                    } finally{
                        onCleanup();
                    }
                }
                try {
                    const result = fn(span);
                    if ((0, _isthenable.isThenable)(result)) {
                        // If there's error make sure it throws
                        return result.then((res)=>{
                            span.end();
                            // Need to pass down the promise result,
                            // it could be react stream response with error { error, stream }
                            return res;
                        }).catch((err)=>{
                            closeSpanWithError(span, err);
                            throw err;
                        }).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!_constants.NextVanillaSpanAllowlist.has(name) && process.env.NEXT_OTEL_VERBOSE !== '1') {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === 'function' && typeof fn === 'function') {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === 'function') {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, options] = args;
        const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(type, options, spanContext);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
    setRootSpanAttribute(key, value) {
        const spanId = context.active().getValue(rootSpanIdKey);
        const attributes = rootSpanAttributesStore.get(spanId);
        if (attributes && !attributes.has(key)) {
            attributes.set(key, value);
        }
    }
    withSpan(span, fn) {
        const spanContext = trace.setSpan(context.active(), span);
        return context.with(spanContext, fn);
    }
}
const getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})(); //# sourceMappingURL=tracer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/clone-response.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cloneResponse", {
    enumerable: true,
    get: function() {
        return cloneResponse;
    }
});
const noop = ()=>{};
let registry;
if (globalThis.FinalizationRegistry) {
    registry = new FinalizationRegistry((weakRef)=>{
        const stream = weakRef.deref();
        if (stream && !stream.locked) {
            stream.cancel('Response object has been garbage collected').then(noop);
        }
    });
}
function cloneResponse(original) {
    // If the response has no body, then we can just return the original response
    // twice because it's immutable.
    if (!original.body) {
        return [
            original,
            original
        ];
    }
    const [body1, body2] = original.body.tee();
    const cloned1 = new Response(body1, {
        status: original.status,
        statusText: original.statusText,
        headers: original.headers
    });
    Object.defineProperty(cloned1, 'url', {
        value: original.url,
        // How the original response.url behaves
        configurable: true,
        enumerable: true,
        writable: false
    });
    // The Fetch Standard allows users to skip consuming the response body by
    // relying on garbage collection to release connection resources.
    // https://github.com/nodejs/undici?tab=readme-ov-file#garbage-collection
    //
    // To cancel the stream you then need to cancel both resulting branches.
    // Teeing a stream will generally lock it for the duration, preventing other
    // readers from locking it.
    // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/tee
    // cloned2 is stored in a react cache and cloned for subsequent requests.
    // It is the original request, and is is garbage collected by a
    // FinalizationRegistry in Undici, but since we're tee-ing the stream
    // ourselves, we need to cancel clone1's stream (the response returned from
    // our dedupe fetch) when clone1 is reclaimed, otherwise we leak memory.
    if (registry && cloned1.body) {
        registry.register(cloned1, new WeakRef(cloned1.body));
    }
    const cloned2 = new Response(body2, {
        status: original.status,
        statusText: original.statusText,
        headers: original.headers
    });
    Object.defineProperty(cloned2, 'url', {
        value: original.url,
        // How the original response.url behaves
        configurable: true,
        enumerable: true,
        writable: false
    });
    return [
        cloned1,
        cloned2
    ];
} //# sourceMappingURL=clone-response.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/dedupe-fetch.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Based on https://github.com/facebook/react/blob/d4e78c42a94be027b4dc7ed2659a5fddfbf9bd4e/packages/react/src/ReactFetch.js
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDedupeFetch", {
    enumerable: true,
    get: function() {
        return createDedupeFetch;
    }
});
const _react = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)"));
const _cloneresponse = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/clone-response.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const simpleCacheKey = '["GET",[],null,"follow",null,null,null,null]' // generateCacheKey(new Request('https://blank'));
;
// Headers that should not affect deduplication
// traceparent and tracestate are used for distributed tracing and should not affect cache keys
const headersToExcludeInCacheKey = new Set([
    'traceparent',
    'tracestate'
]);
function generateCacheKey(request) {
    // We pick the fields that goes into the key used to dedupe requests.
    // We don't include the `cache` field, because we end up using whatever
    // caching resulted from the first request.
    // Notably we currently don't consider non-standard (or future) options.
    // This might not be safe. TODO: warn for non-standard extensions differing.
    // IF YOU CHANGE THIS UPDATE THE simpleCacheKey ABOVE.
    const filteredHeaders = Array.from(request.headers.entries()).filter(([key])=>!headersToExcludeInCacheKey.has(key.toLowerCase()));
    return JSON.stringify([
        request.method,
        filteredHeaders,
        request.mode,
        request.redirect,
        request.credentials,
        request.referrer,
        request.referrerPolicy,
        request.integrity
    ]);
}
function createDedupeFetch(originalFetch) {
    const getCacheEntries = _react.cache((url)=>[]);
    return function dedupeFetch(resource, options) {
        if (options && options.signal) {
            // If we're passed a signal, then we assume that
            // someone else controls the lifetime of this object and opts out of
            // caching. It's effectively the opt-out mechanism.
            // Ideally we should be able to check this on the Request but
            // it always gets initialized with its own signal so we don't
            // know if it's supposed to override - unless we also override the
            // Request constructor.
            return originalFetch(resource, options);
        }
        // Normalize the Request
        let url;
        let cacheKey;
        if (typeof resource === 'string' && !options) {
            // Fast path.
            cacheKey = simpleCacheKey;
            url = resource;
        } else {
            // Normalize the request.
            // if resource is not a string or a URL (its an instance of Request)
            // then do not instantiate a new Request but instead
            // reuse the request as to not disturb the body in the event it's a ReadableStream.
            const request = typeof resource === 'string' || resource instanceof URL ? new Request(resource, options) : resource;
            if (request.method !== 'GET' && request.method !== 'HEAD' || request.keepalive) {
                // We currently don't dedupe requests that might have side-effects. Those
                // have to be explicitly cached. We assume that the request doesn't have a
                // body if it's GET or HEAD.
                // keepalive gets treated the same as if you passed a custom cache signal.
                return originalFetch(resource, options);
            }
            cacheKey = generateCacheKey(request);
            url = request.url;
        }
        const cacheEntries = getCacheEntries(url);
        for(let i = 0, j = cacheEntries.length; i < j; i += 1){
            const [key, promise] = cacheEntries[i];
            if (key === cacheKey) {
                return promise.then(()=>{
                    const response = cacheEntries[i][2];
                    if (!response) throw Object.defineProperty(new _invarianterror.InvariantError('No cached response'), "__NEXT_ERROR_CODE", {
                        value: "E579",
                        enumerable: false,
                        configurable: true
                    });
                    // We're cloning the response using this utility because there exists
                    // a bug in the undici library around response cloning. See the
                    // following pull request for more details:
                    // https://github.com/vercel/next.js/pull/73274
                    const [cloned1, cloned2] = (0, _cloneresponse.cloneResponse)(response);
                    cacheEntries[i][2] = cloned2;
                    return cloned1;
                });
            }
        }
        // We pass the original arguments here in case normalizing the Request
        // doesn't include all the options in this environment.
        const promise = originalFetch(resource, options);
        const entry = [
            cacheKey,
            promise,
            null
        ];
        cacheEntries.push(entry);
        return promise.then((response)=>{
            // We're cloning the response using this utility because there exists
            // a bug in the undici library around response cloning. See the
            // following pull request for more details:
            // https://github.com/vercel/next.js/pull/73274
            const [cloned1, cloned2] = (0, _cloneresponse.cloneResponse)(response);
            entry[2] = cloned2;
            return cloned1;
        });
    };
} //# sourceMappingURL=dedupe-fetch.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/response-cache/types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    CachedRouteKind: null,
    IncrementalCacheKind: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CachedRouteKind: function() {
        return CachedRouteKind;
    },
    IncrementalCacheKind: function() {
        return IncrementalCacheKind;
    }
});
var CachedRouteKind = /*#__PURE__*/ function(CachedRouteKind) {
    CachedRouteKind["APP_PAGE"] = "APP_PAGE";
    CachedRouteKind["APP_ROUTE"] = "APP_ROUTE";
    CachedRouteKind["PAGES"] = "PAGES";
    CachedRouteKind["FETCH"] = "FETCH";
    CachedRouteKind["REDIRECT"] = "REDIRECT";
    CachedRouteKind["IMAGE"] = "IMAGE";
    return CachedRouteKind;
}({});
var IncrementalCacheKind = /*#__PURE__*/ function(IncrementalCacheKind) {
    IncrementalCacheKind["APP_PAGE"] = "APP_PAGE";
    IncrementalCacheKind["APP_ROUTE"] = "APP_ROUTE";
    IncrementalCacheKind["PAGES"] = "PAGES";
    IncrementalCacheKind["FETCH"] = "FETCH";
    IncrementalCacheKind["IMAGE"] = "IMAGE";
    return IncrementalCacheKind;
}({}); //# sourceMappingURL=types.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/detached-promise.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A `Promise.withResolvers` implementation that exposes the `resolve` and
 * `reject` functions on a `Promise`.
 *
 * @see https://tc39.es/proposal-promise-with-resolvers/
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DetachedPromise", {
    enumerable: true,
    get: function() {
        return DetachedPromise;
    }
});
class DetachedPromise {
    constructor(){
        let resolve;
        let reject;
        // Create the promise and assign the resolvers to the object.
        this.promise = new Promise((res, rej)=>{
            resolve = res;
            reject = rej;
        });
        // We know that resolvers is defined because the Promise constructor runs
        // synchronously.
        this.resolve = resolve;
        this.reject = reject;
    }
} //# sourceMappingURL=detached-promise.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/batcher.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Batcher", {
    enumerable: true,
    get: function() {
        return Batcher;
    }
});
const _detachedpromise = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/detached-promise.js [app-rsc] (ecmascript)");
class Batcher {
    constructor(cacheKeyFn, /**
     * A function that will be called to schedule the wrapped function to be
     * executed. This defaults to a function that will execute the function
     * immediately.
     */ schedulerFn = (fn)=>fn()){
        this.cacheKeyFn = cacheKeyFn;
        this.schedulerFn = schedulerFn;
        this.pending = new Map();
    }
    static create(options) {
        return new Batcher(options == null ? void 0 : options.cacheKeyFn, options == null ? void 0 : options.schedulerFn);
    }
    /**
   * Wraps a function in a promise that will be resolved or rejected only once
   * for a given key. This will allow multiple calls to the function to be
   * made, but only one will be executed at a time. The result of the first
   * call will be returned to all callers.
   *
   * @param key the key to use for the cache
   * @param fn the function to wrap
   * @returns a promise that resolves to the result of the function
   */ async batch(key, fn) {
        const cacheKey = this.cacheKeyFn ? await this.cacheKeyFn(key) : key;
        if (cacheKey === null) {
            return fn({
                resolve: (value)=>Promise.resolve(value),
                key
            });
        }
        const pending = this.pending.get(cacheKey);
        if (pending) return pending;
        const { promise, resolve, reject } = new _detachedpromise.DetachedPromise();
        this.pending.set(cacheKey, promise);
        this.schedulerFn(async ()=>{
            try {
                const result = await fn({
                    resolve,
                    key
                });
                // Resolving a promise multiple times is a no-op, so we can safely
                // resolve all pending promises with the same result.
                resolve(result);
            } catch (err) {
                reject(err);
            } finally{
                this.pending.delete(cacheKey);
            }
        });
        return promise;
    }
} //# sourceMappingURL=batcher.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/lru-cache.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Node in the doubly-linked list used for LRU tracking.
 * Each node represents a cache entry with bidirectional pointers.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LRUCache", {
    enumerable: true,
    get: function() {
        return LRUCache;
    }
});
class LRUNode {
    constructor(key, data, size){
        this.prev = null;
        this.next = null;
        this.key = key;
        this.data = data;
        this.size = size;
    }
}
/**
 * Sentinel node used for head/tail boundaries.
 * These nodes don't contain actual cache data but simplify list operations.
 */ class SentinelNode {
    constructor(){
        this.prev = null;
        this.next = null;
    }
}
class LRUCache {
    constructor(maxSize, calculateSize, onEvict){
        this.cache = new Map();
        this.totalSize = 0;
        this.maxSize = maxSize;
        this.calculateSize = calculateSize;
        this.onEvict = onEvict;
        // Create sentinel nodes to simplify doubly-linked list operations
        // HEAD <-> TAIL (empty list)
        this.head = new SentinelNode();
        this.tail = new SentinelNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    /**
   * Adds a node immediately after the head (marks as most recently used).
   * Used when inserting new items or when an item is accessed.
   * PRECONDITION: node must be disconnected (prev/next should be null)
   */ addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        // head.next is always non-null (points to tail or another node)
        this.head.next.prev = node;
        this.head.next = node;
    }
    /**
   * Removes a node from its current position in the doubly-linked list.
   * Updates the prev/next pointers of adjacent nodes to maintain list integrity.
   * PRECONDITION: node must be connected (prev/next are non-null)
   */ removeNode(node) {
        // Connected nodes always have non-null prev/next
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    /**
   * Moves an existing node to the head position (marks as most recently used).
   * This is the core LRU operation - accessed items become most recent.
   */ moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }
    /**
   * Removes and returns the least recently used node (the one before tail).
   * This is called during eviction when the cache exceeds capacity.
   * PRECONDITION: cache is not empty (ensured by caller)
   */ removeTail() {
        const lastNode = this.tail.prev;
        // tail.prev is always non-null and always LRUNode when cache is not empty
        this.removeNode(lastNode);
        return lastNode;
    }
    /**
   * Sets a key-value pair in the cache.
   * If the key exists, updates the value and moves to head.
   * If new, adds at head and evicts from tail if necessary.
   *
   * Time Complexity:
   * - O(1) for uniform item sizes
   * - O(k) where k is the number of items evicted (can be O(N) for variable sizes)
   */ set(key, value) {
        const size = (this.calculateSize == null ? void 0 : this.calculateSize.call(this, value)) ?? 1;
        if (size > this.maxSize) {
            console.warn('Single item size exceeds maxSize');
            return;
        }
        const existing = this.cache.get(key);
        if (existing) {
            // Update existing node: adjust size and move to head (most recent)
            existing.data = value;
            this.totalSize = this.totalSize - existing.size + size;
            existing.size = size;
            this.moveToHead(existing);
        } else {
            // Add new node at head (most recent position)
            const newNode = new LRUNode(key, value, size);
            this.cache.set(key, newNode);
            this.addToHead(newNode);
            this.totalSize += size;
        }
        // Evict least recently used items until under capacity
        while(this.totalSize > this.maxSize && this.cache.size > 0){
            const tail = this.removeTail();
            this.cache.delete(tail.key);
            this.totalSize -= tail.size;
            this.onEvict == null ? void 0 : this.onEvict.call(this, tail.key, tail.data);
        }
    }
    /**
   * Checks if a key exists in the cache.
   * This is a pure query operation - does NOT update LRU order.
   *
   * Time Complexity: O(1)
   */ has(key) {
        return this.cache.has(key);
    }
    /**
   * Retrieves a value by key and marks it as most recently used.
   * Moving to head maintains the LRU property for future evictions.
   *
   * Time Complexity: O(1)
   */ get(key) {
        const node = this.cache.get(key);
        if (!node) return undefined;
        // Mark as most recently used by moving to head
        this.moveToHead(node);
        return node.data;
    }
    /**
   * Returns an iterator over the cache entries. The order is outputted in the
   * order of most recently used to least recently used.
   */ *[Symbol.iterator]() {
        let current = this.head.next;
        while(current && current !== this.tail){
            // Between head and tail, current is always LRUNode
            const node = current;
            yield [
                node.key,
                node.data
            ];
            current = current.next;
        }
    }
    /**
   * Removes a specific key from the cache.
   * Updates both the hash map and doubly-linked list.
   *
   * Note: This is an explicit removal and does NOT trigger the `onEvict`
   * callback. Use this for intentional deletions where eviction tracking
   * is not needed.
   *
   * Time Complexity: O(1)
   */ remove(key) {
        const node = this.cache.get(key);
        if (!node) return;
        this.removeNode(node);
        this.cache.delete(key);
        this.totalSize -= node.size;
    }
    /**
   * Returns the number of items in the cache.
   */ get size() {
        return this.cache.size;
    }
    /**
   * Returns the current total size of all cached items.
   * This uses the custom size calculation if provided.
   */ get currentSize() {
        return this.totalSize;
    }
} //# sourceMappingURL=lru-cache.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/picocolors.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// ISC License
// Copyright (c) 2021 Alexey Raspopov, Kostiantyn Denysov, Anton Verinov
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
// https://github.com/alexeyraspopov/picocolors/blob/b6261487e7b81aaab2440e397a356732cad9e342/picocolors.js#L1
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    bgBlack: null,
    bgBlue: null,
    bgCyan: null,
    bgGreen: null,
    bgMagenta: null,
    bgRed: null,
    bgWhite: null,
    bgYellow: null,
    black: null,
    blue: null,
    bold: null,
    cyan: null,
    dim: null,
    gray: null,
    green: null,
    hidden: null,
    inverse: null,
    italic: null,
    magenta: null,
    purple: null,
    red: null,
    reset: null,
    strikethrough: null,
    underline: null,
    white: null,
    yellow: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    bgBlack: function() {
        return bgBlack;
    },
    bgBlue: function() {
        return bgBlue;
    },
    bgCyan: function() {
        return bgCyan;
    },
    bgGreen: function() {
        return bgGreen;
    },
    bgMagenta: function() {
        return bgMagenta;
    },
    bgRed: function() {
        return bgRed;
    },
    bgWhite: function() {
        return bgWhite;
    },
    bgYellow: function() {
        return bgYellow;
    },
    black: function() {
        return black;
    },
    blue: function() {
        return blue;
    },
    bold: function() {
        return bold;
    },
    cyan: function() {
        return cyan;
    },
    dim: function() {
        return dim;
    },
    gray: function() {
        return gray;
    },
    green: function() {
        return green;
    },
    hidden: function() {
        return hidden;
    },
    inverse: function() {
        return inverse;
    },
    italic: function() {
        return italic;
    },
    magenta: function() {
        return magenta;
    },
    purple: function() {
        return purple;
    },
    red: function() {
        return red;
    },
    reset: function() {
        return reset;
    },
    strikethrough: function() {
        return strikethrough;
    },
    underline: function() {
        return underline;
    },
    white: function() {
        return white;
    },
    yellow: function() {
        return yellow;
    }
});
var _globalThis;
const { env, stdout } = ((_globalThis = globalThis) == null ? void 0 : _globalThis.process) ?? {};
const enabled = env && !env.NO_COLOR && (env.FORCE_COLOR || (stdout == null ? void 0 : stdout.isTTY) && !env.CI && env.TERM !== 'dumb');
const replaceClose = (str, close, replace, index)=>{
    const start = str.substring(0, index) + replace;
    const end = str.substring(index + close.length);
    const nextIndex = end.indexOf(close);
    return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
};
const formatter = (open, close, replace = open)=>{
    if (!enabled) return String;
    return (input)=>{
        const string = '' + input;
        const index = string.indexOf(close, open.length);
        return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
};
const reset = enabled ? (s)=>`\x1b[0m${s}\x1b[0m` : String;
const bold = formatter('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m');
const dim = formatter('\x1b[2m', '\x1b[22m', '\x1b[22m\x1b[2m');
const italic = formatter('\x1b[3m', '\x1b[23m');
const underline = formatter('\x1b[4m', '\x1b[24m');
const inverse = formatter('\x1b[7m', '\x1b[27m');
const hidden = formatter('\x1b[8m', '\x1b[28m');
const strikethrough = formatter('\x1b[9m', '\x1b[29m');
const black = formatter('\x1b[30m', '\x1b[39m');
const red = formatter('\x1b[31m', '\x1b[39m');
const green = formatter('\x1b[32m', '\x1b[39m');
const yellow = formatter('\x1b[33m', '\x1b[39m');
const blue = formatter('\x1b[34m', '\x1b[39m');
const magenta = formatter('\x1b[35m', '\x1b[39m');
const purple = formatter('\x1b[38;2;173;127;168m', '\x1b[39m');
const cyan = formatter('\x1b[36m', '\x1b[39m');
const white = formatter('\x1b[37m', '\x1b[39m');
const gray = formatter('\x1b[90m', '\x1b[39m');
const bgBlack = formatter('\x1b[40m', '\x1b[49m');
const bgRed = formatter('\x1b[41m', '\x1b[49m');
const bgGreen = formatter('\x1b[42m', '\x1b[49m');
const bgYellow = formatter('\x1b[43m', '\x1b[49m');
const bgBlue = formatter('\x1b[44m', '\x1b[49m');
const bgMagenta = formatter('\x1b[45m', '\x1b[49m');
const bgCyan = formatter('\x1b[46m', '\x1b[49m');
const bgWhite = formatter('\x1b[47m', '\x1b[49m'); //# sourceMappingURL=picocolors.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/output/log.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    bootstrap: null,
    error: null,
    errorOnce: null,
    event: null,
    info: null,
    prefixes: null,
    ready: null,
    trace: null,
    wait: null,
    warn: null,
    warnOnce: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    bootstrap: function() {
        return bootstrap;
    },
    error: function() {
        return error;
    },
    errorOnce: function() {
        return errorOnce;
    },
    event: function() {
        return event;
    },
    info: function() {
        return info;
    },
    prefixes: function() {
        return prefixes;
    },
    ready: function() {
        return ready;
    },
    trace: function() {
        return trace;
    },
    wait: function() {
        return wait;
    },
    warn: function() {
        return warn;
    },
    warnOnce: function() {
        return warnOnce;
    }
});
const _picocolors = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/picocolors.js [app-rsc] (ecmascript)");
const _lrucache = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/lru-cache.js [app-rsc] (ecmascript)");
const prefixes = {
    wait: (0, _picocolors.white)((0, _picocolors.bold)('○')),
    error: (0, _picocolors.red)((0, _picocolors.bold)('⨯')),
    warn: (0, _picocolors.yellow)((0, _picocolors.bold)('⚠')),
    ready: '▲',
    info: (0, _picocolors.white)((0, _picocolors.bold)(' ')),
    event: (0, _picocolors.green)((0, _picocolors.bold)('✓')),
    trace: (0, _picocolors.magenta)((0, _picocolors.bold)('»'))
};
const LOGGING_METHOD = {
    log: 'log',
    warn: 'warn',
    error: 'error'
};
function prefixedLog(prefixType, ...message) {
    if ((message[0] === '' || message[0] === undefined) && message.length === 1) {
        message.shift();
    }
    const consoleMethod = prefixType in LOGGING_METHOD ? LOGGING_METHOD[prefixType] : 'log';
    const prefix = prefixes[prefixType];
    // If there's no message, don't print the prefix but a new line
    if (message.length === 0) {
        console[consoleMethod]('');
    } else {
        // Ensure if there's ANSI escape codes it's concatenated into one string.
        // Chrome DevTool can only handle color if it's in one string.
        if (message.length === 1 && typeof message[0] === 'string') {
            console[consoleMethod](prefix + ' ' + message[0]);
        } else {
            console[consoleMethod](prefix, ...message);
        }
    }
}
function bootstrap(message) {
    console.log(message);
}
function wait(...message) {
    prefixedLog('wait', ...message);
}
function error(...message) {
    prefixedLog('error', ...message);
}
function warn(...message) {
    prefixedLog('warn', ...message);
}
function ready(...message) {
    prefixedLog('ready', ...message);
}
function info(...message) {
    prefixedLog('info', ...message);
}
function event(...message) {
    prefixedLog('event', ...message);
}
function trace(...message) {
    prefixedLog('trace', ...message);
}
const warnOnceCache = new _lrucache.LRUCache(10000, (value)=>value.length);
function warnOnce(...message) {
    const key = message.join(' ');
    if (!warnOnceCache.has(key)) {
        warnOnceCache.set(key, key);
        warn(...message);
    }
}
const errorOnceCache = new _lrucache.LRUCache(10000, (value)=>value.length);
function errorOnce(...message) {
    const key = message.join(' ');
    if (!errorOnceCache.has(key)) {
        errorOnceCache.set(key, key);
        error(...message);
    }
} //# sourceMappingURL=log.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/stream-utils/encoded-tags.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ENCODED_TAGS", {
    enumerable: true,
    get: function() {
        return ENCODED_TAGS;
    }
});
const ENCODED_TAGS = {
    // opening tags do not have the closing `>` since they can contain other attributes such as `<body className=''>`
    OPENING: {
        // <html
        HTML: new Uint8Array([
            60,
            104,
            116,
            109,
            108
        ]),
        // <body
        BODY: new Uint8Array([
            60,
            98,
            111,
            100,
            121
        ])
    },
    CLOSED: {
        // </head>
        HEAD: new Uint8Array([
            60,
            47,
            104,
            101,
            97,
            100,
            62
        ]),
        // </body>
        BODY: new Uint8Array([
            60,
            47,
            98,
            111,
            100,
            121,
            62
        ]),
        // </html>
        HTML: new Uint8Array([
            60,
            47,
            104,
            116,
            109,
            108,
            62
        ]),
        // </body></html>
        BODY_AND_HTML: new Uint8Array([
            60,
            47,
            98,
            111,
            100,
            121,
            62,
            60,
            47,
            104,
            116,
            109,
            108,
            62
        ])
    },
    META: {
        // Only the match the prefix cause the suffix can be different wether it's xml compatible or not ">" or "/>"
        // <meta name="«nxt-icon»"
        // This is a special mark that will be replaced by the icon insertion script tag.
        ICON_MARK: new Uint8Array([
            60,
            109,
            101,
            116,
            97,
            32,
            110,
            97,
            109,
            101,
            61,
            34,
            194,
            171,
            110,
            120,
            116,
            45,
            105,
            99,
            111,
            110,
            194,
            187,
            34
        ])
    }
}; //# sourceMappingURL=encoded-tags.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/stream-utils/uint8array-helpers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Find the starting index of Uint8Array `b` within Uint8Array `a`.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    indexOfUint8Array: null,
    isEquivalentUint8Arrays: null,
    removeFromUint8Array: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    indexOfUint8Array: function() {
        return indexOfUint8Array;
    },
    isEquivalentUint8Arrays: function() {
        return isEquivalentUint8Arrays;
    },
    removeFromUint8Array: function() {
        return removeFromUint8Array;
    }
});
function indexOfUint8Array(a, b) {
    if (b.length === 0) return 0;
    if (a.length === 0 || b.length > a.length) return -1;
    // start iterating through `a`
    for(let i = 0; i <= a.length - b.length; i++){
        let completeMatch = true;
        // from index `i`, iterate through `b` and check for mismatch
        for(let j = 0; j < b.length; j++){
            // if the values do not match, then this isn't a complete match, exit `b` iteration early and iterate to next index of `a`.
            if (a[i + j] !== b[j]) {
                completeMatch = false;
                break;
            }
        }
        if (completeMatch) {
            return i;
        }
    }
    return -1;
}
function isEquivalentUint8Arrays(a, b) {
    if (a.length !== b.length) return false;
    for(let i = 0; i < a.length; i++){
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function removeFromUint8Array(a, b) {
    const tagIndex = indexOfUint8Array(a, b);
    if (tagIndex === 0) return a.subarray(b.length);
    if (tagIndex > -1) {
        const removed = new Uint8Array(a.length - b.length);
        removed.set(a.slice(0, tagIndex));
        removed.set(a.slice(tagIndex + b.length), tagIndex);
        return removed;
    } else {
        return a;
    }
} //# sourceMappingURL=uint8array-helpers.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/errors/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MISSING_ROOT_TAGS_ERROR", {
    enumerable: true,
    get: function() {
        return MISSING_ROOT_TAGS_ERROR;
    }
});
const MISSING_ROOT_TAGS_ERROR = 'NEXT_MISSING_ROOT_TAGS';
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/segment-cache/output-export-prefetch-encoding.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// In output: export mode, the build id is added to the start of the HTML
// document, directly after the doctype declaration. During a prefetch, the
// client performs a range request to get the build id, so it can check whether
// the target page belongs to the same build.
//
// The first 64 bytes of the document are requested. The exact number isn't
// too important; it must be larger than the build id + doctype + closing and
// ending comment markers, but it doesn't need to match the end of the
// comment exactly.
//
// Build ids are 21 bytes long in the default implementation, though this
// can be overridden in the Next.js config. For the purposes of this check,
// it's OK to only match the start of the id, so we'll truncate it if exceeds
// a certain length.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "insertBuildIdComment", {
    enumerable: true,
    get: function() {
        return insertBuildIdComment;
    }
});
const DOCTYPE_PREFIX = '<!DOCTYPE html>' // 15 bytes
;
const MAX_BUILD_ID_LENGTH = 24;
function escapeBuildId(buildId) {
    // If the build id is longer than the given limit, it's OK for our purposes
    // to only match the beginning.
    const truncated = buildId.slice(0, MAX_BUILD_ID_LENGTH);
    // Replace hyphens with underscores so it doesn't break the HTML comment.
    // (Unlikely, but if this did happen it would break the whole document.)
    return truncated.replace(/-/g, '_');
}
function insertBuildIdComment(originalHtml, buildId) {
    if (buildId.includes('-->') || // React always inserts a doctype at the start of the document. Skip if it
    // isn't present. Shouldn't happen; suggests an issue elsewhere.
    !originalHtml.startsWith(DOCTYPE_PREFIX)) {
        // Return the original HTML unchanged. This means the document will not
        // be prefetched.
        // TODO: The build id comment is currently only used during prefetches, but
        // if we eventually use this mechanism for regular navigations, we may need
        // to error during build if we fail to insert it for some reason.
        return originalHtml;
    }
    // The comment must be inserted after the doctype.
    return originalHtml.replace(DOCTYPE_PREFIX, DOCTYPE_PREFIX + '<!--' + escapeBuildId(buildId) + '-->');
} //# sourceMappingURL=output-export-prefetch-encoding.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/cache-busting-search-param.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCacheBustingSearchParam", {
    enumerable: true,
    get: function() {
        return computeCacheBustingSearchParam;
    }
});
const _hash = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/hash.js [app-rsc] (ecmascript)");
function computeCacheBustingSearchParam(prefetchHeader, segmentPrefetchHeader, stateTreeHeader, nextUrlHeader) {
    if ((prefetchHeader === undefined || prefetchHeader === '0') && segmentPrefetchHeader === undefined && stateTreeHeader === undefined && nextUrlHeader === undefined) {
        return '';
    }
    return (0, _hash.hexHash)([
        prefetchHeader || '0',
        segmentPrefetchHeader || '0',
        stateTreeHeader || '0',
        nextUrlHeader || '0'
    ].join(','));
} //# sourceMappingURL=cache-busting-search-param.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/stream-utils/node-web-streams-helper.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    chainStreams: null,
    continueDynamicHTMLResume: null,
    continueDynamicPrerender: null,
    continueFizzStream: null,
    continueStaticFallbackPrerender: null,
    continueStaticPrerender: null,
    createBufferedTransformStream: null,
    createDocumentClosingStream: null,
    createRootLayoutValidatorStream: null,
    renderToInitialFizzStream: null,
    streamFromBuffer: null,
    streamFromString: null,
    streamToBuffer: null,
    streamToString: null,
    streamToUint8Array: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    chainStreams: function() {
        return chainStreams;
    },
    continueDynamicHTMLResume: function() {
        return continueDynamicHTMLResume;
    },
    continueDynamicPrerender: function() {
        return continueDynamicPrerender;
    },
    continueFizzStream: function() {
        return continueFizzStream;
    },
    continueStaticFallbackPrerender: function() {
        return continueStaticFallbackPrerender;
    },
    continueStaticPrerender: function() {
        return continueStaticPrerender;
    },
    createBufferedTransformStream: function() {
        return createBufferedTransformStream;
    },
    createDocumentClosingStream: function() {
        return createDocumentClosingStream;
    },
    createRootLayoutValidatorStream: function() {
        return createRootLayoutValidatorStream;
    },
    renderToInitialFizzStream: function() {
        return renderToInitialFizzStream;
    },
    streamFromBuffer: function() {
        return streamFromBuffer;
    },
    streamFromString: function() {
        return streamFromString;
    },
    streamToBuffer: function() {
        return streamToBuffer;
    },
    streamToString: function() {
        return streamToString;
    },
    streamToUint8Array: function() {
        return streamToUint8Array;
    }
});
const _tracer = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)");
const _detachedpromise = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/detached-promise.js [app-rsc] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/scheduler.js [app-rsc] (ecmascript)");
const _encodedtags = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/stream-utils/encoded-tags.js [app-rsc] (ecmascript)");
const _uint8arrayhelpers = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/stream-utils/uint8array-helpers.js [app-rsc] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/errors/constants.js [app-rsc] (ecmascript)");
const _outputexportprefetchencoding = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/segment-cache/output-export-prefetch-encoding.js [app-rsc] (ecmascript)");
const _approuterheaders = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/components/app-router-headers.js [app-rsc] (ecmascript)");
const _cachebustingsearchparam = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/cache-busting-search-param.js [app-rsc] (ecmascript)");
function voidCatch() {
// this catcher is designed to be used with pipeTo where we expect the underlying
// pipe implementation to forward errors but we don't want the pipeTo promise to reject
// and be unhandled
}
// We can share the same encoder instance everywhere
// Notably we cannot do the same for TextDecoder because it is stateful
// when handling streaming data
const encoder = new TextEncoder();
function chainStreams(...streams) {
    // If we have no streams, return an empty stream. This behavior is
    // intentional as we're now providing the `RenderResult.EMPTY` value.
    if (streams.length === 0) {
        return new ReadableStream({
            start (controller) {
                controller.close();
            }
        });
    }
    // If we only have 1 stream we fast path it by returning just this stream
    if (streams.length === 1) {
        return streams[0];
    }
    const { readable, writable } = new TransformStream();
    // We always initiate pipeTo immediately. We know we have at least 2 streams
    // so we need to avoid closing the writable when this one finishes.
    let promise = streams[0].pipeTo(writable, {
        preventClose: true
    });
    let i = 1;
    for(; i < streams.length - 1; i++){
        const nextStream = streams[i];
        promise = promise.then(()=>nextStream.pipeTo(writable, {
                preventClose: true
            }));
    }
    // We can omit the length check because we halted before the last stream and there
    // is at least two streams so the lastStream here will always be defined
    const lastStream = streams[i];
    promise = promise.then(()=>lastStream.pipeTo(writable));
    // Catch any errors from the streams and ignore them, they will be handled
    // by whatever is consuming the readable stream.
    promise.catch(voidCatch);
    return readable;
}
function streamFromString(str) {
    return new ReadableStream({
        start (controller) {
            controller.enqueue(encoder.encode(str));
            controller.close();
        }
    });
}
function streamFromBuffer(chunk) {
    return new ReadableStream({
        start (controller) {
            controller.enqueue(chunk);
            controller.close();
        }
    });
}
async function streamToChunks(stream) {
    const reader = stream.getReader();
    const chunks = [];
    while(true){
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }
    return chunks;
}
function concatUint8Arrays(chunks) {
    const totalLength = chunks.reduce((sum, chunk)=>sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks){
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}
async function streamToUint8Array(stream) {
    return concatUint8Arrays(await streamToChunks(stream));
}
async function streamToBuffer(stream) {
    return Buffer.concat(await streamToChunks(stream));
}
async function streamToString(stream, signal) {
    const decoder = new TextDecoder('utf-8', {
        fatal: true
    });
    let string = '';
    for await (const chunk of stream){
        if (signal == null ? void 0 : signal.aborted) {
            return string;
        }
        string += decoder.decode(chunk, {
            stream: true
        });
    }
    string += decoder.decode();
    return string;
}
function createBufferedTransformStream(options = {}) {
    const { maxBufferByteLength = Infinity } = options;
    let bufferedChunks = [];
    let bufferByteLength = 0;
    let pending;
    const flush = (controller)=>{
        try {
            if (bufferedChunks.length === 0) {
                return;
            }
            const chunk = new Uint8Array(bufferByteLength);
            let copiedBytes = 0;
            for(let i = 0; i < bufferedChunks.length; i++){
                const bufferedChunk = bufferedChunks[i];
                chunk.set(bufferedChunk, copiedBytes);
                copiedBytes += bufferedChunk.byteLength;
            }
            // We just wrote all the buffered chunks so we need to reset the bufferedChunks array
            // and our bufferByteLength to prepare for the next round of buffered chunks
            bufferedChunks.length = 0;
            bufferByteLength = 0;
            controller.enqueue(chunk);
        } catch  {
        // If an error occurs while enqueuing, it can't be due to this
        // transformer. It's most likely caused by the controller having been
        // errored (for example, if the stream was cancelled).
        }
    };
    const scheduleFlush = (controller)=>{
        if (pending) {
            return;
        }
        const detached = new _detachedpromise.DetachedPromise();
        pending = detached;
        (0, _scheduler.scheduleImmediate)(()=>{
            try {
                flush(controller);
            } finally{
                pending = undefined;
                detached.resolve();
            }
        });
    };
    return new TransformStream({
        transform (chunk, controller) {
            // Combine the previous buffer with the new chunk.
            bufferedChunks.push(chunk);
            bufferByteLength += chunk.byteLength;
            if (bufferByteLength >= maxBufferByteLength) {
                flush(controller);
            } else {
                scheduleFlush(controller);
            }
        },
        flush () {
            return pending == null ? void 0 : pending.promise;
        }
    });
}
function createPrefetchCommentStream(isBuildTimePrerendering, buildId) {
    // Insert an extra comment at the beginning of the HTML document. This must
    // come after the DOCTYPE, which is inserted by React.
    //
    // The first chunk sent by React will contain the doctype. After that, we can
    // pass through the rest of the chunks as-is.
    let didTransformFirstChunk = false;
    return new TransformStream({
        transform (chunk, controller) {
            if (isBuildTimePrerendering && !didTransformFirstChunk) {
                didTransformFirstChunk = true;
                const decoder = new TextDecoder('utf-8', {
                    fatal: true
                });
                const chunkStr = decoder.decode(chunk, {
                    stream: true
                });
                const updatedChunkStr = (0, _outputexportprefetchencoding.insertBuildIdComment)(chunkStr, buildId);
                controller.enqueue(encoder.encode(updatedChunkStr));
                return;
            }
            controller.enqueue(chunk);
        }
    });
}
function renderToInitialFizzStream({ ReactDOMServer, element, streamOptions }) {
    return (0, _tracer.getTracer)().trace(_constants.AppRenderSpan.renderToReadableStream, async ()=>ReactDOMServer.renderToReadableStream(element, streamOptions));
}
function createMetadataTransformStream(insert) {
    let chunkIndex = -1;
    let isMarkRemoved = false;
    return new TransformStream({
        async transform (chunk, controller) {
            let iconMarkIndex = -1;
            let closedHeadIndex = -1;
            chunkIndex++;
            if (isMarkRemoved) {
                controller.enqueue(chunk);
                return;
            }
            let iconMarkLength = 0;
            // Only search for the closed head tag once
            if (iconMarkIndex === -1) {
                iconMarkIndex = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.META.ICON_MARK);
                if (iconMarkIndex === -1) {
                    controller.enqueue(chunk);
                    return;
                } else {
                    // When we found the `<meta name="«nxt-icon»"` tag prefix, we will remove it from the chunk.
                    // Its close tag could either be `/>` or `>`, checking the next char to ensure we cover both cases.
                    iconMarkLength = _encodedtags.ENCODED_TAGS.META.ICON_MARK.length;
                    // Check if next char is /, this is for xml mode.
                    if (chunk[iconMarkIndex + iconMarkLength] === 47) {
                        iconMarkLength += 2;
                    } else {
                        // The last char is `>`
                        iconMarkLength++;
                    }
                }
            }
            // Check if icon mark is inside <head> tag in the first chunk.
            if (chunkIndex === 0) {
                closedHeadIndex = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HEAD);
                if (iconMarkIndex !== -1) {
                    // The mark icon is located in the 1st chunk before the head tag.
                    // We do not need to insert the script tag in this case because it's in the head.
                    // Just remove the icon mark from the chunk.
                    if (iconMarkIndex < closedHeadIndex) {
                        const replaced = new Uint8Array(chunk.length - iconMarkLength);
                        // Remove the icon mark from the chunk.
                        replaced.set(chunk.subarray(0, iconMarkIndex));
                        replaced.set(chunk.subarray(iconMarkIndex + iconMarkLength), iconMarkIndex);
                        chunk = replaced;
                    } else {
                        // The icon mark is after the head tag, replace and insert the script tag at that position.
                        const insertion = await insert();
                        const encodedInsertion = encoder.encode(insertion);
                        const insertionLength = encodedInsertion.length;
                        const replaced = new Uint8Array(chunk.length - iconMarkLength + insertionLength);
                        replaced.set(chunk.subarray(0, iconMarkIndex));
                        replaced.set(encodedInsertion, iconMarkIndex);
                        replaced.set(chunk.subarray(iconMarkIndex + iconMarkLength), iconMarkIndex + insertionLength);
                        chunk = replaced;
                    }
                    isMarkRemoved = true;
                }
            // If there's no icon mark located, it will be handled later when if present in the following chunks.
            } else {
                // When it's appeared in the following chunks, we'll need to
                // remove the mark and then insert the script tag at that position.
                const insertion = await insert();
                const encodedInsertion = encoder.encode(insertion);
                const insertionLength = encodedInsertion.length;
                // Replace the icon mark with the hoist script or empty string.
                const replaced = new Uint8Array(chunk.length - iconMarkLength + insertionLength);
                // Set the first part of the chunk, before the icon mark.
                replaced.set(chunk.subarray(0, iconMarkIndex));
                // Set the insertion after the icon mark.
                replaced.set(encodedInsertion, iconMarkIndex);
                // Set the rest of the chunk after the icon mark.
                replaced.set(chunk.subarray(iconMarkIndex + iconMarkLength), iconMarkIndex + insertionLength);
                chunk = replaced;
                isMarkRemoved = true;
            }
            controller.enqueue(chunk);
        }
    });
}
function createHeadInsertionTransformStream(insert) {
    let inserted = false;
    // We need to track if this transform saw any bytes because if it didn't
    // we won't want to insert any server HTML at all
    let hasBytes = false;
    return new TransformStream({
        async transform (chunk, controller) {
            hasBytes = true;
            const insertion = await insert();
            if (inserted) {
                if (insertion) {
                    const encodedInsertion = encoder.encode(insertion);
                    controller.enqueue(encodedInsertion);
                }
                controller.enqueue(chunk);
            } else {
                // TODO (@Ethan-Arrowood): Replace the generic `indexOfUint8Array` method with something finely tuned for the subset of things actually being checked for.
                const index = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HEAD);
                // In fully static rendering or non PPR rendering cases:
                // `/head>` will always be found in the chunk in first chunk rendering.
                if (index !== -1) {
                    if (insertion) {
                        const encodedInsertion = encoder.encode(insertion);
                        // Get the total count of the bytes in the chunk and the insertion
                        // e.g.
                        // chunk = <head><meta charset="utf-8"></head>
                        // insertion = <script>...</script>
                        // output = <head><meta charset="utf-8"> [ <script>...</script> ] </head>
                        const insertedHeadContent = new Uint8Array(chunk.length + encodedInsertion.length);
                        // Append the first part of the chunk, before the head tag
                        insertedHeadContent.set(chunk.slice(0, index));
                        // Append the server inserted content
                        insertedHeadContent.set(encodedInsertion, index);
                        // Append the rest of the chunk
                        insertedHeadContent.set(chunk.slice(index), index + encodedInsertion.length);
                        controller.enqueue(insertedHeadContent);
                    } else {
                        controller.enqueue(chunk);
                    }
                    inserted = true;
                } else {
                    // This will happens in PPR rendering during next start, when the page is partially rendered.
                    // When the page resumes, the head tag will be found in the middle of the chunk.
                    // Where we just need to append the insertion and chunk to the current stream.
                    // e.g.
                    // PPR-static: <head>...</head><body> [ resume content ] </body>
                    // PPR-resume: [ insertion ] [ rest content ]
                    if (insertion) {
                        controller.enqueue(encoder.encode(insertion));
                    }
                    controller.enqueue(chunk);
                    inserted = true;
                }
            }
        },
        async flush (controller) {
            // Check before closing if there's anything remaining to insert.
            if (hasBytes) {
                const insertion = await insert();
                if (insertion) {
                    controller.enqueue(encoder.encode(insertion));
                }
            }
        }
    });
}
function createClientResumeScriptInsertionTransformStream() {
    const segmentPath = '/_full';
    const cacheBustingHeader = (0, _cachebustingsearchparam.computeCacheBustingSearchParam)('1', '/_full', undefined, undefined //       headers[NEXT_URL]
    );
    const searchStr = `${_approuterheaders.NEXT_RSC_UNION_QUERY}=${cacheBustingHeader}`;
    const NEXT_CLIENT_RESUME_SCRIPT = `<script>__NEXT_CLIENT_RESUME=fetch(location.pathname+'?${searchStr}',{credentials:'same-origin',headers:{'${_approuterheaders.RSC_HEADER}': '1','${_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER}': '1','${_approuterheaders.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER}': '${segmentPath}'}})</script>`;
    let didAlreadyInsert = false;
    return new TransformStream({
        transform (chunk, controller) {
            if (didAlreadyInsert) {
                // Already inserted the script into the head. Pass through.
                controller.enqueue(chunk);
                return;
            }
            // TODO (@Ethan-Arrowood): Replace the generic `indexOfUint8Array` method with something finely tuned for the subset of things actually being checked for.
            const headClosingTagIndex = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HEAD);
            if (headClosingTagIndex === -1) {
                // In fully static rendering or non PPR rendering cases:
                // `/head>` will always be found in the chunk in first chunk rendering.
                controller.enqueue(chunk);
                return;
            }
            const encodedInsertion = encoder.encode(NEXT_CLIENT_RESUME_SCRIPT);
            // Get the total count of the bytes in the chunk and the insertion
            // e.g.
            // chunk = <head><meta charset="utf-8"></head>
            // insertion = <script>...</script>
            // output = <head><meta charset="utf-8"> [ <script>...</script> ] </head>
            const insertedHeadContent = new Uint8Array(chunk.length + encodedInsertion.length);
            // Append the first part of the chunk, before the head tag
            insertedHeadContent.set(chunk.slice(0, headClosingTagIndex));
            // Append the server inserted content
            insertedHeadContent.set(encodedInsertion, headClosingTagIndex);
            // Append the rest of the chunk
            insertedHeadContent.set(chunk.slice(headClosingTagIndex), headClosingTagIndex + encodedInsertion.length);
            controller.enqueue(insertedHeadContent);
            didAlreadyInsert = true;
        }
    });
}
// Suffix after main body content - scripts before </body>,
// but wait for the major chunks to be enqueued.
function createDeferredSuffixStream(suffix) {
    let flushed = false;
    let pending;
    const flush = (controller)=>{
        const detached = new _detachedpromise.DetachedPromise();
        pending = detached;
        (0, _scheduler.scheduleImmediate)(()=>{
            try {
                controller.enqueue(encoder.encode(suffix));
            } catch  {
            // If an error occurs while enqueuing it can't be due to this
            // transformers fault. It's likely due to the controller being
            // errored due to the stream being cancelled.
            } finally{
                pending = undefined;
                detached.resolve();
            }
        });
    };
    return new TransformStream({
        transform (chunk, controller) {
            controller.enqueue(chunk);
            // If we've already flushed, we're done.
            if (flushed) return;
            // Schedule the flush to happen.
            flushed = true;
            flush(controller);
        },
        flush (controller) {
            if (pending) return pending.promise;
            if (flushed) return;
            // Flush now.
            controller.enqueue(encoder.encode(suffix));
        }
    });
}
function createFlightDataInjectionTransformStream(stream, delayDataUntilFirstHtmlChunk) {
    let htmlStreamFinished = false;
    let pull = null;
    let donePulling = false;
    function startOrContinuePulling(controller) {
        if (!pull) {
            pull = startPulling(controller);
        }
        return pull;
    }
    async function startPulling(controller) {
        const reader = stream.getReader();
        if (delayDataUntilFirstHtmlChunk) {
            // NOTE: streaming flush
            // We are buffering here for the inlined data stream because the
            // "shell" stream might be chunkenized again by the underlying stream
            // implementation, e.g. with a specific high-water mark. To ensure it's
            // the safe timing to pipe the data stream, this extra tick is
            // necessary.
            // We don't start reading until we've left the current Task to ensure
            // that it's inserted after flushing the shell. Note that this implementation
            // might get stale if impl details of Fizz change in the future.
            await (0, _scheduler.atLeastOneTask)();
        }
        try {
            while(true){
                const { done, value } = await reader.read();
                if (done) {
                    donePulling = true;
                    return;
                }
                // We want to prioritize HTML over RSC data.
                // The SSR render is based on the same RSC stream, so when we get a new RSC chunk,
                // we're likely to produce an HTML chunk as well, so give it a chance to flush first.
                if (!delayDataUntilFirstHtmlChunk && !htmlStreamFinished) {
                    await (0, _scheduler.atLeastOneTask)();
                }
                controller.enqueue(value);
            }
        } catch (err) {
            controller.error(err);
        }
    }
    return new TransformStream({
        start (controller) {
            if (!delayDataUntilFirstHtmlChunk) {
                startOrContinuePulling(controller);
            }
        },
        transform (chunk, controller) {
            controller.enqueue(chunk);
            // Start the streaming if it hasn't already been started yet.
            if (delayDataUntilFirstHtmlChunk) {
                startOrContinuePulling(controller);
            }
        },
        flush (controller) {
            htmlStreamFinished = true;
            if (donePulling) {
                return;
            }
            return startOrContinuePulling(controller);
        }
    });
}
const CLOSE_TAG = '</body></html>';
/**
 * This transform stream moves the suffix to the end of the stream, so results
 * like `</body></html><script>...</script>` will be transformed to
 * `<script>...</script></body></html>`.
 */ function createMoveSuffixStream() {
    let foundSuffix = false;
    return new TransformStream({
        transform (chunk, controller) {
            if (foundSuffix) {
                return controller.enqueue(chunk);
            }
            const index = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML);
            if (index > -1) {
                foundSuffix = true;
                // If the whole chunk is the suffix, then don't write anything, it will
                // be written in the flush.
                if (chunk.length === _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length) {
                    return;
                }
                // Write out the part before the suffix.
                const before = chunk.slice(0, index);
                controller.enqueue(before);
                // In the case where the suffix is in the middle of the chunk, we need
                // to split the chunk into two parts.
                if (chunk.length > _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length + index) {
                    // Write out the part after the suffix.
                    const after = chunk.slice(index + _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length);
                    controller.enqueue(after);
                }
            } else {
                controller.enqueue(chunk);
            }
        },
        flush (controller) {
            // Even if we didn't find the suffix, the HTML is not valid if we don't
            // add it, so insert it at the end.
            controller.enqueue(_encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML);
        }
    });
}
function createStripDocumentClosingTagsTransform() {
    return new TransformStream({
        transform (chunk, controller) {
            // We rely on the assumption that chunks will never break across a code unit.
            // This is reasonable because we currently concat all of React's output from a single
            // flush into one chunk before streaming it forward which means the chunk will represent
            // a single coherent utf-8 string. This is not safe to use if we change our streaming to no
            // longer do this large buffered chunk
            if ((0, _uint8arrayhelpers.isEquivalentUint8Arrays)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML) || (0, _uint8arrayhelpers.isEquivalentUint8Arrays)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.BODY) || (0, _uint8arrayhelpers.isEquivalentUint8Arrays)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HTML)) {
                // the entire chunk is the closing tags; return without enqueueing anything.
                return;
            }
            // We assume these tags will go at together at the end of the document and that
            // they won't appear anywhere else in the document. This is not really a safe assumption
            // but until we revamp our streaming infra this is a performant way to string the tags
            chunk = (0, _uint8arrayhelpers.removeFromUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.BODY);
            chunk = (0, _uint8arrayhelpers.removeFromUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HTML);
            controller.enqueue(chunk);
        }
    });
}
function createRootLayoutValidatorStream() {
    let foundHtml = false;
    let foundBody = false;
    return new TransformStream({
        async transform (chunk, controller) {
            // Peek into the streamed chunk to see if the tags are present.
            if (!foundHtml && (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.OPENING.HTML) > -1) {
                foundHtml = true;
            }
            if (!foundBody && (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.OPENING.BODY) > -1) {
                foundBody = true;
            }
            controller.enqueue(chunk);
        },
        flush (controller) {
            const missingTags = [];
            if (!foundHtml) missingTags.push('html');
            if (!foundBody) missingTags.push('body');
            if (!missingTags.length) return;
            controller.enqueue(encoder.encode(`<html id="__next_error__">
            <template
              data-next-error-message="Missing ${missingTags.map((c)=>`<${c}>`).join(missingTags.length > 1 ? ' and ' : '')} tags in the root layout.\nRead more at https://nextjs.org/docs/messages/missing-root-layout-tags"
              data-next-error-digest="${_constants1.MISSING_ROOT_TAGS_ERROR}"
              data-next-error-stack=""
            ></template>
          `));
        }
    });
}
function chainTransformers(readable, transformers) {
    let stream = readable;
    for (const transformer of transformers){
        if (!transformer) continue;
        stream = stream.pipeThrough(transformer);
    }
    return stream;
}
async function continueFizzStream(renderStream, { suffix, inlinedDataStream, isStaticGeneration, isBuildTimePrerendering, buildId, getServerInsertedHTML, getServerInsertedMetadata, validateRootLayout }) {
    // Suffix itself might contain close tags at the end, so we need to split it.
    const suffixUnclosed = suffix ? suffix.split(CLOSE_TAG, 1)[0] : null;
    if (isStaticGeneration) {
        // If we're generating static HTML we need to wait for it to resolve before continuing.
        await renderStream.allReady;
    } else {
        // Otherwise, we want to make sure Fizz is done with all microtasky work
        // before we start pulling the stream and cause a flush.
        await (0, _scheduler.waitAtLeastOneReactRenderTask)();
    }
    return chainTransformers(renderStream, [
        // Buffer everything to avoid flushing too frequently
        createBufferedTransformStream(),
        // Add build id comment to start of the HTML document (in export mode)
        createPrefetchCommentStream(isBuildTimePrerendering, buildId),
        // Transform metadata
        createMetadataTransformStream(getServerInsertedMetadata),
        // Insert suffix content
        suffixUnclosed != null && suffixUnclosed.length > 0 ? createDeferredSuffixStream(suffixUnclosed) : null,
        // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
        inlinedDataStream ? createFlightDataInjectionTransformStream(inlinedDataStream, true) : null,
        // Validate the root layout for missing html or body tags
        validateRootLayout ? createRootLayoutValidatorStream() : null,
        // Close tags should always be deferred to the end
        createMoveSuffixStream(),
        // Special head insertions
        // TODO-APP: Insert server side html to end of head in app layout rendering, to avoid
        // hydration errors. Remove this once it's ready to be handled by react itself.
        createHeadInsertionTransformStream(getServerInsertedHTML)
    ]);
}
async function continueDynamicPrerender(prerenderStream, { getServerInsertedHTML, getServerInsertedMetadata }) {
    return prerenderStream // Buffer everything to avoid flushing too frequently
    .pipeThrough(createBufferedTransformStream()).pipeThrough(createStripDocumentClosingTagsTransform()) // Insert generated tags to head
    .pipeThrough(createHeadInsertionTransformStream(getServerInsertedHTML)) // Transform metadata
    .pipeThrough(createMetadataTransformStream(getServerInsertedMetadata));
}
async function continueStaticPrerender(prerenderStream, { inlinedDataStream, getServerInsertedHTML, getServerInsertedMetadata, isBuildTimePrerendering, buildId }) {
    return prerenderStream // Buffer everything to avoid flushing too frequently
    .pipeThrough(createBufferedTransformStream()) // Add build id comment to start of the HTML document (in export mode)
    .pipeThrough(createPrefetchCommentStream(isBuildTimePrerendering, buildId)) // Insert generated tags to head
    .pipeThrough(createHeadInsertionTransformStream(getServerInsertedHTML)) // Transform metadata
    .pipeThrough(createMetadataTransformStream(getServerInsertedMetadata)) // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
    .pipeThrough(createFlightDataInjectionTransformStream(inlinedDataStream, true)) // Close tags should always be deferred to the end
    .pipeThrough(createMoveSuffixStream());
}
async function continueStaticFallbackPrerender(prerenderStream, { inlinedDataStream, getServerInsertedHTML, getServerInsertedMetadata, isBuildTimePrerendering, buildId }) {
    // Same as `continueStaticPrerender`, but also inserts an additional script
    // to instruct the client to start fetching the hydration data as early
    // as possible.
    return prerenderStream // Buffer everything to avoid flushing too frequently
    .pipeThrough(createBufferedTransformStream()) // Add build id comment to start of the HTML document (in export mode)
    .pipeThrough(createPrefetchCommentStream(isBuildTimePrerendering, buildId)) // Insert generated tags to head
    .pipeThrough(createHeadInsertionTransformStream(getServerInsertedHTML)) // Insert the client resume script into the head
    .pipeThrough(createClientResumeScriptInsertionTransformStream()) // Transform metadata
    .pipeThrough(createMetadataTransformStream(getServerInsertedMetadata)) // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
    .pipeThrough(createFlightDataInjectionTransformStream(inlinedDataStream, true)) // Close tags should always be deferred to the end
    .pipeThrough(createMoveSuffixStream());
}
async function continueDynamicHTMLResume(renderStream, { delayDataUntilFirstHtmlChunk, inlinedDataStream, getServerInsertedHTML, getServerInsertedMetadata }) {
    return renderStream // Buffer everything to avoid flushing too frequently
    .pipeThrough(createBufferedTransformStream()) // Insert generated tags to head
    .pipeThrough(createHeadInsertionTransformStream(getServerInsertedHTML)) // Transform metadata
    .pipeThrough(createMetadataTransformStream(getServerInsertedMetadata)) // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
    .pipeThrough(createFlightDataInjectionTransformStream(inlinedDataStream, delayDataUntilFirstHtmlChunk)) // Close tags should always be deferred to the end
    .pipeThrough(createMoveSuffixStream());
}
function createDocumentClosingStream() {
    return streamFromString(CLOSE_TAG);
} //# sourceMappingURL=node-web-streams-helper.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/request-meta.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NEXT_REQUEST_META: null,
    addRequestMeta: null,
    getRequestMeta: null,
    removeRequestMeta: null,
    setRequestMeta: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXT_REQUEST_META: function() {
        return NEXT_REQUEST_META;
    },
    addRequestMeta: function() {
        return addRequestMeta;
    },
    getRequestMeta: function() {
        return getRequestMeta;
    },
    removeRequestMeta: function() {
        return removeRequestMeta;
    },
    setRequestMeta: function() {
        return setRequestMeta;
    }
});
const NEXT_REQUEST_META = Symbol.for('NextInternalRequestMeta');
function getRequestMeta(req, key) {
    const meta = req[NEXT_REQUEST_META] || {};
    return typeof key === 'string' ? meta[key] : meta;
}
function setRequestMeta(req, meta) {
    req[NEXT_REQUEST_META] = meta;
    return meta;
}
function addRequestMeta(request, key, value) {
    const meta = getRequestMeta(request);
    meta[key] = value;
    return setRequestMeta(request, meta);
}
function removeRequestMeta(request, key) {
    const meta = getRequestMeta(request);
    delete meta[key];
    return setRequestMeta(request, meta);
} //# sourceMappingURL=request-meta.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "detectDomainLocale", {
    enumerable: true,
    get: function() {
        return detectDomainLocale;
    }
});
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        // remove port if present
        const domainHostname = item.domain?.split(':', 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || item.locales?.some((locale)=>locale.toLowerCase() === detectedLocale)) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parsePath", {
    enumerable: true,
    get: function() {
        return parsePath;
    }
});
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
} //# sourceMappingURL=parse-path.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPathPrefix", {
    enumerable: true,
    get: function() {
        return addPathPrefix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)");
function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return `${prefix}${pathname}${query}${hash}`;
} //# sourceMappingURL=add-path-prefix.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPathSuffix", {
    enumerable: true,
    get: function() {
        return addPathSuffix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)");
function addPathSuffix(path, suffix) {
    if (!path.startsWith('/') || !suffix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return `${pathname}${suffix}${query}${hash}`;
} //# sourceMappingURL=add-path-suffix.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pathHasPrefix", {
    enumerable: true,
    get: function() {
        return pathHasPrefix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)");
function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname } = (0, _parsepath.parsePath)(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
} //# sourceMappingURL=path-has-prefix.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/add-locale.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addLocale", {
    enumerable: true,
    get: function() {
        return addLocale;
    }
});
const _addpathprefix = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-rsc] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if ((0, _pathhasprefix.pathHasPrefix)(lower, '/api')) return path;
        if ((0, _pathhasprefix.pathHasPrefix)(lower, `/${locale.toLowerCase()}`)) return path;
    }
    // Add the locale prefix to the path.
    return (0, _addpathprefix.addPathPrefix)(path, `/${locale}`);
} //# sourceMappingURL=add-locale.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatNextPathnameInfo", {
    enumerable: true,
    get: function() {
        return formatNextPathnameInfo;
    }
});
const _removetrailingslash = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [app-rsc] (ecmascript)");
const _addpathprefix = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-rsc] (ecmascript)");
const _addpathsuffix = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js [app-rsc] (ecmascript)");
const _addlocale = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/add-locale.js [app-rsc] (ecmascript)");
function formatNextPathnameInfo(info) {
    let pathname = (0, _addlocale.addLocale)(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = (0, _removetrailingslash.removeTrailingSlash)(pathname);
    }
    if (info.buildId) {
        pathname = (0, _addpathsuffix.addPathSuffix)((0, _addpathprefix.addPathPrefix)(pathname, `/_next/data/${info.buildId}`), info.pathname === '/' ? 'index.json' : '.json');
    }
    pathname = (0, _addpathprefix.addPathPrefix)(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith('/') ? (0, _addpathsuffix.addPathSuffix)(pathname, '/') : pathname : (0, _removetrailingslash.removeTrailingSlash)(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/get-hostname.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getHostname", {
    enumerable: true,
    get: function() {
        return getHostname;
    }
});
function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if (headers?.host && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(':', 1)[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removePathPrefix", {
    enumerable: true,
    get: function() {
        return removePathPrefix;
    }
});
const _pathhasprefix = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!(0, _pathhasprefix.pathHasPrefix)(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith('/')) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return `/${withoutPrefix}`;
} //# sourceMappingURL=remove-path-prefix.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getNextPathnameInfo", {
    enumerable: true,
    get: function() {
        return getNextPathnameInfo;
    }
});
const _normalizelocalepath = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js [app-rsc] (ecmascript)");
const _removepathprefix = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-rsc] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
function getNextPathnameInfo(pathname, options) {
    const { basePath, i18n, trailingSlash } = options.nextConfig ?? {};
    const info = {
        pathname,
        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
    };
    if (basePath && (0, _pathhasprefix.pathHasPrefix)(info.pathname, basePath)) {
        info.pathname = (0, _removepathprefix.removePathPrefix)(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
        const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== 'index' ? `/${paths.slice(1).join('/')}` : '/';
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : (0, _normalizelocalepath.normalizeLocalePath)(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        info.pathname = result.pathname ?? info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0, _normalizelocalepath.normalizeLocalePath)(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/next-url.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NextURL", {
    enumerable: true,
    get: function() {
        return NextURL;
    }
});
const _detectdomainlocale = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js [app-rsc] (ecmascript)");
const _formatnextpathnameinfo = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js [app-rsc] (ecmascript)");
const _gethostname = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/get-hostname.js [app-rsc] (ecmascript)");
const _getnextpathnameinfo = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js [app-rsc] (ecmascript)");
const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'));
}
const Internal = Symbol('NextURLInternal');
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === 'object' && 'pathname' in baseOrOpts || typeof baseOrOpts === 'string') {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ''
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = (0, _getnextpathnameinfo.getNextPathnameInfo)(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !("TURBOPACK compile-time value", void 0),
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = (0, _gethostname.getHostname)(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, _detectdomainlocale.detectDomainLocale)((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? '';
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return (0, _formatnextpathnameinfo.formatNextPathnameInfo)({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? '';
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${locale}"`), "__NEXT_ERROR_CODE", {
                value: "E597",
                enumerable: false,
                configurable: true
            });
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith('/') ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/error.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    PageSignatureError: null,
    RemovedPageError: null,
    RemovedUAError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PageSignatureError: function() {
        return PageSignatureError;
    },
    RemovedPageError: function() {
        return RemovedPageError;
    },
    RemovedUAError: function() {
        return RemovedUAError;
    }
});
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/request.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    INTERNALS: null,
    NextRequest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    INTERNALS: function() {
        return INTERNALS;
    },
    NextRequest: function() {
        return NextRequest;
    }
});
const _nexturl = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/next-url.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/utils.js [app-rsc] (ecmascript)");
const _error = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/error.js [app-rsc] (ecmascript)");
const _cookies = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)");
const INTERNALS = Symbol('internal request');
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== 'string' && 'url' in input ? input.url : String(input);
        (0, _utils.validateURL)(url);
        // node Request instance requires duplex option when a body
        // is present or it errors, we don't handle this for
        // Request being passed in since it would have already
        // errored if this wasn't configured
        if ("TURBOPACK compile-time truthy", 1) {
            if (init.body && init.duplex !== 'half') {
                init.duplex = 'half';
            }
        }
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new _nexturl.NextURL(url, {
            headers: (0, _utils.toNodeOutgoingHttpHeaders)(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new _cookies.RequestCookies(this.headers),
            nextUrl,
            url: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : nextUrl.toString()
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new _error.RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new _error.RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/base-http/helpers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isNodeNextRequest: null,
    isNodeNextResponse: null,
    isWebNextRequest: null,
    isWebNextResponse: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isNodeNextRequest: function() {
        return isNodeNextRequest;
    },
    isNodeNextResponse: function() {
        return isNodeNextResponse;
    },
    isWebNextRequest: function() {
        return isWebNextRequest;
    },
    isWebNextResponse: function() {
        return isWebNextResponse;
    }
});
const isWebNextRequest = (req)=>("TURBOPACK compile-time value", "nodejs") === 'edge';
const isWebNextResponse = (res)=>("TURBOPACK compile-time value", "nodejs") === 'edge';
const isNodeNextRequest = (req)=>("TURBOPACK compile-time value", "nodejs") !== 'edge';
const isNodeNextResponse = (res)=>("TURBOPACK compile-time value", "nodejs") !== 'edge'; //# sourceMappingURL=helpers.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/adapters/next-request.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NextRequestAdapter: null,
    ResponseAborted: null,
    ResponseAbortedName: null,
    createAbortController: null,
    signalFromNodeResponse: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NextRequestAdapter: function() {
        return NextRequestAdapter;
    },
    ResponseAborted: function() {
        return ResponseAborted;
    },
    ResponseAbortedName: function() {
        return ResponseAbortedName;
    },
    createAbortController: function() {
        return createAbortController;
    },
    signalFromNodeResponse: function() {
        return signalFromNodeResponse;
    }
});
const _requestmeta = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/request-meta.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/utils.js [app-rsc] (ecmascript)");
const _request = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/request.js [app-rsc] (ecmascript)");
const _helpers = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/base-http/helpers.js [app-rsc] (ecmascript)");
const ResponseAbortedName = 'ResponseAborted';
class ResponseAborted extends Error {
    constructor(...args){
        super(...args), this.name = ResponseAbortedName;
    }
}
function createAbortController(response) {
    const controller = new AbortController();
    // If `finish` fires first, then `res.end()` has been called and the close is
    // just us finishing the stream on our side. If `close` fires first, then we
    // know the client disconnected before we finished.
    response.once('close', ()=>{
        if (response.writableFinished) return;
        controller.abort(new ResponseAborted());
    });
    return controller;
}
function signalFromNodeResponse(response) {
    const { errored, destroyed } = response;
    if (errored || destroyed) {
        return AbortSignal.abort(errored ?? new ResponseAborted());
    }
    const { signal } = createAbortController(response);
    return signal;
}
class NextRequestAdapter {
    static fromBaseNextRequest(request, signal) {
        if (// environment variable check provides dead code elimination.
        ("TURBOPACK compile-time value", "nodejs") === 'edge' && (0, _helpers.isWebNextRequest)(request)) //TURBOPACK unreachable
        ;
        else if (// environment variable check provides dead code elimination.
        ("TURBOPACK compile-time value", "nodejs") !== 'edge' && (0, _helpers.isNodeNextRequest)(request)) {
            return NextRequestAdapter.fromNodeNextRequest(request, signal);
        } else {
            throw Object.defineProperty(new Error('Invariant: Unsupported NextRequest type'), "__NEXT_ERROR_CODE", {
                value: "E345",
                enumerable: false,
                configurable: true
            });
        }
    }
    static fromNodeNextRequest(request, signal) {
        // HEAD and GET requests can not have a body.
        let body = null;
        if (request.method !== 'GET' && request.method !== 'HEAD' && request.body) {
            // @ts-expect-error - this is handled by undici, when streams/web land use it instead
            body = request.body;
        }
        let url;
        if (request.url.startsWith('http')) {
            url = new URL(request.url);
        } else {
            // Grab the full URL from the request metadata.
            const base = (0, _requestmeta.getRequestMeta)(request, 'initURL');
            if (!base || !base.startsWith('http')) {
                // Because the URL construction relies on the fact that the URL provided
                // is absolute, we need to provide a base URL. We can't use the request
                // URL because it's relative, so we use a dummy URL instead.
                url = new URL(request.url, 'http://n');
            } else {
                url = new URL(request.url, base);
            }
        }
        return new _request.NextRequest(url, {
            method: request.method,
            headers: (0, _utils.fromNodeOutgoingHttpHeaders)(request.headers),
            duplex: 'half',
            signal,
            // geo
            // ip
            // nextConfig
            // body can not be passed if request was aborted
            // or we get a Request body was disturbed error
            ...signal.aborted ? {} : {
                body
            }
        });
    }
    static fromWebNextRequest(request) {
        // HEAD and GET requests can not have a body.
        let body = null;
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            body = request.body;
        }
        return new _request.NextRequest(request.url, {
            method: request.method,
            headers: (0, _utils.fromNodeOutgoingHttpHeaders)(request.headers),
            duplex: 'half',
            signal: request.request.signal,
            // geo
            // ip
            // nextConfig
            // body can not be passed if request was aborted
            // or we get a Request body was disturbed error
            ...request.request.signal.aborted ? {} : {
                body
            }
        });
    }
} //# sourceMappingURL=next-request.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/client-component-renderer-logger.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getClientComponentLoaderMetrics: null,
    wrapClientComponentLoader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getClientComponentLoaderMetrics: function() {
        return getClientComponentLoaderMetrics;
    },
    wrapClientComponentLoader: function() {
        return wrapClientComponentLoader;
    }
});
// Combined load times for loading client components
let clientComponentLoadStart = 0;
let clientComponentLoadTimes = 0;
let clientComponentLoadCount = 0;
function wrapClientComponentLoader(ComponentMod) {
    if (!('performance' in globalThis)) {
        return ComponentMod.__next_app__;
    }
    return {
        require: (...args)=>{
            const startTime = performance.now();
            if (clientComponentLoadStart === 0) {
                clientComponentLoadStart = startTime;
            }
            try {
                clientComponentLoadCount += 1;
                return ComponentMod.__next_app__.require(...args);
            } finally{
                clientComponentLoadTimes += performance.now() - startTime;
            }
        },
        loadChunk: (...args)=>{
            const startTime = performance.now();
            const result = ComponentMod.__next_app__.loadChunk(...args);
            // Avoid wrapping `loadChunk`'s result in an extra promise in case something like React depends on its identity.
            // We only need to know when it's settled.
            result.finally(()=>{
                clientComponentLoadTimes += performance.now() - startTime;
            });
            return result;
        }
    };
}
function getClientComponentLoaderMetrics(options = {}) {
    const metrics = clientComponentLoadStart === 0 ? undefined : {
        clientComponentLoadStart,
        clientComponentLoadTimes,
        clientComponentLoadCount
    };
    if (options.reset) {
        clientComponentLoadStart = 0;
        clientComponentLoadTimes = 0;
        clientComponentLoadCount = 0;
    }
    return metrics;
} //# sourceMappingURL=client-component-renderer-logger.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/pipe-readable.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isAbortError: null,
    pipeToNodeResponse: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isAbortError: function() {
        return isAbortError;
    },
    pipeToNodeResponse: function() {
        return pipeToNodeResponse;
    }
});
const _nextrequest = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/adapters/next-request.js [app-rsc] (ecmascript)");
const _detachedpromise = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/detached-promise.js [app-rsc] (ecmascript)");
const _tracer = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)");
const _clientcomponentrendererlogger = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/client-component-renderer-logger.js [app-rsc] (ecmascript)");
function isAbortError(e) {
    return (e == null ? void 0 : e.name) === 'AbortError' || (e == null ? void 0 : e.name) === _nextrequest.ResponseAbortedName;
}
function createWriterFromResponse(res, waitUntilForEnd) {
    let started = false;
    // Create a promise that will resolve once the response has drained. See
    // https://nodejs.org/api/stream.html#stream_event_drain
    let drained = new _detachedpromise.DetachedPromise();
    function onDrain() {
        drained.resolve();
    }
    res.on('drain', onDrain);
    // If the finish event fires, it means we shouldn't block and wait for the
    // drain event.
    res.once('close', ()=>{
        res.off('drain', onDrain);
        drained.resolve();
    });
    // Create a promise that will resolve once the response has finished. See
    // https://nodejs.org/api/http.html#event-finish_1
    const finished = new _detachedpromise.DetachedPromise();
    res.once('finish', ()=>{
        finished.resolve();
    });
    // Create a writable stream that will write to the response.
    return new WritableStream({
        write: async (chunk)=>{
            // You'd think we'd want to use `start` instead of placing this in `write`
            // but this ensures that we don't actually flush the headers until we've
            // started writing chunks.
            if (!started) {
                started = true;
                if ('performance' in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                    const metrics = (0, _clientcomponentrendererlogger.getClientComponentLoaderMetrics)();
                    if (metrics) {
                        performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, {
                            start: metrics.clientComponentLoadStart,
                            end: metrics.clientComponentLoadStart + metrics.clientComponentLoadTimes
                        });
                    }
                }
                res.flushHeaders();
                (0, _tracer.getTracer)().trace(_constants.NextNodeServerSpan.startResponse, {
                    spanName: 'start response'
                }, ()=>undefined);
            }
            try {
                const ok = res.write(chunk);
                // Added by the `compression` middleware, this is a function that will
                // flush the partially-compressed response to the client.
                if ('flush' in res && typeof res.flush === 'function') {
                    res.flush();
                }
                // If the write returns false, it means there's some backpressure, so
                // wait until it's streamed before continuing.
                if (!ok) {
                    await drained.promise;
                    // Reset the drained promise so that we can wait for the next drain event.
                    drained = new _detachedpromise.DetachedPromise();
                }
            } catch (err) {
                res.end();
                throw Object.defineProperty(new Error('failed to write chunk to response', {
                    cause: err
                }), "__NEXT_ERROR_CODE", {
                    value: "E321",
                    enumerable: false,
                    configurable: true
                });
            }
        },
        abort: (err)=>{
            if (res.writableFinished) return;
            res.destroy(err);
        },
        close: async ()=>{
            // if a waitUntil promise was passed, wait for it to resolve before
            // ending the response.
            if (waitUntilForEnd) {
                await waitUntilForEnd;
            }
            if (res.writableFinished) return;
            res.end();
            return finished.promise;
        }
    });
}
async function pipeToNodeResponse(readable, res, waitUntilForEnd) {
    try {
        // If the response has already errored, then just return now.
        const { errored, destroyed } = res;
        if (errored || destroyed) return;
        // Create a new AbortController so that we can abort the readable if the
        // client disconnects.
        const controller = (0, _nextrequest.createAbortController)(res);
        const writer = createWriterFromResponse(res, waitUntilForEnd);
        await readable.pipeTo(writer, {
            signal: controller.signal
        });
    } catch (err) {
        // If this isn't related to an abort error, re-throw it.
        if (isAbortError(err)) return;
        throw Object.defineProperty(new Error('failed to pipe response', {
            cause: err
        }), "__NEXT_ERROR_CODE", {
            value: "E180",
            enumerable: false,
            configurable: true
        });
    }
} //# sourceMappingURL=pipe-readable.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/render-result.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RenderResult;
    }
});
const _nodewebstreamshelper = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/stream-utils/node-web-streams-helper.js [app-rsc] (ecmascript)");
const _pipereadable = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/pipe-readable.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
class RenderResult {
    static #_ = /**
   * A render result that represents an empty response. This is used to
   * represent a response that was not found or was already sent.
   */ this.EMPTY = new RenderResult(null, {
        metadata: {},
        contentType: null
    });
    /**
   * Creates a new RenderResult instance from a static response.
   *
   * @param value the static response value
   * @param contentType the content type of the response
   * @returns a new RenderResult instance
   */ static fromStatic(value, contentType) {
        return new RenderResult(value, {
            metadata: {},
            contentType
        });
    }
    constructor(response, { contentType, waitUntil, metadata }){
        this.response = response;
        this.contentType = contentType;
        this.metadata = metadata;
        this.waitUntil = waitUntil;
    }
    assignMetadata(metadata) {
        Object.assign(this.metadata, metadata);
    }
    /**
   * Returns true if the response is null. It can be null if the response was
   * not found or was already sent.
   */ get isNull() {
        return this.response === null;
    }
    /**
   * Returns false if the response is a string. It can be a string if the page
   * was prerendered. If it's not, then it was generated dynamically.
   */ get isDynamic() {
        return typeof this.response !== 'string';
    }
    toUnchunkedString(stream = false) {
        if (this.response === null) {
            // If the response is null, return an empty string. This behavior is
            // intentional as we're now providing the `RenderResult.EMPTY` value.
            return '';
        }
        if (typeof this.response !== 'string') {
            if (!stream) {
                throw Object.defineProperty(new _invarianterror.InvariantError('dynamic responses cannot be unchunked. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
                    value: "E732",
                    enumerable: false,
                    configurable: true
                });
            }
            return (0, _nodewebstreamshelper.streamToString)(this.readable);
        }
        return this.response;
    }
    /**
   * Returns a readable stream of the response.
   */ get readable() {
        if (this.response === null) {
            // If the response is null, return an empty stream. This behavior is
            // intentional as we're now providing the `RenderResult.EMPTY` value.
            return new ReadableStream({
                start (controller) {
                    controller.close();
                }
            });
        }
        if (typeof this.response === 'string') {
            return (0, _nodewebstreamshelper.streamFromString)(this.response);
        }
        if (Buffer.isBuffer(this.response)) {
            return (0, _nodewebstreamshelper.streamFromBuffer)(this.response);
        }
        // If the response is an array of streams, then chain them together.
        if (Array.isArray(this.response)) {
            return (0, _nodewebstreamshelper.chainStreams)(...this.response);
        }
        return this.response;
    }
    /**
   * Coerces the response to an array of streams. This will convert the response
   * to an array of streams if it is not already one.
   *
   * @returns An array of streams
   */ coerce() {
        if (this.response === null) {
            // If the response is null, return an empty stream. This behavior is
            // intentional as we're now providing the `RenderResult.EMPTY` value.
            return [];
        }
        if (typeof this.response === 'string') {
            return [
                (0, _nodewebstreamshelper.streamFromString)(this.response)
            ];
        } else if (Array.isArray(this.response)) {
            return this.response;
        } else if (Buffer.isBuffer(this.response)) {
            return [
                (0, _nodewebstreamshelper.streamFromBuffer)(this.response)
            ];
        } else {
            return [
                this.response
            ];
        }
    }
    /**
   * Unshifts a new stream to the response. This will convert the response to an
   * array of streams if it is not already one and will add the new stream to
   * the start of the array. When this response is piped, all of the streams
   * will be piped one after the other.
   *
   * @param readable The new stream to unshift
   */ unshift(readable) {
        // Coerce the response to an array of streams.
        this.response = this.coerce();
        // Add the new stream to the start of the array.
        this.response.unshift(readable);
    }
    /**
   * Chains a new stream to the response. This will convert the response to an
   * array of streams if it is not already one and will add the new stream to
   * the end. When this response is piped, all of the streams will be piped
   * one after the other.
   *
   * @param readable The new stream to chain
   */ push(readable) {
        // Coerce the response to an array of streams.
        this.response = this.coerce();
        // Add the new stream to the end of the array.
        this.response.push(readable);
    }
    /**
   * Pipes the response to a writable stream. This will close/cancel the
   * writable stream if an error is encountered. If this doesn't throw, then
   * the writable stream will be closed or aborted.
   *
   * @param writable Writable stream to pipe the response to
   */ async pipeTo(writable) {
        try {
            await this.readable.pipeTo(writable, {
                // We want to close the writable stream ourselves so that we can wait
                // for the waitUntil promise to resolve before closing it. If an error
                // is encountered, we'll abort the writable stream if we swallowed the
                // error.
                preventClose: true
            });
            // If there is a waitUntil promise, wait for it to resolve before
            // closing the writable stream.
            if (this.waitUntil) await this.waitUntil;
            // Close the writable stream.
            await writable.close();
        } catch (err) {
            // If this is an abort error, we should abort the writable stream (as we
            // took ownership of it when we started piping). We don't need to re-throw
            // because we handled the error.
            if ((0, _pipereadable.isAbortError)(err)) {
                // Abort the writable stream if an error is encountered.
                await writable.abort(err);
                return;
            }
            // We're not aborting the writer here as when this method throws it's not
            // clear as to how so the caller should assume it's their responsibility
            // to clean up the writer.
            throw err;
        }
    }
    /**
   * Pipes the response to a node response. This will close/cancel the node
   * response if an error is encountered.
   *
   * @param res
   */ async pipeToNodeResponse(res) {
        await (0, _pipereadable.pipeToNodeResponse)(this.readable, res, this.waitUntil);
    }
} //# sourceMappingURL=render-result.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-kind.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouteKind", {
    enumerable: true,
    get: function() {
        return RouteKind;
    }
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/response-cache/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    fromResponseCacheEntry: null,
    routeKindToIncrementalCacheKind: null,
    toResponseCacheEntry: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    fromResponseCacheEntry: function() {
        return fromResponseCacheEntry;
    },
    routeKindToIncrementalCacheKind: function() {
        return routeKindToIncrementalCacheKind;
    },
    toResponseCacheEntry: function() {
        return toResponseCacheEntry;
    }
});
const _types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/response-cache/types.js [app-rsc] (ecmascript)");
const _renderresult = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/render-result.js [app-rsc] (ecmascript)"));
const _routekind = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-kind.js [app-rsc] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/constants.js [app-rsc] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function fromResponseCacheEntry(cacheEntry) {
    var _cacheEntry_value, _cacheEntry_value1;
    return {
        ...cacheEntry,
        value: ((_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) === _types.CachedRouteKind.PAGES ? {
            kind: _types.CachedRouteKind.PAGES,
            html: await cacheEntry.value.html.toUnchunkedString(true),
            pageData: cacheEntry.value.pageData,
            headers: cacheEntry.value.headers,
            status: cacheEntry.value.status
        } : ((_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind) === _types.CachedRouteKind.APP_PAGE ? {
            kind: _types.CachedRouteKind.APP_PAGE,
            html: await cacheEntry.value.html.toUnchunkedString(true),
            postponed: cacheEntry.value.postponed,
            rscData: cacheEntry.value.rscData,
            headers: cacheEntry.value.headers,
            status: cacheEntry.value.status,
            segmentData: cacheEntry.value.segmentData
        } : cacheEntry.value
    };
}
async function toResponseCacheEntry(response) {
    var _response_value, _response_value1;
    if (!response) return null;
    return {
        isMiss: response.isMiss,
        isStale: response.isStale,
        cacheControl: response.cacheControl,
        value: ((_response_value = response.value) == null ? void 0 : _response_value.kind) === _types.CachedRouteKind.PAGES ? {
            kind: _types.CachedRouteKind.PAGES,
            html: _renderresult.default.fromStatic(response.value.html, _constants.HTML_CONTENT_TYPE_HEADER),
            pageData: response.value.pageData,
            headers: response.value.headers,
            status: response.value.status
        } : ((_response_value1 = response.value) == null ? void 0 : _response_value1.kind) === _types.CachedRouteKind.APP_PAGE ? {
            kind: _types.CachedRouteKind.APP_PAGE,
            html: _renderresult.default.fromStatic(response.value.html, _constants.HTML_CONTENT_TYPE_HEADER),
            rscData: response.value.rscData,
            headers: response.value.headers,
            status: response.value.status,
            postponed: response.value.postponed,
            segmentData: response.value.segmentData
        } : response.value
    };
}
function routeKindToIncrementalCacheKind(routeKind) {
    switch(routeKind){
        case _routekind.RouteKind.PAGES:
            return _types.IncrementalCacheKind.PAGES;
        case _routekind.RouteKind.APP_PAGE:
            return _types.IncrementalCacheKind.APP_PAGE;
        case _routekind.RouteKind.IMAGE:
            return _types.IncrementalCacheKind.IMAGE;
        case _routekind.RouteKind.APP_ROUTE:
            return _types.IncrementalCacheKind.APP_ROUTE;
        case _routekind.RouteKind.PAGES_API:
            // Pages Router API routes are not cached in the incremental cache.
            throw Object.defineProperty(new Error(`Unexpected route kind ${routeKind}`), "__NEXT_ERROR_CODE", {
                value: "E64",
                enumerable: false,
                configurable: true
            });
        default:
            return routeKind;
    }
} //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/response-cache/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return ResponseCache;
    }
});
0 && __export(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/response-cache/types.js [app-rsc] (ecmascript)"));
const _batcher = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/batcher.js [app-rsc] (ecmascript)");
const _lrucache = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/lru-cache.js [app-rsc] (ecmascript)");
const _log = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/output/log.js [app-rsc] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/scheduler.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/response-cache/utils.js [app-rsc] (ecmascript)");
_export_star(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/response-cache/types.js [app-rsc] (ecmascript)"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
/**
 * Parses an environment variable as a positive integer, returning the fallback
 * if the value is missing, not a number, or not positive.
 */ function parsePositiveInt(envValue, fallback) {
    if (!envValue) return fallback;
    const parsed = parseInt(envValue, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
/**
 * Default TTL (in milliseconds) for minimal mode response cache entries.
 * Used for cache hit validation as a fallback for providers that don't
 * send the x-invocation-id header yet.
 *
 * 10 seconds chosen because:
 * - Long enough to dedupe rapid successive requests (e.g., page + data)
 * - Short enough to not serve stale data across unrelated requests
 *
 * Can be configured via `NEXT_PRIVATE_RESPONSE_CACHE_TTL` environment variable.
 */ const DEFAULT_TTL_MS = parsePositiveInt(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 10000);
/**
 * Default maximum number of entries in the response cache.
 * Can be configured via `NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE` environment variable.
 */ const DEFAULT_MAX_SIZE = parsePositiveInt(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
/**
 * Separator used in compound cache keys to join pathname and invocationID.
 * Using null byte (\0) since it cannot appear in valid URL paths or UUIDs.
 */ const KEY_SEPARATOR = '\0';
/**
 * Sentinel value used for TTL-based cache entries (when invocationID is undefined).
 * Chosen to be a clearly reserved marker for internal cache keys.
 */ const TTL_SENTINEL = '__ttl_sentinel__';
/**
 * Creates a compound cache key from pathname and invocationID.
 */ function createCacheKey(pathname, invocationID) {
    return `${pathname}${KEY_SEPARATOR}${invocationID ?? TTL_SENTINEL}`;
}
/**
 * Extracts the invocationID from a compound cache key.
 * Returns undefined if the key used TTL_SENTINEL.
 */ function extractInvocationID(compoundKey) {
    const separatorIndex = compoundKey.lastIndexOf(KEY_SEPARATOR);
    if (separatorIndex === -1) return undefined;
    const invocationID = compoundKey.slice(separatorIndex + 1);
    return invocationID === TTL_SENTINEL ? undefined : invocationID;
}
class ResponseCache {
    constructor(minimal_mode, maxSize = DEFAULT_MAX_SIZE, ttl = DEFAULT_TTL_MS){
        this.getBatcher = _batcher.Batcher.create({
            // Ensure on-demand revalidate doesn't block normal requests, it should be
            // safe to run an on-demand revalidate for the same key as a normal request.
            cacheKeyFn: ({ key, isOnDemandRevalidate })=>`${key}-${isOnDemandRevalidate ? '1' : '0'}`,
            // We wait to do any async work until after we've added our promise to
            // `pendingResponses` to ensure that any any other calls will reuse the
            // same promise until we've fully finished our work.
            schedulerFn: _scheduler.scheduleOnNextTick
        });
        this.revalidateBatcher = _batcher.Batcher.create({
            // We wait to do any async work until after we've added our promise to
            // `pendingResponses` to ensure that any any other calls will reuse the
            // same promise until we've fully finished our work.
            schedulerFn: _scheduler.scheduleOnNextTick
        });
        /**
   * Set of invocation IDs that have had cache entries evicted.
   * Used to detect when the cache size may be too small.
   * Bounded to prevent memory growth.
   */ this.evictedInvocationIDs = new Set();
        this.minimal_mode = minimal_mode;
        this.maxSize = maxSize;
        this.ttl = ttl;
        // Create the LRU cache with eviction tracking
        this.cache = new _lrucache.LRUCache(maxSize, undefined, (compoundKey)=>{
            const invocationID = extractInvocationID(compoundKey);
            if (invocationID) {
                // Bound to 100 entries to prevent unbounded memory growth.
                // FIFO eviction is acceptable here because:
                // 1. Invocations are short-lived (single request lifecycle), so older
                //    invocations are unlikely to still be active after 100 newer ones
                // 2. This warning mechanism is best-effort for developer guidance—
                //    missing occasional eviction warnings doesn't affect correctness
                // 3. If a long-running invocation is somehow evicted and then has
                //    another cache entry evicted, it will simply be re-added
                if (this.evictedInvocationIDs.size >= 100) {
                    const first = this.evictedInvocationIDs.values().next().value;
                    if (first) this.evictedInvocationIDs.delete(first);
                }
                this.evictedInvocationIDs.add(invocationID);
            }
        });
    }
    /**
   * Gets the response cache entry for the given key.
   *
   * @param key - The key to get the response cache entry for.
   * @param responseGenerator - The response generator to use to generate the response cache entry.
   * @param context - The context for the get request.
   * @returns The response cache entry.
   */ async get(key, responseGenerator, context) {
        // If there is no key for the cache, we can't possibly look this up in the
        // cache so just return the result of the response generator.
        if (!key) {
            return responseGenerator({
                hasResolved: false,
                previousCacheEntry: null
            });
        }
        // Check minimal mode cache before doing any other work.
        if (this.minimal_mode) {
            const cacheKey = createCacheKey(key, context.invocationID);
            const cachedItem = this.cache.get(cacheKey);
            if (cachedItem) {
                // With invocationID: exact match found - always a hit
                // With TTL mode: must check expiration
                if (context.invocationID !== undefined) {
                    return (0, _utils.toResponseCacheEntry)(cachedItem.entry);
                }
                // TTL mode: check expiration
                const now = Date.now();
                if (cachedItem.expiresAt > now) {
                    return (0, _utils.toResponseCacheEntry)(cachedItem.entry);
                }
                // TTL expired - clean up
                this.cache.remove(cacheKey);
            }
            // Warn if this invocation had entries evicted - indicates cache may be too small.
            if (context.invocationID && this.evictedInvocationIDs.has(context.invocationID)) {
                (0, _log.warnOnce)(`Response cache entry was evicted for invocation ${context.invocationID}. ` + `Consider increasing NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE (current: ${this.maxSize}).`);
            }
        }
        const { incrementalCache, isOnDemandRevalidate = false, isFallback = false, isRoutePPREnabled = false, isPrefetch = false, waitUntil, routeKind, invocationID } = context;
        const response = await this.getBatcher.batch({
            key,
            isOnDemandRevalidate
        }, ({ resolve })=>{
            const promise = this.handleGet(key, responseGenerator, {
                incrementalCache,
                isOnDemandRevalidate,
                isFallback,
                isRoutePPREnabled,
                isPrefetch,
                routeKind,
                invocationID
            }, resolve);
            // We need to ensure background revalidates are passed to waitUntil.
            if (waitUntil) waitUntil(promise);
            return promise;
        });
        return (0, _utils.toResponseCacheEntry)(response);
    }
    /**
   * Handles the get request for the response cache.
   *
   * @param key - The key to get the response cache entry for.
   * @param responseGenerator - The response generator to use to generate the response cache entry.
   * @param context - The context for the get request.
   * @param resolve - The resolve function to use to resolve the response cache entry.
   * @returns The response cache entry.
   */ async handleGet(key, responseGenerator, context, resolve) {
        let previousIncrementalCacheEntry = null;
        let resolved = false;
        try {
            // Get the previous cache entry if not in minimal mode
            previousIncrementalCacheEntry = !this.minimal_mode ? await context.incrementalCache.get(key, {
                kind: (0, _utils.routeKindToIncrementalCacheKind)(context.routeKind),
                isRoutePPREnabled: context.isRoutePPREnabled,
                isFallback: context.isFallback
            }) : null;
            if (previousIncrementalCacheEntry && !context.isOnDemandRevalidate) {
                resolve(previousIncrementalCacheEntry);
                resolved = true;
                if (!previousIncrementalCacheEntry.isStale || context.isPrefetch) {
                    // The cached value is still valid, so we don't need to update it yet.
                    return previousIncrementalCacheEntry;
                }
            }
            // Revalidate the cache entry
            const incrementalResponseCacheEntry = await this.revalidate(key, context.incrementalCache, context.isRoutePPREnabled, context.isFallback, responseGenerator, previousIncrementalCacheEntry, previousIncrementalCacheEntry !== null && !context.isOnDemandRevalidate, undefined, context.invocationID);
            // Handle null response
            if (!incrementalResponseCacheEntry) {
                // Remove the cache item if it was set so we don't use it again.
                if (this.minimal_mode) {
                    const cacheKey = createCacheKey(key, context.invocationID);
                    this.cache.remove(cacheKey);
                }
                return null;
            }
            // Resolve for on-demand revalidation or if not already resolved
            if (context.isOnDemandRevalidate && !resolved) {
                return incrementalResponseCacheEntry;
            }
            return incrementalResponseCacheEntry;
        } catch (err) {
            // If we've already resolved the cache entry, we can't reject as we
            // already resolved the cache entry so log the error here.
            if (resolved) {
                console.error(err);
                return null;
            }
            throw err;
        }
    }
    /**
   * Revalidates the cache entry for the given key.
   *
   * @param key - The key to revalidate the cache entry for.
   * @param incrementalCache - The incremental cache to use to revalidate the cache entry.
   * @param isRoutePPREnabled - Whether the route is PPR enabled.
   * @param isFallback - Whether the route is a fallback.
   * @param responseGenerator - The response generator to use to generate the response cache entry.
   * @param previousIncrementalCacheEntry - The previous cache entry to use to revalidate the cache entry.
   * @param hasResolved - Whether the response has been resolved.
   * @param waitUntil - Optional function to register background work.
   * @param invocationID - The invocation ID for cache key scoping.
   * @returns The revalidated cache entry.
   */ async revalidate(key, incrementalCache, isRoutePPREnabled, isFallback, responseGenerator, previousIncrementalCacheEntry, hasResolved, waitUntil, invocationID) {
        return this.revalidateBatcher.batch(key, ()=>{
            const promise = this.handleRevalidate(key, incrementalCache, isRoutePPREnabled, isFallback, responseGenerator, previousIncrementalCacheEntry, hasResolved, invocationID);
            // We need to ensure background revalidates are passed to waitUntil.
            if (waitUntil) waitUntil(promise);
            return promise;
        });
    }
    async handleRevalidate(key, incrementalCache, isRoutePPREnabled, isFallback, responseGenerator, previousIncrementalCacheEntry, hasResolved, invocationID) {
        try {
            // Generate the response cache entry using the response generator.
            const responseCacheEntry = await responseGenerator({
                hasResolved,
                previousCacheEntry: previousIncrementalCacheEntry,
                isRevalidating: true
            });
            if (!responseCacheEntry) {
                return null;
            }
            // Convert the response cache entry to an incremental response cache entry.
            const incrementalResponseCacheEntry = await (0, _utils.fromResponseCacheEntry)({
                ...responseCacheEntry,
                isMiss: !previousIncrementalCacheEntry
            });
            // We want to persist the result only if it has a cache control value
            // defined.
            if (incrementalResponseCacheEntry.cacheControl) {
                if (this.minimal_mode) {
                    // Set TTL expiration for cache hit validation. Entries are validated
                    // by invocationID when available, with TTL as a fallback for providers
                    // that don't send x-invocation-id. Memory is managed by LRU eviction.
                    const cacheKey = createCacheKey(key, invocationID);
                    this.cache.set(cacheKey, {
                        entry: incrementalResponseCacheEntry,
                        expiresAt: Date.now() + this.ttl
                    });
                } else {
                    await incrementalCache.set(key, incrementalResponseCacheEntry.value, {
                        cacheControl: incrementalResponseCacheEntry.cacheControl,
                        isRoutePPREnabled,
                        isFallback
                    });
                }
            }
            return incrementalResponseCacheEntry;
        } catch (err) {
            // When a path is erroring we automatically re-set the existing cache
            // with new revalidate and expire times to prevent non-stop retrying.
            if (previousIncrementalCacheEntry == null ? void 0 : previousIncrementalCacheEntry.cacheControl) {
                const revalidate = Math.min(Math.max(previousIncrementalCacheEntry.cacheControl.revalidate || 3, 3), 30);
                const expire = previousIncrementalCacheEntry.cacheControl.expire === undefined ? undefined : Math.max(revalidate + 3, previousIncrementalCacheEntry.cacheControl.expire);
                await incrementalCache.set(key, previousIncrementalCacheEntry.value, {
                    cacheControl: {
                        revalidate: revalidate,
                        expire: expire
                    },
                    isRoutePPREnabled,
                    isFallback
                });
            }
            // We haven't resolved yet, so let's throw to indicate an error.
            throw err;
        }
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/patch-fetch.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NEXT_PATCH_SYMBOL: null,
    createPatchedFetcher: null,
    patchFetch: null,
    validateRevalidate: null,
    validateTags: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXT_PATCH_SYMBOL: function() {
        return NEXT_PATCH_SYMBOL;
    },
    createPatchedFetcher: function() {
        return createPatchedFetcher;
    },
    patchFetch: function() {
        return patchFetch;
    },
    validateRevalidate: function() {
        return validateRevalidate;
    },
    validateTags: function() {
        return validateTags;
    }
});
const _constants = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)");
const _tracer = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/constants.js [app-rsc] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _dedupefetch = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/dedupe-fetch.js [app-rsc] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _responsecache = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/response-cache/index.js [app-rsc] (ecmascript)");
const _cloneresponse = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/clone-response.js [app-rsc] (ecmascript)");
const _stagedrendering = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/app-render/staged-rendering.js [app-rsc] (ecmascript)");
const isEdgeRuntime = ("TURBOPACK compile-time value", "nodejs") === 'edge';
const NEXT_PATCH_SYMBOL = Symbol.for('next-patch');
function isFetchPatched() {
    return globalThis[NEXT_PATCH_SYMBOL] === true;
}
function validateRevalidate(revalidateVal, route) {
    try {
        let normalizedRevalidate = undefined;
        if (revalidateVal === false) {
            normalizedRevalidate = _constants1.INFINITE_CACHE;
        } else if (typeof revalidateVal === 'number' && !isNaN(revalidateVal) && revalidateVal > -1) {
            normalizedRevalidate = revalidateVal;
        } else if (typeof revalidateVal !== 'undefined') {
            throw Object.defineProperty(new Error(`Invalid revalidate value "${revalidateVal}" on "${route}", must be a non-negative number or false`), "__NEXT_ERROR_CODE", {
                value: "E179",
                enumerable: false,
                configurable: true
            });
        }
        return normalizedRevalidate;
    } catch (err) {
        // handle client component error from attempting to check revalidate value
        if (err instanceof Error && err.message.includes('Invalid revalidate')) {
            throw err;
        }
        return undefined;
    }
}
function validateTags(tags, description) {
    const validTags = [];
    const invalidTags = [];
    for(let i = 0; i < tags.length; i++){
        const tag = tags[i];
        if (typeof tag !== 'string') {
            invalidTags.push({
                tag,
                reason: 'invalid type, must be a string'
            });
        } else if (tag.length > _constants1.NEXT_CACHE_TAG_MAX_LENGTH) {
            invalidTags.push({
                tag,
                reason: `exceeded max length of ${_constants1.NEXT_CACHE_TAG_MAX_LENGTH}`
            });
        } else {
            validTags.push(tag);
        }
        if (validTags.length > _constants1.NEXT_CACHE_TAG_MAX_ITEMS) {
            console.warn(`Warning: exceeded max tag count for ${description}, dropped tags:`, tags.slice(i).join(', '));
            break;
        }
    }
    if (invalidTags.length > 0) {
        console.warn(`Warning: invalid tags passed to ${description}: `);
        for (const { tag, reason } of invalidTags){
            console.log(`tag: "${tag}" ${reason}`);
        }
    }
    return validTags;
}
function trackFetchMetric(workStore, ctx) {
    if (!workStore.shouldTrackFetchMetrics) {
        return;
    }
    workStore.fetchMetrics ??= [];
    workStore.fetchMetrics.push({
        ...ctx,
        end: performance.timeOrigin + performance.now(),
        idx: workStore.nextFetchId || 0
    });
}
async function createCachedPrerenderResponse(res, cacheKey, incrementalCacheContext, incrementalCache, revalidate, handleUnlock) {
    // We are prerendering at build time or revalidate time with cacheComponents so we
    // need to buffer the response so we can guarantee it can be read in a
    // microtask.
    const bodyBuffer = await res.arrayBuffer();
    const fetchedData = {
        headers: Object.fromEntries(res.headers.entries()),
        body: Buffer.from(bodyBuffer).toString('base64'),
        status: res.status,
        url: res.url
    };
    // We can skip setting the serverComponentsHmrCache because we aren't in dev
    // mode.
    if (incrementalCacheContext) {
        await incrementalCache.set(cacheKey, {
            kind: _responsecache.CachedRouteKind.FETCH,
            data: fetchedData,
            revalidate
        }, incrementalCacheContext);
    }
    await handleUnlock();
    // We return a new Response to the caller.
    return new Response(bodyBuffer, {
        headers: res.headers,
        status: res.status,
        statusText: res.statusText
    });
}
async function createCachedDynamicResponse(workStore, res, cacheKey, incrementalCacheContext, incrementalCache, serverComponentsHmrCache, revalidate, input, handleUnlock) {
    // We're cloning the response using this utility because there exists a bug in
    // the undici library around response cloning. See the following pull request
    // for more details: https://github.com/vercel/next.js/pull/73274
    const [cloned1, cloned2] = (0, _cloneresponse.cloneResponse)(res);
    // We are dynamically rendering including dev mode. We want to return the
    // response to the caller as soon as possible because it might stream over a
    // very long time.
    const cacheSetPromise = cloned1.arrayBuffer().then(async (arrayBuffer)=>{
        const bodyBuffer = Buffer.from(arrayBuffer);
        const fetchedData = {
            headers: Object.fromEntries(cloned1.headers.entries()),
            body: bodyBuffer.toString('base64'),
            status: cloned1.status,
            url: cloned1.url
        };
        serverComponentsHmrCache == null ? void 0 : serverComponentsHmrCache.set(cacheKey, fetchedData);
        if (incrementalCacheContext) {
            await incrementalCache.set(cacheKey, {
                kind: _responsecache.CachedRouteKind.FETCH,
                data: fetchedData,
                revalidate
            }, incrementalCacheContext);
        }
    }).catch((error)=>console.warn(`Failed to set fetch cache`, input, error)).finally(handleUnlock);
    const pendingRevalidateKey = `cache-set-${cacheKey}`;
    const pendingRevalidates = workStore.pendingRevalidates ??= {};
    let pendingRevalidatePromise = Promise.resolve();
    if (pendingRevalidateKey in pendingRevalidates) {
        // There is already a pending revalidate entry that we need to await to
        // avoid race conditions.
        pendingRevalidatePromise = pendingRevalidates[pendingRevalidateKey];
    }
    pendingRevalidates[pendingRevalidateKey] = pendingRevalidatePromise.then(()=>cacheSetPromise).finally(()=>{
        // If the pending revalidate is not present in the store, then we have
        // nothing to delete.
        if (!(pendingRevalidates == null ? void 0 : pendingRevalidates[pendingRevalidateKey])) {
            return;
        }
        delete pendingRevalidates[pendingRevalidateKey];
    });
    return cloned2;
}
function createPatchedFetcher(originFetch, { workAsyncStorage, workUnitAsyncStorage }) {
    // Create the patched fetch function.
    const patched = async function fetch(input, init) {
        var _init_method, _init_next;
        let url;
        try {
            url = new URL(input instanceof Request ? input.url : input);
            url.username = '';
            url.password = '';
        } catch  {
            // Error caused by malformed URL should be handled by native fetch
            url = undefined;
        }
        const fetchUrl = (url == null ? void 0 : url.href) ?? '';
        const method = (init == null ? void 0 : (_init_method = init.method) == null ? void 0 : _init_method.toUpperCase()) || 'GET';
        // Do create a new span trace for internal fetches in the
        // non-verbose mode.
        const isInternal = (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) === true;
        const hideSpan = process.env.NEXT_OTEL_FETCH_DISABLED === '1';
        // We don't track fetch metrics for internal fetches
        // so it's not critical that we have a start time, as it won't be recorded.
        // This is to workaround a flaky issue where performance APIs might
        // not be available and will require follow-up investigation.
        const fetchStart = isInternal ? undefined : performance.timeOrigin + performance.now();
        const workStore = workAsyncStorage.getStore();
        const workUnitStore = workUnitAsyncStorage.getStore();
        let cacheSignal = workUnitStore ? (0, _workunitasyncstorageexternal.getCacheSignal)(workUnitStore) : null;
        if (cacheSignal) {
            cacheSignal.beginRead();
        }
        const result = (0, _tracer.getTracer)().trace(isInternal ? _constants.NextNodeServerSpan.internalFetch : _constants.AppRenderSpan.fetch, {
            hideSpan,
            kind: _tracer.SpanKind.CLIENT,
            spanName: [
                'fetch',
                method,
                fetchUrl
            ].filter(Boolean).join(' '),
            attributes: {
                'http.url': fetchUrl,
                'http.method': method,
                'net.peer.name': url == null ? void 0 : url.hostname,
                'net.peer.port': (url == null ? void 0 : url.port) || undefined
            }
        }, async ()=>{
            var _getRequestMeta;
            // If this is an internal fetch, we should not do any special treatment.
            if (isInternal) {
                return originFetch(input, init);
            }
            // If the workStore is not available, we can't do any
            // special treatment of fetch, therefore fallback to the original
            // fetch implementation.
            if (!workStore) {
                return originFetch(input, init);
            }
            // We should also fallback to the original fetch implementation if we
            // are in draft mode, it does not constitute a static generation.
            if (workStore.isDraftMode) {
                return originFetch(input, init);
            }
            const isRequestInput = input && typeof input === 'object' && typeof input.method === 'string';
            const getRequestMeta = (field)=>{
                // If request input is present but init is not, retrieve from input first.
                const value = init == null ? void 0 : init[field];
                return value || (isRequestInput ? input[field] : null);
            };
            let finalRevalidate = undefined;
            const getNextField = (field)=>{
                var _init_next, _init_next1, _input_next;
                return typeof (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next[field]) !== 'undefined' ? init == null ? void 0 : (_init_next1 = init.next) == null ? void 0 : _init_next1[field] : isRequestInput ? (_input_next = input.next) == null ? void 0 : _input_next[field] : undefined;
            };
            // RequestInit doesn't keep extra fields e.g. next so it's
            // only available if init is used separate
            const originalFetchRevalidate = getNextField('revalidate');
            let currentFetchRevalidate = originalFetchRevalidate;
            const tags = validateTags(getNextField('tags') || [], `fetch ${input.toString()}`);
            let revalidateStore;
            if (workUnitStore) {
                switch(workUnitStore.type){
                    case 'prerender':
                    case 'prerender-runtime':
                    // TODO: Stop accumulating tags in client prerender. (fallthrough)
                    case 'prerender-client':
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'cache':
                    case 'private-cache':
                        revalidateStore = workUnitStore;
                        break;
                    case 'request':
                    case 'unstable-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            if (revalidateStore) {
                if (Array.isArray(tags)) {
                    // Collect tags onto parent caches or parent prerenders.
                    const collectedTags = revalidateStore.tags ?? (revalidateStore.tags = []);
                    for (const tag of tags){
                        if (!collectedTags.includes(tag)) {
                            collectedTags.push(tag);
                        }
                    }
                }
            }
            const implicitTags = workUnitStore == null ? void 0 : workUnitStore.implicitTags;
            let pageFetchCacheMode = workStore.fetchCache;
            if (workUnitStore) {
                switch(workUnitStore.type){
                    case 'unstable-cache':
                        // Inside unstable-cache we treat it the same as force-no-store on
                        // the page.
                        pageFetchCacheMode = 'force-no-store';
                        break;
                    case 'prerender':
                    case 'prerender-client':
                    case 'prerender-runtime':
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'request':
                    case 'cache':
                    case 'private-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            const isUsingNoStore = !!workStore.isUnstableNoStore;
            let currentFetchCacheConfig = getRequestMeta('cache');
            let cacheReason = '';
            let cacheWarning;
            if (typeof currentFetchCacheConfig === 'string' && typeof currentFetchRevalidate !== 'undefined') {
                // If the revalidate value conflicts with the cache value, we should warn the user and unset the conflicting values.
                const isConflictingRevalidate = currentFetchCacheConfig === 'force-cache' && currentFetchRevalidate === 0 || // revalidate: >0 or revalidate: false and cache: no-store
                currentFetchCacheConfig === 'no-store' && (currentFetchRevalidate > 0 || currentFetchRevalidate === false);
                if (isConflictingRevalidate) {
                    cacheWarning = `Specified "cache: ${currentFetchCacheConfig}" and "revalidate: ${currentFetchRevalidate}", only one should be specified.`;
                    currentFetchCacheConfig = undefined;
                    currentFetchRevalidate = undefined;
                }
            }
            const hasExplicitFetchCacheOptOut = currentFetchCacheConfig === 'no-cache' || currentFetchCacheConfig === 'no-store' || // the fetch isn't explicitly caching and the segment level cache config signals not to cache
            // note: `pageFetchCacheMode` is also set by being in an unstable_cache context.
            pageFetchCacheMode === 'force-no-store' || pageFetchCacheMode === 'only-no-store';
            // If no explicit fetch cache mode is set, but dynamic = `force-dynamic` is set,
            // we shouldn't consider caching the fetch. This is because the `dynamic` cache
            // is considered a "top-level" cache mode, whereas something like `fetchCache` is more
            // fine-grained. Top-level modes are responsible for setting reasonable defaults for the
            // other configurations.
            const noFetchConfigAndForceDynamic = !pageFetchCacheMode && !currentFetchCacheConfig && !currentFetchRevalidate && workStore.forceDynamic;
            if (// which will signal the cache to not revalidate
            currentFetchCacheConfig === 'force-cache' && typeof currentFetchRevalidate === 'undefined') {
                currentFetchRevalidate = false;
            } else if (hasExplicitFetchCacheOptOut || noFetchConfigAndForceDynamic) {
                currentFetchRevalidate = 0;
            }
            if (currentFetchCacheConfig === 'no-cache' || currentFetchCacheConfig === 'no-store') {
                cacheReason = `cache: ${currentFetchCacheConfig}`;
            }
            finalRevalidate = validateRevalidate(currentFetchRevalidate, workStore.route);
            const _headers = getRequestMeta('headers');
            const initHeaders = typeof (_headers == null ? void 0 : _headers.get) === 'function' ? _headers : new Headers(_headers || {});
            const hasUnCacheableHeader = initHeaders.get('authorization') || initHeaders.get('cookie');
            const isUnCacheableMethod = ![
                'get',
                'head'
            ].includes(((_getRequestMeta = getRequestMeta('method')) == null ? void 0 : _getRequestMeta.toLowerCase()) || 'get');
            /**
         * We automatically disable fetch caching under the following conditions:
         * - Fetch cache configs are not set. Specifically:
         *    - A page fetch cache mode is not set (export const fetchCache=...)
         *    - A fetch cache mode is not set in the fetch call (fetch(url, { cache: ... }))
         *      or the fetch cache mode is set to 'default'
         *    - A fetch revalidate value is not set in the fetch call (fetch(url, { revalidate: ... }))
         * - OR the fetch comes after a configuration that triggered dynamic rendering (e.g., reading cookies())
         *   and the fetch was considered uncacheable (e.g., POST method or has authorization headers)
         */ const hasNoExplicitCacheConfig = pageFetchCacheMode == undefined && // eslint-disable-next-line eqeqeq
            (currentFetchCacheConfig == undefined || // when considering whether to opt into the default "no-cache" fetch semantics,
            // a "default" cache config should be treated the same as no cache config
            currentFetchCacheConfig === 'default') && // eslint-disable-next-line eqeqeq
            currentFetchRevalidate == undefined;
            let autoNoCache = Boolean((hasUnCacheableHeader || isUnCacheableMethod) && (revalidateStore == null ? void 0 : revalidateStore.revalidate) === 0);
            let isImplicitBuildTimeCache = false;
            if (!autoNoCache && hasNoExplicitCacheConfig) {
                // We don't enable automatic no-cache behavior during build-time
                // prerendering so that we can still leverage the fetch cache between
                // export workers.
                if (workStore.isBuildTimePrerendering) {
                    isImplicitBuildTimeCache = true;
                } else {
                    autoNoCache = true;
                }
            }
            // If we have no cache config, and we're in Dynamic I/O prerendering,
            // it'll be a dynamic call. We don't have to issue that dynamic call.
            if (hasNoExplicitCacheConfig && workUnitStore !== undefined) {
                switch(workUnitStore.type){
                    case 'prerender':
                    case 'prerender-runtime':
                    // While we don't want to do caching in the client scope we know the
                    // fetch will be dynamic for cacheComponents so we may as well avoid the
                    // call here. (fallthrough)
                    case 'prerender-client':
                        if (cacheSignal) {
                            cacheSignal.endRead();
                            cacheSignal = null;
                        }
                        return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                    case 'request':
                        if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                            if (cacheSignal) {
                                cacheSignal.endRead();
                                cacheSignal = null;
                            }
                            await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                        }
                        break;
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'cache':
                    case 'private-cache':
                    case 'unstable-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            switch(pageFetchCacheMode){
                case 'force-no-store':
                    {
                        cacheReason = 'fetchCache = force-no-store';
                        break;
                    }
                case 'only-no-store':
                    {
                        if (currentFetchCacheConfig === 'force-cache' || typeof finalRevalidate !== 'undefined' && finalRevalidate > 0) {
                            throw Object.defineProperty(new Error(`cache: 'force-cache' used on fetch for ${fetchUrl} with 'export const fetchCache = 'only-no-store'`), "__NEXT_ERROR_CODE", {
                                value: "E448",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        cacheReason = 'fetchCache = only-no-store';
                        break;
                    }
                case 'only-cache':
                    {
                        if (currentFetchCacheConfig === 'no-store') {
                            throw Object.defineProperty(new Error(`cache: 'no-store' used on fetch for ${fetchUrl} with 'export const fetchCache = 'only-cache'`), "__NEXT_ERROR_CODE", {
                                value: "E521",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        break;
                    }
                case 'force-cache':
                    {
                        if (typeof currentFetchRevalidate === 'undefined' || currentFetchRevalidate === 0) {
                            cacheReason = 'fetchCache = force-cache';
                            finalRevalidate = _constants1.INFINITE_CACHE;
                        }
                        break;
                    }
                case 'default-cache':
                case 'default-no-store':
                case 'auto':
                case undefined:
                    break;
                default:
                    pageFetchCacheMode;
            }
            if (typeof finalRevalidate === 'undefined') {
                if (pageFetchCacheMode === 'default-cache' && !isUsingNoStore) {
                    finalRevalidate = _constants1.INFINITE_CACHE;
                    cacheReason = 'fetchCache = default-cache';
                } else if (pageFetchCacheMode === 'default-no-store') {
                    finalRevalidate = 0;
                    cacheReason = 'fetchCache = default-no-store';
                } else if (isUsingNoStore) {
                    finalRevalidate = 0;
                    cacheReason = 'noStore call';
                } else if (autoNoCache) {
                    finalRevalidate = 0;
                    cacheReason = 'auto no cache';
                } else {
                    // TODO: should we consider this case an invariant?
                    cacheReason = 'auto cache';
                    finalRevalidate = revalidateStore ? revalidateStore.revalidate : _constants1.INFINITE_CACHE;
                }
            } else if (!cacheReason) {
                cacheReason = `revalidate: ${finalRevalidate}`;
            }
            if (// `revalidate: 0` values
            !(workStore.forceStatic && finalRevalidate === 0) && // we don't consider autoNoCache to switch to dynamic for ISR
            !autoNoCache && // If the revalidate value isn't currently set or the value is less
            // than the current revalidate value, we should update the revalidate
            // value.
            revalidateStore && finalRevalidate < revalidateStore.revalidate) {
                // If we were setting the revalidate value to 0, we should try to
                // postpone instead first.
                if (finalRevalidate === 0) {
                    if (workUnitStore) {
                        switch(workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                if (cacheSignal) {
                                    cacheSignal.endRead();
                                    cacheSignal = null;
                                }
                                return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                    if (cacheSignal) {
                                        cacheSignal.endRead();
                                        cacheSignal = null;
                                    }
                                    await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                }
                                break;
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                                break;
                            default:
                                workUnitStore;
                        }
                    }
                    (0, _dynamicrendering.markCurrentScopeAsDynamic)(workStore, workUnitStore, `revalidate: 0 fetch ${input} ${workStore.route}`);
                }
                // We only want to set the revalidate store's revalidate time if it
                // was explicitly set for the fetch call, i.e.
                // originalFetchRevalidate.
                if (revalidateStore && originalFetchRevalidate === finalRevalidate) {
                    revalidateStore.revalidate = finalRevalidate;
                }
            }
            const isCacheableRevalidate = typeof finalRevalidate === 'number' && finalRevalidate > 0;
            let cacheKey;
            const { incrementalCache } = workStore;
            let isHmrRefresh = false;
            let serverComponentsHmrCache;
            if (workUnitStore) {
                switch(workUnitStore.type){
                    case 'request':
                    case 'cache':
                    case 'private-cache':
                        isHmrRefresh = workUnitStore.isHmrRefresh ?? false;
                        serverComponentsHmrCache = workUnitStore.serverComponentsHmrCache;
                        break;
                    case 'prerender':
                    case 'prerender-client':
                    case 'prerender-runtime':
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'unstable-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            if (incrementalCache && (isCacheableRevalidate || serverComponentsHmrCache)) {
                try {
                    cacheKey = await incrementalCache.generateCacheKey(fetchUrl, isRequestInput ? input : init);
                } catch (err) {
                    console.error(`Failed to generate cache key for`, input);
                }
            }
            const fetchIdx = workStore.nextFetchId ?? 1;
            workStore.nextFetchId = fetchIdx + 1;
            let handleUnlock = ()=>{};
            const doOriginalFetch = async (isStale, cacheReasonOverride)=>{
                const requestInputFields = [
                    'cache',
                    'credentials',
                    'headers',
                    'integrity',
                    'keepalive',
                    'method',
                    'mode',
                    'redirect',
                    'referrer',
                    'referrerPolicy',
                    'window',
                    'duplex',
                    // don't pass through signal when revalidating
                    ...isStale ? [] : [
                        'signal'
                    ]
                ];
                if (isRequestInput) {
                    const reqInput = input;
                    const reqOptions = {
                        body: reqInput._ogBody || reqInput.body
                    };
                    for (const field of requestInputFields){
                        // @ts-expect-error custom fields
                        reqOptions[field] = reqInput[field];
                    }
                    input = new Request(reqInput.url, reqOptions);
                } else if (init) {
                    const { _ogBody, body, signal, ...otherInput } = init;
                    init = {
                        ...otherInput,
                        body: _ogBody || body,
                        signal: isStale ? undefined : signal
                    };
                }
                // add metadata to init without editing the original
                const clonedInit = {
                    ...init,
                    next: {
                        ...init == null ? void 0 : init.next,
                        fetchType: 'origin',
                        fetchIdx
                    }
                };
                return originFetch(input, clonedInit).then(async (res)=>{
                    if (!isStale && fetchStart) {
                        trackFetchMetric(workStore, {
                            start: fetchStart,
                            url: fetchUrl,
                            cacheReason: cacheReasonOverride || cacheReason,
                            cacheStatus: finalRevalidate === 0 || cacheReasonOverride ? 'skip' : 'miss',
                            cacheWarning,
                            status: res.status,
                            method: clonedInit.method || 'GET'
                        });
                    }
                    if (res.status === 200 && incrementalCache && cacheKey && (isCacheableRevalidate || serverComponentsHmrCache)) {
                        const normalizedRevalidate = finalRevalidate >= _constants1.INFINITE_CACHE ? _constants1.CACHE_ONE_YEAR : finalRevalidate;
                        const incrementalCacheConfig = isCacheableRevalidate ? {
                            fetchCache: true,
                            fetchUrl,
                            fetchIdx,
                            tags,
                            isImplicitBuildTimeCache
                        } : undefined;
                        switch(workUnitStore == null ? void 0 : workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                return createCachedPrerenderResponse(res, cacheKey, incrementalCacheConfig, incrementalCache, normalizedRevalidate, handleUnlock);
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering && workUnitStore.cacheSignal) {
                                    // We're filling caches for a staged render,
                                    // so we need to wait for the response to finish instead of streaming.
                                    return createCachedPrerenderResponse(res, cacheKey, incrementalCacheConfig, incrementalCache, normalizedRevalidate, handleUnlock);
                                }
                            // fallthrough
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                            case undefined:
                                return createCachedDynamicResponse(workStore, res, cacheKey, incrementalCacheConfig, incrementalCache, serverComponentsHmrCache, normalizedRevalidate, input, handleUnlock);
                            default:
                                workUnitStore;
                        }
                    }
                    // we had response that we determined shouldn't be cached so we return it
                    // and don't cache it. This also needs to unlock the cache lock we acquired.
                    await handleUnlock();
                    return res;
                }).catch((error)=>{
                    handleUnlock();
                    throw error;
                });
            };
            let cacheReasonOverride;
            let isForegroundRevalidate = false;
            let isHmrRefreshCache = false;
            if (cacheKey && incrementalCache) {
                let cachedFetchData;
                if (isHmrRefresh && serverComponentsHmrCache) {
                    cachedFetchData = serverComponentsHmrCache.get(cacheKey);
                    isHmrRefreshCache = true;
                }
                if (isCacheableRevalidate && !cachedFetchData) {
                    handleUnlock = await incrementalCache.lock(cacheKey);
                    const entry = workStore.isOnDemandRevalidate ? null : await incrementalCache.get(cacheKey, {
                        kind: _responsecache.IncrementalCacheKind.FETCH,
                        revalidate: finalRevalidate,
                        fetchUrl,
                        fetchIdx,
                        tags,
                        softTags: implicitTags == null ? void 0 : implicitTags.tags
                    });
                    if (hasNoExplicitCacheConfig && workUnitStore) {
                        switch(workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                // We sometimes use the cache to dedupe fetches that do not
                                // specify a cache configuration. In these cases we want to
                                // make sure we still exclude them from prerenders if
                                // cacheComponents is on so we introduce an artificial task boundary
                                // here.
                                await getTimeoutBoundary();
                                break;
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                    await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                }
                                break;
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                                break;
                            default:
                                workUnitStore;
                        }
                    }
                    if (entry) {
                        await handleUnlock();
                    } else {
                        // in dev, incremental cache response will be null in case the browser adds `cache-control: no-cache` in the request headers
                        // TODO: it seems like we also hit this after revalidates in dev?
                        cacheReasonOverride = 'cache-control: no-cache (hard refresh)';
                    }
                    if ((entry == null ? void 0 : entry.value) && entry.value.kind === _responsecache.CachedRouteKind.FETCH) {
                        // when stale and is revalidating we wait for fresh data
                        // so the revalidated entry has the updated data
                        if (workStore.isStaticGeneration && entry.isStale) {
                            isForegroundRevalidate = true;
                        } else {
                            if (entry.isStale) {
                                workStore.pendingRevalidates ??= {};
                                if (!workStore.pendingRevalidates[cacheKey]) {
                                    const pendingRevalidate = doOriginalFetch(true).then(async (response)=>({
                                            body: await response.arrayBuffer(),
                                            headers: response.headers,
                                            status: response.status,
                                            statusText: response.statusText
                                        })).finally(()=>{
                                        workStore.pendingRevalidates ??= {};
                                        delete workStore.pendingRevalidates[cacheKey || ''];
                                    });
                                    // Attach the empty catch here so we don't get a "unhandled
                                    // promise rejection" warning.
                                    pendingRevalidate.catch(console.error);
                                    workStore.pendingRevalidates[cacheKey] = pendingRevalidate;
                                }
                            }
                            cachedFetchData = entry.value.data;
                        }
                    }
                }
                if (cachedFetchData) {
                    if (fetchStart) {
                        trackFetchMetric(workStore, {
                            start: fetchStart,
                            url: fetchUrl,
                            cacheReason,
                            cacheStatus: isHmrRefreshCache ? 'hmr' : 'hit',
                            cacheWarning,
                            status: cachedFetchData.status || 200,
                            method: (init == null ? void 0 : init.method) || 'GET'
                        });
                    }
                    const response = new Response(Buffer.from(cachedFetchData.body, 'base64'), {
                        headers: cachedFetchData.headers,
                        status: cachedFetchData.status
                    });
                    Object.defineProperty(response, 'url', {
                        value: cachedFetchData.url
                    });
                    return response;
                }
            }
            if ((workStore.isStaticGeneration || ("TURBOPACK compile-time value", "development") === 'development' && ("TURBOPACK compile-time value", false) && workUnitStore && // eslint-disable-next-line no-restricted-syntax
            workUnitStore.type === 'request' && workUnitStore.stagedRendering) && init && typeof init === 'object') {
                const { cache } = init;
                // Delete `cache` property as Cloudflare Workers will throw an error
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                if (cache === 'no-store') {
                    // If enabled, we should bail out of static generation.
                    if (workUnitStore) {
                        switch(workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                if (cacheSignal) {
                                    cacheSignal.endRead();
                                    cacheSignal = null;
                                }
                                return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                    if (cacheSignal) {
                                        cacheSignal.endRead();
                                        cacheSignal = null;
                                    }
                                    await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                }
                                break;
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                                break;
                            default:
                                workUnitStore;
                        }
                    }
                    (0, _dynamicrendering.markCurrentScopeAsDynamic)(workStore, workUnitStore, `no-store fetch ${input} ${workStore.route}`);
                }
                const hasNextConfig = 'next' in init;
                const { next = {} } = init;
                if (typeof next.revalidate === 'number' && revalidateStore && next.revalidate < revalidateStore.revalidate) {
                    if (next.revalidate === 0) {
                        // If enabled, we should bail out of static generation.
                        if (workUnitStore) {
                            switch(workUnitStore.type){
                                case 'prerender':
                                case 'prerender-client':
                                case 'prerender-runtime':
                                    return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                                case 'request':
                                    if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                        await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                    }
                                    break;
                                case 'cache':
                                case 'private-cache':
                                case 'unstable-cache':
                                case 'prerender-legacy':
                                case 'prerender-ppr':
                                    break;
                                default:
                                    workUnitStore;
                            }
                        }
                        (0, _dynamicrendering.markCurrentScopeAsDynamic)(workStore, workUnitStore, `revalidate: 0 fetch ${input} ${workStore.route}`);
                    }
                    if (!workStore.forceStatic || next.revalidate !== 0) {
                        revalidateStore.revalidate = next.revalidate;
                    }
                }
                if (hasNextConfig) delete init.next;
            }
            // if we are revalidating the whole page via time or on-demand and
            // the fetch cache entry is stale we should still de-dupe the
            // origin hit if it's a cache-able entry
            if (cacheKey && isForegroundRevalidate) {
                const pendingRevalidateKey = cacheKey;
                workStore.pendingRevalidates ??= {};
                let pendingRevalidate = workStore.pendingRevalidates[pendingRevalidateKey];
                if (pendingRevalidate) {
                    const revalidatedResult = await pendingRevalidate;
                    return new Response(revalidatedResult.body, {
                        headers: revalidatedResult.headers,
                        status: revalidatedResult.status,
                        statusText: revalidatedResult.statusText
                    });
                }
                // We used to just resolve the Response and clone it however for
                // static generation with cacheComponents we need the response to be able to
                // be resolved in a microtask and cloning the response will never have
                // a body that can resolve in a microtask in node (as observed through
                // experimentation) So instead we await the body and then when it is
                // available we construct manually cloned Response objects with the
                // body as an ArrayBuffer. This will be resolvable in a microtask
                // making it compatible with cacheComponents.
                const pendingResponse = doOriginalFetch(true, cacheReasonOverride) // We're cloning the response using this utility because there
                // exists a bug in the undici library around response cloning.
                // See the following pull request for more details:
                // https://github.com/vercel/next.js/pull/73274
                .then(_cloneresponse.cloneResponse);
                pendingRevalidate = pendingResponse.then(async (responses)=>{
                    const response = responses[0];
                    return {
                        body: await response.arrayBuffer(),
                        headers: response.headers,
                        status: response.status,
                        statusText: response.statusText
                    };
                }).finally(()=>{
                    var _workStore_pendingRevalidates;
                    // If the pending revalidate is not present in the store, then
                    // we have nothing to delete.
                    if (!((_workStore_pendingRevalidates = workStore.pendingRevalidates) == null ? void 0 : _workStore_pendingRevalidates[pendingRevalidateKey])) {
                        return;
                    }
                    delete workStore.pendingRevalidates[pendingRevalidateKey];
                });
                // Attach the empty catch here so we don't get a "unhandled promise
                // rejection" warning
                pendingRevalidate.catch(()=>{});
                workStore.pendingRevalidates[pendingRevalidateKey] = pendingRevalidate;
                return pendingResponse.then((responses)=>responses[1]);
            } else {
                return doOriginalFetch(false, cacheReasonOverride);
            }
        });
        if (cacheSignal) {
            try {
                return await result;
            } finally{
                if (cacheSignal) {
                    cacheSignal.endRead();
                }
            }
        }
        return result;
    };
    // Attach the necessary properties to the patched fetch function.
    // We don't use this to determine if the fetch function has been patched,
    // but for external consumers to determine if the fetch function has been
    // patched.
    patched.__nextPatched = true;
    patched.__nextGetStaticStore = ()=>workAsyncStorage;
    patched._nextOriginalFetch = originFetch;
    globalThis[NEXT_PATCH_SYMBOL] = true;
    // Assign the function name also as a name property, so that it's preserved
    // even when mangling is enabled.
    Object.defineProperty(patched, 'name', {
        value: 'fetch',
        writable: false
    });
    return patched;
}
function patchFetch(options) {
    // If we've already patched fetch, we should not patch it again.
    if (isFetchPatched()) return;
    // Grab the original fetch function. We'll attach this so we can use it in
    // the patched fetch function.
    const original = (0, _dedupefetch.createDedupeFetch)(globalThis.fetch);
    // Set the global fetch to the patched fetch.
    globalThis.fetch = createPatchedFetcher(original, options);
}
let currentTimeoutBoundary = null;
function getTimeoutBoundary() {
    if (!currentTimeoutBoundary) {
        currentTimeoutBoundary = new Promise((r)=>{
            setTimeout(()=>{
                currentTimeoutBoundary = null;
                r();
            }, 0);
        });
    }
    return currentTimeoutBoundary;
} //# sourceMappingURL=patch-fetch.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/unstable-cache.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_cache", {
    enumerable: true,
    get: function() {
        return unstable_cache;
    }
});
const _constants = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/constants.js [app-rsc] (ecmascript)");
const _patchfetch = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/patch-fetch.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _responsecache = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/response-cache/index.js [app-rsc] (ecmascript)");
let noStoreFetchIdx = 0;
async function cacheNewResult(result, incrementalCache, cacheKey, tags, revalidate, fetchIdx, fetchUrl) {
    await incrementalCache.set(cacheKey, {
        kind: _responsecache.CachedRouteKind.FETCH,
        data: {
            headers: {},
            // TODO: handle non-JSON values?
            body: JSON.stringify(result),
            status: 200,
            url: ''
        },
        revalidate: typeof revalidate !== 'number' ? _constants.CACHE_ONE_YEAR : revalidate
    }, {
        fetchCache: true,
        tags,
        fetchIdx,
        fetchUrl
    });
    return;
}
function unstable_cache(cb, keyParts, options = {}) {
    if (options.revalidate === 0) {
        throw Object.defineProperty(new Error(`Invariant revalidate: 0 can not be passed to unstable_cache(), must be "false" or "> 0" ${cb.toString()}`), "__NEXT_ERROR_CODE", {
            value: "E57",
            enumerable: false,
            configurable: true
        });
    }
    // Validate the tags provided are valid
    const tags = options.tags ? (0, _patchfetch.validateTags)(options.tags, `unstable_cache ${cb.toString()}`) : [];
    // Validate the revalidate options
    (0, _patchfetch.validateRevalidate)(options.revalidate, `unstable_cache ${cb.name || cb.toString()}`);
    // Stash the fixed part of the key at construction time. The invocation key will combine
    // the fixed key with the arguments when actually called
    // @TODO if cb.toString() is long we should hash it
    // @TODO come up with a collision-free way to combine keyParts
    // @TODO consider validating the keyParts are all strings. TS can't provide runtime guarantees
    // and the error produced by accidentally using something that cannot be safely coerced is likely
    // hard to debug
    const fixedKey = `${cb.toString()}-${Array.isArray(keyParts) && keyParts.join(',')}`;
    const cachedCb = async (...args)=>{
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        // We must be able to find the incremental cache otherwise we throw
        const maybeIncrementalCache = (workStore == null ? void 0 : workStore.incrementalCache) || globalThis.__incrementalCache;
        if (!maybeIncrementalCache) {
            throw Object.defineProperty(new Error(`Invariant: incrementalCache missing in unstable_cache ${cb.toString()}`), "__NEXT_ERROR_CODE", {
                value: "E469",
                enumerable: false,
                configurable: true
            });
        }
        const incrementalCache = maybeIncrementalCache;
        const cacheSignal = workUnitStore ? (0, _workunitasyncstorageexternal.getCacheSignal)(workUnitStore) : null;
        if (cacheSignal) {
            cacheSignal.beginRead();
        }
        try {
            // If there's no request store, we aren't in a request (or we're not in
            // app router) and if there's no static generation store, we aren't in app
            // router. Default to an empty pathname and search params when there's no
            // request store or static generation store available.
            const fetchUrlPrefix = workStore && workUnitStore ? getFetchUrlPrefix(workStore, workUnitStore) : '';
            // Construct the complete cache key for this function invocation
            // @TODO stringify is likely not safe here. We will coerce undefined to null which will make
            // the keyspace smaller than the execution space
            const invocationKey = `${fixedKey}-${JSON.stringify(args)}`;
            const cacheKey = await incrementalCache.generateCacheKey(invocationKey);
            // $urlWithPath,$sortedQueryStringKeys,$hashOfEveryThingElse
            const fetchUrl = `unstable_cache ${fetchUrlPrefix} ${cb.name ? ` ${cb.name}` : cacheKey}`;
            const fetchIdx = (workStore ? workStore.nextFetchId : noStoreFetchIdx) ?? 1;
            const implicitTags = workUnitStore == null ? void 0 : workUnitStore.implicitTags;
            const innerCacheStore = {
                type: 'unstable-cache',
                phase: 'render',
                implicitTags,
                draftMode: workUnitStore && workStore && (0, _workunitasyncstorageexternal.getDraftModeProviderForCacheScope)(workStore, workUnitStore)
            };
            if (workStore) {
                workStore.nextFetchId = fetchIdx + 1;
                // We are in an App Router context. We try to return the cached entry if it exists and is valid
                // If the entry is fresh we return it. If the entry is stale we return it but revalidate the entry in
                // the background. If the entry is missing or invalid we generate a new entry and return it.
                let isNestedUnstableCache = false;
                if (workUnitStore) {
                    switch(workUnitStore.type){
                        case 'cache':
                        case 'private-cache':
                        case 'prerender':
                        case 'prerender-runtime':
                        case 'prerender-ppr':
                        case 'prerender-legacy':
                            // We update the store's revalidate property if the option.revalidate is a higher precedence
                            // options.revalidate === undefined doesn't affect timing.
                            // options.revalidate === false doesn't shrink timing. it stays at the maximum.
                            if (typeof options.revalidate === 'number') {
                                if (workUnitStore.revalidate < options.revalidate) {
                                // The store is already revalidating on a shorter time interval, leave it alone
                                } else {
                                    workUnitStore.revalidate = options.revalidate;
                                }
                            }
                            // We need to accumulate the tags for this invocation within the store
                            const collectedTags = workUnitStore.tags;
                            if (collectedTags === null) {
                                workUnitStore.tags = tags.slice();
                            } else {
                                for (const tag of tags){
                                    // @TODO refactor tags to be a set to avoid this O(n) lookup
                                    if (!collectedTags.includes(tag)) {
                                        collectedTags.push(tag);
                                    }
                                }
                            }
                            break;
                        case 'unstable-cache':
                            isNestedUnstableCache = true;
                            break;
                        case 'prerender-client':
                        case 'request':
                            break;
                        default:
                            workUnitStore;
                    }
                }
                if (// we should bypass cache similar to fetches
                !isNestedUnstableCache && workStore.fetchCache !== 'force-no-store' && !workStore.isOnDemandRevalidate && !incrementalCache.isOnDemandRevalidate && !workStore.isDraftMode) {
                    // We attempt to get the current cache entry from the incremental cache.
                    const cacheEntry = await incrementalCache.get(cacheKey, {
                        kind: _responsecache.IncrementalCacheKind.FETCH,
                        revalidate: options.revalidate,
                        tags,
                        softTags: implicitTags == null ? void 0 : implicitTags.tags,
                        fetchIdx,
                        fetchUrl
                    });
                    if (cacheEntry && cacheEntry.value) {
                        // The entry exists and has a value
                        if (cacheEntry.value.kind !== _responsecache.CachedRouteKind.FETCH) {
                            // The entry is invalid and we need a special warning
                            // @TODO why do we warn this way? Should this just be an error? How are these errors surfaced
                            // so bugs can be reported
                            // @TODO the invocation key can have sensitive data in it. we should not log this entire object
                            console.error(`Invariant invalid cacheEntry returned for ${invocationKey}`);
                        // will fall through to generating a new cache entry below
                        } else {
                            // We have a valid cache entry so we will be returning it. We also check to see if we need
                            // to background revalidate it by checking if it is stale.
                            const cachedResponse = cacheEntry.value.data.body !== undefined ? JSON.parse(cacheEntry.value.data.body) : undefined;
                            if (cacheEntry.isStale) {
                                if (!workStore.pendingRevalidates) {
                                    workStore.pendingRevalidates = {};
                                }
                                // Check if there's already a pending revalidation to avoid duplicate work
                                if (!workStore.pendingRevalidates[invocationKey]) {
                                    // Create the revalidation promise
                                    const revalidationPromise = _workunitasyncstorageexternal.workUnitAsyncStorage.run(innerCacheStore, cb, ...args).then(async (result)=>{
                                        await cacheNewResult(result, incrementalCache, cacheKey, tags, options.revalidate, fetchIdx, fetchUrl);
                                        return result;
                                    }).catch((err)=>{
                                        // @TODO This error handling seems wrong. We swallow the error?
                                        console.error(`revalidating cache with key: ${invocationKey}`, err);
                                        // Return the stale value on error for foreground revalidation
                                        return cachedResponse;
                                    });
                                    // Attach the empty catch here so we don't get a "unhandled promise
                                    // rejection" warning. (Behavior is matched with patch-fetch)
                                    if (workStore.isStaticGeneration) {
                                        revalidationPromise.catch(()=>{});
                                    }
                                    workStore.pendingRevalidates[invocationKey] = revalidationPromise;
                                }
                                // Check if we need to do foreground revalidation
                                if (workStore.isStaticGeneration) {
                                    // When the page is revalidating and the cache entry is stale,
                                    // we need to wait for fresh data (blocking revalidate)
                                    return workStore.pendingRevalidates[invocationKey];
                                }
                            // Otherwise, we're doing background revalidation - return stale immediately
                            }
                            // We had a valid cache entry so we return it here
                            return cachedResponse;
                        }
                    }
                }
                // If we got this far then we had an invalid cache entry and need to generate a new one
                const result = await _workunitasyncstorageexternal.workUnitAsyncStorage.run(innerCacheStore, cb, ...args);
                if (!workStore.isDraftMode) {
                    if (!workStore.pendingRevalidates) {
                        workStore.pendingRevalidates = {};
                    }
                    // We need to push the cache result promise to pending
                    // revalidates otherwise it won't be awaited and is just
                    // dangling
                    workStore.pendingRevalidates[invocationKey] = cacheNewResult(result, incrementalCache, cacheKey, tags, options.revalidate, fetchIdx, fetchUrl);
                }
                return result;
            } else {
                noStoreFetchIdx += 1;
                // We are in Pages Router or were called outside of a render. We don't have a store
                // so we just call the callback directly when it needs to run.
                // If the entry is fresh we return it. If the entry is stale we return it but revalidate the entry in
                // the background. If the entry is missing or invalid we generate a new entry and return it.
                if (!incrementalCache.isOnDemandRevalidate) {
                    // We aren't doing an on demand revalidation so we check use the cache if valid
                    const cacheEntry = await incrementalCache.get(cacheKey, {
                        kind: _responsecache.IncrementalCacheKind.FETCH,
                        revalidate: options.revalidate,
                        tags,
                        fetchIdx,
                        fetchUrl,
                        softTags: implicitTags == null ? void 0 : implicitTags.tags
                    });
                    if (cacheEntry && cacheEntry.value) {
                        // The entry exists and has a value
                        if (cacheEntry.value.kind !== _responsecache.CachedRouteKind.FETCH) {
                            // The entry is invalid and we need a special warning
                            // @TODO why do we warn this way? Should this just be an error? How are these errors surfaced
                            // so bugs can be reported
                            console.error(`Invariant invalid cacheEntry returned for ${invocationKey}`);
                        // will fall through to generating a new cache entry below
                        } else if (!cacheEntry.isStale) {
                            // We have a valid cache entry and it is fresh so we return it
                            return cacheEntry.value.data.body !== undefined ? JSON.parse(cacheEntry.value.data.body) : undefined;
                        }
                    }
                }
                // If we got this far then we had an invalid cache entry and need to generate a new one
                const result = await _workunitasyncstorageexternal.workUnitAsyncStorage.run(innerCacheStore, cb, ...args);
                // we need to wait setting the new cache result here as
                // we don't have pending revalidates on workStore to
                // push to and we can't have a dangling promise
                await cacheNewResult(result, incrementalCache, cacheKey, tags, options.revalidate, fetchIdx, fetchUrl);
                return result;
            }
        } finally{
            if (cacheSignal) {
                cacheSignal.endRead();
            }
        }
    };
    // TODO: once AsyncLocalStorage.run() returns the correct types this override will no longer be necessary
    return cachedCb;
}
function getFetchUrlPrefix(workStore, workUnitStore) {
    switch(workUnitStore.type){
        case 'request':
            const pathname = workUnitStore.url.pathname;
            const searchParams = new URLSearchParams(workUnitStore.url.search);
            const sortedSearch = [
                ...searchParams.keys()
            ].sort((a, b)=>a.localeCompare(b)).map((key)=>`${key}=${searchParams.get(key)}`).join('&');
            return `${pathname}${sortedSearch.length ? '?' : ''}${sortedSearch}`;
        case 'prerender':
        case 'prerender-client':
        case 'prerender-runtime':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
            return workStore.route;
        default:
            return workUnitStore;
    }
} //# sourceMappingURL=unstable-cache.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getSortedRouteObjects: null,
    getSortedRoutes: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRouteObjects: function() {
        return getSortedRouteObjects;
    },
    getSortedRoutes: function() {
        return getSortedRoutes;
    }
});
class UrlNode {
    insert(urlPath) {
        this._insert(urlPath.split('/').filter(Boolean), [], false);
    }
    smoosh() {
        return this._smoosh();
    }
    _smoosh(prefix = '/') {
        const childrenPaths = [
            ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[]'), 1);
        }
        if (this.restSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[...]'), 1);
        }
        if (this.optionalRestSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[[...]]'), 1);
        }
        const routes = childrenPaths.map((c)=>this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr)=>[
                ...prev,
                ...curr
            ], []);
        if (this.slugName !== null) {
            routes.push(...this.children.get('[]')._smoosh(`${prefix}[${this.slugName}]/`));
        }
        if (!this.placeholder) {
            const r = prefix === '/' ? '/' : prefix.slice(0, -1);
            if (this.optionalRestSlugName != null) {
                throw Object.defineProperty(new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`), "__NEXT_ERROR_CODE", {
                    value: "E458",
                    enumerable: false,
                    configurable: true
                });
            }
            routes.unshift(r);
        }
        if (this.restSlugName !== null) {
            routes.push(...this.children.get('[...]')._smoosh(`${prefix}[...${this.restSlugName}]/`));
        }
        if (this.optionalRestSlugName !== null) {
            routes.push(...this.children.get('[[...]]')._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
        }
        return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
            this.placeholder = false;
            return;
        }
        if (isCatchAll) {
            throw Object.defineProperty(new Error(`Catch-all must be the last part of the URL.`), "__NEXT_ERROR_CODE", {
                value: "E392",
                enumerable: false,
                configurable: true
            });
        }
        // The next segment in the urlPaths list
        let nextSegment = urlPaths[0];
        // Check if the segment matches `[something]`
        if (nextSegment.startsWith('[') && nextSegment.endsWith(']')) {
            // Strip `[` and `]`, leaving only `something`
            let segmentName = nextSegment.slice(1, -1);
            let isOptional = false;
            if (segmentName.startsWith('[') && segmentName.endsWith(']')) {
                // Strip optional `[` and `]`, leaving only `something`
                segmentName = segmentName.slice(1, -1);
                isOptional = true;
            }
            if (segmentName.startsWith('…')) {
                throw Object.defineProperty(new Error(`Detected a three-dot character ('…') at ('${segmentName}'). Did you mean ('...')?`), "__NEXT_ERROR_CODE", {
                    value: "E147",
                    enumerable: false,
                    configurable: true
                });
            }
            if (segmentName.startsWith('...')) {
                // Strip `...`, leaving only `something`
                segmentName = segmentName.substring(3);
                isCatchAll = true;
            }
            if (segmentName.startsWith('[') || segmentName.endsWith(']')) {
                throw Object.defineProperty(new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`), "__NEXT_ERROR_CODE", {
                    value: "E421",
                    enumerable: false,
                    configurable: true
                });
            }
            if (segmentName.startsWith('.')) {
                throw Object.defineProperty(new Error(`Segment names may not start with erroneous periods ('${segmentName}').`), "__NEXT_ERROR_CODE", {
                    value: "E288",
                    enumerable: false,
                    configurable: true
                });
            }
            function handleSlug(previousSlug, nextSlug) {
                if (previousSlug !== null) {
                    // If the specific segment already has a slug but the slug is not `something`
                    // This prevents collisions like:
                    // pages/[post]/index.js
                    // pages/[id]/index.js
                    // Because currently multiple dynamic params on the same segment level are not supported
                    if (previousSlug !== nextSlug) {
                        // TODO: This error seems to be confusing for users, needs an error link, the description can be based on above comment.
                        throw Object.defineProperty(new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`), "__NEXT_ERROR_CODE", {
                            value: "E337",
                            enumerable: false,
                            configurable: true
                        });
                    }
                }
                slugNames.forEach((slug)=>{
                    if (slug === nextSlug) {
                        throw Object.defineProperty(new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`), "__NEXT_ERROR_CODE", {
                            value: "E247",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    if (slug.replace(/\W/g, '') === nextSegment.replace(/\W/g, '')) {
                        throw Object.defineProperty(new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`), "__NEXT_ERROR_CODE", {
                            value: "E499",
                            enumerable: false,
                            configurable: true
                        });
                    }
                });
                slugNames.push(nextSlug);
            }
            if (isCatchAll) {
                if (isOptional) {
                    if (this.restSlugName != null) {
                        throw Object.defineProperty(new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`), "__NEXT_ERROR_CODE", {
                            value: "E299",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    handleSlug(this.optionalRestSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.optionalRestSlugName = segmentName;
                    // nextSegment is overwritten to [[...]] so that it can later be sorted specifically
                    nextSegment = '[[...]]';
                } else {
                    if (this.optionalRestSlugName != null) {
                        throw Object.defineProperty(new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                            value: "E300",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    handleSlug(this.restSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.restSlugName = segmentName;
                    // nextSegment is overwritten to [...] so that it can later be sorted specifically
                    nextSegment = '[...]';
                }
            } else {
                if (isOptional) {
                    throw Object.defineProperty(new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                        value: "E435",
                        enumerable: false,
                        configurable: true
                    });
                }
                handleSlug(this.slugName, segmentName);
                // slugName is kept as it can only be one particular slugName
                this.slugName = segmentName;
                // nextSegment is overwritten to [] so that it can later be sorted specifically
                nextSegment = '[]';
            }
        }
        // If this UrlNode doesn't have the nextSegment yet we create a new child UrlNode
        if (!this.children.has(nextSegment)) {
            this.children.set(nextSegment, new UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
    constructor(){
        this.placeholder = true;
        this.children = new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
    }
}
function getSortedRoutes(normalizedPages) {
    // First the UrlNode is created, and every UrlNode can have only 1 dynamic segment
    // Eg you can't have pages/[post]/abc.js and pages/[hello]/something-else.js
    // Only 1 dynamic segment per nesting level
    // So in the case that is test/integration/dynamic-routing it'll be this:
    // pages/[post]/comments.js
    // pages/blog/[post]/comment/[id].js
    // Both are fine because `pages/[post]` and `pages/blog` are on the same level
    // So in this case `UrlNode` created here has `this.slugName === 'post'`
    // And since your PR passed through `slugName` as an array basically it'd including it in too many possibilities
    // Instead what has to be passed through is the upwards path's dynamic names
    const root = new UrlNode();
    // Here the `root` gets injected multiple paths, and insert will break them up into sublevels
    normalizedPages.forEach((pagePath)=>root.insert(pagePath));
    // Smoosh will then sort those sublevels up to the point where you get the correct route definition priority
    return root.smoosh();
}
function getSortedRouteObjects(objects, getter) {
    // We're assuming here that all the pathnames are unique, that way we can
    // sort the list and use the index as the key.
    const indexes = {};
    const pathnames = [];
    for(let i = 0; i < objects.length; i++){
        const pathname = getter(objects[i]);
        indexes[pathname] = i;
        pathnames[i] = pathname;
    }
    // Sort the pathnames.
    const sorted = getSortedRoutes(pathnames);
    // Map the sorted pathnames back to the original objects using the new sorted
    // index.
    return sorted.map((pathname)=>objects[indexes[pathname]]);
} //# sourceMappingURL=sorted-routes.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isDynamicRoute", {
    enumerable: true,
    get: function() {
        return isDynamicRoute;
    }
});
const _interceptionroutes = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)");
// Identify /.*[param].*/ in route string
const TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
// Identify /[param]/ in route string
const TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;
function isDynamicRoute(route, strict = true) {
    if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
        route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
    }
    if (strict) {
        return TEST_STRICT_ROUTE.test(route);
    }
    return TEST_ROUTE.test(route);
} //# sourceMappingURL=is-dynamic.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getSortedRouteObjects: null,
    getSortedRoutes: null,
    isDynamicRoute: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRouteObjects: function() {
        return _sortedroutes.getSortedRouteObjects;
    },
    getSortedRoutes: function() {
        return _sortedroutes.getSortedRoutes;
    },
    isDynamicRoute: function() {
        return _isdynamic.isDynamicRoute;
    }
});
const _sortedroutes = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js [app-rsc] (ecmascript)");
const _isdynamic = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [app-rsc] (ecmascript)"); //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    refresh: null,
    revalidatePath: null,
    revalidateTag: null,
    updateTag: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    refresh: function() {
        return refresh;
    },
    revalidatePath: function() {
        return revalidatePath;
    },
    revalidateTag: function() {
        return revalidateTag;
    },
    updateTag: function() {
        return updateTag;
    }
});
const _dynamicrendering = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/index.js [app-rsc] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/lib/constants.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _hooksservercontext = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/components/hooks-server-context.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _actionrevalidationkind = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/action-revalidation-kind.js [app-rsc] (ecmascript)");
function revalidateTag(tag, profile) {
    if (!profile) {
        console.warn('"revalidateTag" without the second argument is now deprecated, add second argument of "max" or use "updateTag". See more info here: https://nextjs.org/docs/messages/revalidate-tag-single-arg');
    }
    return revalidate([
        tag
    ], `revalidateTag ${tag}`, profile);
}
function updateTag(tag) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    // TODO: change this after investigating why phase: 'action' is
    // set for route handlers
    if (!workStore || workStore.page.endsWith('/route')) {
        throw Object.defineProperty(new Error('updateTag can only be called from within a Server Action. ' + 'To invalidate cache tags in Route Handlers or other contexts, use revalidateTag instead. ' + 'See more info here: https://nextjs.org/docs/app/api-reference/functions/updateTag'), "__NEXT_ERROR_CODE", {
            value: "E872",
            enumerable: false,
            configurable: true
        });
    }
    // updateTag uses immediate expiration (no profile) without deprecation warning
    return revalidate([
        tag
    ], `updateTag ${tag}`, undefined);
}
function refresh() {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore || workStore.page.endsWith('/route') || (workUnitStore == null ? void 0 : workUnitStore.phase) !== 'action') {
        throw Object.defineProperty(new Error('refresh can only be called from within a Server Action. ' + 'See more info here: https://nextjs.org/docs/app/api-reference/functions/refresh'), "__NEXT_ERROR_CODE", {
            value: "E870",
            enumerable: false,
            configurable: true
        });
    }
    if (workStore) {
        // The Server Action version of refresh() only revalidates the dynamic data
        // on the client. It doesn't affect cached data.
        workStore.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateDynamicOnly;
    }
}
function revalidatePath(originalPath, type) {
    if (originalPath.length > _constants.NEXT_CACHE_SOFT_TAG_MAX_LENGTH) {
        console.warn(`Warning: revalidatePath received "${originalPath}" which exceeded max length of ${_constants.NEXT_CACHE_SOFT_TAG_MAX_LENGTH}. See more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);
        return;
    }
    let normalizedPath = `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}${originalPath || '/'}`;
    if (type) {
        normalizedPath += `${normalizedPath.endsWith('/') ? '' : '/'}${type}`;
    } else if ((0, _utils.isDynamicRoute)(originalPath)) {
        console.warn(`Warning: a dynamic page path "${originalPath}" was passed to "revalidatePath", but the "type" parameter is missing. This has no effect by default, see more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);
    }
    const tags = [
        normalizedPath
    ];
    if (normalizedPath === `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/`) {
        tags.push(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/index`);
    } else if (normalizedPath === `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/index`) {
        tags.push(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/`);
    }
    return revalidate(tags, `revalidatePath ${originalPath}`);
}
function revalidate(tags, expression, profile) {
    var _store_cacheLifeProfiles;
    const store = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!store || !store.incrementalCache) {
        throw Object.defineProperty(new Error(`Invariant: static generation store missing in ${expression}`), "__NEXT_ERROR_CODE", {
            value: "E263",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        if (workUnitStore.phase === 'render') {
            throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" during render which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E7",
                enumerable: false,
                configurable: true
            });
        }
        switch(workUnitStore.type){
            case 'cache':
            case 'private-cache':
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside a "use cache" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                    value: "E181",
                    enumerable: false,
                    configurable: true
                });
            case 'unstable-cache':
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside a function cached with "unstable_cache(...)" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                    value: "E306",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender':
            case 'prerender-runtime':
                // cacheComponents Prerender
                const error = Object.defineProperty(new Error(`Route ${store.route} used ${expression} without first calling \`await connection()\`.`), "__NEXT_ERROR_CODE", {
                    value: "E406",
                    enumerable: false,
                    configurable: true
                });
                return (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(store.route, expression, error, workUnitStore);
            case 'prerender-client':
                throw Object.defineProperty(new _invarianterror.InvariantError(`${expression} must not be used within a client component. Next.js should be preventing ${expression} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E693",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-ppr':
                return (0, _dynamicrendering.postponeWithTracking)(store.route, expression, workUnitStore.dynamicTracking);
            case 'prerender-legacy':
                workUnitStore.revalidate = 0;
                const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E558",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            case 'request':
                if ("TURBOPACK compile-time truthy", 1) {
                    // TODO: This is most likely incorrect. It would lead to the ISR
                    // status being flipped when revalidating a static page with a server
                    // action.
                    workUnitStore.usedDynamic = true;
                // TODO(restart-on-cache-miss): we should do a sync IO error here in dev
                // to match prerender behavior
                }
                break;
            default:
                workUnitStore;
        }
    }
    if (!store.pendingRevalidatedTags) {
        store.pendingRevalidatedTags = [];
    }
    for (const tag of tags){
        const existingIndex = store.pendingRevalidatedTags.findIndex((item)=>{
            if (item.tag !== tag) return false;
            // Compare profiles: both strings, both objects, or both undefined
            if (typeof item.profile === 'string' && typeof profile === 'string') {
                return item.profile === profile;
            }
            if (typeof item.profile === 'object' && typeof profile === 'object') {
                return JSON.stringify(item.profile) === JSON.stringify(profile);
            }
            return item.profile === profile;
        });
        if (existingIndex === -1) {
            store.pendingRevalidatedTags.push({
                tag,
                profile
            });
        }
    }
    // if profile is provided and this is a stale-while-revalidate
    // update we do not mark the path as revalidated so that server
    // actions don't pull their own writes
    const cacheLife = profile && typeof profile === 'object' ? profile : profile && typeof profile === 'string' && (store == null ? void 0 : (_store_cacheLifeProfiles = store.cacheLifeProfiles) == null ? void 0 : _store_cacheLifeProfiles[profile]) ? store.cacheLifeProfiles[profile] : undefined;
    if (!profile || (cacheLife == null ? void 0 : cacheLife.expire) === 0) {
        // TODO: only revalidate if the path matches
        store.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateStaticAndDynamic;
    }
} //# sourceMappingURL=revalidate.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/unstable-no-store.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_noStore", {
    enumerable: true,
    get: function() {
        return unstable_noStore;
    }
});
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _dynamicrendering = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
function unstable_noStore() {
    const callingExpression = 'unstable_noStore()';
    const store = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!store) {
        // This generally implies we are being called in Pages router. We should probably not support
        // unstable_noStore in contexts outside of `react-server` condition but since we historically
        // have not errored here previously, we maintain that behavior for now.
        return;
    } else if (store.forceStatic) {
        return;
    } else {
        store.isUnstableNoStore = true;
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'prerender':
                case 'prerender-client':
                case 'prerender-runtime':
                    // unstable_noStore() is a noop in Dynamic I/O.
                    return;
                case 'prerender-ppr':
                case 'prerender-legacy':
                case 'request':
                case 'cache':
                case 'private-cache':
                case 'unstable-cache':
                    break;
                default:
                    workUnitStore;
            }
        }
        (0, _dynamicrendering.markCurrentScopeAsDynamic)(store, workUnitStore, callingExpression);
    }
} //# sourceMappingURL=unstable-no-store.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/use-cache/cache-life.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cacheLife", {
    enumerable: true,
    get: function() {
        return cacheLife;
    }
});
const _invarianterror = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
function validateCacheLife(profile) {
    if (profile.stale !== undefined) {
        if (profile.stale === false) {
            throw Object.defineProperty(new Error('Pass `Infinity` instead of `false` if you want to cache on the client forever ' + 'without checking with the server.'), "__NEXT_ERROR_CODE", {
                value: "E407",
                enumerable: false,
                configurable: true
            });
        } else if (typeof profile.stale !== 'number') {
            throw Object.defineProperty(new Error('The stale option must be a number of seconds.'), "__NEXT_ERROR_CODE", {
                value: "E308",
                enumerable: false,
                configurable: true
            });
        }
    }
    if (profile.revalidate !== undefined) {
        if (profile.revalidate === false) {
            throw Object.defineProperty(new Error('Pass `Infinity` instead of `false` if you do not want to revalidate by time.'), "__NEXT_ERROR_CODE", {
                value: "E104",
                enumerable: false,
                configurable: true
            });
        } else if (typeof profile.revalidate !== 'number') {
            throw Object.defineProperty(new Error('The revalidate option must be a number of seconds.'), "__NEXT_ERROR_CODE", {
                value: "E233",
                enumerable: false,
                configurable: true
            });
        }
    }
    if (profile.expire !== undefined) {
        if (profile.expire === false) {
            throw Object.defineProperty(new Error('Pass `Infinity` instead of `false` if you want to cache on the server forever ' + 'without checking with the origin.'), "__NEXT_ERROR_CODE", {
                value: "E658",
                enumerable: false,
                configurable: true
            });
        } else if (typeof profile.expire !== 'number') {
            throw Object.defineProperty(new Error('The expire option must be a number of seconds.'), "__NEXT_ERROR_CODE", {
                value: "E3",
                enumerable: false,
                configurable: true
            });
        }
    }
    if (profile.revalidate !== undefined && profile.expire !== undefined) {
        if (profile.revalidate > profile.expire) {
            throw Object.defineProperty(new Error('If providing both the revalidate and expire options, ' + 'the expire option must be greater than the revalidate option. ' + 'The expire option indicates how many seconds from the start ' + 'until it can no longer be used.'), "__NEXT_ERROR_CODE", {
                value: "E656",
                enumerable: false,
                configurable: true
            });
        }
    }
}
function cacheLife(profile) {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error('`cacheLife()` is only available with the `cacheComponents` config.'), "__NEXT_ERROR_CODE", {
            value: "E887",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    switch(workUnitStore == null ? void 0 : workUnitStore.type){
        case 'prerender':
        case 'prerender-client':
        case 'prerender-runtime':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'unstable-cache':
        case undefined:
            throw Object.defineProperty(new Error('`cacheLife()` can only be called inside a "use cache" function.'), "__NEXT_ERROR_CODE", {
                value: "E818",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'private-cache':
            break;
        default:
            workUnitStore;
    }
    if (typeof profile === 'string') {
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        if (!workStore) {
            throw Object.defineProperty(new Error('`cacheLife()` can only be called during App Router rendering at the moment.'), "__NEXT_ERROR_CODE", {
                value: "E820",
                enumerable: false,
                configurable: true
            });
        }
        if (!workStore.cacheLifeProfiles) {
            throw Object.defineProperty(new _invarianterror.InvariantError('`cacheLifeProfiles` should always be provided.'), "__NEXT_ERROR_CODE", {
                value: "E817",
                enumerable: false,
                configurable: true
            });
        }
        // TODO: This should be globally available and not require an AsyncLocalStorage.
        const configuredProfile = workStore.cacheLifeProfiles[profile];
        if (configuredProfile === undefined) {
            if (workStore.cacheLifeProfiles[profile.trim()]) {
                throw Object.defineProperty(new Error(`Unknown \`cacheLife()\` profile "${profile}" is not configured in next.config.js\n` + `Did you mean "${profile.trim()}" without the spaces?`), "__NEXT_ERROR_CODE", {
                    value: "E816",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new Error(`Unknown \`cacheLife()\` profile "${profile}" is not configured in next.config.js\n` + 'module.exports = {\n' + '  cacheLife: {\n' + `    "${profile}": ...\n` + '  }\n' + '}'), "__NEXT_ERROR_CODE", {
                value: "E888",
                enumerable: false,
                configurable: true
            });
        }
        profile = configuredProfile;
    } else if (typeof profile !== 'object' || profile === null || Array.isArray(profile)) {
        throw Object.defineProperty(new Error('Invalid `cacheLife()` option. Either pass a profile name or object.'), "__NEXT_ERROR_CODE", {
            value: "E814",
            enumerable: false,
            configurable: true
        });
    } else {
        validateCacheLife(profile);
    }
    if (profile.revalidate !== undefined) {
        // Track the explicit revalidate time.
        if (workUnitStore.explicitRevalidate === undefined || workUnitStore.explicitRevalidate > profile.revalidate) {
            workUnitStore.explicitRevalidate = profile.revalidate;
        }
    }
    if (profile.expire !== undefined) {
        // Track the explicit expire time.
        if (workUnitStore.explicitExpire === undefined || workUnitStore.explicitExpire > profile.expire) {
            workUnitStore.explicitExpire = profile.expire;
        }
    }
    if (profile.stale !== undefined) {
        // Track the explicit stale time.
        if (workUnitStore.explicitStale === undefined || workUnitStore.explicitStale > profile.stale) {
            workUnitStore.explicitStale = profile.stale;
        }
    }
} //# sourceMappingURL=cache-life.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/use-cache/cache-tag.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cacheTag", {
    enumerable: true,
    get: function() {
        return cacheTag;
    }
});
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _patchfetch = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/lib/patch-fetch.js [app-rsc] (ecmascript)");
function cacheTag(...tags) {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error('`cacheTag()` is only available with the `cacheComponents` config.'), "__NEXT_ERROR_CODE", {
            value: "E886",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    switch(workUnitStore == null ? void 0 : workUnitStore.type){
        case 'prerender':
        case 'prerender-client':
        case 'prerender-runtime':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'unstable-cache':
        case undefined:
            throw Object.defineProperty(new Error('`cacheTag()` can only be called inside a "use cache" function.'), "__NEXT_ERROR_CODE", {
                value: "E819",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'private-cache':
            break;
        default:
            workUnitStore;
    }
    const validTags = (0, _patchfetch.validateTags)(tags, '`cacheTag()`');
    if (!workUnitStore.tags) {
        workUnitStore.tags = validTags;
    } else {
        workUnitStore.tags.push(...validTags);
    }
} //# sourceMappingURL=cache-tag.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/cache.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const cacheExports = {
    unstable_cache: __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/unstable-cache.js [app-rsc] (ecmascript)").unstable_cache,
    updateTag: __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)").updateTag,
    revalidateTag: __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)").revalidateTag,
    revalidatePath: __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)").revalidatePath,
    refresh: __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)").refresh,
    unstable_noStore: __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/web/spec-extension/unstable-no-store.js [app-rsc] (ecmascript)").unstable_noStore,
    cacheLife: __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/use-cache/cache-life.js [app-rsc] (ecmascript)").cacheLife,
    cacheTag: __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/use-cache/cache-tag.js [app-rsc] (ecmascript)").cacheTag
};
let didWarnCacheLife = false;
function unstable_cacheLife() {
    if (!didWarnCacheLife) {
        didWarnCacheLife = true;
        const error = new Error('`unstable_cacheLife` was recently stabilized and should be imported as `cacheLife`. The `unstable` prefixed form will be removed in a future version of Next.js.');
        console.error(error);
    }
    return cacheExports.cacheLife.apply(this, arguments);
}
let didWarnCacheTag = false;
function unstable_cacheTag() {
    if (!didWarnCacheTag) {
        didWarnCacheTag = true;
        const error = new Error('`unstable_cacheTag` was recently stabilized and should be imported as `cacheTag`. The `unstable` prefixed form will be removed in a future version of Next.js.');
        console.error(error);
    }
    return cacheExports.cacheTag.apply(this, arguments);
}
cacheExports.unstable_cacheLife = unstable_cacheLife;
cacheExports.unstable_cacheTag = unstable_cacheTag;
// https://nodejs.org/api/esm.html#commonjs-namespaces
// When importing CommonJS modules, the module.exports object is provided as the default export
module.exports = cacheExports;
// make import { xxx } from 'next/cache' work
exports.unstable_cache = cacheExports.unstable_cache;
exports.revalidatePath = cacheExports.revalidatePath;
exports.revalidateTag = cacheExports.revalidateTag;
exports.updateTag = cacheExports.updateTag;
exports.unstable_noStore = cacheExports.unstable_noStore;
exports.cacheLife = cacheExports.cacheLife;
exports.unstable_cacheLife = cacheExports.unstable_cacheLife;
exports.cacheTag = cacheExports.cacheTag;
exports.unstable_cacheTag = cacheExports.unstable_cacheTag;
exports.refresh = cacheExports.refresh;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# debugId=b65e5813-e8f9-8b40-e433-26e5088fc109
//# sourceMappingURL=%5Broot-of-the-server%5D__d2cb7ffd._.js.map