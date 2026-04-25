var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { OperatorFunctionBuilder } from "./override-operator-functions";
import { QueryBuilder } from "./query-builder";
var OverrideQueryBuilder = /** @class */ (function (_super) {
    __extends(OverrideQueryBuilder, _super);
    function OverrideQueryBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // rest
    OverrideQueryBuilder.prototype.escape = function (value) {
        var _a;
        if (value === undefined) {
            return _super.prototype.escape.call(this);
        }
        this.query.sql.push("ESCAPE");
        var resolvedEscape = _super.prototype.resolveStatement.call(this, value);
        if (resolvedEscape.length > 0) {
            (_a = this.query.sql).push.apply(_a, resolvedEscape);
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.semicolon = function () {
        this.query.sql.push(";");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.sc = function () {
        this.semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.beginTransaction = function () {
        this.begin().semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.commitTransaction = function () {
        this.commit().semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.rollbackTransaction = function () {
        this.rollback().semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.savepointTransaction = function (name) {
        var _a;
        _super.prototype.savepoint.call(this);
        var resolvedName = _super.prototype.resolveStatement.call(this, name);
        if (resolvedName.length > 0) {
            (_a = this.query.sql).push.apply(_a, resolvedName);
        }
        this.semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.startTransaction = function () {
        this.start().semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.prepareTransaction = function (name) {
        var _a;
        _super.prototype.prepare.call(this);
        _super.prototype.transaction.call(this);
        if (name !== undefined) {
            var resolvedName = _super.prototype.resolveStatement.call(this, name);
            if (resolvedName.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.commitPreparedTransaction = function (name) {
        var _a;
        _super.prototype.commit.call(this);
        _super.prototype.prepared.call(this);
        if (name !== undefined) {
            var resolvedName = _super.prototype.resolveStatement.call(this, name);
            if (resolvedName.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.rollbackPreparedTransaction = function (name) {
        var _a;
        _super.prototype.rollback.call(this);
        _super.prototype.prepared.call(this);
        if (name !== undefined) {
            var resolvedName = _super.prototype.resolveStatement.call(this, name);
            if (resolvedName.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.rollbackToSavepointTransaction = function (name) {
        var _a;
        _super.prototype.rollback.call(this);
        _super.prototype.to.call(this);
        _super.prototype.savepoint.call(this);
        if (name !== undefined) {
            var resolvedName = _super.prototype.resolveStatement.call(this, name);
            if (resolvedName.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.releaseTransaction = function (name) {
        var _a;
        _super.prototype.release.call(this);
        _super.prototype.savepoint.call(this);
        if (name !== undefined) {
            var resolvedName = _super.prototype.resolveStatement.call(this, name);
            if (resolvedName.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.transaction = function () {
        var _this = this;
        var transaction = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            transaction[_i] = arguments[_i];
        }
        if (transaction.length === 0) {
            return _super.prototype.transaction.call(this);
        }
        this.beginTransaction();
        var resolvedStatements = _super.prototype.resolveStatements.call(this, transaction)
            .filter(function (tokens) { return tokens.length > 0; });
        resolvedStatements.forEach(function (tokens) {
            var _a;
            (_a = _this.query.sql).push.apply(_a, tokens);
            var lastToken = tokens[tokens.length - 1];
            if (lastToken !== ";") {
                _this.semicolon();
            }
        });
        this.commitTransaction();
        return this.endClass();
    };
    // Queries
    OverrideQueryBuilder.prototype.select = function () {
        var _this = this;
        var cols = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cols[_i] = arguments[_i];
        }
        _super.prototype.select.call(this);
        if (cols.length === 0) {
            return this.endClass();
        }
        var columns = [];
        cols.forEach(function (item) {
            if (item && typeof item === "object" && !(item instanceof QueryBuilder) && !_super.prototype.isSchemaObject.call(_this, item)) {
                var entries = Object.entries(item);
                entries.forEach(function (_a) {
                    var alias = _a[0], column = _a[1];
                    var tokens = [];
                    var resolvedColumn = _super.prototype.resolveStatement.call(_this, column);
                    var resolvedAlias = _super.prototype.resolveIdentifierStatement.call(_this, alias);
                    if (resolvedColumn.length === 0) {
                        return;
                    }
                    tokens.push.apply(tokens, resolvedColumn);
                    if (resolvedAlias.length > 0) {
                        tokens.push.apply(tokens, __spreadArray(["AS"], resolvedAlias, false));
                    }
                    columns.push(tokens);
                });
            }
            else {
                var resolved = _super.prototype.resolveStatement.call(_this, item);
                columns.push(resolved);
            }
        });
        _super.prototype.pushSeparatedTokens.call(this, columns, ",");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.selectDistinct = function () {
        var _this = this;
        var cols = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cols[_i] = arguments[_i];
        }
        _super.prototype.select.call(this);
        _super.prototype.distinct.call(this);
        if (cols.length === 0) {
            return this.endClass();
        }
        var columns = [];
        cols.forEach(function (item) {
            if (item && typeof item === "object" && !(item instanceof QueryBuilder) && !_super.prototype.isSchemaObject.call(_this, item)) {
                var entries = Object.entries(item);
                entries.forEach(function (_a) {
                    var alias = _a[0], column = _a[1];
                    var tokens = [];
                    var resolvedColumn = _super.prototype.resolveStatement.call(_this, column);
                    var resolvedAlias = _super.prototype.resolveIdentifierStatement.call(_this, alias);
                    if (resolvedColumn.length === 0) {
                        return;
                    }
                    tokens.push.apply(tokens, resolvedColumn);
                    if (resolvedAlias.length > 0) {
                        tokens.push.apply(tokens, __spreadArray(["AS"], resolvedAlias, false));
                    }
                    columns.push(tokens);
                });
            }
            else {
                var resolved = _super.prototype.resolveStatement.call(_this, item);
                columns.push(resolved);
            }
        });
        _super.prototype.pushSeparatedTokens.call(this, columns, ",");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.selectDistinctOn = function (on, cols) {
        var _this = this;
        _super.prototype.select.call(this);
        _super.prototype.distinct.call(this);
        if (on !== undefined && on.length > 0) {
            _super.prototype.on.call(this);
            this.query.sql.push("(");
            var resolvedOn = on.map(function (item) { return _super.prototype.resolveIdentifierStatement.call(_this, item); });
            _super.prototype.pushSeparatedTokens.call(this, resolvedOn, ",");
            this.query.sql.push(")");
        }
        if (cols == undefined || cols.length === 0) {
            return this.endClass();
        }
        var columns = [];
        cols.forEach(function (item) {
            if (item && typeof item === "object" && !(item instanceof QueryBuilder) && !_super.prototype.isSchemaObject.call(_this, item)) {
                var entries = Object.entries(item);
                entries.forEach(function (_a) {
                    var alias = _a[0], column = _a[1];
                    var tokens = [];
                    var resolvedColumn = _super.prototype.resolveStatement.call(_this, column);
                    var resolvedAlias = _super.prototype.resolveIdentifierStatement.call(_this, alias);
                    if (resolvedColumn.length === 0) {
                        return;
                    }
                    tokens.push.apply(tokens, resolvedColumn);
                    if (resolvedAlias.length > 0) {
                        tokens.push.apply(tokens, __spreadArray(["AS"], resolvedAlias, false));
                    }
                    columns.push(tokens);
                });
            }
            else {
                var resolved = _super.prototype.resolveStatement.call(_this, item);
                columns.push(resolved);
            }
        });
        _super.prototype.pushSeparatedTokens.call(this, columns, ",");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.insertInto = function (table, cols) {
        var _a;
        _super.prototype.insert.call(this);
        _super.prototype.into.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (!cols || cols.length === 0) {
            return this.endClass();
        }
        var resolvedColumns = _super.prototype.resolveStatements.call(this, cols);
        if (resolvedColumns.length > 0) {
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolvedColumns, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.values = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0) {
            _super.prototype.values.call(this);
            return this.endClass();
        }
        this.query.sql.push("VALUES");
        var haveDeepArray = values.some(function (item) { return Array.isArray(item); });
        var resolveArrayValue = function (item) {
            var _a;
            if (Array.isArray(item)) {
                var resolvedItems = item.map(function (subItem) { return _super.prototype.resolveStatement.call(_this, subItem); });
                _this.query.sql.push("(");
                _super.prototype.pushSeparatedTokens.call(_this, resolvedItems, ",");
                _this.query.sql.push(")");
            }
            else {
                var resolved = _super.prototype.resolveStatement.call(_this, item);
                (_a = _this.query.sql).push.apply(_a, resolved);
            }
        };
        if (!haveDeepArray)
            this.query.sql.push("(");
        values.forEach(function (item, i) {
            resolveArrayValue(item);
            if (i < values.length - 1) {
                _this.query.sql.push(",");
            }
        });
        if (!haveDeepArray)
            this.query.sql.push(")");
        // values.forEach((item) => {
        //     if (Array.isArray(item) && item.length === 0) {
        //     }
        // });
        // const multiRows = Array.isArray(values[0]);
        // const valueRows = multiRows
        //     ? (values as Array<Array<string | QueryBuilder>>)
        //     : [values as Array<string | QueryBuilder>];
        // valueRows.forEach((row, rowIndex) => {
        //     if (rowIndex > 0) {
        //         this.query.sql.push(",");
        //     }
        //     const resolvedRow = row.map((item) => {
        //         super.resolveStatement(item)
        //     });
        //     // this.query.sql.push("(");
        //     super.pushSeparatedTokens(resolvedRow, ",");
        //     // this.query.sql.push(")");
        // });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.insert = function (table, values) {
        var _a;
        var _this = this;
        var _b;
        _super.prototype.insert.call(this);
        if (table === undefined || table === null) {
            return this.endClass();
        }
        _super.prototype.into.call(this);
        var resolvedTable = _super.prototype.resolveStatement.call(this, table);
        if (resolvedTable.length > 0) {
            (_a = this.query.sql).push.apply(_a, resolvedTable);
        }
        var rows = values === undefined ? [] : (Array.isArray(values) ? values : [values]);
        if (rows.length === 0) {
            return this.endClass();
        }
        var columnNames = Object.keys((_b = rows[0]) !== null && _b !== void 0 ? _b : {});
        var columnSet = new Set(columnNames);
        rows.forEach(function (row, index) {
            var keys = Object.keys(row);
            if (keys.length !== columnNames.length) {
                throw new Error("Insert values keys mismatch at row ".concat(index + 1, "."));
            }
            keys.forEach(function (key) {
                if (!columnSet.has(key)) {
                    throw new Error("Insert values keys mismatch at row ".concat(index + 1, "."));
                }
            });
        });
        if (columnNames.length > 0) {
            var resolvedColumns = columnNames.map(function (item) { return _super.prototype.resolveIdentifierStatement.call(_this, item); });
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolvedColumns, ",");
            this.query.sql.push(")");
        }
        this.query.sql.push("VALUES");
        rows.forEach(function (row, rowIndex) {
            if (rowIndex > 0) {
                _this.query.sql.push(",");
            }
            var resolvedRow = columnNames.map(function (column) { return row[column]; })
                .map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
            _this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(_this, resolvedRow, ",");
            _this.query.sql.push(")");
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.update = function (table) {
        var _a;
        _super.prototype.update.call(this);
        if (table === undefined || table === null) {
            return this.endClass();
        }
        var resolvedTable = _super.prototype.resolveStatement.call(this, table);
        if (resolvedTable.length > 0) {
            (_a = this.query.sql).push.apply(_a, resolvedTable);
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.delete = function (table) {
        var _a;
        _super.prototype.delete.call(this);
        if (table === undefined || table === null) {
            return this.endClass();
        }
        _super.prototype.from.call(this);
        var resolvedTable = _super.prototype.resolveStatement.call(this, table);
        if (resolvedTable.length > 0) {
            (_a = this.query.sql).push.apply(_a, resolvedTable);
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.set = function () {
        var _this = this;
        var set = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            set[_i] = arguments[_i];
        }
        _super.prototype.set.call(this);
        if (set === undefined || set.length === 0) {
            return this.endClass();
        }
        var hasAssignments = false;
        set.forEach(function (item) {
            var _a;
            if (item !== null && typeof item === "object" && !(item instanceof QueryBuilder) && !_super.prototype.isSchemaObject.call(_this, item)) {
                var entries = Object.entries(item);
                entries.forEach(function (_a) {
                    var _b;
                    var column = _a[0], value = _a[1];
                    var resolvedColumn = _super.prototype.resolveIdentifierStatement.call(_this, column);
                    var resolvedValue = _super.prototype.resolveStatement.call(_this, value);
                    if (resolvedColumn.length === 0 || resolvedValue.length === 0) {
                        return;
                    }
                    if (hasAssignments) {
                        _this.query.sql.push(",");
                    }
                    (_b = _this.query.sql).push.apply(_b, __spreadArray(__spreadArray(__spreadArray([], resolvedColumn, false), ["="], false), resolvedValue, false));
                    hasAssignments = true;
                });
            }
            else {
                var resolvedSet = _super.prototype.resolveStatement.call(_this, item);
                if (resolvedSet.length > 0) {
                    if (hasAssignments) {
                        _this.query.sql.push(",");
                    }
                    (_a = _this.query.sql).push.apply(_a, resolvedSet);
                    hasAssignments = true;
                }
            }
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.onConflict = function (target, where) {
        var _a, _b;
        var _this = this;
        _super.prototype.on.call(this);
        _super.prototype.conflict.call(this);
        if (target !== undefined && target !== null) {
            if (Array.isArray(target)) {
                var resolvedTarget = target.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    _super.prototype.pushSeparatedTokens.call(this, resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            }
            else {
                var resolvedTarget = _super.prototype.resolveStatement.call(this, target);
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    (_a = this.query.sql).push.apply(_a, resolvedTarget);
                    this.query.sql.push(")");
                }
            }
        }
        if (where) {
            _super.prototype.where.call(this);
            var resolvedWhere = _super.prototype.resolveStatement.call(this, where);
            if (resolvedWhere.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedWhere);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.onConstraint = function (constraintName) {
        var _a;
        _super.prototype.on.call(this);
        _super.prototype.constraint.call(this);
        if (constraintName !== undefined && constraintName !== null) {
            var resolvedConstraint = _super.prototype.resolveStatement.call(this, constraintName);
            if (resolvedConstraint.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedConstraint);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.on = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.on.call(this);
        if (param.length === 0) {
            return this.endClass();
        }
        var resolved = _super.prototype.resolveStatements.call(this, param).filter(function (tokens) { return tokens.length > 0; });
        if (resolved.length === 0) {
            return this.endClass();
        }
        resolved.forEach(function (tokens) {
            var _a;
            (_a = _this.query.sql).push.apply(_a, tokens);
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.doUpdate = function (set, where) {
        var _a;
        var _this = this;
        _super.prototype.do.call(this);
        _super.prototype.update.call(this);
        if (set !== undefined) {
            _super.prototype.set.call(this);
            var setEntries = Array.isArray(set) ? set : [set];
            var hasAssignments_1 = false;
            setEntries.forEach(function (entry) {
                Object.entries(entry).forEach(function (_a) {
                    var _b;
                    var column = _a[0], value = _a[1];
                    var resolvedColumn = _super.prototype.resolveIdentifierStatement.call(_this, column);
                    var resolvedValue = _super.prototype.resolveStatement.call(_this, value);
                    if (resolvedColumn.length === 0 || resolvedValue.length === 0) {
                        return;
                    }
                    if (hasAssignments_1) {
                        _this.query.sql.push(",");
                    }
                    (_b = _this.query.sql).push.apply(_b, __spreadArray(__spreadArray(__spreadArray([], resolvedColumn, false), ["="], false), resolvedValue, false));
                    hasAssignments_1 = true;
                });
            });
        }
        if (where) {
            _super.prototype.where.call(this);
            var resolvedWhere = _super.prototype.resolveStatement.call(this, where);
            if (resolvedWhere.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedWhere);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.doNothing = function () {
        _super.prototype.do.call(this);
        _super.prototype.nothing.call(this);
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.onConflictDoNothing = function (options) {
        var _a, _b;
        var _this = this;
        _super.prototype.on.call(this);
        _super.prototype.conflict.call(this);
        if ((options === null || options === void 0 ? void 0 : options.target) !== undefined && (options === null || options === void 0 ? void 0 : options.target) !== null) {
            if (Array.isArray(options.target)) {
                var resolvedTarget = options.target.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    _super.prototype.pushSeparatedTokens.call(this, resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            }
            else {
                var resolvedTarget = _super.prototype.resolveStatement.call(this, options.target);
                if (resolvedTarget.length > 0) {
                    (_a = this.query.sql).push.apply(_a, resolvedTarget);
                }
            }
        }
        if (options === null || options === void 0 ? void 0 : options.targetWhere) {
            _super.prototype.where.call(this);
            var resolvedTargetWhere = _super.prototype.resolveStatement.call(this, options.targetWhere);
            if (resolvedTargetWhere.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedTargetWhere);
            }
        }
        _super.prototype.do.call(this);
        _super.prototype.nothing.call(this);
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.onConflictDoUpdate = function (options) {
        var _a, _b, _c;
        var _this = this;
        _super.prototype.on.call(this);
        _super.prototype.conflict.call(this);
        if ((options === null || options === void 0 ? void 0 : options.target) !== undefined && (options === null || options === void 0 ? void 0 : options.target) !== null) {
            if (Array.isArray(options.target)) {
                var resolvedTarget = options.target.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    _super.prototype.pushSeparatedTokens.call(this, resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            }
            else {
                var resolvedTarget = _super.prototype.resolveStatement.call(this, options.target);
                if (resolvedTarget.length > 0) {
                    (_a = this.query.sql).push.apply(_a, resolvedTarget);
                }
            }
        }
        if (options === null || options === void 0 ? void 0 : options.targetWhere) {
            _super.prototype.where.call(this);
            var resolvedTargetWhere = _super.prototype.resolveStatement.call(this, options.targetWhere);
            if (resolvedTargetWhere.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedTargetWhere);
            }
        }
        _super.prototype.do.call(this);
        _super.prototype.update.call(this);
        _super.prototype.set.call(this);
        var setEntries = (options === null || options === void 0 ? void 0 : options.set) === undefined
            ? []
            : Array.isArray(options.set)
                ? options.set
                : [options.set];
        var hasAssignments = false;
        setEntries.forEach(function (entry) {
            Object.entries(entry).forEach(function (_a) {
                var _b;
                var column = _a[0], value = _a[1];
                var resolvedColumn = _super.prototype.resolveIdentifierStatement.call(_this, column);
                var resolvedValue = _super.prototype.resolveStatement.call(_this, value);
                if (resolvedColumn.length === 0 || resolvedValue.length === 0) {
                    return;
                }
                if (hasAssignments) {
                    _this.query.sql.push(",");
                }
                (_b = _this.query.sql).push.apply(_b, __spreadArray(__spreadArray(__spreadArray([], resolvedColumn, false), ["="], false), resolvedValue, false));
                hasAssignments = true;
            });
        });
        if (options === null || options === void 0 ? void 0 : options.setWhere) {
            _super.prototype.where.call(this);
            var resolvedSetWhere = _super.prototype.resolveStatement.call(this, options.setWhere);
            if (resolvedSetWhere.length > 0) {
                (_c = this.query.sql).push.apply(_c, resolvedSetWhere);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.case = function (caseExpr) {
        var _a;
        _super.prototype.case.call(this);
        if (caseExpr) {
            var resolvedExpr = _super.prototype.resolveStatement.call(this, caseExpr);
            if (resolvedExpr.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedExpr);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.when = function (condition) {
        var _a;
        _super.prototype.when.call(this);
        if (condition) {
            var resolvedCondition = _super.prototype.resolveStatement.call(this, condition);
            if (resolvedCondition.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedCondition);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.then = function (value) {
        var _a;
        _super.prototype.then.call(this);
        if (value) {
            var resolvedValue = _super.prototype.resolveStatement.call(this, value);
            if (resolvedValue.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedValue);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.else = function (value) {
        var _a;
        _super.prototype.else.call(this);
        if (value) {
            var resolvedValue = _super.prototype.resolveStatement.call(this, value);
            if (resolvedValue.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedValue);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.asc = function () {
        var _this = this;
        var cols = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cols[_i] = arguments[_i];
        }
        if (cols.length === 0) {
            _super.prototype.asc.call(this);
            return this.endClass();
        }
        var resolvedColumns = cols.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
        var hasTokens = false;
        resolvedColumns.forEach(function (tokens) {
            var _a;
            if (tokens.length === 0) {
                return;
            }
            if (hasTokens) {
                _this.query.sql.push(",");
            }
            (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray([], tokens, false), ["ASC"], false));
            hasTokens = true;
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.desc = function () {
        var _this = this;
        var cols = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cols[_i] = arguments[_i];
        }
        if (cols.length === 0) {
            _super.prototype.desc.call(this);
            return this.endClass();
        }
        var resolvedColumns = cols.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
        var hasTokens = false;
        resolvedColumns.forEach(function (tokens) {
            var _a;
            if (tokens.length === 0) {
                return;
            }
            if (hasTokens) {
                _this.query.sql.push(",");
            }
            (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray([], tokens, false), ["DESC"], false));
            hasTokens = true;
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.nullsFirst = function () {
        this.query.sql.push("NULLS", "FIRST");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.nullsLast = function () {
        this.query.sql.push("NULLS", "LAST");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.as = function (alias) {
        var _a;
        _super.prototype.as.call(this);
        if (alias !== undefined && alias !== null) {
            var resolvedAlias = _super.prototype.resolveIdentifierStatement.call(this, alias);
            if (resolvedAlias.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedAlias);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.sub = function () {
        var query = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            query[_i] = arguments[_i];
        }
        this.query.sql.push("(");
        if (query.length > 0) {
            var resolved = _super.prototype.resolveStatements.call(this, query);
            if (resolved.length > 0) {
                _super.prototype.pushSeparatedTokens.call(this, resolved, ",");
            }
        }
        this.query.sql.push(")");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.from = function () {
        var _this = this;
        var tables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tables[_i] = arguments[_i];
        }
        _super.prototype.from.call(this);
        if (tables.length === 0) {
            return this.endClass();
        }
        var resolvedTables = tables.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
        _super.prototype.pushSeparatedTokens.call(this, resolvedTables, ",");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.leftJoin = function (table, on) {
        var _a, _b;
        _super.prototype.left.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (on) {
            _super.prototype.on.call(this);
            var resolvedOn = _super.prototype.resolveStatement.call(this, on);
            if (resolvedOn.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedOn);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.leftJoinLateral = function (table, on) {
        var _a, _b;
        _super.prototype.left.call(this);
        _super.prototype.join.call(this);
        _super.prototype.lateral.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (on) {
            _super.prototype.on.call(this);
            var resolvedOn = _super.prototype.resolveStatement.call(this, on);
            if (resolvedOn.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedOn);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.innerJoin = function (table, on) {
        var _a, _b;
        _super.prototype.inner.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (on) {
            _super.prototype.on.call(this);
            var resolvedOn = _super.prototype.resolveStatement.call(this, on);
            if (resolvedOn.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedOn);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.rightJoin = function (table, on) {
        var _a, _b;
        _super.prototype.right.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (on) {
            _super.prototype.on.call(this);
            var resolvedOn = _super.prototype.resolveStatement.call(this, on);
            if (resolvedOn.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedOn);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.innerJoinLateral = function (table, on) {
        var _a, _b;
        _super.prototype.inner.call(this);
        _super.prototype.join.call(this);
        _super.prototype.lateral.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (on) {
            _super.prototype.on.call(this);
            var resolvedOn = _super.prototype.resolveStatement.call(this, on);
            if (resolvedOn.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedOn);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.fullJoin = function (table, on) {
        var _a, _b;
        _super.prototype.full.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (on) {
            _super.prototype.on.call(this);
            var resolvedOn = _super.prototype.resolveStatement.call(this, on);
            if (resolvedOn.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedOn);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.rightJoinLateral = function (table, on) {
        var _a, _b;
        _super.prototype.right.call(this);
        _super.prototype.join.call(this);
        _super.prototype.lateral.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (on) {
            _super.prototype.on.call(this);
            var resolvedOn = _super.prototype.resolveStatement.call(this, on);
            if (resolvedOn.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedOn);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.crossJoin = function (table) {
        var _a;
        _super.prototype.cross.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.crossJoinLateral = function (table) {
        var _a;
        _super.prototype.cross.call(this);
        _super.prototype.join.call(this);
        _super.prototype.lateral.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.join = function (table, on) {
        var _a, _b;
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (on) {
            _super.prototype.on.call(this);
            var resolvedOn = _super.prototype.resolveStatement.call(this, on);
            if (resolvedOn.length > 0) {
                (_b = this.query.sql).push.apply(_b, resolvedOn);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.naturalJoin = function (table) {
        var _a;
        _super.prototype.natural.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.naturalLeftJoin = function (table) {
        var _a;
        _super.prototype.natural.call(this);
        _super.prototype.left.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.naturalRightJoin = function (table) {
        var _a;
        _super.prototype.natural.call(this);
        _super.prototype.right.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.naturalInnerJoin = function (table) {
        var _a;
        _super.prototype.natural.call(this);
        _super.prototype.inner.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.naturalFullJoin = function (table) {
        var _a;
        _super.prototype.natural.call(this);
        _super.prototype.full.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.naturalCrossJoin = function (table) {
        var _a;
        _super.prototype.natural.call(this);
        _super.prototype.cross.call(this);
        _super.prototype.join.call(this);
        if (table !== undefined) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, table);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.groupBy = function () {
        var _this = this;
        var cols = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cols[_i] = arguments[_i];
        }
        _super.prototype.group.call(this);
        _super.prototype.by.call(this);
        if (cols.length === 0) {
            return this.endClass();
        }
        var resolvedColumns = cols.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
        _super.prototype.pushSeparatedTokens.call(this, resolvedColumns, ",");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.having = function (condition) {
        var _a;
        _super.prototype.having.call(this);
        if (condition === undefined || condition === null) {
            return this.endClass();
        }
        var resolvedCondition = _super.prototype.resolveStatement.call(this, condition);
        if (resolvedCondition.length === 0) {
            return this.endClass();
        }
        (_a = this.query.sql).push.apply(_a, resolvedCondition);
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.union = function () {
        var _a;
        var _this = this;
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i] = arguments[_i];
        }
        if (queries.length === 0) {
            _super.prototype.union.call(this);
            return this.endClass();
        }
        var resolvedQueries = _super.prototype.resolveStatements.call(this, queries).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            var baseQuery = resolvedQueries[0];
            if (baseQuery) {
                (_a = this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], baseQuery, false), [")"], false));
            }
            resolvedQueries.slice(1).forEach(function (tokens) {
                var _a;
                _super.prototype.union.call(_this);
                if (tokens) {
                    (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
                }
            });
            return this.endClass();
        }
        resolvedQueries.forEach(function (tokens) {
            var _a;
            _super.prototype.union.call(_this);
            if (tokens) {
                (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
            }
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.unionAll = function () {
        var _a;
        var _this = this;
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i] = arguments[_i];
        }
        if (queries.length === 0) {
            _super.prototype.union.call(this);
            _super.prototype.all.call(this);
            return this.endClass();
        }
        var resolvedQueries = _super.prototype.resolveStatements.call(this, queries).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            var baseQuery = resolvedQueries[0];
            if (baseQuery) {
                (_a = this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], baseQuery, false), [")"], false));
            }
            resolvedQueries.slice(1).forEach(function (tokens) {
                var _a;
                _super.prototype.union.call(_this);
                _super.prototype.all.call(_this);
                (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
            });
            return this.endClass();
        }
        resolvedQueries.forEach(function (tokens) {
            var _a;
            _super.prototype.union.call(_this);
            _super.prototype.all.call(_this);
            (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.intersect = function () {
        var _a;
        var _this = this;
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i] = arguments[_i];
        }
        if (queries.length === 0) {
            _super.prototype.intersect.call(this);
            return this.endClass();
        }
        var resolvedQueries = _super.prototype.resolveStatements.call(this, queries).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            var baseQuery = resolvedQueries[0];
            if (baseQuery) {
                (_a = this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], baseQuery, false), [")"], false));
            }
            resolvedQueries.slice(1).forEach(function (tokens) {
                var _a;
                _super.prototype.intersect.call(_this);
                (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
            });
            return this.endClass();
        }
        resolvedQueries.forEach(function (tokens) {
            var _a;
            _super.prototype.intersect.call(_this);
            (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.intersectAll = function () {
        var _a;
        var _this = this;
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i] = arguments[_i];
        }
        if (queries.length === 0) {
            _super.prototype.intersect.call(this);
            _super.prototype.all.call(this);
            return this.endClass();
        }
        var resolvedQueries = _super.prototype.resolveStatements.call(this, queries).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            var baseQuery = resolvedQueries[0];
            if (baseQuery) {
                (_a = this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], baseQuery, false), [")"], false));
            }
            resolvedQueries.slice(1).forEach(function (tokens) {
                var _a;
                _super.prototype.intersect.call(_this);
                _super.prototype.all.call(_this);
                (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
            });
            return this.endClass();
        }
        resolvedQueries.forEach(function (tokens) {
            var _a;
            _super.prototype.intersect.call(_this);
            _super.prototype.all.call(_this);
            (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.except = function () {
        var _a;
        var _this = this;
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i] = arguments[_i];
        }
        if (queries.length === 0) {
            _super.prototype.except.call(this);
            return this.endClass();
        }
        var resolvedQueries = _super.prototype.resolveStatements.call(this, queries).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            var baseQuery = resolvedQueries[0];
            if (baseQuery) {
                (_a = this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], baseQuery, false), [")"], false));
            }
            resolvedQueries.slice(1).forEach(function (tokens) {
                var _a;
                _super.prototype.except.call(_this);
                (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
            });
            return this.endClass();
        }
        resolvedQueries.forEach(function (tokens) {
            var _a;
            _super.prototype.except.call(_this);
            (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.exceptAll = function () {
        var _a;
        var _this = this;
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i] = arguments[_i];
        }
        if (queries.length === 0) {
            _super.prototype.except.call(this);
            _super.prototype.all.call(this);
            return this.endClass();
        }
        var resolvedQueries = _super.prototype.resolveStatements.call(this, queries).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            var baseQuery = resolvedQueries[0];
            if (baseQuery) {
                (_a = this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], baseQuery, false), [")"], false));
            }
            resolvedQueries.slice(1).forEach(function (tokens) {
                var _a;
                _super.prototype.except.call(_this);
                _super.prototype.all.call(_this);
                (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
            });
            return this.endClass();
        }
        resolvedQueries.forEach(function (tokens) {
            var _a;
            _super.prototype.except.call(_this);
            _super.prototype.all.call(_this);
            (_a = _this.query.sql).push.apply(_a, __spreadArray(__spreadArray(["("], tokens, false), [")"], false));
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.with = function (cteName, subQuery) {
        var _a, _b;
        _super.prototype.with.call(this);
        if (cteName !== undefined && cteName !== null) {
            var resolvedCteName = _super.prototype.resolveStatement.call(this, cteName);
            if (resolvedCteName.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedCteName);
            }
        }
        if (subQuery) {
            var resolvedSubQuery = _super.prototype.resolveStatement.call(this, subQuery);
            if (resolvedSubQuery.length > 0) {
                (_b = this.query.sql).push.apply(_b, __spreadArray(__spreadArray(["AS", "("], resolvedSubQuery, false), [")"], false));
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.where = function (condition) {
        var _a;
        _super.prototype.where.call(this);
        if (condition === undefined || condition === null) {
            return this.endClass();
        }
        var resolvedCondition = _super.prototype.resolveStatement.call(this, condition);
        if (resolvedCondition.length === 0) {
            return this.endClass();
        }
        (_a = this.query.sql).push.apply(_a, resolvedCondition);
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.and = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0) {
            _super.prototype.and.call(this);
            return this.endClass();
        }
        var resolvedValues = _super.prototype.resolveStatements.call(this, values).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedValues.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length > 0) {
            this.query.sql.push("AND");
        }
        resolvedValues.forEach(function (tokens, index) {
            var _a;
            if (index > 0) {
                _this.query.sql.push("AND");
            }
            (_a = _this.query.sql).push.apply(_a, tokens);
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.or = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0) {
            _super.prototype.or.call(this);
            return this.endClass();
        }
        var resolvedValues = _super.prototype.resolveStatements.call(this, values).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedValues.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length > 0) {
            this.query.sql.push("OR");
        }
        resolvedValues.forEach(function (tokens, index) {
            var _a;
            if (index > 0) {
                _this.query.sql.push("OR");
            }
            (_a = _this.query.sql).push.apply(_a, tokens);
        });
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.not = function () {
        var _a;
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0) {
            _super.prototype.not.call(this);
            return this.endClass();
        }
        var resolvedValues = _super.prototype.resolveStatements.call(this, values).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedValues.length === 0) {
            return this.endClass();
        }
        this.query.sql.push("NOT");
        if (resolvedValues.length === 1 && resolvedValues[0]) {
            (_a = this.query.sql).push.apply(_a, resolvedValues[0]);
        }
        else {
            this.query.sql.push("(");
            resolvedValues.forEach(function (tokens, index) {
                var _a;
                if (index > 0) {
                    _this.query.sql.push(",");
                }
                (_a = _this.query.sql).push.apply(_a, tokens);
            });
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.comma = function () {
        var queries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queries[_i] = arguments[_i];
        }
        var resolvedQueries = _super.prototype.resolveStatements.call(this, queries).filter(function (tokens) { return tokens.length > 0; });
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        _super.prototype.pushSeparatedTokens.call(this, resolvedQueries, ",");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.orderBy = function () {
        var _this = this;
        var cols = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cols[_i] = arguments[_i];
        }
        _super.prototype.order.call(this);
        _super.prototype.by.call(this);
        if (cols.length === 0) {
            return this.endClass();
        }
        var resolvedColumns = cols.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
        _super.prototype.pushSeparatedTokens.call(this, resolvedColumns, ",");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.returning = function (col) {
        var _a;
        _super.prototype.returning.call(this);
        if (col === undefined || col === null) {
            return this.endClass();
        }
        var resolvedColumn = _super.prototype.resolveStatement.call(this, col);
        if (resolvedColumn.length > 0) {
            (_a = this.query.sql).push.apply(_a, resolvedColumn);
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.limit = function (value) {
        var _a;
        _super.prototype.limit.call(this);
        if (value === undefined || value === null) {
            return this.endClass();
        }
        var resolvedLimit = _super.prototype.resolveStatement.call(this, value);
        if (resolvedLimit.length === 0) {
            return this.endClass();
        }
        (_a = this.query.sql).push.apply(_a, resolvedLimit);
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.offset = function (value) {
        var _a;
        _super.prototype.offset.call(this);
        if (value === undefined || value === null) {
            return this.endClass();
        }
        var resolvedOffset = _super.prototype.resolveStatement.call(this, value);
        if (resolvedOffset.length === 0) {
            return this.endClass();
        }
        (_a = this.query.sql).push.apply(_a, resolvedOffset);
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.fetch = function (count, mode, withTies) {
        var _a;
        if (mode === void 0) { mode = "first"; }
        if (withTies === void 0) { withTies = false; }
        _super.prototype.fetch.call(this);
        if (count !== undefined && count !== null) {
            this.query.sql.push(mode.toUpperCase());
            var resolvedCount = _super.prototype.resolveStatement.call(this, count);
            if (resolvedCount.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedCount);
            }
            var rowKeyword = typeof count === "number" && count === 1 ? "ROW" : "ROWS";
            this.query.sql.push(rowKeyword, withTies ? "WITH" : "ONLY");
            if (withTies) {
                this.query.sql.push("TIES");
            }
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.withTies = function () {
        this.query.sql.push("WITH", "TIES");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.t = function (table) {
        var _a;
        if (!table) {
            _super.prototype.t.call(this);
            return this.endClass();
        }
        if (typeof table === "string") {
            this.i(table);
            return this.endClass();
        }
        var resolved = _super.prototype.resolveIdentifierStatement.call(this, table);
        if (resolved.length > 0) {
            (_a = this.query.sql).push.apply(_a, resolved);
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.column = function (column) {
        var _a;
        if (!column) {
            _super.prototype.column.call(this);
            return this.endClass();
        }
        if (typeof column === "string") {
            this.i(column);
            return this.endClass();
        }
        var resolved = _super.prototype.resolveIdentifierStatement.call(this, column);
        if (resolved.length > 0) {
            (_a = this.query.sql).push.apply(_a, resolved);
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.c = function (column) {
        if (!column) {
            _super.prototype.c.call(this);
            return this.endClass();
        }
        else {
            this.column(column);
            return this.endClass();
        }
    };
    OverrideQueryBuilder.prototype.into = function (tableName, columns) {
        var _a;
        var _this = this;
        this.query.sql.push("INTO");
        if (tableName !== undefined && tableName !== null) {
            var resolvedTable = _super.prototype.resolveStatement.call(this, tableName);
            if (resolvedTable.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolvedTable);
            }
        }
        if (columns && columns.length > 0) {
            var resolvedColumns = columns.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolvedColumns, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.groupByDistinct = function () {
        var _this = this;
        var cols = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cols[_i] = arguments[_i];
        }
        _super.prototype.group.call(this);
        _super.prototype.by.call(this);
        this.query.sql.push("DISTINCT");
        if (cols.length === 0) {
            return this.endClass();
        }
        var resolvedColumns = cols.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
        _super.prototype.pushSeparatedTokens.call(this, resolvedColumns, ",");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.window = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.window.call(this);
        if (param.length === 0) {
            return this.endClass();
        }
        var resolved = _super.prototype.resolveStatements.call(this, param);
        if (resolved.length === 0) {
            return this.endClass();
        }
        else {
            _super.prototype.pushSeparatedTokens.call(this, resolved, ",");
        }
        return this.endClass();
    };
    // subquery operators (support multiple params)
    OverrideQueryBuilder.prototype.exists = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length === 0) {
            _super.prototype.exists.call(this);
            return this.endClass();
        }
        _super.prototype.exists.call(this);
        var resolved = _super.prototype.resolveStatements.call(this, params).filter(function (tokens) { return tokens.length > 0; });
        if (resolved.length === 0) {
            return this.endClass();
        }
        else {
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.notExists = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length === 0) {
            _super.prototype.not.call(this);
            _super.prototype.exists.call(this);
            return this.endClass();
        }
        _super.prototype.not.call(this);
        _super.prototype.exists.call(this);
        var resolved = _super.prototype.resolveStatements.call(this, params).filter(function (tokens) { return tokens.length > 0; });
        if (resolved.length === 0) {
            return this.endClass();
        }
        else {
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.in = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length === 0) {
            _super.prototype.in.call(this);
            return this.endClass();
        }
        _super.prototype.in.call(this);
        var resolved = _super.prototype.resolveStatements.call(this, params).filter(function (tokens) { return tokens.length > 0; });
        if (resolved.length === 0) {
            return this.endClass();
        }
        else {
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.notIn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length === 0) {
            _super.prototype.not.call(this);
            _super.prototype.in.call(this);
            return this.endClass();
        }
        _super.prototype.not.call(this);
        _super.prototype.in.call(this);
        var resolved = _super.prototype.resolveStatements.call(this, params).filter(function (tokens) { return tokens.length > 0; });
        if (resolved.length === 0) {
            return this.endClass();
        }
        else {
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.any = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length === 0) {
            _super.prototype.any.call(this);
            return this.endClass();
        }
        _super.prototype.any.call(this);
        var resolved = _super.prototype.resolveStatements.call(this, params).filter(function (tokens) { return tokens.length > 0; });
        if (resolved.length === 0) {
            return this.endClass();
        }
        else {
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.all = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length === 0) {
            _super.prototype.all.call(this);
            return this.endClass();
        }
        _super.prototype.all.call(this);
        var resolved = _super.prototype.resolveStatements.call(this, params).filter(function (tokens) { return tokens.length > 0; });
        if (resolved.length === 0) {
            return this.endClass();
        }
        else {
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.some = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length === 0) {
            _super.prototype.some.call(this);
            return this.endClass();
        }
        _super.prototype.some.call(this);
        var resolved = _super.prototype.resolveStatements.call(this, params).filter(function (tokens) { return tokens.length > 0; });
        if (resolved.length === 0) {
            return this.endClass();
        }
        else {
            this.query.sql.push("(");
            _super.prototype.pushSeparatedTokens.call(this, resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.over = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param.length === 0) {
            this.query.sql.push("OVER");
            return this.endClass();
        }
        var resolved = _super.prototype.resolveStatements.call(this, param).filter(function (tokens) { return tokens.length > 0; });
        if (resolved.length === 0) {
            this.query.sql.push("OVER");
            return this.endClass();
        }
        this.query.sql.push("OVER", "(");
        resolved.forEach(function (tokens) {
            var _a;
            (_a = _this.query.sql).push.apply(_a, tokens);
        });
        this.query.sql.push(")");
        return this.endClass();
    };
    OverrideQueryBuilder.prototype.partitionBy = function () {
        var _this = this;
        var cols = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cols[_i] = arguments[_i];
        }
        this.query.sql.push("PARTITION", "BY");
        if (cols.length === 0) {
            return this.endClass();
        }
        var resolvedColumns = cols.map(function (item) { return _super.prototype.resolveStatement.call(_this, item); });
        _super.prototype.pushSeparatedTokens.call(this, resolvedColumns, ",");
        return this.endClass();
    };
    return OverrideQueryBuilder;
}(OperatorFunctionBuilder));
export { OverrideQueryBuilder };
