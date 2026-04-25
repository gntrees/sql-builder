var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { format } from "./format";
import { ParameterType } from "./base-raw-query-builder";
import { QueryBuilder } from "./query-builder";
import { ColumnSchema, DBSchema, TableSchema } from "./db-schema";
import { SqlSchemaParam, SqlSchemaParamCase } from "./sql-param";
// Core query builder state and orchestration.
var CoreQueryBuilder = /** @class */ (function () {
    function CoreQueryBuilder(queryInstance) {
        this.query = { sql: [] };
        this.schemaQueryBuilder = [];
        this.instanceStructure = [];
        this.callLevel = 0;
        this.runtimeParams = {};
        this.isRebuilding = false;
        this.queryInstance = queryInstance;
    }
    // Basic getters/setters and lifecycle.
    CoreQueryBuilder.prototype.getTokens = function () {
        return this.query.sql;
    };
    CoreQueryBuilder.prototype.setTokens = function (tokens) {
        this.query.sql = tokens;
        return this;
    };
    CoreQueryBuilder.prototype.getSchema = function () {
        return this.schemaQueryBuilder;
    };
    CoreQueryBuilder.prototype.getInstanceStructure = function () {
        return cloneInstanceStructure(this.instanceStructure);
    };
    CoreQueryBuilder.prototype.getRuntimeParams = function () {
        return this.runtimeParams;
    };
    // still prototype
    CoreQueryBuilder.prototype.schemaParamCore = function (key) {
        this.endClass();
        return new SqlSchemaParam(key);
    };
    // still prototype
    CoreQueryBuilder.prototype.schemaCaseCore = function (key, queryBuilder) {
        var _a, _b;
        this.resolveSchemaParam("function", "schemaCase", [key, queryBuilder]);
        var runtimeValue = this.runtimeParams[key];
        if (runtimeValue === undefined || runtimeValue === false) {
            return this.endClass();
        }
        if (runtimeValue === true) {
            queryBuilder.setParams({});
            (_a = this.query.sql).push.apply(_a, queryBuilder.getTokens());
            return this.endClass();
        }
        if (isPlainObject(runtimeValue)) {
            var schemaCase = new SqlSchemaParamCase(key, {
                setParams: function (params) { return queryBuilder.setParams(params); },
                getTokens: function () { return queryBuilder.getTokens(); },
            });
            schemaCase.setParams(runtimeValue);
            var caseTokens = schemaCase.getQueryBuilder().getTokens();
            (_b = this.query.sql).push.apply(_b, caseTokens);
            return this.endClass();
        }
        throw new Error("Invalid schemaCase value for '".concat(key, "'. Expected boolean or object, got ").concat(describeValueType(runtimeValue), "."));
    };
    // still prototype
    CoreQueryBuilder.prototype.setParamsCore = function (params) {
        if (!isPlainObject(params)) {
            throw new Error("setParams expects an object, got ".concat(describeValueType(params), "."));
        }
        this.runtimeParams = __assign({}, params);
        if (!this.isRebuilding) {
            this.rebuild();
        }
        return this.endClass();
    };
    CoreQueryBuilder.prototype.setInstanceStructure = function (structure) {
        this.instanceStructure = cloneInstanceStructure(structure);
        return this;
    };
    CoreQueryBuilder.prototype.rebuild = function () {
        var _this = this;
        var structure = this.getInstanceStructure();
        this.query.sql = [];
        this.isRebuilding = true;
        try {
            structure.forEach(function (node) { return _this.replayInstanceNode(node); });
        }
        finally {
            this.isRebuilding = false;
        }
        return this;
    };
    CoreQueryBuilder.prototype.startClass = function () {
        this.callLevel += 1;
        return this;
    };
    CoreQueryBuilder.prototype.endClass = function () {
        this.callLevel = Math.max(0, this.callLevel - 1);
        return this;
    };
    // Schema type guards and normalization.
    CoreQueryBuilder.prototype.isColumnSchema = function (value) {
        return value instanceof ColumnSchema;
    };
    CoreQueryBuilder.prototype.isTableSchema = function (value) {
        return value instanceof TableSchema;
    };
    CoreQueryBuilder.prototype.isDbSchema = function (value) {
        return value instanceof DBSchema;
    };
    CoreQueryBuilder.prototype.isSchemaObject = function (value) {
        return this.isColumnSchema(value) || this.isTableSchema(value) || this.isDbSchema(value);
    };
    CoreQueryBuilder.prototype.getSchemaIdentifier = function (value) {
        if (this.isColumnSchema(value)) {
            return "".concat(value.tableSchema.tableSchemaName, ".").concat(value.columnSchemaName);
        }
        if (this.isTableSchema(value)) {
            return value.tableSchemaName;
        }
        return value.dbSchemaName;
    };
    CoreQueryBuilder.prototype.normalizeSchemaParam = function (paramRaw, type) {
        var _this = this;
        var paramsArray = Array.isArray(paramRaw) ? paramRaw : [paramRaw];
        var normalizeSingleParam = function (param) {
            if (isPrimitiveSchemaParam(param)) {
                return {
                    paramType: getPrimitiveSchemaParamType(param),
                    name: param, arguments: []
                };
            }
            if (param instanceof SqlSchemaParam) {
                return {
                    paramType: "object",
                    name: {
                        kind: "schema-param",
                        key: param.getKey(),
                        types: param.getTypes(),
                        hasDefault: param.hasDefault(),
                        defaultValue: param.getDefaultValue(),
                    },
                    arguments: [],
                };
            }
            if (_this.isSchemaObject(param)) {
                return {
                    paramType: "string",
                    name: _this.getSchemaIdentifier(param),
                    arguments: [],
                };
            }
            if (Array.isArray(param)) {
                return { paramType: "array", name: _this.normalizeSchemaParam(param, type), arguments: [] };
            }
            if (param instanceof QueryBuilder) {
                return [param.getSchema()];
            }
            if (typeof param === "object") {
                return {
                    paramType: "object",
                    arguments: [],
                    name: Object.entries(param).map(function (_a) {
                        var key = _a[0], value = _a[1];
                        return ({
                            name: key,
                            arguments: _this.normalizeSchemaParam(value, type),
                            paramType: Array.isArray(value) ? "array" : typeof value === "object" ? "object" : typeof value === "string" ? "string" : typeof value === "number" ? "number" : typeof value === "boolean" ? "boolean" : "null"
                        });
                    })
                };
            }
        };
        return paramsArray.map(normalizeSingleParam);
    };
    CoreQueryBuilder.prototype.registerSchemaCall = function (name, params, schema) {
        if (name === "setParams") {
            return schema;
        }
        if (!this.isRebuilding && this.callLevel === 1) {
            this.captureInstanceStructure(name, params);
            this.schemaQueryBuilder.push(schema);
        }
        return schema;
    };
    CoreQueryBuilder.prototype.resolveSchemaParam = function (type, name, params) {
        var _this = this;
        this.startClass();
        if (this.callLevel > 1) {
            return {
                paramType: type,
                name: name,
                arguments: []
            };
        }
        if (type === "template-literal") {
            var arrayParams = Array.isArray(params) ? params : [params];
            var normalizedParams = arrayParams.map(function (param, i) {
                // jika ganjil maka string jika genap maka normalize
                if (i % 2 === 0) {
                    return param;
                }
                else {
                    return _this.normalizeSchemaParam(param, type);
                }
            });
            var schema_1 = {
                paramType: type,
                name: name,
                arguments: normalizedParams
            };
            return this.registerSchemaCall(name, params, schema_1);
        }
        var schema = { paramType: type, name: name, arguments: this.normalizeSchemaParam(params, type) };
        return this.registerSchemaCall(name, params, schema);
    };
    // Instance structure capture, serialization, and replay.
    CoreQueryBuilder.prototype.captureInstanceStructure = function (name, params) {
        var _this = this;
        if (this.isRebuilding) {
            return;
        }
        var normalizedArgs = (Array.isArray(params) ? params : [params])
            .map(function (arg) { return _this.serializeInstanceValue(arg); });
        this.instanceStructure.push({ name: String(name), args: normalizedArgs });
    };
    CoreQueryBuilder.prototype.serializeInstanceValue = function (value) {
        var _this = this;
        if (isSerializablePrimitive(value)) {
            return value;
        }
        if (value instanceof SqlSchemaParam) {
            return {
                kind: "schema-param",
                value: {
                    key: value.getKey(),
                    types: value.getTypes(),
                    hasDefault: value.hasDefault(),
                    defaultValue: value.getDefaultValue(),
                },
            };
        }
        if (value instanceof QueryBuilder) {
            return {
                kind: "query-builder",
                value: value.getInstanceStructure(),
            };
        }
        if (this.isSchemaObject(value)) {
            return {
                kind: "identifier",
                value: this.getSchemaIdentifier(value),
            };
        }
        if (Array.isArray(value)) {
            return {
                kind: "array",
                value: value.map(function (item) { return _this.serializeInstanceValue(item); }),
            };
        }
        if (typeof value === "object") {
            var entries = Object.entries(value)
                .reduce(function (acc, _a) {
                var key = _a[0], val = _a[1];
                acc[key] = _this.serializeInstanceValue(val);
                return acc;
            }, {});
            return {
                kind: "object",
                value: entries,
            };
        }
        return String(value);
    };
    CoreQueryBuilder.prototype.deserializeInstanceValue = function (value) {
        var _this = this;
        if (isSerializablePrimitive(value)) {
            return value;
        }
        if (value.kind === "schema-param") {
            var schemaParam_1 = new SqlSchemaParam(value.value.key);
            value.value.types.forEach(function (type) {
                if (type === "number")
                    schemaParam_1.number();
                if (type === "boolean")
                    schemaParam_1.boolean();
                if (type === "string")
                    schemaParam_1.string();
                if (type === "null")
                    schemaParam_1.nullable();
            });
            if (value.value.hasDefault) {
                schemaParam_1.default(value.value.defaultValue);
            }
            return schemaParam_1;
        }
        if (value.kind === "query-builder") {
            var nested = new QueryBuilder(this.queryInstance);
            nested.setInstanceStructure(value.value);
            nested.rebuild();
            return nested;
        }
        if (value.kind === "identifier") {
            return new QueryBuilder(this.queryInstance).i(value.value);
        }
        if (value.kind === "array") {
            return value.value.map(function (item) { return _this.deserializeInstanceValue(item); });
        }
        return Object.entries(value.value).reduce(function (acc, _a) {
            var key = _a[0], val = _a[1];
            acc[key] = _this.deserializeInstanceValue(val);
            return acc;
        }, {});
    };
    CoreQueryBuilder.prototype.replayInstanceNode = function (node) {
        var _this = this;
        var target = this[node.name];
        if (typeof target !== "function") {
            throw new Error("Cannot rebuild query: method '".concat(node.name, "' is not available"));
        }
        if (node.name === "raw" || node.name === "r") {
            // console.log(node.args.map((i)=>String(i)));
            var templateFlat = node.args.map(function (arg) { return _this.deserializeInstanceValue(arg); });
            var strings_1 = [];
            var values_1 = [];
            templateFlat.forEach(function (item, index) {
                if (index % 2 === 0) {
                    strings_1.push(String(item !== null && item !== void 0 ? item : ""));
                }
                else {
                    values_1.push(item);
                }
            });
            var templateStrings = strings_1;
            templateStrings.raw = __spreadArray([], templateStrings, true);
            target.apply(this, __spreadArray([templateStrings], values_1, true));
            return;
        }
        var args = node.args.map(function (arg) { return _this.deserializeInstanceValue(arg); });
        target.apply(this, args);
    };
    // SQL rendering and parameter extraction.
    CoreQueryBuilder.prototype.getSqlCore = function () {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        var queryInstance = this.queryInstance;
        var formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            var literalIndex_1 = 0;
            var sqlParams_1 = [];
            var sqlTokens = joinSqlTokens(this.query.sql.map(function (item) {
                if (item instanceof ParameterType) {
                    switch (item.type) {
                        case "literal":
                            literalIndex_1 += 1;
                            return "$".concat(literalIndex_1);
                        case "identifier":
                            sqlParams_1.push(item.value);
                            return "%I";
                        case "percent":
                            sqlParams_1.push(item.value);
                            return "%%";
                        case "string":
                            sqlParams_1.push(item.value);
                            return "%s";
                        default:
                            return "";
                    }
                }
                return item.trim();
            }));
            return format.apply(void 0, __spreadArray([sqlTokens], sqlParams_1, false));
        }
        var paramIndex = 0;
        return joinSqlTokens(this.query.sql.map(function (item) {
            if (item instanceof ParameterType) {
                paramIndex += 1;
                return formatPgParameterToken(item, paramIndex);
            }
            return item;
        }));
    };
    CoreQueryBuilder.prototype.getSqlParametersCore = function () {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        var queryInstance = this.queryInstance;
        var formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        var onlyLiterals = formatParamHandler === "pg";
        return this.query.sql
            .filter(function (item) { return item instanceof ParameterType && (!onlyLiterals || item.type === "literal"); })
            .map(function (item) { return item.value; });
    };
    CoreQueryBuilder.prototype.getSqlWithParametersCore = function () {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        var queryInstance = this.queryInstance;
        var formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            return joinSqlTokens(this.query.sql.map(function (item) {
                if (item instanceof ParameterType) {
                    return formatPgParameterWithValue(item);
                }
                return item.trim();
            }));
        }
        var paramIndex = 0;
        return joinSqlTokens(this.query.sql.map(function (item) {
            if (item instanceof ParameterType) {
                paramIndex += 1;
                return toSqlWithParameters(formatParamHandler, item, paramIndex);
            }
            return item;
        }));
    };
    // Statement resolution helpers.
    CoreQueryBuilder.prototype.resolveStatement = function (item) {
        if (item == "*") {
            return ["*"];
        }
        if (item === undefined || item === "") {
            return [];
        }
        if (item === null) {
            return [this.createLiteralParameter(null)];
        }
        if (item instanceof SqlSchemaParam) {
            var resolvedValue = this.resolveSqlSchemaParamValue(item);
            if (resolvedValue === undefined) {
                return [];
            }
            return [this.createLiteralParameter(resolvedValue)];
        }
        if (this.isColumnSchema(item)) {
            return [this.createIdentifierParameter("".concat(item.tableSchema.tableSchemaName, ".").concat(item.columnSchemaName))];
        }
        if (this.isTableSchema(item)) {
            return [this.createIdentifierParameter(item.tableSchemaName)];
        }
        if (this.isDbSchema(item)) {
            return [this.createIdentifierParameter(item.dbSchemaName)];
        }
        if (item instanceof QueryBuilder) {
            if (Object.keys(this.runtimeParams).length > 0) {
                item.setParams(this.runtimeParams);
            }
            return item.getTokens();
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [this.createLiteralParameter(item)];
        }
        return [this.createLiteralParameter(String(item))];
    };
    CoreQueryBuilder.prototype.resolveStatements = function (values) {
        var _this = this;
        return values.map(function (item) { return _this.resolveStatement(item); });
    };
    CoreQueryBuilder.prototype.resolveIdentifierStatement = function (item) {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (item instanceof SqlSchemaParam) {
            var resolvedValue = this.resolveSqlSchemaParamValue(item);
            if (resolvedValue === undefined) {
                return [];
            }
            if (resolvedValue === null) {
                throw new Error("SqlSchemaParam '".concat(item.getKey(), "' cannot resolve to null for identifier statement."));
            }
            return [this.createIdentifierParameter(resolvedValue)];
        }
        if (this.isColumnSchema(item)) {
            return [this.createIdentifierParameter("".concat(item.tableSchema.tableSchemaName, ".").concat(item.columnSchemaName))];
        }
        if (this.isTableSchema(item)) {
            return [this.createIdentifierParameter(item.tableSchemaName)];
        }
        if (this.isDbSchema(item)) {
            return [this.createIdentifierParameter(item.dbSchemaName)];
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            if (item === "*") {
                return ["*"];
            }
            if (item === "") {
                return [];
            }
            return [this.createIdentifierParameter(item)];
        }
        if (item instanceof QueryBuilder) {
            if (Object.keys(this.runtimeParams).length > 0) {
                item.setParams(this.runtimeParams);
            }
            return item.getTokens();
        }
        return [this.createIdentifierParameter(String(item))];
    };
    CoreQueryBuilder.prototype.resolveStringStatement = function (item) {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (item instanceof SqlSchemaParam) {
            var resolvedValue = this.resolveSqlSchemaParamValue(item);
            if (resolvedValue === undefined) {
                return [];
            }
            if (resolvedValue === null) {
                throw new Error("SqlSchemaParam '".concat(item.getKey(), "' cannot resolve to null for string statement."));
            }
            return [String(resolvedValue)];
        }
        if (this.isColumnSchema(item)) {
            return ["".concat(item.tableSchema.tableSchemaName, ".").concat(item.columnSchemaName)];
        }
        if (this.isTableSchema(item)) {
            return [item.tableSchemaName];
        }
        if (this.isDbSchema(item)) {
            return [item.dbSchemaName];
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [String(item)];
        }
        if (item instanceof QueryBuilder) {
            if (Object.keys(this.runtimeParams).length > 0) {
                item.setParams(this.runtimeParams);
            }
            return item.getTokens();
        }
        throw new Error("Unsupported string statement type: ".concat(typeof item));
    };
    // Token creation helpers.
    CoreQueryBuilder.prototype.createLiteralParameter = function (value) {
        return new ParameterType({
            value: value,
            type: "literal",
        });
    };
    CoreQueryBuilder.prototype.createIdentifierParameter = function (value) {
        return new ParameterType({
            value: value,
            type: "identifier",
        });
    };
    CoreQueryBuilder.prototype.createStringParameter = function (value) {
        return new ParameterType({
            value: value,
            type: "string",
        });
    };
    CoreQueryBuilder.prototype.createPercentParameter = function () {
        return new ParameterType({
            value: '%',
            type: "percent",
        });
    };
    // SQL token composition helpers.
    CoreQueryBuilder.prototype.pushSeparatedTokens = function (tokensList, separator) {
        var _a;
        var hasTokens = false;
        for (var _i = 0, tokensList_1 = tokensList; _i < tokensList_1.length; _i++) {
            var tokens = tokensList_1[_i];
            if (tokens.length === 0) {
                continue;
            }
            if (hasTokens) {
                this.query.sql.push(separator);
            }
            (_a = this.query.sql).push.apply(_a, tokens);
            hasTokens = true;
        }
    };
    CoreQueryBuilder.prototype.pushFunction = function (func) {
        var _a;
        var _this = this;
        var runtimeArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            runtimeArgs[_i - 1] = arguments[_i];
        }
        if (func.format === "COERCE_EXPLICIT_CAST") {
            var arg = runtimeArgs[0];
            if (arg === undefined || arg === null || arg === "") {
                return this;
            }
            var resolvedArg = this.resolveStatement(arg);
            if (resolvedArg.length === 0) {
                return this;
            }
            this.query.sql.push("CAST(");
            (_a = this.query.sql).push.apply(_a, resolvedArg);
            this.query.sql.push(" AS ");
            this.query.sql.push(func.name);
            this.query.sql.push(")");
        }
        else {
            this.query.sql.push(func.name + "(");
            var filteredArgs = runtimeArgs.filter(function (arg) { return arg !== undefined && arg !== ""; });
            var resolvedArgs = filteredArgs.map(function (arg) { return _this.resolveStatement(arg); });
            this.pushSeparatedTokens(resolvedArgs, ",");
            this.query.sql.push(")");
        }
        return this;
    };
    CoreQueryBuilder.prototype.resolveSqlSchemaParamValue = function (param) {
        var key = param.getKey();
        var hasRuntimeValue = Object.prototype.hasOwnProperty.call(this.runtimeParams, key);
        var value = hasRuntimeValue
            ? this.runtimeParams[key]
            : param.hasDefault()
                ? param.getDefaultValue()
                : undefined;
        if (value === undefined) {
            return undefined;
        }
        if (value !== null && typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
            throw new Error("SqlSchemaParam '".concat(key, "' must resolve to string | number | boolean | null, got ").concat(describeValueType(value), "."));
        }
        var scalarValue = value;
        var expectedTypes = param.getTypes();
        if (expectedTypes.length === 0) {
            return scalarValue;
        }
        var resolvedType = scalarValue === null
            ? "null"
            : typeof scalarValue;
        if (!expectedTypes.includes(resolvedType)) {
            throw new Error("Invalid value for SqlSchemaParam '".concat(key, "'. Expected ").concat(expectedTypes.join(" | "), ", got ").concat(resolvedType, "."));
        }
        return scalarValue;
    };
    return CoreQueryBuilder;
}());
export { CoreQueryBuilder };
// Primitive and schema parameter helpers.
function isSerializablePrimitive(value) {
    return value === undefined || value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
function isPrimitiveSchemaParam(value) {
    return value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
function getPrimitiveSchemaParamType(value) {
    if (value === null) {
        return "null";
    }
    if (typeof value === "string") {
        return "string";
    }
    if (typeof value === "number") {
        return "number";
    }
    return "boolean";
}
// Instance structure cloning helpers.
function cloneInstanceStructure(structure) {
    return structure.map(function (node) { return ({
        name: node.name,
        args: node.args.map(cloneInstanceValue),
    }); });
}
function cloneInstanceValue(value) {
    if (isSerializablePrimitive(value)) {
        return value;
    }
    if (value.kind === "query-builder") {
        return {
            kind: "query-builder",
            value: cloneInstanceStructure(value.value),
        };
    }
    if (value.kind === "identifier") {
        return {
            kind: "identifier",
            value: value.value,
        };
    }
    if (value.kind === "schema-param") {
        return {
            kind: "schema-param",
            value: {
                key: value.value.key,
                types: __spreadArray([], value.value.types, true),
                hasDefault: value.value.hasDefault,
                defaultValue: value.value.defaultValue,
            },
        };
    }
    if (value.kind === "array") {
        return {
            kind: "array",
            value: value.value.map(cloneInstanceValue),
        };
    }
    return {
        kind: "object",
        value: Object.entries(value.value).reduce(function (acc, _a) {
            var key = _a[0], val = _a[1];
            acc[key] = cloneInstanceValue(val);
            return acc;
        }, {}),
    };
}
function isPlainObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function describeValueType(value) {
    if (value === null) {
        return "null";
    }
    if (Array.isArray(value)) {
        return "array";
    }
    return typeof value;
}
// SQL token spacing helper.
function joinSqlTokens(tokens) {
    var _a;
    var spacedTokens = [];
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (!token) {
            continue;
        }
        if (spacedTokens.length === 0) {
            spacedTokens.push(token);
            continue;
        }
        var prev = (_a = spacedTokens[spacedTokens.length - 1]) !== null && _a !== void 0 ? _a : "";
        if (shouldInsertSpace(prev, token)) {
            spacedTokens.push(" ");
        }
        spacedTokens.push(token);
    }
    return spacedTokens.join("").trim();
}
function shouldInsertSpace(prev, next) {
    var noSpaceBefore = new Set([",", ")", ".", ";"]);
    var noSpaceAfter = new Set(["(", "."]);
    if (prev.endsWith("(")) {
        return false;
    }
    if (noSpaceBefore.has(next)) {
        return false;
    }
    if (noSpaceAfter.has(prev)) {
        return false;
    }
    return true;
}
// SQL formatting helpers.
function toSql(formatParamHandler, item, index) {
    if (item instanceof ParameterType) {
        return formatParameterToken(formatParamHandler, item, index);
    }
    else {
        return item.trim();
    }
}
function toSqlWithParameters(formatParamHandler, item, index) {
    if (item instanceof ParameterType) {
        if (item.type === "literal") {
            return formatLiteralWithParameters(formatParamHandler, item, index);
        }
        return toSql(formatParamHandler, item, index);
    }
    return item;
}
function formatPgParameterToken(item, literalIndex) {
    if (item.type === "literal") {
        return "$".concat(literalIndex);
    }
    if (item.type === "identifier") {
        return format("%I", item.value);
    }
    if (item.type === "percent") {
        return format("%%", item.value);
    }
    if (item.type === "string") {
        return format("%s", item.value);
    }
    return "";
}
function formatPgParameterWithValue(item) {
    if (item.type === "literal") {
        if (item.value === null)
            return "NULL";
        if (item.value === true)
            return "TRUE";
        if (item.value === false)
            return "FALSE";
        return format("%L", item.value);
    }
    if (item.type === "identifier") {
        return format("%I", item.value);
    }
    if (item.type === "percent") {
        return format("%%", item.value);
    }
    if (item.type === "string") {
        return format("%s", item.value);
    }
    return "";
}
function formatParameterToken(formatParamHandler, item, index) {
    if (formatParamHandler === "pg") {
        return formatPgParameterToken(item, index);
    }
    if (typeof formatParamHandler === "function") {
        return formatParamHandler({
            index: index,
            value: item.value,
            type: item.type,
        });
    }
    if (item.type === "literal") {
        return "%L";
    }
    if (item.type === "identifier") {
        return "%I";
    }
    if (item.type === "percent") {
        return "%%";
    }
    if (item.type === "string") {
        return "%s";
    }
    return "";
}
function formatLiteralWithParameters(formatParamHandler, item, index) {
    if (formatParamHandler === "pg") {
        if (item.value === null)
            return "NULL";
        if (item.value === true)
            return "TRUE";
        if (item.value === false)
            return "FALSE";
        return format("%L", item.value);
    }
    if (typeof formatParamHandler === "function") {
        return formatParamHandler({
            index: index,
            value: item.value,
            type: item.type,
        });
    }
    return format("%L", item.value);
}
