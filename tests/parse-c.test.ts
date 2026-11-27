import { expect, test } from "bun:test";
import { compileAndRun } from "./compile-helper";

test("parse builds sql with dialect placeholders", () => {
    const runner = `#include "gntrees-sql-builder.h"
#include <stdio.h>
int main(void) {
    Builder qb = sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col(v("id"))),
        from(table(v("users"))),
        where(ch(col(v("active")), eq(true))),
        limit(v(10)));
    ParseResult r = parse(qb);
    printf("%s\\n", r.sql);
    printf("%s\\n", r.sqlWithParam);
    printf("%zu %d\\n", r.paramCount, (int)r.param[0].type);
    lt_free_value((ArgumentValue){0});
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain('SELECT "id" FROM "users" WHERE "active" = $1 LIMIT $2');
    expect(stdout).toContain('SELECT "id" FROM "users" WHERE "active" = TRUE LIMIT 10');
    expect(stdout).toContain("2 2");
}, 60000);

test("parse grows buffers for many parameters", () => {
    const n = 120;
    const calls = Array.from({ length: n }, (_, i) => `where(ch(col(v("a${i}")), eq(v(${i}))))`).join(",\n        ");
    const runner = `#include "gntrees-sql-builder.h"
#include <stdio.h>
int main(void) {
    Builder qb = sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col(v("id"))),
        ${calls});
    ParseResult r = parse(qb);
    printf("%zu\\n", r.paramCount);
    printf("%s\\n", r.sql + strlen(r.sql) - 4);
    lt_free_value((ArgumentValue){0});
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    const lines = stdout.trim().split("\n");
    expect(lines[0]).toBe("120");
    expect(lines[1]).toBe("$120");
}, 60000);

test("parse is memory-safe under AddressSanitizer", () => {
    const runner = `#include "gntrees-sql-builder.h"
#include <stdio.h>
int main(void) {
    Builder qb = sqlBuilder(
        variableName("q"),
        setDialect("mysql"),
        select(arr(col(v("id")), col(v("name")))),
        from(table(v("users"))),
        where(ch(and(arr(
            ch(col(v("age")), gte(v(18))),
            ch(col(v("active")), eq(true)))))),
        orderBy(ch(col(v("name")), desc())),
        limit(v(5)));
    ParseResult r = parse(qb);
    printf("%s\\n", r.sql);
    printf("%s\\n", r.sqlWithParam);
    lt_free_value((ArgumentValue){0});
    lt_shutdown();
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner, {
        flags: "-fsanitize=address,undefined -fno-omit-frame-pointer -g",
        env: {
            ASAN_OPTIONS: "detect_leaks=1:abort_on_error=1",
            UBSAN_OPTIONS: "halt_on_error=1",
        },
    });
    expect(status).toBe(0);
    expect(stderr).not.toContain("AddressSanitizer");
    expect(stderr).not.toContain("LeakSanitizer");
    expect(stderr).not.toContain("runtime error:");
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain(
        "SELECT `id`, `name` FROM `users` WHERE ( `age` >= ? AND `active` = ? ) ORDER BY `name` DESC LIMIT ?"
    );
}, 60000);
