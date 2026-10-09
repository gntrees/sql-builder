import type {
    ArgumentType,
    ConfigType,
    FunctionType,
    ProjectType,
    StructType,
} from "@gntrees/method-chain";
import { sqlBuilderParseBody } from "./parse-body";

const stType: StructType["struct"] = {
    union: {
        types: [
            { string: { type: "string" } },
            { number: { type: "number" } },
            { boolean: { type: "boolean" } },
            { structureCall: { name: "sql-builder" } },
        ],
    },
};

const st: StructType = { struct: stType };
const stOrArray: StructType = {
    struct: {
        union: {
            types: [stType, { array: { type: stType } }],
        },
    },
};
const stOrMap: StructType = {
    struct: {
        union: {
            types: [stType, { map: { type: stType } }],
        },
    },
};
const stOrArrayOrMap: StructType = {
    struct: {
        union: {
            types: [stType, { array: { type: stType } }, { map: { type: stType } }],
        },
    },
};
const stValues: StructType = {
    struct: {
        union: {
            types: [
                stType,
                { array: { type: stType } },
                { array: { type: { array: { type: stType } } } },
            ],
        },
    },
};

const dialect: StructType = {
    struct: {
        union: {
            types: [
                { literal: { value: "postgres", type: "string" } },
                { literal: { value: "mysql", type: "string" } },
                { literal: { value: "sqlite", type: "string" } },
                { literal: { value: "single-store", type: "string" } },
                { literal: { value: "mssql", type: "string" } },
                { literal: { value: "cockroach", type: "string" } },
            ],
        },
    },
};

const arg = (name: string, struct: StructType): ArgumentType => ({
    argument: { name, struct },
});

const fn = (name: string, args: ArgumentType[], isTemplateLiteral = false): FunctionType => ({
    function: {
        name,
        arguments: args,
        return: { structureCall: { name: "sql-builder" } },
        isTemplateLiteral,
    },
});

export const sqlBuilderProject: ProjectType = {
    project: {
        projectName: "gntrees-sql-builder",
        importPaths: {
            typescript: "../../../gntrees-sql-builder/typescript/index",
        },
        beforeScript: {
            typescript: `export type ParseResult = {
    sql: string;
    param: (string | number | boolean | null)[];
    sqlWithParam: string;
};`,
            c: `#include <stddef.h>
typedef enum { PARSE_STRING, PARSE_NUMBER, PARSE_BOOL, PARSE_NULL } ParseParamType;
typedef struct ParseParam {
    ParseParamType type;
    union {
        const char *s;
        double n;
        int b;
    } value;
} ParseParam;
typedef struct ParseResult {
    const char *sql;
    const char *sqlWithParam;
    size_t paramCount;
    ParseParam *param;
} ParseResult;`,
            python: "# parse() returns a dict: { \"sql\": str, \"sqlWithParam\": str, \"param\": list }",
            javascript: "// parse() returns { sql: string, sqlWithParam: string, param: (string|number|boolean|null)[] }",
        },
        definitions: [
            {
                structure: {
                    name: "sql-builder",
                    exportName: "schema",
                    variables: [],
                    functions: [
                        fn("select", [arg("columns", stOrArrayOrMap)]),
                        fn("from", [arg("table", st)]),
                        fn("transaction", [arg("transaction", stOrArray)]),
                        fn("order-by", [arg("columns", stOrArray)]),
                        fn("limit", [arg("count", st)]),
                        fn("offset", [arg("count", st)]),
                        fn("with", [arg("statement", st), arg("as", st)]),
                        fn("group-by", [arg("columns", stOrArray)]),
                        fn("having", [arg("statement", st)]),
                        fn("where", [arg("statement", st)]),
                        fn("update", [arg("table", st), arg("set", stOrMap)]),
                        fn("set", [arg("statement", stOrMap)]),
                        fn("insert", [arg("table", st), arg("set", stOrMap)]),
                        fn("values", [arg("values", stValues)]),
                        fn("returning", [arg("columns", stOrArrayOrMap)]),
                        fn("on-conflict-do-nothing", [arg("target", st)]),
                        fn("on-conflict-do-update", [arg("target", st), arg("set", stOrMap)]),
                        fn("delete", [arg("table", st)]),
                        fn("join", [arg("table", st), arg("on", st)]),
                        fn("left-join", [arg("table", st), arg("on", st)]),
                        fn("right-join", [arg("table", st), arg("on", st)]),
                        fn("inner-join", [arg("table", st), arg("on", st)]),
                        fn("full-join", [arg("table", st), arg("on", st)]),
                        fn("cross-join", [arg("table", st), arg("on", st)]),
                        fn("eq", [arg("value", st)]),
                        fn("gt", [arg("value", st)]),
                        fn("gte", [arg("value", st)]),
                        fn("lt", [arg("value", st)]),
                        fn("lte", [arg("value", st)]),
                        fn("exists", [arg("value", st)]),
                        fn("is-null", []),
                        fn("is-not-null", []),
                        fn("in", [arg("value", st)]),
                        fn("between", [arg("first", st), arg("second", st)]),
                        fn("like", [arg("value", st)]),
                        fn("ilike", [arg("value", st)]),
                        fn("not", [arg("value", st)]),
                        fn("and", [arg("values", stOrArray)]),
                        fn("or", [arg("values", stOrArray)]),
                        fn("op", [arg("operation", st), arg("value", st)]),
                        fn("raw", [arg("r", st)], true),
                        fn("asc", []),
                        fn("desc", []),
                        fn("as", [arg("alias", st)]),
                        fn("col", [arg("column", st)]),
                        fn("table", [arg("table", st)]),
                        fn("set-dialect", [arg("db", dialect)]),
                        {
                            customFunction: {
                                name: "parse",
                                arguments: [],
                                body: {
                                    typescript: sqlBuilderParseBody.typescript!,
                                    c: sqlBuilderParseBody.c!,
                                    python: sqlBuilderParseBody.python!,
                                    javascript: sqlBuilderParseBody.javascript!,
                                },
                                return: {
                                    typescript: "ParseResult",
                                    c: "ParseResult",
                                    python: "dict",
                                    javascript: "object",
                                },
                            },
                        },
                    ],
                },
            },
        ],
        initFunctions: [
            {
                name: "sql-builder",
                withVariableName: true,
                return: { structureCall: { name: "sql-builder" } },
            },
        ],
    },
};

export const sqlBuilderConfig: ConfigType = {
    languages: ["typescript", "c", "python", "javascript"],
    folderName: "generated",
};
