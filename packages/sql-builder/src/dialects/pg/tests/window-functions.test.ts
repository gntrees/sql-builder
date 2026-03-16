import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("Window Functions", () => {
    it("rowNumber", () => {
        const builder = q.select(q.rowNumber());
        expectQuery(builder, "window", "rowNumber");
    });

    it("ntile with parameter", () => {
        const builder = q.select(q.ntile(q.v(4)));
        expectQuery(builder, "window", "ntile with parameter");
    });

    it("lag with value only", () => {
        const builder = q.select(q.lag(q.c("salary")));
        expectQuery(builder, "window", "lag with value only");
    });

    it("lag with offset", () => {
        const builder = q.select(q.lag(q.c("salary"), q.v(1)));
        expectQuery(builder, "window", "lag with offset");
    });

    it("lag with offset and default", () => {
        const builder = q.select(q.lag(q.c("salary"), q.v(1), q.v(0)));
        expectQuery(builder, "window", "lag with offset and default");
    });

    it("lead with value only", () => {
        const builder = q.select(q.lead(q.c("salary")));
        expectQuery(builder, "window", "lead with value only");
    });

    it("lead with offset and default", () => {
        const builder = q.select(q.lead(q.c("salary"), q.v(1), q.v(0)));
        expectQuery(builder, "window", "lead with offset and default");
    });

    it("firstValue", () => {
        const builder = q.select(q.firstValue(q.c("salary")));
        expectQuery(builder, "window", "firstValue");
    });

    it("lastValue", () => {
        const builder = q.select(q.lastValue(q.c("salary")));
        expectQuery(builder, "window", "lastValue");
    });

    it("nthValue", () => {
        const builder = q.select(q.nthValue(q.c("salary"), q.v(2)));
        expectQuery(builder, "window", "nthValue");
    });

    it("over empty", () => {
        const builder = q.select(q.rowNumber().over());
        expectQuery(builder, "window", "over empty");
    });

    it("over with partition by", () => {
        const windowSpec = q.partitionBy(q.column("department_id"));
        const builder = q.select(q.rowNumber().over(windowSpec));
        expectQuery(builder, "window", "over with partition by");
    });

    it("over with partition by and order by", () => {
        const partitionSpec = q.partitionBy(q.column("department_id"));
        const orderSpec = q.orderBy(q.column("salary")).desc();
        const builder = q.select(q.rowNumber().over(partitionSpec, orderSpec));
        expectQuery(builder, "window", "over with partition by and order by");
    });

    it("over with order by only", () => {
        const builder = q.select(q.rowNumber().over(q.orderBy(q.column("salary")).desc()));
        expectQuery(builder, "window", "over with order by only");
    });
});
