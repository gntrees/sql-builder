import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("date time functions", () => {
    it("builds now", () => {
        const builder = q.select(q.now());
        expectQuery(builder, "datetime", "now");
    });

    it("builds age", () => {
        const builder = q.select(q.age(q.l("2024-01-01"), q.l("2023-01-01")));
        expectQuery(builder, "datetime", "age");
    });

    it("builds date_trunc", () => {
        const builder = q.select(q.dateTrunc("hour", q.l("2024-01-01 08:15:30")));
        expectQuery(builder, "datetime", "date_trunc");
    });

    it("builds extract", () => {
        const builder = q.select(q.extract(q.r`YEAR FROM ${"2024-01-01"}`));
        expectQuery(builder, "datetime", "extract");
    });

    it("builds to_char", () => {
        const builder = q.select(q.toChar(q.l("2024-01-01"), "YYYY-MM-DD"));
        expectQuery(builder, "datetime", "to_char");
    });

    it("builds make_timestamp", () => {
        const builder = q.select(q.makeTimestamp(2024, 1, 2, 12, 30, 15));
        expectQuery(builder, "datetime", "make_timestamp");
    });

    it("builds date_bin", () => {
        const builder = q.select(q.dateBin(q.l("15 minutes"), q.l("2020-02-11 15:44:17"), q.l("2001-01-01")));
        expectQuery(builder, "datetime", "date_bin");
    });

    it("builds date_add", () => {
        const builder = q.select(q.dateAdd(q.l("2021-10-31 00:00:00+02"), q.l("1 day"), q.l("Europe/Warsaw")));
        expectQuery(builder, "datetime", "date_add");
    });

    it("builds date_subtract", () => {
        const builder = q.select(q.dateSubtract(q.l("2021-11-01 00:00:00+01"), q.l("1 day"), q.l("Europe/Warsaw")));
        expectQuery(builder, "datetime", "date_subtract");
    });

    it("builds make_interval", () => {
        const builder = q.select(q.makeInterval(1, 2, 3, 4, 5, 6, 7.5));
        expectQuery(builder, "datetime", "make_interval");
    });

    it("builds pg_sleep", () => {
        const builder = q.select(q.pgSleep(1.5));
        expectQuery(builder, "datetime", "pg_sleep");
    });

    it("builds pg_sleep_for", () => {
        const builder = q.select(q.pgSleepFor("5 minutes"));
        expectQuery(builder, "datetime", "pg_sleep_for");
    });

    it("builds pg_sleep_until", () => {
        const builder = q.select(q.pgSleepUntil(q.l("2024-01-02 03:00:00+00")));
        expectQuery(builder, "datetime", "pg_sleep_until");
    });

    it("builds current_time with precision", () => {
        const builder = q.select(q.currentTime(2));
        expectQuery(builder, "datetime", "current_time with precision");
    });

    it("builds current_timestamp with precision", () => {
        const builder = q.select(q.currentTimestamp(0));
        expectQuery(builder, "datetime", "current_timestamp with precision");
    });

    it("builds localtime with precision", () => {
        const builder = q.select(q.localtime(0));
        expectQuery(builder, "datetime", "localtime with precision");
    });

    it("builds localtimestamp with precision", () => {
        const builder = q.select(q.localtimestamp(2));
        expectQuery(builder, "datetime", "localtimestamp with precision");
    });
});
