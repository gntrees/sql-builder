import type { ConvertResult } from './src/convert.js';
import type { ConvertOptions, FunctionListType } from './src/types.js';
import * as convertModule from './src/convert.js';

type ConvertFunction = (
  sql: string,
  options?: ConvertOptions,
) => Promise<ConvertResult>;

const convert =
  (convertModule as { convert?: ConvertFunction }).convert ??
  (convertModule as { default?: { convert?: ConvertFunction } }).default
    ?.convert ??
  (convertModule as { default?: ConvertFunction }).default;

export { convert, type ConvertResult };
export type { ConvertOptions, FunctionListType };
