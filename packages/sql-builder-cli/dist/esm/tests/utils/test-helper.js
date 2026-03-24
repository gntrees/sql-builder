import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { deparseSync, parseSync } from "pgsql-parser";
import { normalizeSql } from "./normalize-sql";
import { convert } from "../../src/convert";
export const MOCK_EXEC_HANDLER_BODY = "return { sql, parameters };";
export const MOCK_FORMAT_PARAM_HANDLER = "pg";
const DUMP_DIR = join(process.cwd(), "test-dumps");
let dumpEnabled = true;
let testCounter = 0;
export function setDumpEnabled(enabled) {
    dumpEnabled = enabled;
}
function ensureDumpDir() {
    mkdirSync(DUMP_DIR, { recursive: true });
}
function sanitizeFolderName(name) {
    return name
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .substring(0, 100);
}
export function dumpTestResult(data) {
    try {
        if (!dumpEnabled)
            return;
        ensureDumpDir();
        testCounter++;
        if (testCounter < 100) {
            const sanitizedName = sanitizeFolderName(data.testName);
            // const sanitizedSql = sanitizeFolderName(data.inputSql);
            const fileName = `${String(testCounter).padStart(3, "0")}-${sanitizedName}`;
            const ast = data.inputSql ? parseSync(data.inputSql) : {};
            const dirPath = join(DUMP_DIR, fileName);
            mkdirSync(dirPath, { recursive: true });
            // Write input SQL
            writeFileSync(join(dirPath, "input.sql"), data.inputSql);
            // Write raw input SQL
            writeFileSync(join(dirPath, "input-raw.sql"), data.rawInput);
            // Write output SQL
            writeFileSync(join(dirPath, "output.sql"), data.outputSql || "(empty)");
            // Write generated code
            writeFileSync(join(dirPath, "generated.ts"), data.generatedCode);
            // Write function body
            writeFileSync(join(dirPath, "function-body.js"), data.functionBody);
            // Write AST
            writeFileSync(join(dirPath, "input-ast.json"), JSON.stringify(ast, null, 2));
            // Write functionList
            writeFileSync(join(dirPath, "function-list.json"), JSON.stringify(data.functionList, null, 2));
            // Write tokens
            if (data.tokens) {
                writeFileSync(join(dirPath, "tokens.json"), data.tokens);
            }
            // Write result summary
            const summary = [
                `Match: ${data.match ? "PASS" : "FAIL"}`,
                `Input SQL: ${data.inputSql}`,
                `Output SQL: ${data.outputSql || "(empty)"}`,
                data.error ? `Error: ${data.error}` : "",
            ].join("\n");
            writeFileSync(join(dirPath, "result.txt"), summary);
        }
    }
    catch (error) {
        console.log(`Error dumping test result for test "${data.testName}": ${error instanceof Error ? error.message : String(error)}`);
    }
}
export async function extractQueryBuildingPart(code) {
    // Extract just the query building part (the lines starting with "const query = q")
    const lines = code.split("\n");
    let queryBuildingPart = "";
    let inQueryBuilding = false;
    for (const line of lines) {
        // Match both "const query = q." and "const query = q" (for multiline chain)
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("const query = q") || (inQueryBuilding && (trimmedLine.startsWith(".select") || trimmedLine.startsWith("q.select")))) {
            inQueryBuilding = true;
        }
        if (inQueryBuilding) {
            queryBuildingPart += line + "\n";
        }
        // Stop at console.log
        if (trimmedLine.startsWith("console.log")) {
            break;
        }
    }
    // Remove the console.log line
    queryBuildingPart = queryBuildingPart.replace(/console\.log\(query\.getSql\(\)\);?\n?/g, "");
    return queryBuildingPart.trim();
}
async function extractTokens(query) {
    try {
        const tokens = query.getTokens();
        return JSON.stringify(tokens, null, 2);
    }
    catch (e) {
        return `Error getting tokens: ${e instanceof Error ? e.message : String(e)}`;
    }
}
export async function testRoundTrip(inputSqlParam, testName, index) {
    let error = "";
    let match = false;
    let inputSql = inputSqlParam;
    let outputSql = "";
    let functionBody = "";
    let tokens = undefined;
    let generatedCode = "";
    let functionList = [];
    try {
        const conversionResult = await convert(inputSqlParam, {
            testName
        });
        generatedCode = conversionResult.formatted;
        functionList = conversionResult.functionList;
        // console.log();
        const queryBuildingPart = await extractQueryBuildingPart(generatedCode);
        // Build function body for new Function()
        functionBody =
            "const q = sqlBuilder()" +
                ".setFormatParamHandler(\"" + MOCK_FORMAT_PARAM_HANDLER + "\")" +
                ".setExecutionHandler(async ({ sql, parameters, meta }) => { " + MOCK_EXEC_HANDLER_BODY + " });" +
                queryBuildingPart +
                "return query;";
        // Import sqlBuilder and execute the patched function
        const { sqlBuilder } = await import("@gntrees/sql-builder/pg");
        // Create a function from the function body
        const func = new Function("sqlBuilder", functionBody);
        const query = func(sqlBuilder);
        if (!query) {
            error = "Function did not return a query";
        }
        else if (typeof query.getSqlWithParameters !== "function") {
            error = `Returned value is not a query builder, it's ${typeof query}`;
        }
        else {
            outputSql = query.getSqlWithParameters();
            tokens = query ? await extractTokens(query) : undefined;
            if (!outputSql || typeof outputSql !== "string") {
                error = `getSql() returned non-string: ${typeof outputSql}`;
                outputSql = String(outputSql ?? "");
            }
            else {
                inputSql = normalizeSql(deparseSync(parseSync(normalizeSql(inputSql))));
                outputSql = normalizeSql(deparseSync(parseSync(outputSql)));
                match = inputSql === outputSql;
            }
        }
        // Extract tokens if query was successfully created
    }
    catch (e) {
        error = e instanceof Error ? e.message : String(e);
        outputSql = "";
    }
    if (error) {
        console.log(`Error in test${testName ? ` "${testName}"` : ""}${index !== undefined ? ` (index ${index})` : ""}: ${error} ${generatedCode}`);
        dumpTestResult({
            testName: testName || "test",
            inputSql: inputSql ?? "",
            rawInput: inputSqlParam ?? "",
            outputSql: outputSql ?? "",
            generatedCode: generatedCode ?? "",
            functionBody: functionBody ?? "",
            functionList: functionList ?? [],
            match: error ? false : match,
            error: error || undefined,
            tokens: tokens ?? "",
        });
    }
    // Dump test result only on failure or error
    if (!match) {
        dumpTestResult({
            testName: testName || "test",
            inputSql: inputSql,
            rawInput: inputSqlParam,
            outputSql,
            generatedCode,
            functionBody,
            functionList,
            match: error ? false : match,
            error: error || undefined,
            tokens,
        });
    }
    return {
        inputSql,
        outputSql,
        match,
        generatedCode,
        error: error || undefined,
    };
}
