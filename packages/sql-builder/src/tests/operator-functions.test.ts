import { describe, test, expect } from "bun:test";
import { sqlBuilder } from "../../index";

describe("Operator Functions", () => {
    const db = {
        execHandler: async () => [],
        formatParamHandler: "pg" as const,
    };

    describe("Operator Functions with Optional Parameters", () => {
        describe("plus() - three patterns", () => {
            test("Pattern 1: v(2).plus().v(2) -> $1 + $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v(2).plus().v(2).getSql();
                expect(sql).toBe("$1 + $2");
            });

            test("Pattern 2: v(2).plus(2) -> $1 + $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v(2).plus(2).getSql();
                expect(sql).toBe("$1 + $2");
            });

            test("Pattern 3: plus(2, 2) -> $1 + $2", () => {
                const q = sqlBuilder(db);
                const sql = q.plus(2, 2).getSql();
                expect(sql).toBe("$1 + $2");
            });
        });

        describe("minus() - three patterns", () => {
            test("Pattern 1: v(10).minus().v(3) -> $1 - $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v(10).minus().v(3).getSql();
                expect(sql).toBe("$1 - $2");
            });

            test("Pattern 2: v(10).minus(3) -> $1 - $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v(10).minus(3).getSql();
                expect(sql).toBe("$1 - $2");
            });

            test("Pattern 3: minus(10, 3) -> $1 - $2", () => {
                const q = sqlBuilder(db);
                const sql = q.minus(10, 3).getSql();
                expect(sql).toBe("$1 - $2");
            });
        });

        describe("textCat() - three patterns", () => {
            test("Pattern 1: v('Hello').textCat().v('World') -> $1 || $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v("Hello").textCat().v("World").getSql();
                expect(sql).toBe("$1 || $2");
            });

            test("Pattern 2: v('Hello').textCat('World') -> $1 || $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v("Hello").textCat("World").getSql();
                expect(sql).toBe("$1 || $2");
            });

            test("Pattern 3: textCat('Hello', 'World') -> $1 || $2", () => {
                const q = sqlBuilder(db);
                const sql = q.textCat("Hello", "World").getSql();
                expect(sql).toBe("$1 || $2");
            });
        });

        describe("matchRegex() - three patterns", () => {
            test("Pattern 1: v('email').matchRegex().v('^[a-z]+@') -> $1 ~ $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v("email").matchRegex().v("^[a-z]+@").getSql();
                expect(sql).toBe("$1 ~ $2");
            });

            test("Pattern 2: v('email').matchRegex('^[a-z]+@') -> $1 ~ $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v("email").matchRegex("^[a-z]+@").getSql();
                expect(sql).toBe("$1 ~ $2");
            });

            test("Pattern 3: matchRegex('email', '^[a-z]+@') -> $1 ~ $2", () => {
                const q = sqlBuilder(db);
                const sql = q.matchRegex("email", "^[a-z]+@").getSql();
                expect(sql).toBe("$1 ~ $2");
            });
        });

        describe("crosses() - three patterns", () => {
            test("Pattern 1: v('path1').crosses().v('path2') -> $1 ?# $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v("path1").crosses().v("path2").getSql();
                expect(sql).toBe("$1 ?# $2");
            });

            test("Pattern 2: v('path1').crosses('path2') -> $1 ?# $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v("path1").crosses("path2").getSql();
                expect(sql).toBe("$1 ?# $2");
            });

            test("Pattern 3: crosses('path1', 'path2') -> $1 ?# $2", () => {
                const q = sqlBuilder(db);
                const sql = q.crosses("path1", "path2").getSql();
                expect(sql).toBe("$1 ?# $2");
            });
        });

        describe("isParallel() - three patterns", () => {
            test("Pattern 1: v('line1').isParallel().v('line2') -> $1 ?|| $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v("line1").isParallel().v("line2").getSql();
                expect(sql).toBe("$1 ?|| $2");
            });

            test("Pattern 2: v('line1').isParallel('line2') -> $1 ?|| $2", () => {
                const q = sqlBuilder(db);
                const sql = q.v("line1").isParallel("line2").getSql();
                expect(sql).toBe("$1 ?|| $2");
            });

            test("Pattern 3: isParallel('line1', 'line2') -> $1 ?|| $2", () => {
                const q = sqlBuilder(db);
                const sql = q.isParallel("line1", "line2").getSql();
                expect(sql).toBe("$1 ?|| $2");
            });
        });

        describe("op() direct usage", () => {
            test("op(2, '+', 2) -> $1 + $2", () => {
                const q = sqlBuilder(db);
                const sql = q.op(2, "+", 2).getSql();
                expect(sql).toBe("$1 + $2");
            });

            test("op(10, '-', 3) -> $1 - $2", () => {
                const q = sqlBuilder(db);
                const sql = q.op(10, "-", 3).getSql();
                expect(sql).toBe("$1 - $2");
            });

            test("op('Hello', '||', 'World') -> $1 || $2", () => {
                const q = sqlBuilder(db);
                const sql = q.op("Hello", "||", "World").getSql();
                expect(sql).toBe("$1 || $2");
            });

            test("op('email', '~', '^[a-z]+@') -> $1 ~ $2", () => {
                const q = sqlBuilder(db);
                const sql = q.op("email", "~", "^[a-z]+@").getSql();
                expect(sql).toBe("$1 ~ $2");
            });
        });
    });

    describe("Comparison Operators (no suffix)", () => {
        test("eq", () => {
            const q = sqlBuilder(db);
            const sql = q.select().c("id").eq().l(1).getSql();
            expect(sql).toBe("SELECT id = $1");
        });

        test("ne", () => {
            const q = sqlBuilder(db);
            const sql = q.select().c("status").ne().l("active").getSql();
            expect(sql).toContain("status <> $1");
        });

        test("notEq", () => {
            const q = sqlBuilder(db);
            const sql = q.select().c("status").notEq().l("active").getSql();
            expect(sql).toContain("status != $1");
        });

        test("gt", () => {
            const q = sqlBuilder(db);
            const sql = q.select().c("age").gt().l(18).getSql();
            expect(sql).toContain("age > $1");
        });

        test("lt", () => {
            const q = sqlBuilder(db);
            const sql = q.select().c("age").lt().l(65).getSql();
            expect(sql).toContain("age < $1");
        });

        test("lte", () => {
            const q = sqlBuilder(db);
            const sql = q.select().c("age").lte().l(100).getSql();
            expect(sql).toContain("age <= $1");
        });

        test("gte", () => {
            const q = sqlBuilder(db);
            const sql = q.select().c("age").gte().l(0).getSql();
            expect(sql).toContain("age >= $1");
        });
    });

    describe("Pattern Matching Operators", () => {
        test("like (override, no suffix)", () => {
            const q = sqlBuilder(db);
            const sql = q.select().c("name").like().l("%test%").getSql();
            expect(sql).toBe("SELECT name LIKE $1");
        });

        test("notLike", () => {
            const q = sqlBuilder(db);
            const sql = q.c("name").notLike().l("%test%").getSql();
            expect(sql).toContain("name NOT LIKE $1");
        });

        test("ilike (override, no suffix)", () => {
            const q = sqlBuilder(db);
            const sql = q.c("name").ilike().l("%test%").getSql();
            expect(sql).toContain("name ILIKE $1");
        });

        test("notIlike", () => {
            const q = sqlBuilder(db);
            const sql = q.c("name").notIlike().l("%test%").getSql();
            expect(sql).toContain("name NOT ILIKE $1");
        });

        test("matchRegex (no suffix)", () => {
            const q = sqlBuilder(db);
            const sql = q.c("email").matchRegex().l("^[a-z]+@").getSql();
            expect(sql).toContain("email ~ $1");
        });

        test("matchRegexInsensitive", () => {
            const q = sqlBuilder(db);
            const sql = q.c("email").matchRegexInsensitive().l("^[A-Z]+@").getSql();
            expect(sql).toContain("email ~* $1");
        });

        test("notMatchRegex", () => {
            const q = sqlBuilder(db);
            const sql = q.c("email").notMatchRegex().l("^[0-9]+").getSql();
            expect(sql).toContain("email !~ $1");
        });

        test("notMatchRegexInsensitive", () => {
            const q = sqlBuilder(db);
            const sql = q.c("email").notMatchRegexInsensitive().l("^[0-9]+").getSql();
            expect(sql).toContain("email !~* $1");
        });

        test("similarTo (no suffix)", () => {
            const q = sqlBuilder(db);
            const sql = q.c("pattern").similarTo().l("%(a|b)%").getSql();
            expect(sql).toContain("pattern SIMILAR TO $1");
        });

        test("notSimilarTo", () => {
            const q = sqlBuilder(db);
            const sql = q.c("pattern").notSimilarTo().l("%(a|b)%").getSql();
            expect(sql).toContain("pattern NOT SIMILAR TO $1");
        });
    });

    describe("Logical Operators", () => {
        test("exclamation", () => {
            const q = sqlBuilder(db);
            const sql = q.c("active").exclamation().getSql();
            expect(sql).toContain("active !");
        });

        test("is", () => {
            const q = sqlBuilder(db);
            const sql = q.c("deleted_at").is().l(null).getSql();
            expect(sql).toContain("deleted_at IS $1");
        });

        test("isNot", () => {
            const q = sqlBuilder(db);
            const sql = q.c("deleted_at").isNot().l(null).getSql();
            expect(sql).toContain("deleted_at IS NOT $1");
        });
    });

    describe("Arithmetic Operators (no suffix)", () => {
        test("plus", () => {
            const q = sqlBuilder(db);
            const sql = q.c("price").plus().c("tax").getSql();
            expect(sql).toContain("price + tax");
        });

        test("minus", () => {
            const q = sqlBuilder(db);
            const sql = q.c("price").minus().c("discount").getSql();
            expect(sql).toContain("price - discount");
        });

        test("multiply (no suffix)", () => {
            const q = sqlBuilder(db);
            const sql = q.c("quantity").multiply().l(2).getSql();
            expect(sql).toContain("quantity * $1");
        });

        test("divide", () => {
            const q = sqlBuilder(db);
            const sql = q.c("total").divide().c("count").getSql();
            expect(sql).toContain("total / count");
        });

        test("modulo", () => {
            const q = sqlBuilder(db);
            const sql = q.c("number").modulo().l(10).getSql();
            expect(sql).toContain("number % $1");
        });

        test("textCat", () => {
            const q = sqlBuilder(db);
            const sql = q.c("first_name").textCat().c("last_name").getSql();
            expect(sql).toContain("first_name || last_name");
        });
    });

    describe("Bitwise Operators", () => {
        test("bitwiseAnd", () => {
            const q = sqlBuilder(db);
            const sql = q.c("flags1").bitwiseAnd().c("flags2").getSql();
            expect(sql).toContain("flags1 & flags2");
        });

        test("bitwiseOr", () => {
            const q = sqlBuilder(db);
            const sql = q.c("flags1").bitwiseOr().c("flags2").getSql();
            expect(sql).toContain("flags1 | flags2");
        });

        test("bitwiseXor", () => {
            const q = sqlBuilder(db);
            const sql = q.c("flags1").bitwiseXor().c("flags2").getSql();
            expect(sql).toContain("flags1 ^ flags2");
        });

        test("bitwiseLeftShift", () => {
            const q = sqlBuilder(db);
            const sql = q.c("value").bitwiseLeftShift().l(2).getSql();
            expect(sql).toContain("value << $1");
        });

        test("bitwiseRightShift", () => {
            const q = sqlBuilder(db);
            const sql = q.c("value").bitwiseRightShift().l(2).getSql();
            expect(sql).toContain("value >> $1");
        });

        test("bitwiseLeftShiftAssign", () => {
            const q = sqlBuilder(db);
            const sql = q.c("value").bitwiseLeftShiftAssign().l(2).getSql();
            expect(sql).toContain("value <<= $1");
        });

        test("bitwiseRightShiftAssign", () => {
            const q = sqlBuilder(db);
            const sql = q.c("value").bitwiseRightShiftAssign().l(2).getSql();
            expect(sql).toContain("value >>= $1");
        });
    });

    describe("PostgreSQL-Specific Operators", () => {
        test("atSign", () => {
            const q = sqlBuilder(db);
            const sql = q.c("point1").atSign().c("point2").getSql();
            expect(sql).toContain("point1 @ point2");
        });

        test("hash", () => {
            const q = sqlBuilder(db);
            const sql = q.c("value").hash().l(5).getSql();
            expect(sql).toContain("value # $1");
        });

        test("caretAt", () => {
            const q = sqlBuilder(db);
            const sql = q.c("point1").caretAt().c("point2").getSql();
            expect(sql).toContain("point1 ^@ point2");
        });
    });

    describe("Geometric Operators", () => {
        test("totalLength", () => {
            const q = sqlBuilder(db);
            const sql = q.c("path").totalLength().getSql();
            expect(sql).toContain("path @-@");
        });

        test("middle", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box").middle().getSql();
            expect(sql).toContain("box @@");
        });

        test("closestPoint", () => {
            const q = sqlBuilder(db);
            const sql = q.c("line1").closestPoint().c("line2").getSql();
            expect(sql).toContain("line1 ## line2");
        });

        test("distance (no suffix)", () => {
            const q = sqlBuilder(db);
            const sql = q.c("point1").distance().c("point2").getSql();
            expect(sql).toContain("point1 <-> point2");
        });

        test("containment (no suffix)", () => {
            const q = sqlBuilder(db);
            const sql = q.c("circle").containment().c("point").getSql();
            expect(sql).toContain("circle @> point");
        });

        test("containedBy", () => {
            const q = sqlBuilder(db);
            const sql = q.c("point").containedBy().c("circle").getSql();
            expect(sql).toContain("point <@ circle");
        });

        test("notExtendRight", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box1").notExtendRight().c("box2").getSql();
            expect(sql).toContain("box1 &< box2");
        });

        test("notExtendLeft", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box1").notExtendLeft().c("box2").getSql();
            expect(sql).toContain("box1 &> box2");
        });

        test("strictlyBelow", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box1").strictlyBelow().c("box2").getSql();
            expect(sql).toContain("box1 <<| box2");
        });

        test("strictlyAbove", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box1").strictlyAbove().c("box2").getSql();
            expect(sql).toContain("box1 |>> box2");
        });

        test("notExtendAbove", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box1").notExtendAbove().c("box2").getSql();
            expect(sql).toContain("box1 &<| box2");
        });

        test("notExtendBelow", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box1").notExtendBelow().c("box2").getSql();
            expect(sql).toContain("box1 |&> box2");
        });

        test("below", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box1").below().c("box2").getSql();
            expect(sql).toContain("box1 <^ box2");
        });

        test("above", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box1").above().c("box2").getSql();
            expect(sql).toContain("box1 >^ box2");
        });

        test("crosses (no suffix)", () => {
            const q = sqlBuilder(db);
            const sql = q.c("path1").crosses().c("path2").getSql();
            expect(sql).toContain("path1 ?# path2");
        });

        test("horizontal", () => {
            const q = sqlBuilder(db);
            const sql = q.c("line1").horizontal().c("line2").getSql();
            expect(sql).toContain("line1 ?- line2");
        });

        test("vertical", () => {
            const q = sqlBuilder(db);
            const sql = q.c("line1").vertical().c("line2").getSql();
            expect(sql).toContain("line1 ?| line2");
        });

        test("perpendicular", () => {
            const q = sqlBuilder(db);
            const sql = q.c("line1").perpendicular().c("line2").getSql();
            expect(sql).toContain("line1 ?-| line2");
        });

        test("isParallel (no suffix)", () => {
            const q = sqlBuilder(db);
            const sql = q.c("line1").isParallel().c("line2").getSql();
            expect(sql).toContain("line1 ?|| line2");
        });

        test("sameAs", () => {
            const q = sqlBuilder(db);
            const sql = q.c("box1").sameAs().c("box2").getSql();
            expect(sql).toContain("box1 ~= box2");
        });
    });

    describe("Complex Query Examples", () => {
        test("Combined operators in WHERE clause", () => {
            const q = sqlBuilder(db);
            const sql = q
                .select()
                .c("name")
                .from()
                .i("users")
                .where()
                .sub(
                    q.sub()
                        .c("age")
                        .gte()
                        .l(18)
                        .and()
                        .c("status")
                        .eq()
                        .l("active")
                )
                .getSql();
            expect(sql).toContain("age >=");
            expect(sql).toContain("$1");
            expect(sql).toContain("status =");
            expect(sql).toContain("$2");
        });

        test("Pattern matching with OR", () => {
            const q = sqlBuilder(db);
            const sql = q
                .select()
                .c("email")
                .from()
                .i("users")
                .where()
                .sub(
                    q.sub()
                        .c("email")
                        .like()
                        .l("%@gmail.com")
                        .or()
                        .c("email")
                        .like()
                        .l("%@yahoo.com")
                )
                .getSql();
            expect(sql).toContain("email LIKE");
            expect(sql).toContain("OR");
        });
    });
});
