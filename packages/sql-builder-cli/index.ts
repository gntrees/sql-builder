import type { ConvertResult } from './src/convert.js';
import type { ConvertOptions, FunctionListType } from './src/types.js';
import * as convertModule from './src/convert.js';
import * as generateModule from './src/generate.js';

type ConvertFunction = (
  sql: string,
  options?: ConvertOptions,
) => Promise<ConvertResult>;

type GenerateFunction = (options: { url: string; output?: string }) => Promise<{ outputPath: string }>;

const convert =
  (convertModule as { convert?: ConvertFunction }).convert ??
  (convertModule as { default?: { convert?: ConvertFunction } }).default
    ?.convert ??
  (convertModule as { default?: ConvertFunction }).default;

const generate =
  (generateModule as { generate?: GenerateFunction }).generate ??
  (generateModule as { default?: { generate?: GenerateFunction } }).default
    ?.generate ??
  (generateModule as { default?: GenerateFunction }).default;

export { convert, generate, type ConvertResult };
export type { ConvertOptions, FunctionListType };
