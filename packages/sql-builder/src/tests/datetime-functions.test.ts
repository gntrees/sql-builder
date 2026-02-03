import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("date time functions", () => {
    it("builds now", () => {
        const builder = q.select(q.now());
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT NOW()");
        expect(parameters).toEqual([]);
    });

    it("builds age", () => {
        const builder = q.select(q.age(q.l("2024-01-01"), q.l("2023-01-01")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT AGE($1, $2)");
        expect(parameters).toEqual(["2024-01-01", "2023-01-01"]);
    });

    it("builds date_trunc", () => {
        const builder = q.select(q.dateTrunc("hour", q.l("2024-01-01 08:15:30")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT DATE_TRUNC($1, $2)");
        expect(parameters).toEqual(["hour", "2024-01-01 08:15:30"]);
    });

    it("builds extract", () => {
        const builder = q.select(q.extract("year", q.l("2024-01-01")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT EXTRACT (YEAR FROM $1)");
        expect(parameters).toEqual(["2024-01-01"]);
    });

    it("builds to_char", () => {
        const builder = q.select(q.toChar(q.l("2024-01-01"), "YYYY-MM-DD"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT TO_CHAR($1, $2)");
        expect(parameters).toEqual(["2024-01-01", "YYYY-MM-DD"]);
    });

    it("builds make_timestamp", () => {
        const builder = q.select(q.makeTimestamp(2024, 1, 2, 12, 30, 15));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT MAKE_TIMESTAMP($1, $2, $3, $4, $5, $6)");
        expect(parameters).toEqual([2024, 1, 2, 12, 30, 15]);
    });

    it("builds date_bin", () => {
        const builder = q.select(q.dateBin(q.l("15 minutes"), q.l("2020-02-11 15:44:17"), q.l("2001-01-01")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT DATE_BIN($1, $2, $3)");
        expect(parameters).toEqual(["15 minutes", "2020-02-11 15:44:17", "2001-01-01"]);
    });

    it("builds date_add", () => {
        const builder = q.select(q.dateAdd(q.l("2021-10-31 00:00:00+02"), q.l("1 day"), q.l("Europe/Warsaw")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT DATE_ADD($1, $2, $3)");
        expect(parameters).toEqual(["2021-10-31 00:00:00+02", "1 day", "Europe/Warsaw"]);
    });

    it("builds date_subtract", () => {
        const builder = q.select(q.dateSubtract(q.l("2021-11-01 00:00:00+01"), q.l("1 day"), q.l("Europe/Warsaw")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT DATE_SUBTRACT($1, $2, $3)");
        expect(parameters).toEqual(["2021-11-01 00:00:00+01", "1 day", "Europe/Warsaw"]);
    });

    it("builds make_interval", () => {
        const builder = q.select(q.makeInterval(1, 2, 3, 4, 5, 6, 7.5));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT MAKE_INTERVAL($1, $2, $3, $4, $5, $6, $7)");
        expect(parameters).toEqual([1, 2, 3, 4, 5, 6, 7.5]);
    });

    it("builds pg_sleep", () => {
        const builder = q.select(q.pgSleep(1.5));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT PG_SLEEP($1)");
        expect(parameters).toEqual([1.5]);
    });

    it("builds pg_sleep_for", () => {
        const builder = q.select(q.pgSleepFor("5 minutes"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT PG_SLEEP_FOR($1)");
        expect(parameters).toEqual(["5 minutes"]);
    });

    it("builds pg_sleep_until", () => {
        const builder = q.select(q.pgSleepUntil(q.l("2024-01-02 03:00:00+00")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT PG_SLEEP_UNTIL($1)");
        expect(parameters).toEqual(["2024-01-02 03:00:00+00"]);
    });

    it("builds current_time with precision", () => {
        const builder = q.select(q.currentTime(2));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CURRENT_TIME($1)");
        expect(parameters).toEqual([2]);
    });

    it("builds current_timestamp with precision", () => {
        const builder = q.select(q.currentTimestamp(0));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CURRENT_TIMESTAMP($1)");
        expect(parameters).toEqual([0]);
    });

    it("builds localtime with precision", () => {
        const builder = q.select(q.localtime(0));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOCALTIME($1)");
        expect(parameters).toEqual([0]);
    });

    it("builds localtimestamp with precision", () => {
        const builder = q.select(q.localtimestamp(2));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOCALTIMESTAMP($1)");
        expect(parameters).toEqual([2]);
    });

    it("builds at time zone", () => {
        const builder = q.select(q.atTimeZone(q.l("2024-01-01 12:00:00"), "Asia/Tokyo"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT $1 AT TIME ZONE $2");
        expect(parameters).toEqual(["2024-01-01 12:00:00", "Asia/Tokyo"]);
    });

    it("builds at local", () => {
        const builder = q.select(q.atLocal(q.l("2024-01-01 12:00:00")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT $1 AT LOCAL");
        expect(parameters).toEqual(["2024-01-01 12:00:00"]);
    });

    it("builds at time zone identifier", () => {
        const builder = q.select(q.atTimeZoneIdentifier(q.i("events.started_at"), "UTC"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT events.started_at AT TIME ZONE $1");
        expect(parameters).toEqual(["UTC"]);
    });

    it("builds at local identifier", () => {
        const builder = q.select(q.atLocalIdentifier(q.i("events.started_at")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT events.started_at AT LOCAL");
        expect(parameters).toEqual([]);
    });
});
