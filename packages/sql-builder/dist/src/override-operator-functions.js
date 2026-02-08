"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorFunctionBuilder = void 0;
const override_string_functions_1 = require("./override-string-functions");
class OperatorFunctionBuilder extends override_string_functions_1.StringFunctionBuilder {
    // Comparison operators
    eq(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "=", val2);
        }
        if (val1 !== undefined) {
            return this.op("=", val1);
        }
        return this.op("=");
    }
    ne(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<>", val2);
        }
        if (val1 !== undefined) {
            return this.op("<>", val1);
        }
        return this.op("<>");
    }
    notEq(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "!=", val2);
        }
        if (val1 !== undefined) {
            return this.op("!=", val1);
        }
        return this.op("!=");
    }
    lt(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<", val2);
        }
        if (val1 !== undefined) {
            return this.op("<", val1);
        }
        return this.op("<");
    }
    gt(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">", val2);
        }
        if (val1 !== undefined) {
            return this.op(">", val1);
        }
        return this.op(">");
    }
    lte(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<=", val2);
        }
        if (val1 !== undefined) {
            return this.op("<=", val1);
        }
        return this.op("<=");
    }
    gte(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">=", val2);
        }
        if (val1 !== undefined) {
            return this.op(">=", val1);
        }
        return this.op(">=");
    }
    // Logical operators
    exclamation(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "!", val2);
        }
        if (val1 !== undefined) {
            return this.op("!", val1);
        }
        return this.op("!");
    }
    is(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "IS", val2);
        }
        if (val1 !== undefined) {
            return this.op("IS", val1);
        }
        return this.op("IS");
    }
    isNot(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "IS NOT", val2);
        }
        if (val1 !== undefined) {
            return this.op("IS NOT", val1);
        }
        return this.op("IS NOT");
    }
    // Pattern matching
    matchRegex(value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "~", value2);
        }
        if (value1 !== undefined) {
            return this.op("~", value1);
        }
        return this.op("~");
    }
    matchRegexInsensitive(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "~*", val2);
        }
        if (val1 !== undefined) {
            return this.op("~*", val1);
        }
        return this.op("~*");
    }
    notMatchRegex(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "!~", val2);
        }
        if (val1 !== undefined) {
            return this.op("!~", val1);
        }
        return this.op("!~");
    }
    notMatchRegexInsensitive(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "!~*", val2);
        }
        if (val1 !== undefined) {
            return this.op("!~*", val1);
        }
        return this.op("!~*");
    }
    like(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "LIKE", val2);
        }
        if (val1 !== undefined) {
            return this.op("LIKE", val1);
        }
        return this.op("LIKE");
    }
    notLike(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "NOT LIKE", val2);
        }
        if (val1 !== undefined) {
            return this.op("NOT LIKE", val1);
        }
        return this.op("NOT LIKE");
    }
    ilike(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "ILIKE", val2);
        }
        if (val1 !== undefined) {
            return this.op("ILIKE", val1);
        }
        return this.op("ILIKE");
    }
    notIlike(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "NOT ILIKE", val2);
        }
        if (val1 !== undefined) {
            return this.op("NOT ILIKE", val1);
        }
        return this.op("NOT ILIKE");
    }
    similarTo(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "SIMILAR TO", val2);
        }
        if (val1 !== undefined) {
            return this.op("SIMILAR TO", val1);
        }
        return this.op("SIMILAR TO");
    }
    notSimilarTo(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "NOT SIMILAR TO", val2);
        }
        if (val1 !== undefined) {
            return this.op("NOT SIMILAR TO", val1);
        }
        return this.op("NOT SIMILAR TO");
    }
    // Bitwise operators
    bitwiseAnd(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "&", val2);
        }
        if (val1 !== undefined) {
            return this.op("&", val1);
        }
        return this.op("&");
    }
    bitwiseOr(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "|", val2);
        }
        if (val1 !== undefined) {
            return this.op("|", val1);
        }
        return this.op("|");
    }
    bitwiseXor(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "^", val2);
        }
        if (val1 !== undefined) {
            return this.op("^", val1);
        }
        return this.op("^");
    }
    bitwiseLeftShift(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<<", val2);
        }
        if (val1 !== undefined) {
            return this.op("<<", val1);
        }
        return this.op("<<");
    }
    bitwiseLeftShiftAssign(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<<=", val2);
        }
        if (val1 !== undefined) {
            return this.op("<<=", val1);
        }
        return this.op("<<=");
    }
    bitwiseRightShift(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">>", val2);
        }
        if (val1 !== undefined) {
            return this.op(">>", val1);
        }
        return this.op(">>");
    }
    bitwiseRightShiftAssign(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">>=", val2);
        }
        if (val1 !== undefined) {
            return this.op(">>=", val1);
        }
        return this.op(">>=");
    }
    // Arithmetic operators with optional parameters
    plus(value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "+", value2);
        }
        if (value1 !== undefined) {
            return this.op("+", value1);
        }
        return this.op("+");
    }
    minus(value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "-", value2);
        }
        if (value1 !== undefined) {
            return this.op("-", value1);
        }
        return this.op("-");
    }
    multiply(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "*", val2);
        }
        if (val1 !== undefined) {
            return this.op("*", val1);
        }
        return this.op("*");
    }
    divide(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "/", val2);
        }
        if (val1 !== undefined) {
            return this.op("/", val1);
        }
        return this.op("/");
    }
    modulo(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "%", val2);
        }
        if (val1 !== undefined) {
            return this.op("%", val1);
        }
        return this.op("%");
    }
    textCat(value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "||", value2);
        }
        if (value1 !== undefined) {
            return this.op("||", value1);
        }
        return this.op("||");
    }
    // PostgreSQL-specific
    atSign(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "@", val2);
        }
        if (val1 !== undefined) {
            return this.op("@", val1);
        }
        return this.op("@");
    }
    hash(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "#", val2);
        }
        if (val1 !== undefined) {
            return this.op("#", val1);
        }
        return this.op("#");
    }
    caretAt(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "^@", val2);
        }
        if (val1 !== undefined) {
            return this.op("^@", val1);
        }
        return this.op("^@");
    }
    // Geometric operators (PostgreSQL)
    totalLength(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "@-@", val2);
        }
        if (val1 !== undefined) {
            return this.op("@-@", val1);
        }
        return this.op("@-@");
    }
    middle(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "@@", val2);
        }
        if (val1 !== undefined) {
            return this.op("@@", val1);
        }
        return this.op("@@");
    }
    closestPoint(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "##", val2);
        }
        if (val1 !== undefined) {
            return this.op("##", val1);
        }
        return this.op("##");
    }
    distance(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<->", val2);
        }
        if (val1 !== undefined) {
            return this.op("<->", val1);
        }
        return this.op("<->");
    }
    containment(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "  ", val2);
        }
        if (val1 !== undefined) {
            return this.op("@>", val1);
        }
        return this.op("@>");
    }
    containedBy(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<@", val2);
        }
        if (val1 !== undefined) {
            return this.op("<@", val1);
        }
        return this.op("<@");
    }
    notExtendRight(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "&<", val2);
        }
        if (val1 !== undefined) {
            return this.op("&<", val1);
        }
        return this.op("&<");
    }
    notExtendLeft(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "&>", val2);
        }
        if (val1 !== undefined) {
            return this.op("&>", val1);
        }
        return this.op("&>");
    }
    strictlyBelow(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<<|", val2);
        }
        if (val1 !== undefined) {
            return this.op("<<|", val1);
        }
        return this.op("<<|");
    }
    strictlyAbove(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "|>>", val2);
        }
        if (val1 !== undefined) {
            return this.op("|>>", val1);
        }
        return this.op("|>>");
    }
    notExtendAbove(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "&<|", val2);
        }
        if (val1 !== undefined) {
            return this.op("&<|", val1);
        }
        return this.op("&<|");
    }
    notExtendBelow(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "|&>", val2);
        }
        if (val1 !== undefined) {
            return this.op("|&>", val1);
        }
        return this.op("|&>");
    }
    below(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<^", val2);
        }
        if (val1 !== undefined) {
            return this.op("<^", val1);
        }
        return this.op("<^");
    }
    above(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">^", val2);
        }
        if (val1 !== undefined) {
            return this.op(">^", val1);
        }
        return this.op(">^");
    }
    crosses(value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "?#", value2);
        }
        if (value1 !== undefined) {
            return this.op("?#", value1);
        }
        return this.op("?#");
    }
    horizontal(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "?-", val2);
        }
        if (val1 !== undefined) {
            return this.op("?-", val1);
        }
        return this.op("?-");
    }
    vertical(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "?|", val2);
        }
        if (val1 !== undefined) {
            return this.op("?|", val1);
        }
        return this.op("?|");
    }
    perpendicular(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "?-|", val2);
        }
        if (val1 !== undefined) {
            return this.op("?-|", val1);
        }
        return this.op("?-|");
    }
    isParallel(value1, value2) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "?||", value2);
        }
        if (value1 !== undefined) {
            return this.op("?||", value1);
        }
        return this.op("?||");
    }
    sameAs(val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "~=", val2);
        }
        if (val1 !== undefined) {
            return this.op("~=", val1);
        }
        return this.op("~=");
    }
}
exports.OperatorFunctionBuilder = OperatorFunctionBuilder;
