export type { ArgumentType, FunctionListType, SchemaLiteral } from "./shared/function-list-type.js";

export interface ConvertOptions {
    formatParamHandler?: string;
    execHandler?: string;
    testName?: string;
    sqlSchema?: boolean;
    dbSchema?: boolean;
    simplifyLiteral?: boolean;
}

export interface DbSchemaStructure {
    dbName: string;
    tables: Array<{ name: string; alias?: string; columns: string[] }>;
}
