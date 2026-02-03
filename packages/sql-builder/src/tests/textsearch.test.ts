import { describe, test, expect } from "bun:test";
import { sqlBuilder } from "../../index";

describe("Text Search Functions", () => {
    const db = {
        execHandler: async () => [],
        formatParamHandler: "pg" as const,
    };
    const qb = sqlBuilder(db);

    describe("Conversion Functions", () => {
        test("array_to_tsvector", () => {
            const query = qb.arrayToTsvector(qb.l("[fat,cat,rat]")).getSql();
            expect(query).toContain("ARRAY_TO_TSVECTOR");
        });

        test("to_tsvector with document only", () => {
            const query = qb.toTsvector(qb.l("fat cats")).getSql();
            expect(query).toContain("TO_TSVECTOR");
        });

        test("to_tsvector with config and document", () => {
            const query = qb.toTsvector(qb.l("english"), qb.l("fat cats")).getSql();
            expect(query).toContain("TO_TSVECTOR");
        });

        test("to_tsquery with query only", () => {
            const query = qb.toTsquery(qb.l("fat & rat")).getSql();
            expect(query).toContain("TO_TSQUERY");
        });

        test("json_to_tsvector", () => {
            const query = qb.jsonToTsvector(qb.l("english"), qb.l('{"a": "fat rats"}'), qb.l("string")).getSql();
            expect(query).toContain("JSON_TO_TSVECTOR");
        });

        test("tsvector_to_array", () => {
            const query = qb.tsvectorToArray(qb.i("search_vector")).getSql();
            expect(query).toContain("TSVECTOR_TO_ARRAY");
        });
    });

    describe("Query Construction Functions", () => {
        test("plainto_tsquery with query", () => {
            const query = qb.plaintoTsquery(qb.l("The Fat Rats")).getSql();
            expect(query).toContain("PLAINTO_TSQUERY");
        });

        test("plainto_tsquery with config and query", () => {
            const query = qb.plaintoTsquery(qb.l("english"), qb.l("The Fat Rats")).getSql();
            expect(query).toContain("PLAINTO_TSQUERY");
        });

        test("phraseto_tsquery", () => {
            const query = qb.phrasetoTsquery(qb.l("The Fat Rats")).getSql();
            expect(query).toContain("PHRASETO_TSQUERY");
        });

        test("websearch_to_tsquery", () => {
            const query = qb.websearchToTsquery(qb.l('"fat rat" or cat')).getSql();
            expect(query).toContain("WEBSEARCH_TO_TSQUERY");
        });

        test("tsquery_phrase", () => {
            const query = qb.tsqueryPhrase(qb.toTsquery(qb.l("fat")), qb.toTsquery(qb.l("cat"))).getSql();
            expect(query).toContain("TSQUERY_PHRASE");
        });
    });

    describe("Vector Manipulation Functions", () => {
        test("setweight with vector and weight", () => {
            const query = qb.setweight(qb.i("search_vector"), qb.l("A")).getSql();
            expect(query).toContain("SETWEIGHT");
        });

        test("strip with tsvector", () => {
            const query = qb.strip(qb.i("search_vector")).getSql();
            expect(query).toContain("STRIP");
        });

        test("ts_delete", () => {
            const query = qb.tsDelete(qb.i("search_vector"), qb.l("fat")).getSql();
            expect(query).toContain("TS_DELETE");
        });

        test("ts_filter", () => {
            const query = qb.tsFilter(qb.i("search_vector"), qb.l("{A,B}")).getSql();
            expect(query).toContain("TS_FILTER");
        });
    });

    describe("Ranking Functions", () => {
        test("ts_rank with vector and query", () => {
            const query = qb.tsRank(qb.i("search_vector"), qb.toTsquery(qb.l("cat"))).getSql();
            expect(query).toContain("TS_RANK");
        });

        test("ts_rank_cd", () => {
            const query = qb.tsRankCd(qb.i("search_vector"), qb.toTsquery(qb.l("cat"))).getSql();
            expect(query).toContain("TS_RANK_CD");
        });

        test("ts_headline with document and query", () => {
            const query = qb.tsHeadline(qb.l("The fat cat ate the rat."), qb.toTsquery(qb.l("cat"))).getSql();
            expect(query).toContain("TS_HEADLINE");
        });
    });

    describe("Query Analysis Functions", () => {
        test("querytree", () => {
            const query = qb.querytree(qb.toTsquery(qb.l("foo & ! bar"))).getSql();
            expect(query).toContain("QUERYTREE");
        });

        test("numnode", () => {
            const query = qb.numnode(qb.toTsquery(qb.l("(fat & rat) | cat"))).getSql();
            expect(query).toContain("NUMNODE");
        });
    });

    describe("Utility Functions", () => {
        test("get_current_ts_config", () => {
            const query = qb.getCurrentTsConfig().getSql();
            expect(query).toContain("GET_CURRENT_TS_CONFIG");
        });

        test("ts_rewrite", () => {
            const query = qb.tsRewrite(qb.toTsquery(qb.l("a & b")), qb.toTsquery(qb.l("a")), qb.toTsquery(qb.l("foo|bar"))).getSql();
            expect(query).toContain("TS_REWRITE");
        });
    });

    describe("Debugging Functions", () => {
        test("ts_debug", () => {
            const query = qb.tsDebug(qb.l("The Brightest supernovaes")).getSql();
            expect(query).toContain("TS_DEBUG");
        });

        test("ts_lexize", () => {
            const query = qb.tsLexize(qb.l("english_stem"), qb.l("stars")).getSql();
            expect(query).toContain("TS_LEXIZE");
        });

        test("ts_parse", () => {
            const query = qb.tsParse(qb.l("default"), qb.l("foo - bar")).getSql();
            expect(query).toContain("TS_PARSE");
        });

        test("ts_token_type", () => {
            const query = qb.tsTokenType(qb.l("default")).getSql();
            expect(query).toContain("TS_TOKEN_TYPE");
        });

        test("ts_stat", () => {
            const query = qb.tsStat(qb.l("SELECT vector FROM apod")).getSql();
            expect(query).toContain("TS_STAT");
        });
    });

    describe("Integration with Query Builder", () => {
        test("text search in WHERE clause", () => {
            const query = qb
                .select("*")
                .from("articles")
                .where(qb.toTsvector(qb.l("english"), qb.i("content")).op("@@").v(qb.toTsquery(qb.l("fat"), qb.l("cat"))))
                .getSql();
            expect(query).toContain("TO_TSVECTOR");
            expect(query).toContain("TO_TSQUERY");
            expect(query).toContain("@@");
        });

        test("ranking in SELECT clause", () => {
            const query = qb
                .select(qb.tsRank(qb.i("search_vector"), qb.toTsquery(qb.l("cat"))).as("rank"))
                .from("articles")
                .getSql();
            expect(query).toContain("TS_RANK");
        });

        test("headline in SELECT clause", () => {
            const query = qb
                .select(qb.tsHeadline(qb.i("content"), qb.toTsquery(qb.l("cat")), qb.l("MaxWords=20")).as("snippet"))
                .from("articles")
                .getSql();
            expect(query).toContain("TS_HEADLINE");
        });
    });
});
