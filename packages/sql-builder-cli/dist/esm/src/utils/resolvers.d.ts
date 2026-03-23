import type { FunctionListType } from '../types.ts';
export declare const resolveRaw: (node: any, asFullRaw?: boolean) => FunctionListType[];
export declare const resolveNode: (node: {
    [key: string]: any;
}) => FunctionListType[];
export declare const fallbackNode: (node: any) => FunctionListType[];
export declare const normalizeNode: <T, K extends string>(key: K, node: any) => { [P in K]: T; };
export declare const resolveNodeArray: (nodes: any[]) => FunctionListType[];
export declare const escapeForTemplateLiteral: (str: string) => string;
export declare function toCamelCase(str: string): string;
