import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("math functions", () => {
    it("builds abs", () => {
        const builder = q.select(q.abs(-17.4));
        expectQuery(builder, "math", "abs");
    });

    it("builds log with base", () => {
        const builder = q.select(q.log(2, 64));
        expectQuery(builder, "math", "log with base");
    });

    it("builds round with scale", () => {
        const builder = q.select(q.round(42.4382, 2));
        expectQuery(builder, "math", "round with scale");
    });

    it("builds width_bucket", () => {
        const builder = q.select(q.widthBucket(5.35, 0.024, 10.06, 5));
        expectQuery(builder, "math", "width_bucket");
    });

    it("builds random_normal", () => {
        const builder = q.select(q.randomNormal(0, 1));
        expectQuery(builder, "math", "random_normal");
    });

    it("builds pi", () => {
        const builder = q.select(q.pi());
        expectQuery(builder, "math", "pi");
    });

    it("builds atan2d", () => {
        const builder = q.select(q.atan2d(1, 0));
        expectQuery(builder, "math", "atan2d");
    });
});
