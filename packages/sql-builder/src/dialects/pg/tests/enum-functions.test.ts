import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("enum functions", () => {
    it("builds enum_first", () => {
        const builder = q.select().enumFirst(q.rawString("NULL::rainbow"));
        expectQuery(builder, "enums", "enum_first");
    });

    it("builds enum_last", () => {
        const builder = q.select(q.enumLast(q.rawString("NULL::rainbow")));
        expectQuery(builder, "enums", "enum_last");
    });

    it("builds enum_range with two args", () => {
        const builder = q.select(q.enumRange("orange", "green"));
        expectQuery(builder, "enums", "enum_range with two args");
    });
});
