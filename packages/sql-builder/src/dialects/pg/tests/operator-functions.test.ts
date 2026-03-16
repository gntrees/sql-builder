import { describe, test } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => []);

describe("Operator Functions", () => {
    describe("Operator Functions with Optional Parameters", () => {
        describe("plus() - three patterns", () => {
            test("Pattern 1: v(2).plus().v(2) -> $1 + $2", () => {
                const builder = q.v(2).plus().v(2);
                expectQuery(builder, "operators", "Pattern 1: v(2).plus().v(2) -> $1 + $2");
            });

            test("Pattern 2: v(2).plus(2) -> $1 + $2", () => {
                const builder = q.v(2).plus(2);
                expectQuery(builder, "operators", "Pattern 2: v(2).plus(2) -> $1 + $2");
            });

            test("Pattern 3: plus(2, 2) -> $1 + $2", () => {
                const builder = q.plus(2, 2);
                expectQuery(builder, "operators", "Pattern 3: plus(2, 2) -> $1 + $2");
            });
        });

        describe("minus() - three patterns", () => {
            test("Pattern 1: v(10).minus().v(3) -> $1 - $2", () => {
                const builder = q.v(10).minus().v(3);
                expectQuery(builder, "operators", "Pattern 1: v(10).minus().v(3) -> $1 - $2");
            });

            test("Pattern 2: v(10).minus(3) -> $1 - $2", () => {
                const builder = q.v(10).minus(3);
                expectQuery(builder, "operators", "Pattern 2: v(10).minus(3) -> $1 - $2");
            });

            test("Pattern 3: minus(10, 3) -> $1 - $2", () => {
                const builder = q.minus(10, 3);
                expectQuery(builder, "operators", "Pattern 3: minus(10, 3) -> $1 - $2");
            });
        });

        describe("textCat() - three patterns", () => {
            test("Pattern 1: v('Hello').textCat().v('World') -> $1 || $2", () => {
                const builder = q.v("Hello").textCat().v("World");
                expectQuery(builder, "operators", "Pattern 1: v('Hello').textCat().v('World') -> $1 || $2");
            });

            test("Pattern 2: v('Hello').textCat('World') -> $1 || $2", () => {
                const builder = q.v("Hello").textCat("World");
                expectQuery(builder, "operators", "Pattern 2: v('Hello').textCat('World') -> $1 || $2");
            });

            test("Pattern 3: textCat('Hello', 'World') -> $1 || $2", () => {
                const builder = q.textCat("Hello", "World");
                expectQuery(builder, "operators", "Pattern 3: textCat('Hello', 'World') -> $1 || $2");
            });
        });

        describe("matchRegex() - three patterns", () => {
            test("Pattern 1: v('email').matchRegex().v('^[a-z]+@') -> $1 ~ $2", () => {
                const builder = q.v("email").matchRegex().v("^[a-z]+@");
                expectQuery(builder, "operators", "Pattern 1: v('email').matchRegex().v('^[a-z]+@') -> $1 ~ $2");
            });

            test("Pattern 2: v('email').matchRegex('^[a-z]+@') -> $1 ~ $2", () => {
                const builder = q.v("email").matchRegex("^[a-z]+@");
                expectQuery(builder, "operators", "Pattern 2: v('email').matchRegex('^[a-z]+@') -> $1 ~ $2");
            });

            test("Pattern 3: matchRegex('email', '^[a-z]+@') -> $1 ~ $2", () => {
                const builder = q.matchRegex("email", "^[a-z]+@");
                expectQuery(builder, "operators", "Pattern 3: matchRegex('email', '^[a-z]+@') -> $1 ~ $2");
            });
        });

        describe("crosses() - three patterns", () => {
            test("Pattern 1: v('path1').crosses().v('path2') -> $1 ?# $2", () => {
                const builder = q.v("path1").crosses().v("path2");
                expectQuery(builder, "operators", "Pattern 1: v('path1').crosses().v('path2') -> $1 ?# $2");
            });

            test("Pattern 2: v('path1').crosses('path2') -> $1 ?# $2", () => {
                const builder = q.v("path1").crosses("path2");
                expectQuery(builder, "operators", "Pattern 2: v('path1').crosses('path2') -> $1 ?# $2");
            });

            test("Pattern 3: crosses('path1', 'path2') -> $1 ?# $2", () => {
                const builder = q.crosses("path1", "path2");
                expectQuery(builder, "operators", "Pattern 3: crosses('path1', 'path2') -> $1 ?# $2");
            });
        });

        describe("isParallel() - three patterns", () => {
            test("Pattern 1: v('line1').isParallel().v('line2') -> $1 ?|| $2", () => {
                const builder = q.v("line1").isParallel().v("line2");
                expectQuery(builder, "operators", "Pattern 1: v('line1').isParallel().v('line2') -> $1 ?|| $2");
            });

            test("Pattern 2: v('line1').isParallel('line2') -> $1 ?|| $2", () => {
                const builder = q.v("line1").isParallel("line2");
                expectQuery(builder, "operators", "Pattern 2: v('line1').isParallel('line2') -> $1 ?|| $2");
            });

            test("Pattern 3: isParallel('line1', 'line2') -> $1 ?|| $2", () => {
                const builder = q.isParallel("line1", "line2");
                expectQuery(builder, "operators", "Pattern 3: isParallel('line1', 'line2') -> $1 ?|| $2");
            });
        });

        describe("op() direct usage", () => {
            test("op(2, '+', 2) -> $1 + $2", () => {
                const builder = q.op(2, "+", 2);
                expectQuery(builder, "operators", "op(2, '+', 2) -> $1 + $2");
            });

            test("op(10, '-', 3) -> $1 - $2", () => {
                const builder = q.op(10, "-", 3);
                expectQuery(builder, "operators", "op(10, '-', 3) -> $1 - $2");
            });

            test("op('Hello', '||', 'World') -> $1 || $2", () => {
                const builder = q.op("Hello", "||", "World");
                expectQuery(builder, "operators", "op('Hello', '||', 'World') -> $1 || $2");
            });

            test("op('email', '~', '^[a-z]+@') -> $1 ~ $2", () => {
                const builder = q.op("email", "~", "^[a-z]+@");
                expectQuery(builder, "operators", "op('email', '~', '^[a-z]+@') -> $1 ~ $2");
            });
        });
    });

    describe("Comparison Operators (no suffix)", () => {
        test("eq", () => {
                const builder = q.select().c("id").eq().l(1);
            expectQuery(builder, "operators", "eq");
        });

        test("ne", () => {
                const builder = q.select().c("status").ne().l("active");
            expectQuery(builder, "operators", "ne");
        });

        test("notEq", () => {
                const builder = q.select().c("status").notEq().l("active");
            expectQuery(builder, "operators", "notEq");
        });

        test("gt", () => {
                const builder = q.select().c("age").gt().l(18);
            expectQuery(builder, "operators", "gt");
        });

        test("lt", () => {
                const builder = q.select().c("age").lt().l(65);
            expectQuery(builder, "operators", "lt");
        });

        test("lte", () => {
                const builder = q.select().c("age").lte().l(100);
            expectQuery(builder, "operators", "lte");
        });

        test("gte", () => {
                const builder = q.select().c("age").gte().l(0);
            expectQuery(builder, "operators", "gte");
        });
    });

    describe("Pattern Matching Operators", () => {
        test("like (override, no suffix)", () => {
                const builder = q.select().c("name").like().l("%test%");
            expectQuery(builder, "operators", "like (override, no suffix)");
        });

        test("notLike", () => {
                const builder = q.c("name").notLike().l("%test%");
            expectQuery(builder, "operators", "notLike");
        });

        test("ilike (override, no suffix)", () => {
                const builder = q.c("name").ilike().l("%test%");
            expectQuery(builder, "operators", "ilike (override, no suffix)");
        });

        test("notIlike", () => {
                const builder = q.c("name").notIlike().l("%test%");
            expectQuery(builder, "operators", "notIlike");
        });

        test("matchRegex (no suffix)", () => {
                const builder = q.c("email").matchRegex().l("^[a-z]+@");
            expectQuery(builder, "operators", "matchRegex (no suffix)");
        });

        test("matchRegexInsensitive", () => {
                const builder = q.c("email").matchRegexInsensitive().l("^[A-Z]+@");
            expectQuery(builder, "operators", "matchRegexInsensitive");
        });

        test("notMatchRegex", () => {
                const builder = q.c("email").notMatchRegex().l("^[0-9]+");
            expectQuery(builder, "operators", "notMatchRegex");
        });

        test("notMatchRegexInsensitive", () => {
                const builder = q.c("email").notMatchRegexInsensitive().l("^[0-9]+");
            expectQuery(builder, "operators", "notMatchRegexInsensitive");
        });

        test("similarTo (no suffix)", () => {
                const builder = q.c("pattern").similarTo().l("%(a|b)%");
            expectQuery(builder, "operators", "similarTo (no suffix)");
        });

        test("notSimilarTo", () => {
                const builder = q.c("pattern").notSimilarTo().l("%(a|b)%");
            expectQuery(builder, "operators", "notSimilarTo");
        });
    });

    describe("Logical Operators", () => {
        test("exclamation", () => {
                const builder = q.c("active").exclamation();
            expectQuery(builder, "operators", "exclamation");
        });

        test("is", () => {
                const builder = q.c("deleted_at").is().l(null);
            expectQuery(builder, "operators", "is");
        });

        test("isNot", () => {
                const builder = q.c("deleted_at").isNot().l(null);
            expectQuery(builder, "operators", "isNot");
        });
    });

    describe("Arithmetic Operators (no suffix)", () => {
        test("plus", () => {
                const builder = q.c("price").plus().c("tax");
            expectQuery(builder, "operators", "plus");
        });

        test("minus", () => {
                const builder = q.c("price").minus().c("discount");
            expectQuery(builder, "operators", "minus");
        });

        test("multiply (no suffix)", () => {
                const builder = q.c("quantity").multiply().l(2);
            expectQuery(builder, "operators", "multiply (no suffix)");
        });

        test("divide", () => {
                const builder = q.c("total").divide().c("count");
            expectQuery(builder, "operators", "divide");
        });

        test("modulo", () => {
                const builder = q.c("number").modulo().l(10);
            expectQuery(builder, "operators", "modulo");
        });

        test("textCat", () => {
                const builder = q.c("first_name").textCat().c("last_name");
            expectQuery(builder, "operators", "textCat");
        });
    });

    describe("Bitwise Operators", () => {
        test("bitwiseAnd", () => {
                const builder = q.c("flags1").bitwiseAnd().c("flags2");
            expectQuery(builder, "operators", "bitwiseAnd");
        });

        test("bitwiseOr", () => {
                const builder = q.c("flags1").bitwiseOr().c("flags2");
            expectQuery(builder, "operators", "bitwiseOr");
        });

        test("bitwiseXor", () => {
                const builder = q.c("flags1").bitwiseXor().c("flags2");
            expectQuery(builder, "operators", "bitwiseXor");
        });

        test("bitwiseLeftShift", () => {
                const builder = q.c("value").bitwiseLeftShift().l(2);
            expectQuery(builder, "operators", "bitwiseLeftShift");
        });

        test("bitwiseRightShift", () => {
                const builder = q.c("value").bitwiseRightShift().l(2);
            expectQuery(builder, "operators", "bitwiseRightShift");
        });

        test("bitwiseLeftShiftAssign", () => {
                const builder = q.c("value").bitwiseLeftShiftAssign().l(2);
            expectQuery(builder, "operators", "bitwiseLeftShiftAssign");
        });

        test("bitwiseRightShiftAssign", () => {
                const builder = q.c("value").bitwiseRightShiftAssign().l(2);
            expectQuery(builder, "operators", "bitwiseRightShiftAssign");
        });
    });

    describe("PostgreSQL-Specific Operators", () => {
        test("atSign", () => {
                const builder = q.c("point1").atSign().c("point2");
            expectQuery(builder, "operators", "atSign");
        });

        test("hash", () => {
                const builder = q.c("value").hash().l(5);
            expectQuery(builder, "operators", "hash");
        });

        test("caretAt", () => {
                const builder = q.c("point1").caretAt().c("point2");
            expectQuery(builder, "operators", "caretAt");
        });
    });

    describe("Geometric Operators", () => {
        test("totalLength", () => {
                const builder = q.c("path").totalLength();
            expectQuery(builder, "operators", "totalLength");
        });

        test("middle", () => {
                const builder = q.c("box").middle();
            expectQuery(builder, "operators", "middle");
        });

        test("closestPoint", () => {
                const builder = q.c("line1").closestPoint().c("line2");
            expectQuery(builder, "operators", "closestPoint");
        });

        test("distance (no suffix)", () => {
                const builder = q.c("point1").distance().c("point2");
            expectQuery(builder, "operators", "distance (no suffix)");
        });

        test("containment (no suffix)", () => {
                const builder = q.c("circle").containment().c("point");
            expectQuery(builder, "operators", "containment (no suffix)");
        });

        test("containedBy", () => {
                const builder = q.c("point").containedBy().c("circle");
            expectQuery(builder, "operators", "containedBy");
        });

        test("notExtendRight", () => {
                const builder = q.c("box1").notExtendRight().c("box2");
            expectQuery(builder, "operators", "notExtendRight");
        });

        test("notExtendLeft", () => {
                const builder = q.c("box1").notExtendLeft().c("box2");
            expectQuery(builder, "operators", "notExtendLeft");
        });

        test("strictlyBelow", () => {
                const builder = q.c("box1").strictlyBelow().c("box2");
            expectQuery(builder, "operators", "strictlyBelow");
        });

        test("strictlyAbove", () => {
                const builder = q.c("box1").strictlyAbove().c("box2");
            expectQuery(builder, "operators", "strictlyAbove");
        });

        test("notExtendAbove", () => {
                const builder = q.c("box1").notExtendAbove().c("box2");
            expectQuery(builder, "operators", "notExtendAbove");
        });

        test("notExtendBelow", () => {
                const builder = q.c("box1").notExtendBelow().c("box2");
            expectQuery(builder, "operators", "notExtendBelow");
        });

        test("below", () => {
                const builder = q.c("box1").below().c("box2");
            expectQuery(builder, "operators", "below");
        });

        test("above", () => {
                const builder = q.c("box1").above().c("box2");
            expectQuery(builder, "operators", "above");
        });

        test("crosses (no suffix)", () => {
                const builder = q.c("path1").crosses().c("path2");
            expectQuery(builder, "operators", "crosses (no suffix)");
        });

        test("horizontal", () => {
                const builder = q.c("line1").horizontal().c("line2");
            expectQuery(builder, "operators", "horizontal");
        });

        test("vertical", () => {
                const builder = q.c("line1").vertical().c("line2");
            expectQuery(builder, "operators", "vertical");
        });

        test("perpendicular", () => {
                const builder = q.c("line1").perpendicular().c("line2");
            expectQuery(builder, "operators", "perpendicular");
        });

        test("isParallel (no suffix)", () => {
                const builder = q.c("line1").isParallel().c("line2");
            expectQuery(builder, "operators", "isParallel (no suffix)");
        });

        test("sameAs", () => {
                const builder = q.c("box1").sameAs().c("box2");
            expectQuery(builder, "operators", "sameAs");
        });
    });

    describe("Between Operators", () => {
        test("between", () => {
                const builder = q.c("age").between(18, 65);
            expectQuery(builder, "operators", "between");
        });

        test("notBetween", () => {
                const builder = q.c("age").notBetween(18, 65);
            expectQuery(builder, "operators", "notBetween");
        });

        test("betweenSymmetric", () => {
                const builder = q.c("age").betweenSymmetric(18, 65);
            expectQuery(builder, "operators", "betweenSymmetric");
        });

        test("notBetweenSymmetric", () => {
                const builder = q.c("age").notBetweenSymmetric(18, 65);
            expectQuery(builder, "operators", "notBetweenSymmetric");
        });
    });

    describe("Complex Query Examples", () => {
        test("Combined operators in WHERE clause", () => {
                const builder = q
                .select(q.c("name"))
                .from(q.t("users"))
                .where(q.c("age")
                    .gte(18)
                    .and()
                    .c("status")
                    .eq(q.l("active"))
                );
            expectQuery(builder, "operators", "Combined operators in WHERE clause");
        });

        test("Pattern matching with OR", () => {
                const builder = q
                .select()
                .c("email")
                .from()
                .i("users")
                .where(q.c("email")
                    .like()
                    .l("%@gmail.com")
                    .or()
                    .c("email")
                    .like()
                    .l("%@yahoo.com"));
            expectQuery(builder, "operators", "Pattern matching with OR");
        });
    });
});
