import { ParameterType } from "./base-raw-query-builder";
import type { QueryInstance } from "./generated/query-instance";
import type { PGFunction } from "./postgres-functions-list";
import { QueryBuilder } from "./query-builder";
import type { AllPossibleFunctionParamType, ParameterValueType, QueryType, Statement } from "./types";
import { ColumnSchema, DBSchema, TableSchema } from "./db-schema";
import type { FunctionListType } from "./function-list-type";
import { SqlSchemaParam, type SqlSchemaParamType } from "./sql-param";
type InstanceStructureSerializableValue = string | number | boolean | null | undefined | {
    kind: "query-builder";
    value: InstanceStructureNode[];
} | {
    kind: "identifier";
    value: string;
} | {
    kind: "schema-param";
    value: {
        key: string;
        types: ("number" | "boolean" | "string" | "null")[];
        hasDefault: boolean;
        defaultValue?: string | number | boolean | null;
    };
} | {
    kind: "array";
    value: InstanceStructureSerializableValue[];
} | {
    kind: "object";
    value: Record<string, InstanceStructureSerializableValue>;
};
type InstanceStructureNode = {
    name: string;
    args: InstanceStructureSerializableValue[];
};
type PrimitiveSchemaParam = string | number | boolean | null;
interface RuntimeParams {
    [key: SqlSchemaParam['key']]: PrimitiveSchemaParam | RuntimeParams;
}
export declare class CoreQueryBuilder {
    protected query: QueryType;
    protected schemaQueryBuilder: FunctionListType[];
    protected instanceStructure: InstanceStructureNode[];
    protected callLevel: number;
    protected queryInstance?: QueryInstance;
    protected runtimeParams: RuntimeParams;
    private isRebuilding;
    constructor(queryInstance?: QueryInstance);
    getTokens(): QueryType['sql'];
    protected setTokens(tokens: QueryType['sql']): this;
    getSchema(): FunctionListType[];
    protected getInstanceStructure(): InstanceStructureNode[];
    protected getRuntimeParams(): RuntimeParams;
    protected schemaParamCore<TKey extends string>(key: TKey): SqlSchemaParam<TKey>;
    protected schemaCaseCore<TKey extends string>(key: TKey, queryBuilder: QueryBuilder): this;
    protected setParamsCore(params: RuntimeParams): this;
    protected setInstanceStructure(structure: InstanceStructureNode[]): this;
    protected rebuild(): this;
    protected startClass(): this;
    protected endClass(): this;
    private isColumnSchema;
    private isTableSchema;
    private isDbSchema;
    protected isSchemaObject(value: unknown): value is ColumnSchema | TableSchema | DBSchema;
    private getSchemaIdentifier;
    protected normalizeSchemaParam(paramRaw: AllPossibleFunctionParamType, type: FunctionListType['paramType']): FunctionListType["arguments"];
    private registerSchemaCall;
    protected resolveSchemaParam(type: FunctionListType['paramType'], name: FunctionListType['name'], params: AllPossibleFunctionParamType): FunctionListType;
    private captureInstanceStructure;
    private serializeInstanceValue;
    private deserializeInstanceValue;
    private replayInstanceNode;
    protected getSqlCore(): string;
    protected getSqlParametersCore(): ParameterValueType[];
    protected getSqlWithParametersCore(): string;
    protected resolveStatement(item: Statement): QueryType['sql'];
    protected resolveStatements(values: Statement[]): QueryType['sql'][];
    protected resolveIdentifierStatement(item: Statement): QueryType['sql'];
    protected resolveStringStatement(item: Statement): QueryType['sql'];
    protected createLiteralParameter(value: ParameterValueType): ParameterType;
    protected createIdentifierParameter(value: string | number | boolean): ParameterType;
    protected createStringParameter(value: string): ParameterType;
    protected createPercentParameter(): ParameterType;
    protected pushSeparatedTokens(tokensList: QueryType['sql'][], separator: string): void;
    protected pushFunction(func: PGFunction, ...runtimeArgs: Statement[]): this;
    protected resolveSqlSchemaParamValue(param: SqlSchemaParam<SqlSchemaParam['key'], SqlSchemaParamType>): ParameterValueType | undefined;
}
export {};
