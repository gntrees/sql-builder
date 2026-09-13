import { expect, test } from "bun:test";
import { convertSchemaToC } from "@gntrees/method-chain";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";
import { compileAndRun } from "./compile-helper";
import { cParseProgram, parseC, type ParseOutput } from "./parse-c-result";

type Case = {
    name: string;
    exportName: string;
    query: (c: any) => any;
};

const HEADER = "gntrees-sql-builder.h";

const cases: Case[] = [
    {
        name: "nested chain arguments across many clauses",
        exportName: "convert-c",
        query: (c) =>
            c.select(c.col("id"))
                .from(c.table("users"))
                .where(c.col("active").eq(true))
                .orderBy(c.col("name").desc())
                .groupBy(c.col("x"))
                .limit(10)
                .offset(2)
                .setDialect("postgres"),
    },
    {
        name: "nested boolean predicates",
        exportName: "convert-c-2",
        query: (c) => c.select(c.col("id")).from(c.table("users")).where(c.and([c.col("age").gte(18), c.col("active").eq(true)])).setDialect("mysql"),
    },
];

for (const { name, exportName, query } of cases) {
    test(`convertSchemaToC round-trip: ${name}`, () => {
        const c = sqlBuilder("q") as any;
        const built = query(c);
        const expected: ParseOutput = built.parse();

        const code = convertSchemaToC(built.getSchema(exportName) as any, { header: HEADER });

        const declarations = [...code.matchAll(/Builder (\w+) =/g)].map((match) => match[1]);
        expect(declarations.length).toBeGreaterThan(0);
        expect(new Set(declarations).size).toBe(declarations.length);
        expect(code).toContain("setDialect(");

        const fnName = `${exportName.replace(/-/g, "_")}_schema`;
        const runner = cParseProgram(`Builder qb = ${fnName}();`, code);
        const { status, stderr, stdout } = compileAndRun(runner);
        expect(stderr).not.toContain("validate:");
        expect(status).toBe(0);
        expect(parseC(stdout)).toEqual(expected);
    }, 60000);
}
