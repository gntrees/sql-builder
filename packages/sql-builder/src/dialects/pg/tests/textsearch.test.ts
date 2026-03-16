import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("Text Search Functions", () => {
    describe("Conversion Functions", () => {
        it("builds array_to_tsvector", () => {
            const builder = q.select(q.arrayToTsvector(q.l("[fat,cat,rat]")));
            expectQuery(builder, "textsearch", "array_to_tsvector");
        });

        it("builds to_tsvector with document only", () => {
            const builder = q.select(q.toTsvector(q.l("fat cats")));
            expectQuery(builder, "textsearch", "to_tsvector with document only");
        });

        it("builds to_tsvector with config and document", () => {
            const builder = q.select(q.toTsvector(q.l("english"), q.l("fat cats")));
            expectQuery(builder, "textsearch", "to_tsvector with config and document");
        });

        it("builds to_tsquery with query only", () => {
            const builder = q.select(q.toTsquery(q.l("fat & rat")));
            expectQuery(builder, "textsearch", "to_tsquery with query only");
        });

        it("builds json_to_tsvector", () => {
            const builder = q.select(q.jsonToTsvector(q.l("english"), q.l('{"a": "fat rats"}'), q.l("string")));
            expectQuery(builder, "textsearch", "json_to_tsvector");
        });

        it("builds tsvector_to_array", () => {
            const builder = q.select(q.tsvectorToArray(q.i("search_vector")));
            expectQuery(builder, "textsearch", "tsvector_to_array");
        });
    });

    describe("Query Construction Functions", () => {
        it("builds plainto_tsquery with query", () => {
            const builder = q.select(q.plaintoTsquery(q.l("The Fat Rats")));
            expectQuery(builder, "textsearch", "plainto_tsquery with query");
        });

        it("builds plainto_tsquery with config and query", () => {
            const builder = q.select(q.plaintoTsquery(q.l("english"), q.l("The Fat Rats")));
            expectQuery(builder, "textsearch", "plainto_tsquery with config and query");
        });

        it("builds phraseto_tsquery", () => {
            const builder = q.select(q.phrasetoTsquery(q.l("The Fat Rats")));
            expectQuery(builder, "textsearch", "phraseto_tsquery");
        });

        it("builds websearch_to_tsquery", () => {
            const builder = q.select(q.websearchToTsquery(q.l('"fat rat" or cat')));
            expectQuery(builder, "textsearch", "websearch_to_tsquery");
        });

        it("builds tsquery_phrase", () => {
            const builder = q.select(q.tsqueryPhrase(q.toTsquery(q.l("fat")), q.toTsquery(q.l("cat"))));
            expectQuery(builder, "textsearch", "tsquery_phrase");
        });
    });

    describe("Vector Manipulation Functions", () => {
        it("builds setweight with vector and weight", () => {
            const builder = q.select(q.setweight(q.i("search_vector"), q.l("A")));
            expectQuery(builder, "textsearch", "setweight with vector and weight");
        });

        it("builds strip with tsvector", () => {
            const builder = q.select(q.strip(q.i("search_vector")));
            expectQuery(builder, "textsearch", "strip with tsvector");
        });

        it("builds ts_delete", () => {
            const builder = q.select(q.tsDelete(q.i("search_vector"), q.l("fat")));
            expectQuery(builder, "textsearch", "ts_delete");
        });

        it("builds ts_filter", () => {
            const builder = q.select(q.tsFilter(q.i("search_vector"), q.l("{A,B}")));
            expectQuery(builder, "textsearch", "ts_filter");
        });
    });

    describe("Ranking Functions", () => {
        it("builds ts_rank with vector and query", () => {
            const builder = q.select(q.tsRank(q.i("search_vector"), q.toTsquery(q.l("cat"))));
            expectQuery(builder, "textsearch", "ts_rank with vector and query");
        });

        it("builds ts_rank_cd", () => {
            const builder = q.select(q.tsRankCd(q.i("search_vector"), q.toTsquery(q.l("cat"))));
            expectQuery(builder, "textsearch", "ts_rank_cd");
        });

        it("builds ts_headline with document and query", () => {
            const builder = q.select(q.tsHeadline(q.l("The fat cat ate the rat."), q.toTsquery(q.l("cat"))));
            expectQuery(builder, "textsearch", "ts_headline with document and query");
        });
    });

    describe("Query Analysis Functions", () => {
        it("builds querytree", () => {
            const builder = q.select(q.querytree(q.toTsquery(q.l("foo & ! bar"))));
            expectQuery(builder, "textsearch", "querytree");
        });

        it("builds numnode", () => {
            const builder = q.select(q.numnode(q.toTsquery(q.l("(fat & rat) | cat"))));
            expectQuery(builder, "textsearch", "numnode");
        });
    });

    describe("Utility Functions", () => {
        it("builds get_current_ts_config", () => {
            const builder = q.select(q.getCurrentTsConfig());
            expectQuery(builder, "textsearch", "get_current_ts_config");
        });

        it("builds ts_rewrite", () => {
            const builder = q.select(q.tsRewrite(q.toTsquery(q.l("a & b")), q.toTsquery(q.l("a")), q.toTsquery(q.l("foo|bar"))));
            expectQuery(builder, "textsearch", "ts_rewrite");
        });
    });

    describe("Debugging Functions", () => {
        it("builds ts_debug", () => {
            const builder = q.select(q.tsDebug(q.l("The Brightest supernovaes")));
            expectQuery(builder, "textsearch", "ts_debug");
        });

        it("builds ts_lexize", () => {
            const builder = q.select(q.tsLexize(q.l("english_stem"), q.l("stars")));
            expectQuery(builder, "textsearch", "ts_lexize");
        });

        it("builds ts_parse", () => {
            const builder = q.select(q.tsParse(q.l("default"), q.l("foo - bar")));
            expectQuery(builder, "textsearch", "ts_parse");
        });

        it("builds ts_token_type", () => {
            const builder = q.select(q.tsTokenType(q.l("default")));
            expectQuery(builder, "textsearch", "ts_token_type");
        });

        it("builds ts_stat", () => {
            const builder = q.select(q.tsStat(q.l("SELECT vector FROM apod")));
            expectQuery(builder, "textsearch", "ts_stat");
        });
    });

    describe("Integration with Query Builder", () => {
        it("builds text search in WHERE clause", () => {
            const builder = q
                .select("*")
                .from(q.t("articles"))
                .where(q.toTsvector(q.l("english"), q.i("content")).op("@@").v(q.toTsquery(q.l("fat"), q.l("cat"))));
            expectQuery(builder, "textsearch", "text search in WHERE clause");
        });

        it("builds ranking in SELECT clause", () => {
            const builder = q
                .select(q.tsRank(q.i("search_vector"), q.toTsquery(q.l("cat"))).as(q.c("rank")))
                .from(q.t("articles"));
            expectQuery(builder, "textsearch", "ranking in SELECT clause");
        });

        it("builds headline in SELECT clause", () => {
            const builder = q
                .select(q.tsHeadline(q.i("content"), q.toTsquery(q.l("cat")), q.l("MaxWords=20")).as(q.c("snippet")))
                .from(q.t("articles"));
            expectQuery(builder, "textsearch", "headline in SELECT clause");
        });
    });

    describe("Function Overload Resolution", () => {
        describe("toTsquery overload resolution", () => {
            it("should accept no arguments", () => {
                const builder = q.select(q.toTsquery());
                expectQuery(builder, "textsearch", "should accept no arguments");
            });

            it("should accept single argument (query)", () => {
                const builder = q.select(q.toTsquery(q.l("fat & rat")));
                expectQuery(builder, "textsearch", "should accept single argument (query) to_tsquery");
            });

            it("should accept two arguments (config, query)", () => {
                const builder = q.select(q.toTsquery(q.l("english"), q.l("fat & rat")));
                expectQuery(builder, "textsearch", "should accept two arguments (config, query) to_tsquery");
            });
        });

        describe("toTsvector overload resolution", () => {
            it("should accept single argument (document)", () => {
                const builder = q.select(q.toTsvector(q.l("fat cats")));
                expectQuery(builder, "textsearch", "should accept single argument (document) to_tsvector");
            });

            it("should accept two arguments (config, document)", () => {
                const builder = q.select(q.toTsvector(q.l("english"), q.l("fat cats")));
                expectQuery(builder, "textsearch", "should accept two arguments (config, document) to_tsvector");
            });
        });

        describe("plaintoTsquery overload resolution", () => {
            it("should accept single argument (query)", () => {
                const builder = q.select(q.plaintoTsquery(q.l("The Fat Rats")));
                expectQuery(builder, "textsearch", "should accept single argument (query) plainto_tsquery");
            });

            it("should accept two arguments (config, query)", () => {
                const builder = q.select(q.plaintoTsquery(q.l("english"), q.l("The Fat Rats")));
                expectQuery(builder, "textsearch", "should accept two arguments (config, query) plainto_tsquery");
            });
        });

        describe("tsRank overload resolution", () => {
            it("should accept two arguments (vector, query)", () => {
                const builder = q.select(q.tsRank(q.i("search_vector"), q.toTsquery(q.l("cat"))));
                expectQuery(builder, "textsearch", "should accept two arguments (vector, query) tsRank");
            });

            it("should accept three arguments (vector, query, normalization)", () => {
                const builder = q.select(q.tsRank(q.i("search_vector"), q.toTsquery(q.l("cat")), q.l(2)));
                expectQuery(builder, "textsearch", "should accept three arguments (vector, query, normalization) tsRank");
            });

            it("should accept four arguments (weights, vector, query, normalization)", () => {
                const builder = q.select(q.tsRank(q.l("{0.1,0.2,0.4,1.0}"), q.i("search_vector"), q.toTsquery(q.l("cat")), q.l(2)));
                expectQuery(builder, "textsearch", "should accept four arguments (weights, vector, query, normalization) tsRank");
            });
        });

        describe("tsHeadline overload resolution", () => {
            it("should accept two arguments (document, query)", () => {
                const builder = q.select(q.tsHeadline(q.l("The fat cat"), q.toTsquery(q.l("cat"))));
                expectQuery(builder, "textsearch", "should accept two arguments (document, query) tsHeadline");
            });

            it("should accept three arguments (config, document, query)", () => {
                const builder = q.select(q.tsHeadline(q.l("english"), q.l("The fat cat"), q.toTsquery(q.l("cat"))));
                expectQuery(builder, "textsearch", "should accept three arguments (config, document, query) tsHeadline");
            });
        });

        describe("tsDebug overload resolution", () => {
            it("should accept single argument (document)", () => {
                const builder = q.select(q.tsDebug(q.l("The Brightest supernovaes")));
                expectQuery(builder, "textsearch", "should accept single argument (document) tsDebug");
            });

            it("should accept two arguments (config, document)", () => {
                const builder = q.select(q.tsDebug(q.l("english"), q.l("The Brightest supernovaes")));
                expectQuery(builder, "textsearch", "should accept two arguments (config, document) tsDebug");
            });
        });
    });
});
