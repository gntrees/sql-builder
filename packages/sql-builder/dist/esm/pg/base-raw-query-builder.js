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
import { CoreQueryBuilder } from './core-query-builder';
import { OPERATORS, } from './types';
var ParameterType = /** @class */ (function () {
    function ParameterType(_a) {
        var value = _a.value, type = _a.type;
        this.value = value;
        this.type = type;
    }
    return ParameterType;
}());
export { ParameterType };
var BaseRawQueryBuilder = /** @class */ (function (_super) {
    __extends(BaseRawQueryBuilder, _super);
    function BaseRawQueryBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseRawQueryBuilder.prototype.raw = function (strings) {
        // console.log("strings:",strings.map(i=>String(i)),strings[1], values[0]);
        var _a;
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        this.resolveSchemaParam("template-literal", "raw", strings.reduce(function (acc, str, i) {
            return __spreadArray(__spreadArray([], acc, true), [str, values[i]], false);
        }, []));
        var resolvedValues = this.resolveStatements(values);
        var tokens = [];
        for (var i = 0; i < strings.length; i += 1) {
            var chunk = strings[i];
            if (chunk) {
                tokens.push(chunk);
            }
            var resolvedValue = resolvedValues[i];
            if (resolvedValue) {
                tokens.push.apply(tokens, resolvedValue);
            }
        }
        (_a = this.query.sql).push.apply(_a, tokens);
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.literal = function (value) {
        var _a;
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
            this.query.sql.push(this.createLiteralParameter(value));
        }
        else {
            var resolved = this.resolveStatement(value);
            if (resolved.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolved);
            }
        }
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.literalArray = function (values) {
        var _a;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
                this.query.sql.push(this.createLiteralParameter(value));
            }
            else {
                var resolved = this.resolveStatement(value);
                if (resolved.length > 0) {
                    (_a = this.query.sql).push.apply(_a, resolved);
                }
            }
        }
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.identifier = function (value) {
        var _a;
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            this.query.sql.push(this.createIdentifierParameter(value));
        }
        else {
            var resolved = this.resolveIdentifierStatement(value);
            if (resolved.length > 0) {
                (_a = this.query.sql).push.apply(_a, resolved);
            }
        }
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.identifierArray = function (values) {
        var _a;
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var value = values_2[_i];
            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                this.query.sql.push(this.createIdentifierParameter(value));
            }
            else {
                var resolved = this.resolveIdentifierStatement(value);
                if (resolved.length > 0) {
                    (_a = this.query.sql).push.apply(_a, resolved);
                }
            }
        }
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.rawString = function (value) {
        this.query.sql.push(this.createStringParameter(value));
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.percentCharacter = function () {
        this.query.sql.push(this.createPercentParameter());
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.r = function (strings) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        this.resolveSchemaParam("template-literal", "r", strings.reduce(function (acc, str, i) {
            return __spreadArray(__spreadArray([], acc, true), [str, values[i]], false);
        }, []));
        this.raw.apply(this, __spreadArray([strings], values, false));
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.l = function (value) {
        this.literal(value);
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.v = function (value) {
        var _a;
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            this.l(value);
            return this.endClass();
        }
        var resolved = this.resolveStatement(value);
        if (resolved.length > 0) {
            (_a = this.query.sql).push.apply(_a, resolved);
        }
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.i = function (value) {
        if (value === "*") {
            this.rawString("*");
            return this.endClass();
        }
        if (value === null) {
            this.rawString("NULL");
            return this.endClass();
        }
        this.identifier(value);
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.rs = function (value) {
        this.rawString(value);
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.op = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        for (var _b = 0, values_3 = values; _b < values_3.length; _b++) {
            var value = values_3[_b];
            if (typeof value === "string" && this.isOperatorType(value)) {
                var resolvedOperator = this.resolveStringStatement(value);
                if (resolvedOperator.length > 0) {
                    (_a = this.query.sql).push.apply(_a, resolvedOperator);
                }
            }
            else {
                this.v(value);
            }
        }
        return this.endClass();
    };
    BaseRawQueryBuilder.prototype.isOperatorType = function (value) {
        return OPERATORS.map(function (i) { return i.toLowerCase(); }).includes(value.toLowerCase());
    };
    // special for params feature
    BaseRawQueryBuilder.prototype.schemaParam = function (key) {
        return this.schemaParamCore(key);
    };
    BaseRawQueryBuilder.prototype.schemaCase = function (key, queryBuilder) {
        this.schemaCaseCore(key, queryBuilder);
        return this;
    };
    BaseRawQueryBuilder.prototype.setParams = function (params) {
        return this.setParamsCore(params);
    };
    return BaseRawQueryBuilder;
}(CoreQueryBuilder));
export { BaseRawQueryBuilder };
