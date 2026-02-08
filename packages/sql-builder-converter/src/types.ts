export type FunctionListType = {
    name: string;
    arguments: (string | number | boolean | null | undefined | FunctionListType)[];
    paramType: "function" | "template-literal" | "string" | "number" | "boolean" | "null" | "as-chaining";
};

export interface ConvertOptions {
    formatParamHandler?: string;
    execHandler?: string;
}
