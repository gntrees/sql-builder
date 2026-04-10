#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const index_js_1 = require("./index.js");
const USAGE = `Usage:
  npx @gntrees/sql-builder-cli convert --sql="SELECT ..." [--sqlSchema=true] [--dbSchema=true] [--simplify-literal=true] [--output="./query.ts"]
  npx @gntrees/sql-builder-cli generate --url="postgres://..." [--output="./db-name.schema.ts"]`;
const parseArgs = (args) => {
    const [command, ...rest] = args;
    let sql;
    let url;
    let output;
    let sqlSchema;
    let dbSchema;
    let simplifyLiteral;
    for (const arg of rest) {
        if (arg.startsWith("--sql=")) {
            sql = arg.slice("--sql=".length);
        }
        if (arg.startsWith("--url=")) {
            url = arg.slice("--url=".length);
        }
        if (arg.startsWith("--output=")) {
            output = arg.slice("--output=".length);
        }
        if (arg.startsWith("--sqlSchema=")) {
            const schemaValue = arg.slice("--sqlSchema=".length).toLowerCase();
            sqlSchema = schemaValue === "true";
        }
        if (arg.startsWith("--dbSchema=")) {
            const schemaValue = arg.slice("--dbSchema=".length).toLowerCase();
            dbSchema = schemaValue === "true";
        }
        if (arg.startsWith("--simplify-literal=")) {
            const simplifyLiteralValue = arg.slice("--simplify-literal=".length).toLowerCase();
            simplifyLiteral = simplifyLiteralValue === "true";
        }
    }
    return { command, sql, url, output, sqlSchema, dbSchema, simplifyLiteral };
};
const main = async () => {
    const { command, sql, url, output, sqlSchema, dbSchema, simplifyLiteral } = parseArgs(process.argv.slice(2));
    if (!command || command === "help" || command === "--help" || command === "-h") {
        console.log(USAGE);
        process.exit(0);
    }
    if (command !== "convert" && command !== "generate") {
        console.error(`Unknown command: ${command}`);
        console.error(USAGE);
        process.exit(1);
    }
    if (command === "convert") {
        if (!sql) {
            console.error("Missing required flag: --sql");
            console.error(USAGE);
            process.exit(1);
        }
        if (!index_js_1.convert) {
            console.error("Conversion function is not available in this build.");
            process.exit(1);
        }
        try {
            const result = await (0, index_js_1.convert)(sql, { sqlSchema, dbSchema, simplifyLiteral });
            if (output) {
                await (0, promises_1.writeFile)(output, result.formatted + "\n", "utf8");
                process.stdout.write(`Written output to ${output}\n`);
            }
            else {
                process.stdout.write(result.formatted + "\n");
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`Conversion failed: ${message}`);
            process.exit(1);
        }
    }
    if (command === "generate") {
        if (!url) {
            console.error("Missing required flag: --url");
            console.error(USAGE);
            process.exit(1);
        }
        if (!index_js_1.generate) {
            console.error("Generate function is not available in this build.");
            process.exit(1);
        }
        try {
            const result = await (0, index_js_1.generate)({ url, output });
            process.stdout.write(`Generated schema at ${result.outputPath}\n`);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`Generate failed: ${message}`);
            process.exit(1);
        }
    }
};
void main();
