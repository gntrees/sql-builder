// Prisma custom generator: DMMF -> schema/schema.json + schema/unsupported.json
//
// Registered in schema.prisma as:
//
//   generator ltSchema {
//     provider = "bun ./schema/prisma-generator.mjs"
//     output   = "./schema"
//   }
//
// The generator deliberately does not emit LT itself. It writes the stable IR;
// schema/codegen.ts owns the LT output.

import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

import { buildSchemaIR } from "./dmmf.ts";

const require = createRequire(import.meta.url);
let prismaVersion = "unknown";
try {
    prismaVersion = require("prisma/package.json").version;
} catch {
    // Keep the fallback below; the generator still works without the package.
}

let generatorHandler;

try {
    ({ generatorHandler } = await import("@prisma/generator-helper"));
} catch {
    process.stderr.write(
        "prisma-lt: @prisma/generator-helper is not installed. " +
            "Install prisma@7.10.x and @prisma/generator-helper@7.10.x.\n",
    );
    process.exit(1);
}

function outputPath(options) {
    const output = options.generator?.output;
    if (typeof output === "string") return output;
    if (output && typeof output.value === "string") return output.value;
    return "schema";
}

generatorHandler({
    onManifest: () => ({
        defaultOutput: "./schema",
        prettyName: "LT Schema",
        version: "0.1.0",
    }),

    onGenerate: async (options) => {
        const ignoreTables = String(options.generator?.config?.ignoreTables ?? "")
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
        const { schema, unsupported } = buildSchemaIR(options.dmmf, {
            prismaVersion: prismaVersion !== "unknown" ? prismaVersion : String(options.version ?? "unknown"),
            ignoreTables,
        });

        const out = outputPath(options);
        mkdirSync(out, { recursive: true });
        writeFileSync(join(out, "schema.json"), `${JSON.stringify(schema, null, 2)}\n`);
        writeFileSync(join(out, "unsupported.json"), `${JSON.stringify(unsupported, null, 2)}\n`);

        process.stderr.write(
            `prisma-lt: wrote ${schema.tables.length} table(s), ` +
                `${schema.enums.length} enum(s), ${unsupported.entries.length} unsupported entr(ies)\n`,
        );
    },
});
