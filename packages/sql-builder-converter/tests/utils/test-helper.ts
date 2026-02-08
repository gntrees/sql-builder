import { convert } from "../../index";
import { normalizeSql } from "./normalize-sql";

const MOCK_EXEC_HANDLER_BODY = "return { sql, parameters };";
const MOCK_FORMAT_PARAM_HANDLER = "pg";

async function extractQueryBuildingPart(code: string): Promise<string> {
    // Extract just the query building part (the lines starting with "const query = q.")
    const lines = code.split("\n");
    let queryBuildingPart = "";
    let inQueryBuilding = false;

    for (const line of lines) {
        if (line.trim().startsWith("const query = q.")) {
            inQueryBuilding = true;
        }
        if (inQueryBuilding) {
            queryBuildingPart += line + "\n";
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

export async function testRoundTrip(inputSql: string): Promise<TestRoundTripResult> {
    const conversionResult = await convert(inputSql);
    const generatedCode = conversionResult.formatted;

    try {
        const queryBuildingPart = await extractQueryBuildingPart(generatedCode);

        // Build function body for new Function()
        const functionBody =
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
            return {
                inputSql,
                outputSql: "",
                match: false,
                generatedCode,
                error: "Function did not return a query",
            };
        }

        if (typeof query.getSql !== "function") {
            return {
                inputSql,
                outputSql: "",
                match: false,
                generatedCode,
                error: `Returned value is not a query builder, it's ${typeof query}`,
            };
        }

        const outputSql = query.getSql();

        if (!outputSql || typeof outputSql !== "string") {
            return {
                inputSql,
                outputSql: String(outputSql ?? ""),
                match: false,
                generatedCode,
                error: `getSql() returned non-string: ${typeof outputSql}`,
            };
        }

        const normalizedInput = normalizeSql(inputSql);
        const normalizedOutput = normalizeSql(outputSql);

        return {
            inputSql,
            outputSql,
            match: normalizedInput === normalizedOutput,
            generatedCode,
        };
    } catch (error) {
        return {
            inputSql,
            outputSql: "",
            match: false,
            generatedCode,
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
