import type { ConvertResult } from './src/convert.js';
import type { ConvertOptions, FunctionListType } from './src/types.js';
type ConvertFunction = (sql: string, options?: ConvertOptions) => Promise<ConvertResult>;
type GenerateFunction = (options: {
    url: string;
    output?: string;
}) => Promise<{
    outputPath: string;
}>;
declare const convert: ConvertFunction | undefined;
declare const generate: GenerateFunction | undefined;
export { convert, generate, type ConvertResult };
export type { ConvertOptions, FunctionListType };
