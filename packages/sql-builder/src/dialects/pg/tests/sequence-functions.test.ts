import { describe, it, expect } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("Sequence Functions", () => {
    describe("nextval", () => {
        it("builds nextval function", () => {
            const builder = q.select(q.nextval("my_sequence"));
            expectQuery(builder, "sequences", "nextval");
        });
    });

    describe("setval", () => {
        it("builds setval function with 2 parameters", () => {
            const builder = q.select(q.setval("my_sequence", 42));
            expectQuery(builder, "sequences", "setval function with 2 parameters");
        });

        it("builds setval function with 3 parameters", () => {
            const builder = q.select(q.setval("my_sequence", 42, true));
            expectQuery(builder, "sequences", "setval function with 3 parameters");
        });
    });

    describe("currval", () => {
        it("builds currval function", () => {
            const builder = q.select(q.currval("my_sequence"));
            expectQuery(builder, "sequences", "currval");
        });
    });

    describe("lastval", () => {
        it("builds lastval function", () => {
            const builder = q.select(q.lastval());
            expectQuery(builder, "sequences", "lastval");
        });
    });
});
