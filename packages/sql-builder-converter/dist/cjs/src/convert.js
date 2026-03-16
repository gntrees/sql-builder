"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const prettier = __importStar(require("prettier"));
const pgsql_parser_1 = require("pgsql-parser");
const resolvers_js_1 = require("./utils/resolvers.js");
const stringifiers_js_1 = require("./utils/stringifiers.js");
const MOCK_EXEC_HANDLER_BODY = "return { sql, parameters };";
const MOCK_FORMAT_PARAM_HANDLER = "pg";
const extractQueryBuildingPart = async (code) => {
    const lines = code.split("\n");
    let queryBuildingPart = "";
    let inQueryBuilding = false;
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("const query = q") ||
            (inQueryBuilding && (trimmedLine.startsWith(".select") || trimmedLine.startsWith("q.select")))) {
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
const walker = (specialNode, functionList) => {
    return (path) => {
        try {
            const nodes = (0, resolvers_js_1.resolveNode)({ [path.tag]: path.node });
            functionList.push(...nodes);
            return false;
        }
        catch (error) {
            return false;
        }
    };
};
async function convert(sql, options = {}) {
    const formatParamHandler = options.formatParamHandler ?? DEFAULT_FORMAT_PARAM_HANDLER;
    const execHandler = options.execHandler ?? DEFAULT_EXEC_HANDLER;
    await (0, pgsql_parser_1.loadModule)();
    const ast = await (0, pgsql_parser_1.parse)(sql);
    const functionList = [];
    for (const [i, stmt] of ast.stmts.entries()) {
        if (stmt.stmt) {
            const nodes = (0, resolvers_js_1.resolveNode)({ RawStmt: stmt });
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
    }
    ;
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

const query = q${(0, stringifiers_js_1.functionListToString)(functionList, baseQueryBuilder)};`;
    let formatted = code;
    if (typeof globalThis === "undefined" || !("window" in globalThis)) {
        formatted = await prettier.format(code, {
            parser: 'typescript',
        });
    }
    return { code, formatted, functionList, options };
}
const runGeneratedFunctionList = async (list) => {
    const formatParamHandler = DEFAULT_FORMAT_PARAM_HANDLER;
    const execHandler = DEFAULT_EXEC_HANDLER;
    const baseQueryBuilder = 'q';
    const code = `import { sqlBuilder } from "@gntrees/sql-builder/pg/builder";

const q = sqlBuilder()
    .setFormatParamHandler("${formatParamHandler}")
    .setExecutionHandler(${execHandler});

const query = q${(0, stringifiers_js_1.functionListToString)(list, baseQueryBuilder)};`;
    const queryBuildingPart = await extractQueryBuildingPart(code);
    // Build function body for new Function()
    let functionBody = "const q = sqlBuilder()" +
        ".setFormatParamHandler(\"" + MOCK_FORMAT_PARAM_HANDLER + "\")" +
        ".setExecutionHandler(async ({ sql, parameters, meta }) => { " + MOCK_EXEC_HANDLER_BODY + " });" +
        queryBuildingPart +
        "return query;";
    // Import sqlBuilder and execute the patched function
    const { sqlBuilder } = await Promise.resolve().then(() => __importStar(require("@gntrees/sql-builder/pg/builder")));
    // Create a function from the function body
    const func = new Function("sqlBuilder", functionBody);
    const query = func(sqlBuilder);
    if (!query) {
        throw new Error("Function did not return a query");
    }
    else if (typeof query.getSqlWithParameters !== "function") {
        throw new Error(`Returned value is not a query builder, it's ${typeof query}`);
    }
    else {
        const result = query.getSqlWithParameters();
        if (!result || typeof result !== "string") {
            throw new Error(`getSql() returned non-string: ${typeof result}`);
        }
        return result;
    }
};
