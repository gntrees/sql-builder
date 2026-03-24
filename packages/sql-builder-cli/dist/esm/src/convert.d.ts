import type { ConvertOptions, FunctionListType } from './types.js';
export interface DbSchemaStructure {
    dbName: string;
    tables: Array<{
        name: string;
        alias?: string;
        columns: string[];
    }>;
}
export interface ConvertResult {
    code: string;
    formatted: string;
    functionList: FunctionListType[];
    options: ConvertOptions;
    dbSchemaStructure?: DbSchemaStructure;
}
export declare function convert(sql: string, options?: ConvertOptions): Promise<ConvertResult>;
