import { StringFunctionBuilder } from "./override-string-functions";
import type { Statement } from "./types";

export class OperatorFunctionBuilder extends StringFunctionBuilder {
    // Comparison operators
    eq(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "=", val2);
        }
        if (val1 !== undefined) {
            return this.op("=", val1);
        }
        return this.op("=");
    }
    ne(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<>", val2);
        }
        if (val1 !== undefined) {
            return this.op("<>", val1);
        }
        return this.op("<>");
    }
    notEq(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "!=", val2);
        }
        if (val1 !== undefined) {
            return this.op("!=", val1);
        }
        return this.op("!=");
    }
    lt(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<", val2);
        }
        if (val1 !== undefined) {
            return this.op("<", val1);
        }
        return this.op("<");
    }
    gt(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">", val2);
        }
        if (val1 !== undefined) {
            return this.op(">", val1);
        }
        return this.op(">");
    }
    lte(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<=", val2);
        }
        if (val1 !== undefined) {
            return this.op("<=", val1);
        }
        return this.op("<=");
    }
    gte(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">=", val2);
        }
        if (val1 !== undefined) {
            return this.op(">=", val1);
        }
        return this.op(">=");
    }

    // Logical operators
    exclamation(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "!", val2);
        }
        if (val1 !== undefined) {
            return this.op("!", val1);
        }
        return this.op("!");
    }
    override is(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "IS", val2);
        }
        if (val1 !== undefined) {
            return this.op("IS", val1);
        }
        return this.op("IS");
    }
    isNot(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "IS NOT", val2);
        }
        if (val1 !== undefined) {
            return this.op("IS NOT", val1);
        }
        return this.op("IS NOT");
    }

    // Pattern matching
    matchRegex(value1?: Statement, value2?: Statement) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "~", value2);
        }
        if (value1 !== undefined) {
            return this.op("~", value1);
        }
        return this.op("~");
    }
    matchRegexInsensitive(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "~*", val2);
        }
        if (val1 !== undefined) {
            return this.op("~*", val1);
        }
        return this.op("~*");
    }
    notMatchRegex(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "!~", val2);
        }
        if (val1 !== undefined) {
            return this.op("!~", val1);
        }
        return this.op("!~");
    }
    notMatchRegexInsensitive(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "!~*", val2);
        }
        if (val1 !== undefined) {
            return this.op("!~*", val1);
        }
        return this.op("!~*");
    }
    override like(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "LIKE", val2);
        }
        if (val1 !== undefined) {
            return this.op("LIKE", val1);
        }
        return this.op("LIKE");
    }
    notLike(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "NOT LIKE", val2);
        }
        if (val1 !== undefined) {
            return this.op("NOT LIKE", val1);
        }
        return this.op("NOT LIKE");
    }
    override ilike(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "ILIKE", val2);
        }
        if (val1 !== undefined) {
            return this.op("ILIKE", val1);
        }
        return this.op("ILIKE");
    }
    notIlike(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "NOT ILIKE", val2);
        }
        if (val1 !== undefined) {
            return this.op("NOT ILIKE", val1);
        }
        return this.op("NOT ILIKE");
    }
    similarTo(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "SIMILAR TO", val2);
        }
        if (val1 !== undefined) {
            return this.op("SIMILAR TO", val1);
        }
        return this.op("SIMILAR TO");
    }
    notSimilarTo(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "NOT SIMILAR TO", val2);
        }
        if (val1 !== undefined) {
            return this.op("NOT SIMILAR TO", val1);
        }
        return this.op("NOT SIMILAR TO");
    }

    // Bitwise operators
    bitwiseAnd(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "&", val2);
        }
        if (val1 !== undefined) {
            return this.op("&", val1);
        }
        return this.op("&");
    }
    bitwiseOr(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "|", val2);
        }
        if (val1 !== undefined) {
            return this.op("|", val1);
        }
        return this.op("|");
    }
    bitwiseXor(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "^", val2);
        }
        if (val1 !== undefined) {
            return this.op("^", val1);
        }
        return this.op("^");
    }
    bitwiseLeftShift(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<<", val2);
        }
        if (val1 !== undefined) {
            return this.op("<<", val1);
        }
        return this.op("<<");
    }
    bitwiseLeftShiftAssign(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<<=", val2);
        }
        if (val1 !== undefined) {
            return this.op("<<=", val1);
        }
        return this.op("<<=");
    }
    bitwiseRightShift(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">>", val2);
        }
        if (val1 !== undefined) {
            return this.op(">>", val1);
        }
        return this.op(">>");
    }
    bitwiseRightShiftAssign(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">>=", val2);
        }
        if (val1 !== undefined) {
            return this.op(">>=", val1);
        }
        return this.op(">>=");
    }

    // Arithmetic operators with optional parameters
    plus(value1?: Statement, value2?: Statement) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "+", value2);
        }
        if (value1 !== undefined) {
            return this.op("+", value1);
        }
        return this.op("+");
    }
    minus(value1?: Statement, value2?: Statement) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "-", value2);
        }
        if (value1 !== undefined) {
            return this.op("-", value1);
        }
        return this.op("-");
    }
    multiply(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "*", val2);
        }
        if (val1 !== undefined) {
            return this.op("*", val1);
        }
        return this.op("*");
    }
    divide(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "/", val2);
        }
        if (val1 !== undefined) {
            return this.op("/", val1);
        }
        return this.op("/");
    }
    modulo(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "%", val2);
        }
        if (val1 !== undefined) {
            return this.op("%", val1);
        }
        return this.op("%");
    }
    textCat(value1?: Statement, value2?: Statement) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "||", value2);
        }
        if (value1 !== undefined) {
            return this.op("||", value1);
        }
        return this.op("||");
    }

    // PostgreSQL-specific
    atSign(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "@", val2);
        }
        if (val1 !== undefined) {
            return this.op("@", val1);
        }
        return this.op("@");
    }
    hash(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "#", val2);
        }
        if (val1 !== undefined) {
            return this.op("#", val1);
        }
        return this.op("#");
    }
    caretAt(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "^@", val2);
        }
        if (val1 !== undefined) {
            return this.op("^@", val1);
        }
        return this.op("^@");
    }

    // Geometric operators (PostgreSQL)
    totalLength(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "@-@", val2);
        }
        if (val1 !== undefined) {
            return this.op("@-@", val1);
        }
        return this.op("@-@");
    }
    middle(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "@@", val2);
        }
        if (val1 !== undefined) {
            return this.op("@@", val1);
        }
        return this.op("@@");
    }
    closestPoint(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "##", val2);
        }
        if (val1 !== undefined) {
            return this.op("##", val1);
        }
        return this.op("##");
    }
    distance(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<->", val2);
        }
        if (val1 !== undefined) {
            return this.op("<->", val1);
        }
        return this.op("<->");
    }
    containment(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "  ", val2);
        }
        if (val1 !== undefined) {
            return this.op("@>", val1);
        }
        return this.op("@>");
    }
    containedBy(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<@", val2);
        }
        if (val1 !== undefined) {
            return this.op("<@", val1);
        }
        return this.op("<@");
    }
    notExtendRight(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "&<", val2);
        }
        if (val1 !== undefined) {
            return this.op("&<", val1);
        }
        return this.op("&<");
    }
    notExtendLeft(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "&>", val2);
        }
        if (val1 !== undefined) {
            return this.op("&>", val1);
        }
        return this.op("&>");
    }
    strictlyBelow(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<<|", val2);
        }
        if (val1 !== undefined) {
            return this.op("<<|", val1);
        }
        return this.op("<<|");
    }
    strictlyAbove(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "|>>", val2);
        }
        if (val1 !== undefined) {
            return this.op("|>>", val1);
        }
        return this.op("|>>");
    }
    notExtendAbove(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "&<|", val2);
        }
        if (val1 !== undefined) {
            return this.op("&<|", val1);
        }
        return this.op("&<|");
    }
    notExtendBelow(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "|&>", val2);
        }
        if (val1 !== undefined) {
            return this.op("|&>", val1);
        }
        return this.op("|&>");
    }
    below(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "<^", val2);
        }
        if (val1 !== undefined) {
            return this.op("<^", val1);
        }
        return this.op("<^");
    }
    above(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, ">^", val2);
        }
        if (val1 !== undefined) {
            return this.op(">^", val1);
        }
        return this.op(">^");
    }
    crosses(value1?: Statement, value2?: Statement) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "?#", value2);
        }
        if (value1 !== undefined) {
            return this.op("?#", value1);
        }
        return this.op("?#");
    }
    horizontal(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "?-", val2);
        }
        if (val1 !== undefined) {
            return this.op("?-", val1);
        }
        return this.op("?-");
    }
    vertical(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "?|", val2);
        }
        if (val1 !== undefined) {
            return this.op("?|", val1);
        }
        return this.op("?|");
    }
    perpendicular(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "?-|", val2);
        }
        if (val1 !== undefined) {
            return this.op("?-|", val1);
        }
        return this.op("?-|");
    }
    isParallel(value1?: Statement, value2?: Statement) {
        if (value1 !== undefined && value2 !== undefined) {
            return this.op(value1, "?||", value2);
        }
        if (value1 !== undefined) {
            return this.op("?||", value1);
        }
        return this.op("?||");
    }
    sameAs(val1?: Statement, val2?: Statement) {
        if (val1 !== undefined && val2 !== undefined) {
            return this.op(val1, "~=", val2);
        }
        if (val1 !== undefined) {
            return this.op("~=", val1);
        }
        return this.op("~=");
    }
}
