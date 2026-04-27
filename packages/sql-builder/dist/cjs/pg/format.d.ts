import type { FormatConfig, FormatValue } from "./format.types";
export declare function quoteIdent(value: unknown): string;
export declare function quoteLiteral(value: unknown): string;
export declare function quoteString(value: unknown): string;
export declare function config(cfg?: FormatConfig): void;
export declare function formatWithArray(fmt: string, parameters: FormatValue[]): string;
export declare function format(fmt: string, ...args: FormatValue[]): string;
declare const _default: {
    config: typeof config;
    format: typeof format;
    formatWithArray: typeof formatWithArray;
    quoteIdent: typeof quoteIdent;
    quoteLiteral: typeof quoteLiteral;
    quoteString: typeof quoteString;
};
export default _default;
