#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { convert, generate } from "./index.js";

const USAGE = `Usage:
  npx @gntrees/sql-builder-cli convert --sql="SELECT ..." [--schema=true] [--output="./query.ts"]
  npx @gntrees/sql-builder-cli generate --url="postgres://..." [--output="./db-name.schema.ts"]`;

type ParsedArgs = {
  command?: string;
  sql?: string;
  url?: string;
  output?: string;
  schema?: boolean;
};

const parseArgs = (args: string[]): ParsedArgs => {
  const [command, ...rest] = args;
  let sql: string | undefined;
  let url: string | undefined;
  let output: string | undefined;
  let schema: boolean | undefined;

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
    if (arg.startsWith("--schema=")) {
      const schemaValue = arg.slice("--schema=".length).toLowerCase();
      schema = schemaValue === "true";
    }
  }

  return { command, sql, url, output, schema };
};

const main = async () => {
  const { command, sql, url, output, schema } = parseArgs(process.argv.slice(2));

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

    if (!convert) {
      console.error("Conversion function is not available in this build.");
      process.exit(1);
    }

    try {
      const result = await convert(sql, { schema });
      if (output) {
        await writeFile(output, result.formatted + "\n", "utf8");
        process.stdout.write(`Written output to ${output}\n`);
      } else {
        process.stdout.write(result.formatted + "\n");
      }
    } catch (error) {
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

    if (!generate) {
      console.error("Generate function is not available in this build.");
      process.exit(1);
    }

    try {
      const result = await generate({ url, output });
      process.stdout.write(`Generated schema at ${result.outputPath}\n`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Generate failed: ${message}`);
      process.exit(1);
    }
  }
};

void main();
