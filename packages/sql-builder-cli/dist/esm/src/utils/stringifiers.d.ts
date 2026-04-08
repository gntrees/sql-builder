import type { FunctionListType } from '../types.ts';
interface StringifyOptions {
    simplifyLiteral?: boolean;
}
export declare const functionListToString: (fnList: FunctionListType[], baseQueryBuilder: string, options?: StringifyOptions) => string;
export {};
