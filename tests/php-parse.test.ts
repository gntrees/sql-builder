import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";

/**
 * End-to-end proof that `parse` (written once in `src/parse-body.ts`) produces
 * identical results for TypeScript and PHP. All cases run in ONE container.
 */

const phpDir = join(import.meta.dir, "..", "generated", "gntrees-sql-builder", "php");
const phpImage = "php:8.3-cli-alpine";

const phpAvailable = spawnSync("docker", ["image", "inspect", phpImage], { encoding: "utf8" }).status === 0;

const cases: { name: string; ts: (c: any) => any; php: string }[] = [
    {
        name: "postgres select with params",
        ts: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres").parse(),
        php: 'q()->select(q()->col("id"))->from(q()->table("users"))->where(q()->col("active")->eq(true))->limit(10)->setDialect("postgres")->parse()',
    },
    {
        name: "mysql with order by",
        ts: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse(),
        php: 'q()->select([q()->col("id"), q()->col("name")])->from(q()->table("users"))->where(q()->col("age")->gte(18))->orderBy(q()->col("name")->desc())->setDialect("mysql")->parse()',
    },
    {
        name: "nested and predicate",
        ts: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse(),
        php: 'q()->select(q()->col("id"))->where(q()->and([q()->col("a")->eq(1), q()->col("b")->eq(2)]))->setDialect("postgres")->parse()',
    },
    {
        name: "or with not",
        ts: (c) => c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse(),
        php: 'q()->select(q()->col("id"))->where(q()->or([q()->col("a")->eq(1), q()->not(q()->col("b")->eq(2))]))->setDialect("mysql")->parse()',
    },
    {
        name: "in predicate",
        ts: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse(),
        php: 'q()->select(q()->col("id"))->where(q()->col("x")->in("1,2,3"))->setDialect("postgres")->parse()',
    },
    {
        name: "is null without params",
        ts: (c) => c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse(),
        php: 'q()->select(q()->col("id"))->where(q()->col("x")->isNull())->setDialect("postgres")->parse()',
    },
    {
        name: "between",
        ts: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse(),
        php: 'q()->select(q()->col("id"))->where(q()->col("x")->between(1, 2))->setDialect("postgres")->parse()',
    },
    {
        name: "insert from map",
        ts: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse(),
        php: 'q()->insert(q()->table("users"), ["name" => "bob"])->setDialect("postgres")->parse()',
    },
    {
        name: "update from map",
        ts: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse(),
        php: 'q()->update(q()->table("users"), ["name" => "bob", "age" => 3])->setDialect("postgres")->parse()',
    },
];

test("php parse: generated parse() matches TypeScript for every case", () => {
    if (!phpAvailable) {
        console.warn(`docker image ${phpImage} is not available; skipping php parse test`);
        return;
    }

    const main = [
        'require "/w/index.php";',
        'function q() { return sqlBuilder("qb"); }',
        `$results = [${cases.map((c) => c.php).join(",\n")}];`,
        "echo json_encode($results);",
    ].join("\n");
    const res = spawnSync("docker", ["run", "--rm", "-v", `${phpDir}:/w`, "-w", "/w", phpImage, "php", "-r", main], { encoding: "utf8" });
    if (res.status !== 0) {
        throw new Error(`php parse failed:\n${res.stderr}`);
    }
    const results = JSON.parse(res.stdout) as unknown[];

    cases.forEach(({ name, ts }, index) => {
        const expected = ts(sqlBuilder("qb") as any);
        expect({ name, ...(results[index] as object) }).toEqual({ name, ...expected });
    });
}, 60000);
