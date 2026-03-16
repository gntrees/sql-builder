"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRawQueryBuilder = exports.ParameterType = void 0;
const core_query_builder_1 = require("./core-query-builder");
const types_1 = require("./types");
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
        this.resolveSchemaParam("template-literal", "raw", strings.reduce((acc, str, i) => {
            return [...acc, str, values[i]].filter(Boolean);
        }, []));
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
        return this.endClass();
    }
    literal(value) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
            this.query.sql.push(this.createLiteralParameter(value));
        }
        else {
            const resolved = this.resolveStatement(value);
            if (resolved.length > 0) {
                this.query.sql.push(...resolved);
            }
        }
        return this.endClass();
    }
    literalArray(values) {
        for (const value of values) {
            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
                this.query.sql.push(this.createLiteralParameter(value));
            }
            else {
                const resolved = this.resolveStatement(value);
                if (resolved.length > 0) {
                    this.query.sql.push(...resolved);
                }
            }
        }
        return this.endClass();
    }
    identifier(value) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            this.query.sql.push(this.createIdentifierParameter(value));
        }
        else {
            const resolved = this.resolveIdentifierStatement(value);
            if (resolved.length > 0) {
                this.query.sql.push(...resolved);
            }
        }
        return this.endClass();
    }
    identifierArray(values) {
        for (const value of values) {
            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                this.query.sql.push(this.createIdentifierParameter(value));
            }
            else {
                const resolved = this.resolveIdentifierStatement(value);
                if (resolved.length > 0) {
                    this.query.sql.push(...resolved);
                }
            }
        }
        return this.endClass();
    }
    rawString(value) {
        this.query.sql.push(this.createStringParameter(value));
        return this.endClass();
    }
    percentCharacter() {
        this.query.sql.push(this.createPercentParameter());
        return this.endClass();
    }
    r(strings, ...values) {
        this.resolveSchemaParam("template-literal", "r", strings.reduce((acc, str, i) => {
            return [...acc, str, values[i]].filter(Boolean);
        }, []));
        this.raw(strings, ...values);
        return this.endClass();
    }
    l(value) {
        this.literal(value);
        return this.endClass();
    }
    v(value) {
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
    i(value) {
        if (value === "*") {
            this.rawString("*");
            return this.endClass();
        }
        if (value === null) {
            this.rawString("NULL");
            return this.endClass();
        }
        this.identifier(value);
        return this.endClass();
    }
    rs(value) {
        this.rawString(value);
        return this.endClass();
    }
    op(...values) {
        for (const value of values) {
            if (typeof value === "string" && this.isOperatorType(value)) {
                const resolvedOperator = this.resolveStringStatement(value);
                if (resolvedOperator.length > 0) {
                    this.query.sql.push(...resolvedOperator);
                }
            }
            else {
                this.v(value);
            }
        }
        return this.endClass();
    }
    isOperatorType(value) {
        return types_1.OPERATORS.map(i => i.toLowerCase()).includes(value.toLowerCase());
    }
}
exports.BaseRawQueryBuilder = BaseRawQueryBuilder;
