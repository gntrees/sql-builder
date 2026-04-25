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
import { AllFunctionBuilder } from "./generated/override-all-functions";
var OperatorFunctionBuilder = /** @class */ (function (_super) {
    __extends(OperatorFunctionBuilder, _super);
    function OperatorFunctionBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Comparison operators
    OperatorFunctionBuilder.prototype.eq = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "=", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("=", val1);
            return this.endClass();
        }
        this.op("=");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.ne = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "<>", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("<>", val1);
            return this.endClass();
        }
        this.op("<>");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notEq = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "!=", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("!=", val1);
            return this.endClass();
        }
        this.op("!=");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.lt = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "<", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("<", val1);
            return this.endClass();
        }
        this.op("<");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.gt = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, ">", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op(">", val1);
            return this.endClass();
        }
        this.op(">");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.lte = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "<=", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("<=", val1);
            return this.endClass();
        }
        this.op("<=");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.gte = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, ">=", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op(">=", val1);
            return this.endClass();
        }
        this.op(">=");
        return this.endClass();
    };
    // Logical operators
    OperatorFunctionBuilder.prototype.exclamation = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "!", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("!", val1);
            return this.endClass();
        }
        this.op("!");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.is = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "IS", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("IS", val1);
            return this.endClass();
        }
        this.op("IS");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.isNot = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "IS NOT", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("IS NOT", val1);
            return this.endClass();
        }
        this.op("IS NOT");
        return this.endClass();
    };
    // Pattern matching
    OperatorFunctionBuilder.prototype.matchRegex = function (value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            this.op(value1, "~", value2);
            return this.endClass();
        }
        if (value1 !== undefined) {
            this.op("~", value1);
            return this.endClass();
        }
        this.op("~");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.matchRegexInsensitive = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "~*", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("~*", val1);
            return this.endClass();
        }
        this.op("~*");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notMatchRegex = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "!~", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("!~", val1);
            return this.endClass();
        }
        this.op("!~");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notMatchRegexInsensitive = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "!~*", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("!~*", val1);
            return this.endClass();
        }
        this.op("!~*");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.like = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "LIKE", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("LIKE", val1);
            return this.endClass();
        }
        this.op("LIKE");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notLike = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "NOT LIKE", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("NOT LIKE", val1);
            return this.endClass();
        }
        this.op("NOT LIKE");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.ilike = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "ILIKE", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("ILIKE", val1);
            return this.endClass();
        }
        this.op("ILIKE");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notIlike = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "NOT ILIKE", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("NOT ILIKE", val1);
            return this.endClass();
        }
        this.op("NOT ILIKE");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.similarTo = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "SIMILAR TO", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("SIMILAR TO", val1);
            return this.endClass();
        }
        this.op("SIMILAR TO");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notSimilarTo = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "NOT SIMILAR TO", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("NOT SIMILAR TO", val1);
            return this.endClass();
        }
        this.op("NOT SIMILAR TO");
        return this.endClass();
    };
    // Bitwise operators
    OperatorFunctionBuilder.prototype.bitwiseAnd = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "&", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("&", val1);
            return this.endClass();
        }
        this.op("&");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.bitwiseOr = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "|", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("|", val1);
            return this.endClass();
        }
        this.op("|");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.bitwiseXor = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "^", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("^", val1);
            return this.endClass();
        }
        this.op("^");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.bitwiseLeftShift = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "<<", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("<<", val1);
            return this.endClass();
        }
        this.op("<<");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.bitwiseLeftShiftAssign = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "<<=", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("<<=", val1);
            return this.endClass();
        }
        this.op("<<=");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.bitwiseRightShift = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, ">>", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op(">>", val1);
            return this.endClass();
        }
        this.op(">>");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.bitwiseRightShiftAssign = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, ">>=", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op(">>=", val1);
            return this.endClass();
        }
        this.op(">>=");
        return this.endClass();
    };
    // Arithmetic operators with optional parameters
    OperatorFunctionBuilder.prototype.plus = function (value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            this.op(value1, "+", value2);
            return this.endClass();
        }
        if (value1 !== undefined) {
            this.op("+", value1);
            return this.endClass();
        }
        this.op("+");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.minus = function (value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            this.op(value1, "-", value2);
            return this.endClass();
        }
        if (value1 !== undefined) {
            this.op("-", value1);
            return this.endClass();
        }
        this.op("-");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.multiply = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "*", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("*", val1);
            return this.endClass();
        }
        this.op("*");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.divide = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "/", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("/", val1);
            return this.endClass();
        }
        this.op("/");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.modulo = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "%", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("%", val1);
            return this.endClass();
        }
        this.op("%");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.textCat = function (value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            this.op(value1, "||", value2);
            return this.endClass();
        }
        if (value1 !== undefined) {
            this.op("||", value1);
            return this.endClass();
        }
        this.op("||");
        return this.endClass();
    };
    // PostgreSQL-specific
    OperatorFunctionBuilder.prototype.atSign = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "@", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("@", val1);
            return this.endClass();
        }
        this.op("@");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.hash = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "#", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("#", val1);
            return this.endClass();
        }
        this.op("#");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.caretAt = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "^@", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("^@", val1);
            return this.endClass();
        }
        this.op("^@");
        return this.endClass();
    };
    // Geometric operators (PostgreSQL)
    OperatorFunctionBuilder.prototype.totalLength = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "@-@", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("@-@", val1);
            return this.endClass();
        }
        this.op("@-@");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.middle = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "@@", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("@@", val1);
            return this.endClass();
        }
        this.op("@@");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.closestPoint = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "##", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("##", val1);
            return this.endClass();
        }
        this.op("##");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.distance = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "<->", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("<->", val1);
            return this.endClass();
        }
        this.op("<->");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.containment = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "  ", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("@>", val1);
            return this.endClass();
        }
        this.op("@>");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.containedBy = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "<@", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("<@", val1);
            return this.endClass();
        }
        this.op("<@");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notExtendRight = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "&<", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("&<", val1);
            return this.endClass();
        }
        this.op("&<");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notExtendLeft = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "&>", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("&>", val1);
            return this.endClass();
        }
        this.op("&>");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.strictlyBelow = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "<<|", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("<<|", val1);
            return this.endClass();
        }
        this.op("<<|");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.strictlyAbove = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "|>>", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("|>>", val1);
            return this.endClass();
        }
        this.op("|>>");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notExtendAbove = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "&<|", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("&<|", val1);
            return this.endClass();
        }
        this.op("&<|");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notExtendBelow = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "|&>", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("|&>", val1);
            return this.endClass();
        }
        this.op("|&>");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.below = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "<^", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("<^", val1);
            return this.endClass();
        }
        this.op("<^");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.above = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, ">^", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op(">^", val1);
            return this.endClass();
        }
        this.op(">^");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.crosses = function (value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            this.op(value1, "?#", value2);
            return this.endClass();
        }
        if (value1 !== undefined) {
            this.op("?#", value1);
            return this.endClass();
        }
        this.op("?#");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.horizontal = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "?-", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("?-", val1);
            return this.endClass();
        }
        this.op("?-");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.vertical = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "?|", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("?|", val1);
            return this.endClass();
        }
        this.op("?|");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.perpendicular = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "?-|", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("?-|", val1);
            return this.endClass();
        }
        this.op("?-|");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.isParallel = function (value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            this.op(value1, "?||", value2);
            return this.endClass();
        }
        if (value1 !== undefined) {
            this.op("?||", value1);
            return this.endClass();
        }
        this.op("?||");
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.sameAs = function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            this.op(val1, "~=", val2);
            return this.endClass();
        }
        if (val1 !== undefined) {
            this.op("~=", val1);
            return this.endClass();
        }
        this.op("~=");
        return this.endClass();
    };
    // Between operators
    OperatorFunctionBuilder.prototype.between = function (low, high) {
        var _a, _b;
        this.query.sql.push("BETWEEN");
        if (low !== undefined) {
            var resolvedLow = this.resolveStatement(low);
            (_a = this.query.sql).push.apply(_a, resolvedLow);
        }
        if (low !== undefined && high !== undefined) {
            this.query.sql.push("AND");
            var resolvedHigh = this.resolveStatement(high);
            (_b = this.query.sql).push.apply(_b, resolvedHigh);
        }
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notBetween = function (low, high) {
        var _a, _b;
        this.query.sql.push("NOT", "BETWEEN");
        if (low !== undefined) {
            var resolvedLow = this.resolveStatement(low);
            (_a = this.query.sql).push.apply(_a, resolvedLow);
        }
        if (low !== undefined && high !== undefined) {
            this.query.sql.push("AND");
            var resolvedHigh = this.resolveStatement(high);
            (_b = this.query.sql).push.apply(_b, resolvedHigh);
        }
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.betweenSymmetric = function (low, high) {
        var _a, _b;
        this.query.sql.push("BETWEEN", "SYMMETRIC");
        if (low !== undefined) {
            var resolvedLow = this.resolveStatement(low);
            (_a = this.query.sql).push.apply(_a, resolvedLow);
        }
        if (low !== undefined && high !== undefined) {
            this.query.sql.push("AND");
            var resolvedHigh = this.resolveStatement(high);
            (_b = this.query.sql).push.apply(_b, resolvedHigh);
        }
        return this.endClass();
    };
    OperatorFunctionBuilder.prototype.notBetweenSymmetric = function (low, high) {
        var _a, _b;
        this.query.sql.push("NOT", "BETWEEN", "SYMMETRIC");
        if (low !== undefined) {
            var resolvedLow = this.resolveStatement(low);
            (_a = this.query.sql).push.apply(_a, resolvedLow);
        }
        if (low !== undefined && high !== undefined) {
            this.query.sql.push("AND");
            var resolvedHigh = this.resolveStatement(high);
            (_b = this.query.sql).push.apply(_b, resolvedHigh);
        }
        return this.endClass();
    };
    return OperatorFunctionBuilder;
}(AllFunctionBuilder));
export { OperatorFunctionBuilder };
