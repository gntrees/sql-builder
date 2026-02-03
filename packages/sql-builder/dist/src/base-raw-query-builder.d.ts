import { CoreQueryBuilder } from './core-query-builder';
import type { OperatorStatement, ParameterDataType, ParameterValueType, StatementValue } from './types';
export declare class ParameterType {
    value: ParameterValueType;
    type: ParameterDataType;
    constructor({ value, type, }: {
        value: ParameterValueType;
        type: ParameterDataType;
    });
}
export declare class BaseRawQueryBuilder extends CoreQueryBuilder {
    raw(strings: TemplateStringsArray, ...values: StatementValue[]): this;
    literal(value: string | number | boolean): this;
    literalArray(values: Array<string | number | boolean>): this;
    identifier(value: string | number | boolean): this;
    identifierArray(values: Array<string | number | boolean>): this;
    rawString(value: string): this;
    percentCharacter(): this;
    r(strings: TemplateStringsArray, ...values: StatementValue[]): this;
    l(value: string | number | boolean): this;
    v(value: StatementValue): this;
    i(value: string | number | boolean): this;
    rs(value: string): this;
    op(operator: OperatorStatement): this;
}
