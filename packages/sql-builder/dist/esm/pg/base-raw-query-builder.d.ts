import { CoreQueryBuilder } from './core-query-builder';
import { QueryBuilder } from './query-builder';
import type { ExtractBuilderParams, InferSchemaCase, MergeBuilderParams, Simplify, WithBuilderParams } from './sql-param.types';
import { type OperatorType, type Statement } from './core-query-builder.types';
import type { SqlSchemaParam } from './sql-param';
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
    schemaParam<TKey extends string>(key: TKey): SqlSchemaParam<TKey>;
    schemaCase<TKey extends string, TCaseQuery extends QueryBuilder>(key: TKey, queryBuilder: TCaseQuery): WithBuilderParams<this, MergeBuilderParams<ExtractBuilderParams<this>, InferSchemaCase<TKey, TCaseQuery>>>;
    setParams(params: Simplify<ExtractBuilderParams<this>>): this;
}
