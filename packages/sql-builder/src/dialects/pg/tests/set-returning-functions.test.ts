import { describe, test, expect } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("Set-Returning Functions", () => {
    describe("generate_series", () => {
        test("generate_series(start, stop) - basic integer series", () => {
            const builder = q.select(q.generateSeries(q.l(1), q.l(10)));
            expectQuery(builder, "setReturning", "generate_series(start, stop)");
        });

        test("generate_series(start, stop, step) - with step", () => {
            const builder = q.select(q.generateSeries(q.l(1), q.l(10), q.l(2)));
            expectQuery(builder, "setReturning", "generate_series(start, stop, step)");
        });

        test("generate_series with numeric values", () => {
            const builder = q.select(q.generateSeries(q.l(1.5), q.l(10.5), q.l(0.5)));
            expectQuery(builder, "setReturning", "generate_series with numeric values");
        });

        test("generate_series with timestamp values using raw", () => {
            const builder = q.select(q.generateSeries(q.r`CAST('2008-03-01 00:00:00' AS timestamp)`, q.r`CAST('2008-03-04 12:00:00' AS timestamp)`, q.r`CAST('10 hours' AS interval)`));
            expectQuery(builder, "setReturning", "generate_series with timestamp values using raw");
        });

        test("generate_series with identifier reference", () => {
            const builder = q.select(q.generateSeries(q.i("start_val"), q.i("end_val"), q.i("step_val")));
            expectQuery(builder, "setReturning", "generate_series with identifier reference");
        });
    });

    describe("generate_subscripts", () => {
        test("generate_subscripts(array, dim) - basic", () => {
            const builder = q.select(q.generateSubscripts(q.i("arr"), q.l(1)));
            expectQuery(builder, "setReturning", "generate_subscripts(array, dim)");
        });

        test("generate_subscripts(array, dim, reverse) - with reverse", () => {
            const builder = q.select(q.generateSubscripts(q.i("arr"), q.l(1), q.l(true)));
            expectQuery(builder, "setReturning", "generate_subscripts(array, dim, reverse)");
        });

        test("generate_subscripts with 2D array", () => {
            const builder = q.select(q.generateSubscripts(q.i("matrix"), q.l(2)));
            expectQuery(builder, "setReturning", "generate_subscripts with 2D array");
        });

        test("generate_subscripts with reverse for second dimension", () => {
            const builder = q.select(q.generateSubscripts(q.i("matrix"), q.l(2), q.l(true)));
            expectQuery(builder, "setReturning", "generate_subscripts with reverse for second dimension");
        });
    });

    describe("combined queries with SRF", () => {
        test("generate_series in FROM clause", () => {
            const builder = q.select("*").from(q.generateSeries(q.l(1), q.l(5)).as(q.c("n")));
            expectQuery(builder, "setReturning", "generate_series in FROM clause");
        });

        test("generate_series with alias in SELECT", () => {
            const builder = q.select(q.generateSeries(q.l(1), q.l(3)).as(q.c("series")));
            expectQuery(builder, "setReturning", "generate_series with alias in SELECT");
        });

        test("multiple SRF in same query", () => {
            const builder = q.select(
                q.generateSeries(q.l(1), q.l(3)).as(q.c("series")),
                q.generateSubscripts(q.i("arr"), q.l(1)).as(q.c("subscripts"))
            );
            expectQuery(builder, "setReturning", "multiple SRF in same query");
        });
    });
});
