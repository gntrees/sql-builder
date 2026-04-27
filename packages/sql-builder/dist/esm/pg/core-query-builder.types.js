export const OPERATORS = [
    "=", "<>", "!=", "<", ">", "<=", ">=", "!", "~", "~*", "!~", "!~*",
    "&", "|", "^", "<<", "<<=", ">>", ">>=", "&&", "||", "@", "#", "?",
    "+", "-", "*", "/", "%", "OR", "AND", "IS", "IS NOT",
    "LIKE", "NOT LIKE", "ILIKE", "NOT ILIKE", "SIMILAR TO", "NOT SIMILAR TO",
    "^@", "ANY", "ALL", "DISTINCT", "NOT_DISTINCT", "NULLIF", "IN",
    "SIMILAR", "BETWEEN", "NOT_BETWEEN", "BETWEEN_SYM", "NOT_BETWEEN_SYM",
    "@-@", "@@", "##", "<->", "@>", "<@", "&<", "&>", "<<|",
    "|>>", "&<|", "|&>", "<^", ">^", "?#", "?-", "?|", "?-|", "?||", "~=",
];
export class ParameterType {
    value;
    type;
    constructor({ value, type, }) {
        this.value = value;
        this.type = type;
    }
}
import functionList from "./generated/function-list.json";
export { functionList };
