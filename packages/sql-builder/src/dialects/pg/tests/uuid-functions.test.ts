import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("uuid functions", () => {
    describe("uuid generation functions", () => {
        it("builds gen_random_uuid", () => {
            const builder = q.select(q.genRandomUuid());
            expectQuery(builder, "uuid", "gen_random_uuid");
        });

        it("builds uuidv4", () => {
            const builder = q.select(q.uuidv4());
            expectQuery(builder, "uuid", "uuidv4");
        });

        it("builds uuidv7 without shift parameter", () => {
            const builder = q.select(q.uuidv7());
            expectQuery(builder, "uuid", "uuidv7 without shift parameter");
        });

        it("builds uuidv7 with shift parameter", () => {
            const builder = q.select(q.uuidv7("1 hour"));
            expectQuery(builder, "uuid", "uuidv7 with shift parameter");
        });

        it("builds uuidv7 with shift parameter using parameter", () => {
            const builder = q.select(q.uuidv7("1 hour"));
            expectQuery(builder, "uuid", "uuidv7 with shift parameter using parameter");
        });
    });

    describe("uuid extraction functions", () => {
        it("builds uuid_extract_timestamp", () => {
            const builder = q.select(q.uuidExtractTimestamp(q.l("019535d9-3df7-79fb-b466-fa907fa17f9e")));
            expectQuery(builder, "uuid", "uuid_extract_timestamp");
        });

        it("builds uuid_extract_timestamp with column reference", () => {
            const builder = q.select(q.uuidExtractTimestamp(q.c("id")));
            expectQuery(builder, "uuid", "uuid_extract_timestamp with column reference");
        });

        it("builds uuid_extract_version", () => {
            const builder = q.select(q.uuidExtractVersion(q.l("41db1265-8bc1-4ab3-992f-885799a4af1d")));
            expectQuery(builder, "uuid", "uuid_extract_version");
        });

        it("builds uuid_extract_version with column reference", () => {
            const builder = q.select(q.uuidExtractVersion(q.c("uuid_col")));
            expectQuery(builder, "uuid", "uuid_extract_version with column reference");
        });
    });

    describe("complex queries with uuid functions", () => {
        it("builds insert with gen_random_uuid", () => {
            const builder = q.insertInto(q.t("users"), [q.c("id"), q.c("name")]).values(q.genRandomUuid(), "John Doe");
            expectQuery(builder, "uuid", "insert with gen_random_uuid");
        });

        it("builds query with uuid functions in WHERE clause", () => {
            const builder = q.select("*").from(q.t("users")).where(q.uuidExtractVersion(q.c("id")).op("=").l(4));
            expectQuery(builder, "uuid", "query with uuid functions in WHERE clause");
        });

        it("builds query with multiple uuid functions in SELECT", () => {
            const builder = q.select(
                q.genRandomUuid().as(q.c("new_uuid")),
                q.uuidv4().as(q.c("v4_uuid")),
                q.uuidExtractTimestamp(q.c("created_at")).as(q.c("timestamp")),
                q.uuidExtractVersion(q.c("id")).as(q.c("version")),
            ).from(q.t("users"));
            expectQuery(builder, "uuid", "query with multiple uuid functions in SELECT");
        });

        it("builds query with uuidv7 and timestamp extraction", () => {
            const builder = q.select(
                q.uuidExtractTimestamp(q.uuidv7()).as(q.c("timestamp")),
            );
            expectQuery(builder, "uuid", "query with uuidv7 and timestamp extraction");
        });

        it("builds query with uuidv7 and shift parameter", () => {
            const builder = q.select(q.uuidv7("-5 minutes"));
            expectQuery(builder, "uuid", "query with uuidv7 and shift parameter");
        });

        it("builds ORDER BY with uuid_extract_timestamp", () => {
            const builder = q.select("*").from(q.t("events")).orderBy(q.uuidExtractTimestamp(q.c("event_id")));
            expectQuery(builder, "uuid", "ORDER BY with uuid_extract_timestamp");
        });
    });
});
