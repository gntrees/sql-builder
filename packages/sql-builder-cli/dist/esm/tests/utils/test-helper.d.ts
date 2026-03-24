import { type FunctionListType } from "../../index";
export declare const MOCK_EXEC_HANDLER_BODY = "return { sql, parameters };";
export declare const MOCK_FORMAT_PARAM_HANDLER = "pg";
export declare function setDumpEnabled(enabled: boolean): void;
export declare function dumpTestResult(data: {
    testName: string;
    inputSql: string;
    rawInput: string;
    outputSql: string;
    generatedCode: string;
    functionBody: string;
    functionList: FunctionListType[];
    match: boolean;
    error?: string;
    tokens?: string;
}): void;
export declare function extractQueryBuildingPart(code: string): Promise<string>;
export interface TestRoundTripResult {
    inputSql: string;
    outputSql: string;
    match: boolean;
    generatedCode: string;
    error?: string;
}
export declare function testRoundTrip(inputSqlParam: string, testName?: string, index?: number): Promise<TestRoundTripResult>;
