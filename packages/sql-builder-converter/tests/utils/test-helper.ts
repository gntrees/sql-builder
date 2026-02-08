import { convert } from "../../index";
import { normalizeSql } from "./normalize-sql";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const MOCK_EXEC_HANDLER_BODY = "return { sql, parameters };";
const MOCK_FORMAT_PARAM_HANDLER = "pg";
const DUMP_DIR = join(process.cwd(), "test-dumps");

let dumpEnabled = true;
let testCounter = 0;

export function setDumpEnabled(enabled: boolean): void {
    dumpEnabled = enabled;
}

async function ensureDumpDir(): Promise<void> {
    await mkdir(DUMP_DIR, { recursive: true });
}

function sanitizeFolderName(name: string): string {
    return name
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .substring(0, 100);
}

async function dumpTestResult(data: {
    testName: string;
    inputSql: string;
    outputSql: string;
    generatedCode: string;
    functionBody: string;
    match: boolean;
    error?: string;
}): Promise<void> {
    if (!dumpEnabled) return;

    await ensureDumpDir();

    testCounter++;
    const sanitizedName = sanitizeFolderName(data.testName);
    const sanitizedSql = sanitizeFolderName(data.inputSql);
    const fileName = `${String(testCounter).padStart(3, "0")}-${sanitizedName}`;
    const dirPath = join(DUMP_DIR, fileName);
    await mkdir(dirPath, { recursive: true });

    // Write input SQL
    await writeFile(join(dirPath, "input.sql"), data.inputSql, "utf-8");

    // Write output SQL
    await writeFile(join(dirPath, "output.sql"), data.outputSql || "(empty)", "utf-8");

    // Write generated code
    await writeFile(join(dirPath, "generated.ts"), data.generatedCode, "utf-8");

    // Write function body
    await writeFile(join(dirPath, "function-body.js"), data.functionBody, "utf-8");

    // Write result summary
    const summary = [
        `Match: ${data.match ? "PASS" : "FAIL"}`,
        `Input SQL: ${data.inputSql}`,
        `Output SQL: ${data.outputSql || "(empty)"}`,
        data.error ? `Error: ${data.error}` : "",
    ].join("\n");
    await writeFile(join(dirPath, "result.txt"), summary, "utf-8");
}

async function extractQueryBuildingPart(code: string): Promise<string> {
    // Extract just the query building part (the lines starting with "const query = q")
    const lines = code.split("\n");
    let queryBuildingPart = "";
    let inQueryBuilding = false;

    for (const line of lines) {
        // Match both "const query = q." and "const query = q" (for multiline chain)
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("const query = q") || (inQueryBuilding && trimmedLine.startsWith(".select"))) {
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

export interface TestRoundTripResult {
    inputSql: string;
    outputSql: string;
    match: boolean;
    generatedCode: string;
    error?: string;
}

export async function testRoundTrip(inputSql: string, testName?: string): Promise<TestRoundTripResult> {
    const conversionResult = await convert(inputSql);
    const generatedCode = conversionResult.formatted;
    let outputSql = "";
    let error = "";
    let match = false;
    let functionBody = "";

    try {
        const queryBuildingPart = await extractQueryBuildingPart(generatedCode);

        // Build function body for new Function()
        functionBody =
            "const q = sqlBuilder({" +
            'formatParamHandler: "' + MOCK_FORMAT_PARAM_HANDLER + '",' +
            "execHandler: async ({ sql, parameters, meta }) => { " + MOCK_EXEC_HANDLER_BODY + " }" +
            "});" +
            queryBuildingPart +
            "return query;";

        // Import sqlBuilder and execute the patched function
        const { sqlBuilder } = await import("@gntrees/sql-builder");

        // Create a function from the function body
        const func = new Function("sqlBuilder", functionBody);
        const query = func(sqlBuilder);

        if (!query) {
            error = "Function did not return a query";
        } else if (typeof query.getSql !== "function") {
            error = `Returned value is not a query builder, it's ${typeof query}`;
        } else {
            outputSql = query.getSql();

            if (!outputSql || typeof outputSql !== "string") {
                error = `getSql() returned non-string: ${typeof outputSql}`;
                outputSql = String(outputSql ?? "");
            } else {
                const normalizedInput = normalizeSql(inputSql);
                const normalizedOutput = normalizeSql(outputSql);
                match = normalizedInput === normalizedOutput;
            }
        }
    } catch (e) {
        error = e instanceof Error ? e.message : String(e);
        outputSql = "";
    }

    // Dump test result
    await dumpTestResult({
        testName: testName || "test",
        inputSql,
        outputSql,
        generatedCode,
        functionBody,
        match: error ? false : match,
        error: error || undefined,
    });

    return {
        inputSql,
        outputSql,
        match,
        generatedCode,
        error: error || undefined,
    };
}
