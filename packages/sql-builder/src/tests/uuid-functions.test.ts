import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("uuid functions", () => {
    describe("uuid generation functions", () => {
        it("builds gen_random_uuid", () => {
            const builder = q.select(q.genRandomUuid());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GEN_RANDOM_UUID()");
            expect(parameters).toEqual([]);
        });

        it("builds uuidv4", () => {
            const builder = q.select(q.uuidv4());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUIDV4()");
            expect(parameters).toEqual([]);
        });

        it("builds uuidv7 without shift parameter", () => {
            const builder = q.select(q.uuidv7());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUIDV7()");
            expect(parameters).toEqual([]);
        });

        it("builds uuidv7 with shift parameter", () => {
            const builder = q.select(q.uuidv7("1 hour"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUIDV7($1)");
            expect(parameters).toEqual(["1 hour"]);
        });

        it("builds uuidv7 with shift parameter using parameter", () => {
            const builder = q.select(q.uuidv7("1 hour"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUIDV7($1)");
            expect(parameters).toEqual(["1 hour"]);
        });
    });

    describe("uuid extraction functions", () => {
        it("builds uuid_extract_timestamp", () => {
            const builder = q.select(q.uuidExtractTimestamp(q.l("019535d9-3df7-79fb-b466-fa907fa17f9e")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUID_EXTRACT_TIMESTAMP($1)");
            expect(parameters).toEqual(["019535d9-3df7-79fb-b466-fa907fa17f9e"]);
        });

        it("builds uuid_extract_timestamp with column reference", () => {
            const builder = q.select(q.uuidExtractTimestamp(q.c("id")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUID_EXTRACT_TIMESTAMP(id)");
            expect(parameters).toEqual([]);
        });

        it("builds uuid_extract_version", () => {
            const builder = q.select(q.uuidExtractVersion(q.l("41db1265-8bc1-4ab3-992f-885799a4af1d")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUID_EXTRACT_VERSION($1)");
            expect(parameters).toEqual(["41db1265-8bc1-4ab3-992f-885799a4af1d"]);
        });

        it("builds uuid_extract_version with column reference", () => {
            const builder = q.select(q.uuidExtractVersion(q.c("uuid_col")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUID_EXTRACT_VERSION(uuid_col)");
            expect(parameters).toEqual([]);
        });
    });

    describe("complex queries with uuid functions", () => {
        it("builds insert with gen_random_uuid", () => {
            const builder = q.insertInto("users", ["id", "name"]).values(q.genRandomUuid(), "John Doe");
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("INSERT INTO users (id, name) VALUES (GEN_RANDOM_UUID(), $1)");
            expect(parameters).toEqual(["John Doe"]);
        });

        it("builds query with uuid functions in WHERE clause", () => {
            const builder = q.select("*").from("users").where(q.uuidExtractVersion(q.c("id")).op("=").l(4));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM users WHERE UUID_EXTRACT_VERSION(id) = $1");
            expect(parameters).toEqual([4]);
        });

        it("builds query with multiple uuid functions in SELECT", () => {
            const builder = q.select(
                q.genRandomUuid().as("new_uuid"),
                q.uuidv4().as("v4_uuid"),
                q.uuidExtractTimestamp(q.c("created_at")).as("timestamp"),
                q.uuidExtractVersion(q.c("id")).as("version"),
            ).from("users");
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GEN_RANDOM_UUID() AS new_uuid, UUIDV4() AS v4_uuid, UUID_EXTRACT_TIMESTAMP(created_at) AS timestamp, UUID_EXTRACT_VERSION(id) AS version FROM users");
            expect(parameters).toEqual([]);
        });

        it("builds query with uuidv7 and timestamp extraction", () => {
            const builder = q.select(
                q.uuidExtractTimestamp(q.uuidv7()).as("timestamp"),
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUID_EXTRACT_TIMESTAMP(UUIDV7()) AS timestamp");
            expect(parameters).toEqual([]);
        });

        it("builds query with uuidv7 and shift parameter", () => {
            const builder = q.select(q.uuidv7("-5 minutes"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT UUIDV7($1)");
            expect(parameters).toEqual(["-5 minutes"]);
        });

        it("builds ORDER BY with uuid_extract_timestamp", () => {
            const builder = q.select("*").from("events").orderBy(q.uuidExtractTimestamp(q.c("event_id")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM events ORDER BY UUID_EXTRACT_TIMESTAMP(event_id)");
            expect(parameters).toEqual([]);
        });
    });
});
