"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionList = exports.ParameterType = exports.OPERATORS = void 0;
exports.OPERATORS = [
    "=", "<>", "!=", "<", ">", "<=", ">=", "!", "~", "~*", "!~", "!~*",
    "&", "|", "^", "<<", "<<=", ">>", ">>=", "&&", "||", "@", "#", "?",
    "+", "-", "*", "/", "%", "OR", "AND", "IS", "IS NOT",
    "LIKE", "NOT LIKE", "ILIKE", "NOT ILIKE", "SIMILAR TO", "NOT SIMILAR TO",
    "^@", "ANY", "ALL", "DISTINCT", "NOT_DISTINCT", "NULLIF", "IN",
    "SIMILAR", "BETWEEN", "NOT_BETWEEN", "BETWEEN_SYM", "NOT_BETWEEN_SYM",
    "@-@", "@@", "##", "<->", "@>", "<@", "&<", "&>", "<<|",
    "|>>", "&<|", "|&>", "<^", ">^", "?#", "?-", "?|", "?-|", "?||", "~=",
];
class ParameterType {
    value;
    type;
    constructor({ value, type, }) {
        this.value = value;
        this.type = type;
    }
}
exports.ParameterType = ParameterType;
const function_list_json_1 = __importDefault(require("./generated/function-list.json"));
exports.functionList = function_list_json_1.default;
