"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRawQueryBuilder = exports.ParameterType = void 0;
const core_query_builder_1 = require("./core-query-builder");
class ParameterType {
    value;
    type;
    constructor({ value, type, }) {
        this.value = value;
        this.type = type;
    }
}
exports.ParameterType = ParameterType;
class BaseRawQueryBuilder extends core_query_builder_1.CoreQueryBuilder {
    raw(strings, ...values) {
        const resolvedValues = this.resolveStatements(values);
        const tokens = [];
        for (let i = 0; i < strings.length; i += 1) {
            const chunk = strings[i];
            if (chunk) {
                tokens.push(chunk);
            }
            const resolvedValue = resolvedValues[i];
            if (resolvedValue) {
                tokens.push(...resolvedValue);
            }
        }
        this.query.sql.push(...tokens);
        return this;
    }
    literal(value) {
        this.query.sql.push(this.createLiteralParameter(value));
        return this;
    }
    literalArray(values) {
        this.query.sql.push(...values.map((value) => this.createLiteralParameter(value)));
        return this;
    }
    identifier(value) {
        this.query.sql.push(this.createIdentifierParameter(value));
        return this;
    }
    identifierArray(values) {
        this.query.sql.push(...values.map((value) => this.createIdentifierParameter(value)));
        return this;
    }
    rawString(value) {
        this.query.sql.push(this.createStringParameter(value));
        return this;
    }
    percentCharacter() {
        this.query.sql.push(this.createPercentParameter());
        return this;
    }
    r(strings, ...values) {
        return this.raw(strings, ...values);
    }
    l(value) {
        return this.literal(value);
    }
    v(value) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return this.l(value);
        }
        const resolved = this.resolveStatement(value, 0);
        if (resolved.length > 0) {
            this.query.sql.push(...resolved);
        }
        return this;
    }
    i(value) {
        return this.identifier(value);
    }
    rs(value) {
        return this.rawString(value);
    }
    op(...values) {
        for (const value of values) {
            if (typeof value === "string" && this.isOperatorType(value)) {
                const resolvedOperator = this.resolveOperatorStatement(value, 0);
                if (resolvedOperator.length > 0) {
                    this.query.sql.push(...resolvedOperator);
                }
            }
            else {
                this.v(value);
            }
        }
        return this;
    }
    isOperatorType(value) {
        const operators = [
            "=", "<>", "!=", "<", ">", "<=", ">=", "!", "~", "~*", "!~", "!~*",
            "&", "|", "^", "<<", "<<=", ">>", ">>=", "&&", "||", "@", "#",
            "+", "-", "*", "/", "%", "OR", "AND", "IS", "IS NOT",
            "LIKE", "NOT LIKE", "ILIKE", "NOT ILIKE", "SIMILAR TO", "NOT SIMILAR TO",
            "^@", "@-@", "@@", "##", "<->", "@>", "<@", "&<", "&>", "<<|",
            "|>>", "&<|", "|&>", "<^", ">^", "?#", "?-", "?|", "?-|", "?||", "~="
        ];
        return operators.includes(value);
    }
}
exports.BaseRawQueryBuilder = BaseRawQueryBuilder;
