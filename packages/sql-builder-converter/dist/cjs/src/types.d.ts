export type ArgumentType = (string | number | boolean | null | undefined | FunctionListType | {
    [key: string]: ArgumentType;
}) | (ArgumentType[]);
export type FunctionListType = {
    paramType: "function" | "template-literal";
    arguments: ArgumentType[];
    name: string;
} | {
    paramType: "string" | "number" | "boolean" | "null" | "raw" | "array";
    arguments: ArgumentType[];
    name: ArgumentType[] | ArgumentType;
};
export interface ConvertOptions {
    formatParamHandler?: string;
    execHandler?: string;
    testName?: string;
}
