import type { ConvertOptions } from './types.js';
export interface ConvertResult {
    code: string;
    formatted: string;
}
export declare function convert(sql: string, options?: ConvertOptions): Promise<ConvertResult>;
