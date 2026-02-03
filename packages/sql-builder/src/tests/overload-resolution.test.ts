import { describe, test, expect } from "bun:test";
import { sqlBuilder } from "../../index";

describe("Text Search Function Overload Resolution", () => {
    const db = {
        execHandler: async () => [],
        formatParamHandler: "pg" as const,
    };
    const qb = sqlBuilder(db);

    describe("toTsquery - Original Error Case", () => {
        test("should accept single argument (query)", () => {
            const query = qb.toTsquery(qb.l("fat & rat")).getSql();
            expect(query).toContain("TO_TSQUERY");
        });

        test("should accept two arguments (config, query)", () => {
            const query = qb.toTsquery(qb.l("english"), qb.l("fat & rat")).getSql();
            expect(query).toContain("TO_TSQUERY");
        });

        test("should accept no arguments", () => {
            const query = qb.toTsquery().getSql();
            expect(query).toContain("TO_TSQUERY");
        });
    });

    describe("toTsvector - Similar Pattern", () => {
        test("should accept single argument (document)", () => {
            const query = qb.toTsvector(qb.l("fat cats")).getSql();
            expect(query).toContain("TO_TSVECTOR");
        });

        test("should accept two arguments (config, document)", () => {
            const query = qb.toTsvector(qb.l("english"), qb.l("fat cats")).getSql();
            expect(query).toContain("TO_TSVECTOR");
        });
    });

    describe("Other Query Functions", () => {
        test("plaintoTsquery with single argument", () => {
            const query = qb.plaintoTsquery(qb.l("The Fat Rats")).getSql();
            expect(query).toContain("PLAINTO_TSQUERY");
        });

        test("phrasetoTsquery with single argument", () => {
            const query = qb.phrasetoTsquery(qb.l("The Fat Rats")).getSql();
            expect(query).toContain("PHRASETO_TSQUERY");
        });

        test("websearchToTsquery with single argument", () => {
            const query = qb.websearchToTsquery(qb.l('"fat rat" or cat')).getSql();
            expect(query).toContain("WEBSEARCH_TO_TSQUERY");
        });
    });

    describe("Ranking Functions", () => {
        test("tsRank with two arguments (vector, query)", () => {
            const query = qb.tsRank(qb.i("search_vector"), qb.toTsquery(qb.l("cat"))).getSql();
            expect(query).toContain("TS_RANK");
        });

        test("tsRank with three arguments (vector, query, normalization)", () => {
            const query = qb.tsRank(qb.i("search_vector"), qb.toTsquery(qb.l("cat")), qb.l(2)).getSql();
            expect(query).toContain("TS_RANK");
        });

        test("tsRank with four arguments (weights, vector, query, normalization)", () => {
            const query = qb.tsRank(qb.l("{0.1,0.2,0.4,1.0}"), qb.i("search_vector"), qb.toTsquery(qb.l("cat")), qb.l(2)).getSql();
            expect(query).toContain("TS_RANK");
        });
    });

    describe("Headline Function", () => {
        test("tsHeadline with two arguments (document, query)", () => {
            const query = qb.tsHeadline(qb.l("The fat cat"), qb.toTsquery(qb.l("cat"))).getSql();
            expect(query).toContain("TS_HEADLINE");
        });

        test("tsHeadline with three arguments (config, document, query)", () => {
            const query = qb.tsHeadline(qb.l("english"), qb.l("The fat cat"), qb.toTsquery(qb.l("cat"))).getSql();
            expect(query).toContain("TS_HEADLINE");
        });
    });

    describe("tsDebug Function", () => {
        test("tsDebug with single argument (document)", () => {
            const query = qb.tsDebug(qb.l("The Brightest supernovaes")).getSql();
            expect(query).toContain("TS_DEBUG");
        });

        test("tsDebug with two arguments (config, document)", () => {
            const query = qb.tsDebug(qb.l("english"), qb.l("The Brightest supernovaes")).getSql();
            expect(query).toContain("TS_DEBUG");
        });
    });
});
