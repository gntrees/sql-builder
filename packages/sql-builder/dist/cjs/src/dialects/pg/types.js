"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATORS = void 0;
// Single source of truth for SQL operators
exports.OPERATORS = [
    "=", "<>", "!=", "<", ">", "<=", ">=", "!", "~", "~*", "!~", "!~*",
    "&", "|", "^", "<<", "<<=", ">>", ">>=", "&&", "||", "@", "#", "?",
    "+", "-", "*", "/", "%", "OR", "AND", "IS", "IS NOT",
    "LIKE", "NOT LIKE", "ILIKE", "NOT ILIKE", "SIMILAR TO", "NOT SIMILAR TO",
    "^@", "ANY", "ALL", "DISTINCT", "NOT_DISTINCT", "NULLIF", "IN",
    "SIMILAR", "BETWEEN", "NOT_BETWEEN", "BETWEEN_SYM", "NOT_BETWEEN_SYM",
    "@-@", "@@", "##", "<->", "@>", "<@", "&<", "&>", "<<|",
    "|>>", "&<|", "|&>", "<^", ">^", "?#", "?-", "?|", "?-|", "?||", "~="
];
// ParameterType | 
// export type StatementArrayValue<T> = Array<T | StatementArrayValue<T>>;
// export type IdentifierInput = Statement | Record<string, Statement>;
