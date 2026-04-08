import type { ConvertOptions, DbSchemaStructure, FunctionListType } from './types.js';
export interface ConvertResult {
    code: string;
    formatted: string;
    functionList: FunctionListType[];
    options: ConvertOptions;
    dbSchemaStructure?: DbSchemaStructure;
    dbSchemaAssumption?: string;
}
export declare function convert(sql: string, options?: ConvertOptions): Promise<ConvertResult>;
