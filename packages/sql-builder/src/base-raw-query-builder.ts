// AUTO-GENERATED - DO NOT EDIT.
import type { QueryBuilder } from '..';
import { CoreQueryBuilder } from './core-query-builder';
import type {
    OperatorStatement,
    OperatorType,
    ParameterDataType,
    ParameterValueType,
    QueryType,
    Statement
} from './types';
export class ParameterType {
    public value: ParameterValueType;
    public type: ParameterDataType;
    constructor({
        value,
        type,
    }: {
        value: ParameterValueType;
        type: ParameterDataType;
    }) {
        this.value = value;
        this.type = type;
    }
}


export class BaseRawQueryBuilder extends CoreQueryBuilder {
    raw(strings: TemplateStringsArray, ...values: Statement[]) {
        const resolvedValues = this.resolveStatements(values);
        const tokens: QueryType['sql'] = [];
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
    literal(value: string | number | boolean | null) {
        this.query.sql.push(this.createLiteralParameter(value));
        return this;
    }
    literalArray(values: Array<string | number | boolean | null>) {
        this.query.sql.push(...values.map((value) => this.createLiteralParameter(value)));
        return this;
    }
    identifier(value: string | number | boolean) {
        this.query.sql.push(this.createIdentifierParameter(value));
        return this;
    }
    identifierArray(values: Array<string | number | boolean>) {
        this.query.sql.push(...values.map((value) => this.createIdentifierParameter(value)));
        return this;
    }
    rawString(value: string) {
        this.query.sql.push(this.createStringParameter(value));
        return this;
    }
    percentCharacter() {
        this.query.sql.push(this.createPercentParameter());
        return this;
    }
    
    r(strings: TemplateStringsArray, ...values: Statement[]) {
        return this.raw(strings, ...values);
    }
    l(value: string | number | boolean | null) {
        return this.literal(value);
    }
    v(value: Statement) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return this.l(value);
        }
        const resolved = this.resolveStatement(value, 0);
        if (resolved.length > 0) {
            this.query.sql.push(...resolved);
        }
        return this;
    }
    i(value: string | number | boolean) {
        return this.identifier(value);
    }
    rs(value: string) {
        return this.rawString(value);
    }
    
    op(...values: (Statement | OperatorType)[]) {
        for (const value of values) {
            if (typeof value === "string" && this.isOperatorType(value)) {
                const resolvedOperator = this.resolveOperatorStatement(value, 0);
                if (resolvedOperator.length > 0) {
                    this.query.sql.push(...resolvedOperator);
                }
            } else {
                this.v(value);
            }
        }
        return this;
    }

    private isOperatorType(value: string): value is OperatorType {
        const operators: OperatorType[] = [
            "=", "<>", "!=", "<", ">", "<=", ">=", "!", "~", "~*", "!~", "!~*",
            "&", "|", "^", "<<", "<<=", ">>", ">>=", "&&", "||", "@", "#",
            "+", "-", "*", "/", "%", "OR", "AND", "IS", "IS NOT",
            "LIKE", "NOT LIKE", "ILIKE", "NOT ILIKE", "SIMILAR TO", "NOT SIMILAR TO",
            "^@", "@-@", "@@", "##", "<->", "@>", "<@", "&<", "&>", "<<|",
            "|>>", "&<|", "|&>", "<^", ">^", "?#", "?-", "?|", "?-|", "?||", "~="
        ];
        return operators.includes(value as OperatorType);
    }
}

