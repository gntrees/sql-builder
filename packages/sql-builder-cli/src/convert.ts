import type { Walker } from '@pgsql/traverse';
import * as prettier from "prettier";

import { NodePath } from '@pgsql/traverse';
import { loadModule, parse } from 'pgsql-parser';
import type { ConvertOptions, FunctionListType } from './types.js';
import { resolveNode } from './utils/resolvers.js';
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


const walker: (specialNode: Record<string, (node: unknown) => FunctionListType[]>, functionList: FunctionListType[]) => Walker = (specialNode, functionList) => {
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
    await loadModule();
    const ast = await parse(sql);
    const functionList: FunctionListType[] = [];
    for (const [i, stmt] of ast.stmts.entries()) {
        if (stmt.stmt) {
            const nodes = resolveNode({ RawStmt: stmt });
            functionList.push(...nodes);
            // if (options.testName == 'query-builder-83') {
            //     const normalized = normalizeLocationsNode(ast,sql);
            //     write('src/generated/normalized.json', JSON.stringify(normalized,null,2));
            //     // console.log(JSON.stringify(normalized,null,2));
                
            // }

            if (i !== ast.stmts.length - 1) {
                functionList.push({
                    name: 'sc',
                    arguments: [],
                    paramType: 'function'
                });
            }
        }
    };


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
    const queryBuilderChain = `q${functionListToString(functionList, baseQueryBuilder)}`;
    const code = options.schema
        ? `import { sqlBuilder, sqlSchema } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const sch = sqlSchema();
const schema = sch.set("query", sch
    .query(${queryBuilderChain}));
    
export default schema;`
        : `import { sqlBuilder } from "@gntrees/sql-builder/pg/builder";

const q = sqlBuilder();
const query = ${queryBuilderChain};

export default query;`;

    let formatted = code;
    if (typeof globalThis === "undefined" || !("window" in globalThis)) {
        formatted = await prettier.format(code, {
            parser: 'typescript',
        });
    }

    return { code, formatted, functionList, options };
}
