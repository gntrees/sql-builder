import { CoreQueryBuilder } from './core-query-builder';
import type { OperatorType, ParameterDataType, ParameterValueType, Statement } from './types';
export declare class ParameterType {
    value: ParameterValueType;
    type: ParameterDataType;
    constructor({ value, type, }: {
        value: ParameterValueType;
        type: ParameterDataType;
    });
}
export declare class BaseRawQueryBuilder extends CoreQueryBuilder {
    raw(strings: TemplateStringsArray, ...values: Statement[]): this;
    literal(value: Statement): this;
    literalArray(values: Statement[]): this;
    identifier(value: Statement): this;
    identifierArray(values: Statement[]): this;
    rawString(value: string): this;
    percentCharacter(): this;
    r(strings: TemplateStringsArray, ...values: Statement[]): this;
    l(value: Statement): this;
    v(value: Statement): this;
    i(value: Statement): this;
    rs(value: string): this;
    op(...values: (Statement | OperatorType)[]): this;
    private isOperatorType;
}
