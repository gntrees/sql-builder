import type { Walker } from '@pgsql/traverse';
import type { Node } from '@pgsql/types';
import * as prettier from "prettier";

import { NodePath, walk } from '@pgsql/traverse';
import { deparseSync, parse, loadModule } from 'pgsql-parser';
import type { ConvertOptions, FunctionListType } from './types.js';
import { specialNode as handlers, specialNode } from './handlers/index.js';
import { resolveNode, toCamelCase } from './utils/resolvers.js';
import { functionListToString } from './utils/stringifiers.js';
const MOCK_EXEC_HANDLER_BODY = "return { sql, parameters };";
const MOCK_FORMAT_PARAM_HANDLER = "pg";

const extractQueryBuildingPart = async (code: string): Promise<string> => {
    const lines = code.split("\n");
    let queryBuildingPart = "";
    let inQueryBuilding = false;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (
            trimmedLine.startsWith("const query = q") ||
            (inQueryBuilding && (trimmedLine.startsWith(".select") || trimmedLine.startsWith("q.select")))
        ) {
            inQueryBuilding = true;
        }
        if (inQueryBuilding) {
            queryBuildingPart += line + "\n";
        }
        if (trimmedLine.startsWith("console.log")) {
            break;
        }
    }

    queryBuildingPart = queryBuildingPart.replace(/console\.log\(query\.getSql\(\)\);?\n?/g, "");

    return queryBuildingPart.trim();
};

const DEFAULT_FORMAT_PARAM_HANDLER = 'pg';
const DEFAULT_EXEC_HANDLER = `async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
}`;


const walker: (specialNode: Record<string, (node: Node) => FunctionListType[]>, functionList: FunctionListType[]) => Walker = (specialNode, functionList) => {
    return (path: NodePath) => {
        try {
            const nodes = resolveNode({ [path.tag]: path.node });
            functionList.push(...nodes);
            return false;
        } catch (error) {
            return false;
        }
    };
};

export interface ConvertResult {
    code: string;
    formatted: string;
    functionList: FunctionListType[];
    options: ConvertOptions;
}

export async function convert(sql: string, options: ConvertOptions = {}): Promise<ConvertResult> {
    const formatParamHandler = options.formatParamHandler ?? DEFAULT_FORMAT_PARAM_HANDLER;
    const execHandler = options.execHandler ?? DEFAULT_EXEC_HANDLER;

    await loadModule();
    const ast = await parse(sql);
    const functionList: FunctionListType[] = [];
    for (const [i, stmt] of ast.stmts.entries()) {
        if (stmt.stmt) {
            const nodes = resolveNode({ RawStmt: stmt });
            functionList.push(...nodes);
            const deparsed = await runGeneratedFunctionList(nodes);

            // if (options.testName == 'query-builder-83') {
            //     const normalized = normalizeLocationsNode(ast,sql);
            //     write('src/generated/normalized.json', JSON.stringify(normalized,null,2));
            //     // console.log(JSON.stringify(normalized,null,2));
                
            // }

            // if deparsed not end with semicolon, add it
            if (!deparsed.trim().endsWith(';') && i !== ast.stmts.length - 1) {
                functionList.push({
                    name: 'sc',
                    arguments: [],
                    paramType: 'function'
                });
            }
        }
    };


    // walk(ast, walker(handlers, functionList));
    // await dumpTestResult({
    //     testName: "test",
    //     inputSql: sql,
    //     outputSql : deparseSync(ast),
    //     generatedCode: "",
    //     functionBody: "",
    //     functionList,
    //     match: true,
    //     error: undefined,
    // });

    const baseQueryBuilder = 'q';
    const code = `import { sqlBuilder } from "@gntrees/sql-builder/pg/builder";

const q = sqlBuilder()
    .setFormatParamHandler("${formatParamHandler}")
    .setExecutionHandler(${execHandler});

const query = q${functionListToString(functionList, baseQueryBuilder)};`;

    let formatted = code;
    if (typeof globalThis === "undefined" || !("window" in globalThis)) {
        formatted = await prettier.format(code, {
            parser: 'typescript',
        });
    }

    return { code, formatted, functionList, options };
}

const runGeneratedFunctionList = async (list: FunctionListType[]): Promise<string> => {
    const formatParamHandler = DEFAULT_FORMAT_PARAM_HANDLER;
    const execHandler = DEFAULT_EXEC_HANDLER;
    const baseQueryBuilder = 'q';
    const code = `import { sqlBuilder } from "@gntrees/sql-builder/pg/builder";

const q = sqlBuilder()
    .setFormatParamHandler("${formatParamHandler}")
    .setExecutionHandler(${execHandler});

const query = q${functionListToString(list, baseQueryBuilder)};`;
    const queryBuildingPart = await extractQueryBuildingPart(code);

    // Build function body for new Function()
    let functionBody =
        "const q = sqlBuilder()" +
        ".setFormatParamHandler(\"" + MOCK_FORMAT_PARAM_HANDLER + "\")" +
        ".setExecutionHandler(async ({ sql, parameters, meta }) => { " + MOCK_EXEC_HANDLER_BODY + " });" +
        queryBuildingPart +
        "return query;";

    // Import sqlBuilder and execute the patched function
    const { sqlBuilder } = await import("@gntrees/sql-builder/pg/builder");

    // Create a function from the function body
    const func = new Function("sqlBuilder", functionBody);
    const query = func(sqlBuilder);
    if (!query) {
        throw new Error("Function did not return a query");
    } else if (typeof query.getSqlWithParameters !== "function") {
        throw new Error(`Returned value is not a query builder, it's ${typeof query}`);
    } else {
        const result = query.getSqlWithParameters();
        if (!result || typeof result !== "string") {
            throw new Error(`getSql() returned non-string: ${typeof result}`);
        }
        return result;
    }
}
