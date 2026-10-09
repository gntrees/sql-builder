import { expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { compileAndRun } from "./compile-helper";
import { cParseProgram, parseC, type ParseOutput } from "./parse-c-result";

const casesDir = join(import.meta.dir, "data/cases/query-builder");
const tsDir = join(casesDir, "typescript");
const cDir = join(casesDir, "c");

const cases = readdirSync(tsDir)
    .filter((file) => file.endsWith(".ts") && !file.endsWith(".d.ts"))
    .map((file) => file.slice(0, -".ts".length))
    .sort();

for (const name of cases) {
    test(`differential TS<->C: ${name}`, async () => {
        const cPath = join(cDir, `${name}.c`);
        if (!existsSync(cPath)) throw new Error(`missing C case file: ${cPath}`);

        const { schema } = await import(`./data/cases/query-builder/typescript/${name}.ts`);
        const expected: ParseOutput = schema.parse();

        const fn = `${name.replace(/-/g, "_")}_schema`;
        const runner = cParseProgram(`Builder qb = ${fn}();`, readFileSync(cPath, "utf8"));
        const { status, stderr, stdout } = compileAndRun(runner);
        expect(stderr).not.toContain("validate:");
        expect(status).toBe(0);
        expect(parseC(stdout)).toEqual(expected);
    }, 60000);
}
