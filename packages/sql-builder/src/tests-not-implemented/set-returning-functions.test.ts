import { describe, test, expect } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("Set-Returning Functions", () => {
    describe("generate_series", () => {
        test("generate_series(start, stop) - basic integer series", () => {
            const builder = q.select(q.generateSeries(q.l(1), q.l(10)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SERIES($1, $2)");
            expect(parameters).toEqual([1, 10]);
        });

        test("generate_series(start, stop, step) - with step", () => {
            const builder = q.select(q.generateSeries(q.l(1), q.l(10), q.l(2)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SERIES($1, $2, $3)");
            expect(parameters).toEqual([1, 10, 2]);
        });

        test("generate_series with numeric values", () => {
            const builder = q.select(q.generateSeries(q.l(1.5), q.l(10.5), q.l(0.5)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SERIES($1, $2, $3)");
            expect(parameters).toEqual([1.5, 10.5, 0.5]);
        });

        test("generate_series with timestamp values using raw", () => {
            const builder = q.select(q.generateSeries(q.r`CAST('2008-03-01 00:00:00' AS timestamp)`, q.r`CAST('2008-03-04 12:00:00' AS timestamp)`, q.r`CAST('10 hours' AS interval)`));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SERIES(CAST('2008-03-01 00:00:00' AS timestamp), CAST('2008-03-04 12:00:00' AS timestamp), CAST('10 hours' AS interval))");
            expect(parameters).toEqual([]);
        });

        test("generate_series with identifier reference", () => {
            const builder = q.select(q.generateSeries(q.i("start_val"), q.i("end_val"), q.i("step_val")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SERIES(start_val, end_val, step_val)");
            expect(parameters).toEqual([]);
        });
    });

    describe("generate_subscripts", () => {
        test("generate_subscripts(array, dim) - basic", () => {
            const builder = q.select(q.generateSubscripts(q.i("arr"), q.l(1)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SUBSCRIPTS(arr, $1)");
            expect(parameters).toEqual([1]);
        });

        test("generate_subscripts(array, dim, reverse) - with reverse", () => {
            const builder = q.select(q.generateSubscripts(q.i("arr"), q.l(1), q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SUBSCRIPTS(arr, $1, $2)");
            expect(parameters).toEqual([1, true]);
        });

        test("generate_subscripts with 2D array", () => {
            const builder = q.select(q.generateSubscripts(q.i("matrix"), q.l(2)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SUBSCRIPTS(matrix, $1)");
            expect(parameters).toEqual([2]);
        });

        test("generate_subscripts with reverse for second dimension", () => {
            const builder = q.select(q.generateSubscripts(q.i("matrix"), q.l(2), q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SUBSCRIPTS(matrix, $1, $2)");
            expect(parameters).toEqual([2, true]);
        });
    });

    describe("combined queries with SRF", () => {
        test("generate_series in FROM clause", () => {
            const builder = q.select("*").from(q.generateSeries(q.l(1), q.l(5)).as("n"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM GENERATE_SERIES($1, $2) AS n");
            expect(parameters).toEqual([1, 5]);
        });

        test("generate_series with alias in SELECT", () => {
            const builder = q.select(q.generateSeries(q.l(1), q.l(3)).as("series"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SERIES($1, $2) AS series");
            expect(parameters).toEqual([1, 3]);
        });

        test("multiple SRF in same query", () => {
            const builder = q.select(
                q.generateSeries(q.l(1), q.l(3)).as("series"),
                q.generateSubscripts(q.i("arr"), q.l(1)).as("subscripts")
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GENERATE_SERIES($1, $2) AS series, GENERATE_SUBSCRIPTS(arr, $3) AS subscripts");
            expect(parameters).toEqual([1, 3, 1]);
        });
    });
});
