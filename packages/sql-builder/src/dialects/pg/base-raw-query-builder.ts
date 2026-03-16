import { CoreQueryBuilder } from './core-query-builder';
import type {
    OperatorType,
    ParameterDataType,
    ParameterValueType,
    QueryType,
    Statement
} from './types';
import { OPERATORS } from './types';
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
        this.resolveSchemaParam(
            "template-literal",
            "raw",
            strings.reduce<Statement[]>((acc, str, i) => {
                return ([...acc, str, values[i]].filter(Boolean) as Statement[]);
            }, [])
        );
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
        return this.endClass();
    }
    literal(value: Statement) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
            this.query.sql.push(this.createLiteralParameter(value));
        } else {
            const resolved = this.resolveStatement(value);
            if (resolved.length > 0) {
                this.query.sql.push(...resolved);
            }
        }
        return this.endClass();
    }
    literalArray(values: Statement[]) {
        for (const value of values) {
            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
                this.query.sql.push(this.createLiteralParameter(value));
            } else {
                const resolved = this.resolveStatement(value);
                if (resolved.length > 0) {
                    this.query.sql.push(...resolved);
                }
            }
        }
        return this.endClass();
    }
    identifier(value: Statement) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            this.query.sql.push(this.createIdentifierParameter(value));
        } else {
            const resolved = this.resolveIdentifierStatement(value);
            if (resolved.length > 0) {
                this.query.sql.push(...resolved);
            }
        }
        return this.endClass();
    }
    identifierArray(values: Statement[]) {
        for (const value of values) {
            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                this.query.sql.push(this.createIdentifierParameter(value));
            } else {
                const resolved = this.resolveIdentifierStatement(value);
                if (resolved.length > 0) {
                    this.query.sql.push(...resolved);
                }
            }
        }
        return this.endClass();
    }
    rawString(value: string) {
        this.query.sql.push(this.createStringParameter(value));
        return this.endClass();
    }
    percentCharacter() {
        this.query.sql.push(this.createPercentParameter());
        return this.endClass();
    }

    r(strings: TemplateStringsArray, ...values: Statement[]) {
        this.resolveSchemaParam(
            "template-literal",
            "r",
            strings.reduce<Statement[]>((acc, str, i) => {
                return ([...acc, str, values[i]].filter(Boolean) as Statement[]);
            }, [])
        );
        this.raw(strings, ...values);
        return this.endClass();
    }
    l(value: Statement) {
        this.literal(value);
        return this.endClass();
    }
    v(value: Statement) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            this.l(value);
            return this.endClass();
        }
        const resolved = this.resolveStatement(value);
        if (resolved.length > 0) {
            this.query.sql.push(...resolved);
        }
        return this.endClass();
    }
    i(value: Statement) {
        if (value === "*") {
            this.rawString("*");
            return this.endClass();
        }
        if (value === null){
            this.rawString("NULL");
            return this.endClass();
        } 
        this.identifier(value);
        return this.endClass();
    }
    rs(value: string) {
        this.rawString(value);
        return this.endClass();
    }

    op(...values: (Statement | OperatorType)[]) {
        for (const value of values) {
            if (typeof value === "string" && this.isOperatorType(value)) {
                const resolvedOperator = this.resolveStringStatement(value);
                if (resolvedOperator.length > 0) {
                    this.query.sql.push(...resolvedOperator);
                }
            } else {
                this.v(value);
            }
        }
        return this.endClass();
    }

    private isOperatorType(value: string): value is OperatorType {
        return OPERATORS.map(i => i.toLowerCase()).includes((value as OperatorType).toLowerCase());
    }
}

