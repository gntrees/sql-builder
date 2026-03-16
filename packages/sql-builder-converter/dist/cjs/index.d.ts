import type { ConvertResult } from './src/convert.js';
import type { ConvertOptions, FunctionListType } from './src/types.js';
type ConvertFunction = (sql: string, options?: ConvertOptions) => Promise<ConvertResult>;
declare const convert: ConvertFunction | undefined;
export { convert, type ConvertResult };
export type { ConvertOptions, FunctionListType };
