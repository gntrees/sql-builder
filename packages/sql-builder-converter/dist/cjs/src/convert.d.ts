import type { ConvertOptions, FunctionListType } from './types.js';
export interface ConvertResult {
    code: string;
    formatted: string;
    functionList: FunctionListType[];
    options: ConvertOptions;
}
export declare function convert(sql: string, options?: ConvertOptions): Promise<ConvertResult>;
