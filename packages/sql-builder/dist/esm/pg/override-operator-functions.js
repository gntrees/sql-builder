import { AllFunctionBuilder } from "./generated/override-all-functions";
export class OperatorFunctionBuilder extends AllFunctionBuilder {
    // Comparison operators
    eq(val1, val2) {
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
    }
    ne(val1, val2) {
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
    }
    notEq(val1, val2) {
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
    }
    lt(val1, val2) {
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
    }
    gt(val1, val2) {
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
    }
    lte(val1, val2) {
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
    }
    gte(val1, val2) {
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
    }
    // Logical operators
    exclamation(val1, val2) {
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
    }
    is(val1, val2) {
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
    }
    isNot(val1, val2) {
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
    }
    // Pattern matching
    matchRegex(value1, value2) {
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
    }
    matchRegexInsensitive(val1, val2) {
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
    }
    notMatchRegex(val1, val2) {
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
    }
    notMatchRegexInsensitive(val1, val2) {
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
    }
    like(val1, val2) {
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
    }
    notLike(val1, val2) {
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
    }
    ilike(val1, val2) {
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
    }
    notIlike(val1, val2) {
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
    }
    similarTo(val1, val2) {
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
    }
    notSimilarTo(val1, val2) {
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
    }
    // Bitwise operators
    bitwiseAnd(val1, val2) {
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
    }
    bitwiseOr(val1, val2) {
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
    }
    bitwiseXor(val1, val2) {
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
    }
    bitwiseLeftShift(val1, val2) {
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
    }
    bitwiseLeftShiftAssign(val1, val2) {
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
    }
    bitwiseRightShift(val1, val2) {
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
    }
    bitwiseRightShiftAssign(val1, val2) {
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
    }
    // Arithmetic operators with optional parameters
    plus(value1, value2) {
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
    }
    minus(value1, value2) {
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
    }
    multiply(val1, val2) {
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
    }
    divide(val1, val2) {
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
    }
    modulo(val1, val2) {
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
    }
    textCat(value1, value2) {
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
    }
    // PostgreSQL-specific
    atSign(val1, val2) {
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
    }
    hash(val1, val2) {
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
    }
    caretAt(val1, val2) {
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
    }
    // Geometric operators (PostgreSQL)
    totalLength(val1, val2) {
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
    }
    middle(val1, val2) {
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
    }
    closestPoint(val1, val2) {
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
    }
    distance(val1, val2) {
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
    }
    containment(val1, val2) {
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
    }
    containedBy(val1, val2) {
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
    }
    notExtendRight(val1, val2) {
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
    }
    notExtendLeft(val1, val2) {
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
    }
    strictlyBelow(val1, val2) {
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
    }
    strictlyAbove(val1, val2) {
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
    }
    notExtendAbove(val1, val2) {
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
    }
    notExtendBelow(val1, val2) {
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
    }
    below(val1, val2) {
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
    }
    above(val1, val2) {
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
    }
    crosses(value1, value2) {
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
    }
    horizontal(val1, val2) {
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
    }
    vertical(val1, val2) {
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
    }
    perpendicular(val1, val2) {
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
    }
    isParallel(value1, value2) {
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
    }
    sameAs(val1, val2) {
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
    }
    // Between operators
    between(low, high) {
        this.query.sql.push("BETWEEN");
        if (low !== undefined) {
            const resolvedLow = this.resolveStatement(low);
            this.query.sql.push(...resolvedLow);
        }
        if (low !== undefined && high !== undefined) {
            this.query.sql.push("AND");
            const resolvedHigh = this.resolveStatement(high);
            this.query.sql.push(...resolvedHigh);
        }
        return this.endClass();
    }
    notBetween(low, high) {
        this.query.sql.push("NOT", "BETWEEN");
        if (low !== undefined) {
            const resolvedLow = this.resolveStatement(low);
            this.query.sql.push(...resolvedLow);
        }
        if (low !== undefined && high !== undefined) {
            this.query.sql.push("AND");
            const resolvedHigh = this.resolveStatement(high);
            this.query.sql.push(...resolvedHigh);
        }
        return this.endClass();
    }
    betweenSymmetric(low, high) {
        this.query.sql.push("BETWEEN", "SYMMETRIC");
        if (low !== undefined) {
            const resolvedLow = this.resolveStatement(low);
            this.query.sql.push(...resolvedLow);
        }
        if (low !== undefined && high !== undefined) {
            this.query.sql.push("AND");
            const resolvedHigh = this.resolveStatement(high);
            this.query.sql.push(...resolvedHigh);
        }
        return this.endClass();
    }
    notBetweenSymmetric(low, high) {
        this.query.sql.push("NOT", "BETWEEN", "SYMMETRIC");
        if (low !== undefined) {
            const resolvedLow = this.resolveStatement(low);
            this.query.sql.push(...resolvedLow);
        }
        if (low !== undefined && high !== undefined) {
            this.query.sql.push("AND");
            const resolvedHigh = this.resolveStatement(high);
            this.query.sql.push(...resolvedHigh);
        }
        return this.endClass();
    }
}
