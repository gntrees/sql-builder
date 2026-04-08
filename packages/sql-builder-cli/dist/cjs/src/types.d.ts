export type SchemaLiteral = string;
export type ArgumentType = (SchemaLiteral | number | boolean | null | undefined | FunctionListType | {
    [key: string]: ArgumentType;
}) | (ArgumentType[]);
export type FunctionListType = {
    paramType: "function" | "template-literal";
    arguments: ArgumentType[];
    name: string;
} | {
    paramType: "string" | "number" | "boolean" | "null" | "raw" | "array" | "object" | "undefined";
    arguments: ArgumentType[];
    name: ArgumentType[] | ArgumentType;
};
export interface ConvertOptions {
    formatParamHandler?: string;
    execHandler?: string;
    testName?: string;
    sqlSchema?: boolean;
    dbSchema?: boolean;
    simplifyLiteral?: boolean;
}
export interface DbSchemaStructure {
    dbName: string;
    tables: Array<{
        name: string;
        alias?: string;
        columns: string[];
    }>;
}
