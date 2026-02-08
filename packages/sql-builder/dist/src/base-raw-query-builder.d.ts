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
    literal(value: string | number | boolean | null): this;
    literalArray(values: Array<string | number | boolean | null>): this;
    identifier(value: string | number | boolean): this;
    identifierArray(values: Array<string | number | boolean>): this;
    rawString(value: string): this;
    percentCharacter(): this;
    r(strings: TemplateStringsArray, ...values: Statement[]): this;
    l(value: string | number | boolean | null): this;
    v(value: Statement): this;
    i(value: string | number | boolean): this;
    rs(value: string): this;
    op(...values: (Statement | OperatorType)[]): this;
    private isOperatorType;
}
