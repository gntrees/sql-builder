import { ArrayFunctionBuilder } from "./override-array-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";

export class TextSearchFunctionBuilder extends ArrayFunctionBuilder {
    arrayToTsvector(array?: StatementValueQueryBuilder) {
        return this.pushFunction("ARRAY_TO_TSVECTOR", array);
    }

    toTsvector(config?: StatementValueLiteral, document?: StatementValueQueryBuilder) {
        return this.pushFunction("TO_TSVECTOR",
            config === undefined ? undefined : this.toLiteralValue(config),
            document);
    }

    toTsquery(config?: StatementValueLiteral, query?: StatementValueLiteral) {
        return this.pushFunction("TO_TSQUERY",
            config === undefined ? undefined : this.toLiteralValue(config),
            query === undefined ? undefined : this.toLiteralValue(query));
    }

    jsonToTsvector(config?: StatementValueLiteral, document?: StatementValueQueryBuilder, filter?: StatementValueLiteral) {
        return this.pushFunction("JSON_TO_TSVECTOR",
            config === undefined ? undefined : this.toLiteralValue(config),
            document,
            filter === undefined ? undefined : this.toLiteralValue(filter));
    }

    jsonbToTsvector(config?: StatementValueLiteral, document?: StatementValueQueryBuilder, filter?: StatementValueLiteral) {
        return this.pushFunction("JSONB_TO_TSVECTOR",
            config === undefined ? undefined : this.toLiteralValue(config),
            document,
            filter === undefined ? undefined : this.toLiteralValue(filter));
    }

    tsvectorToArray(tsvector?: StatementValueQueryBuilder) {
        return this.pushFunction("TSVECTOR_TO_ARRAY", tsvector);
    }

    plaintoTsquery(config?: StatementValueLiteral, query?: StatementValueLiteral) {
        return this.pushFunction("PLAINTO_TSQUERY",
            config === undefined ? undefined : this.toLiteralValue(config),
            query === undefined ? undefined : this.toLiteralValue(query));
    }

    phrasetoTsquery(config?: StatementValueLiteral, query?: StatementValueLiteral) {
        return this.pushFunction("PHRASETO_TSQUERY",
            config === undefined ? undefined : this.toLiteralValue(config),
            query === undefined ? undefined : this.toLiteralValue(query));
    }

    websearchToTsquery(config?: StatementValueLiteral, query?: StatementValueLiteral) {
        return this.pushFunction("WEBSEARCH_TO_TSQUERY",
            config === undefined ? undefined : this.toLiteralValue(config),
            query === undefined ? undefined : this.toLiteralValue(query));
    }

    tsqueryPhrase(query1?: StatementValueQueryBuilder, query2?: StatementValueQueryBuilder, distance?: StatementValueLiteral) {
        return this.pushFunction("TSQUERY_PHRASE",
            query1,
            query2,
            distance === undefined ? undefined : this.toLiteralValue(distance));
    }

    setweight(vector?: StatementValueQueryBuilder, weight?: StatementValueLiteral, lexemes?: StatementValueQueryBuilder) {
        return this.pushFunction("SETWEIGHT",
            vector,
            weight === undefined ? undefined : this.toLiteralValue(weight),
            lexemes);
    }

    override strip(tsvector?: StatementValueQueryBuilder) {
        if (tsvector === undefined) {
            return super.strip();
        }
        return this.pushFunction("STRIP", tsvector);
    }

    tsDelete(vector?: StatementValueQueryBuilder, lexemeOrArray?: StatementValueQueryBuilder) {
        return this.pushFunction("TS_DELETE", vector, lexemeOrArray);
    }

    tsFilter(vector?: StatementValueQueryBuilder, weights?: StatementValueLiteral) {
        return this.pushFunction("TS_FILTER",
            vector,
            weights === undefined ? undefined : this.toLiteralValue(weights));
    }

    tsRank(weights?: StatementValueLiteral, vector?: StatementValueQueryBuilder, query?: StatementValueQueryBuilder, normalization?: StatementValueLiteral) {
        return this.pushFunction("TS_RANK",
            weights === undefined ? undefined : this.toLiteralValue(weights),
            vector,
            query,
            normalization === undefined ? undefined : this.toLiteralValue(normalization));
    }

    tsRankCd(weights?: StatementValueLiteral, vector?: StatementValueQueryBuilder, query?: StatementValueQueryBuilder, normalization?: StatementValueLiteral) {
        return this.pushFunction("TS_RANK_CD",
            weights === undefined ? undefined : this.toLiteralValue(weights),
            vector,
            query,
            normalization === undefined ? undefined : this.toLiteralValue(normalization));
    }

    tsHeadline(config?: StatementValueLiteral, document?: StatementValueQueryBuilder, query?: StatementValueQueryBuilder, options?: StatementValueLiteral) {
        return this.pushFunction("TS_HEADLINE",
            config === undefined ? undefined : this.toLiteralValue(config),
            document,
            query,
            options === undefined ? undefined : this.toLiteralValue(options));
    }

    querytree(tsquery?: StatementValueQueryBuilder) {
        return this.pushFunction("QUERYTREE", tsquery);
    }

    numnode(tsquery?: StatementValueQueryBuilder) {
        return this.pushFunction("NUMNODE", tsquery);
    }

    override length(tsvector?: StatementValueQueryBuilder) {
        if (tsvector === undefined) {
            return super.length();
        }
        return this.pushFunction("LENGTH", tsvector);
    }

    getCurrentTsConfig() {
        return this.pushFunction("GET_CURRENT_TS_CONFIG");
    }

    tsRewrite(query?: StatementValueQueryBuilder, targetOrSelect?: StatementValueQueryBuilder, substitute?: StatementValueQueryBuilder) {
        return this.pushFunction("TS_REWRITE", query, targetOrSelect, substitute);
    }

    tsDebug(config?: StatementValueLiteral, document?: StatementValueLiteral) {
        return this.pushFunction("TS_DEBUG",
            config === undefined ? undefined : this.toLiteralValue(config),
            document === undefined ? undefined : this.toLiteralValue(document));
    }

    tsLexize(dict?: StatementValueLiteral, token?: StatementValueLiteral) {
        return this.pushFunction("TS_LEXIZE",
            dict === undefined ? undefined : this.toLiteralValue(dict),
            token === undefined ? undefined : this.toLiteralValue(token));
    }

    tsParse(parser?: StatementValueLiteral, document?: StatementValueLiteral) {
        return this.pushFunction("TS_PARSE",
            parser === undefined ? undefined : this.toLiteralValue(parser),
            document === undefined ? undefined : this.toLiteralValue(document));
    }

    tsTokenType(parser?: StatementValueLiteral) {
        return this.pushFunction("TS_TOKEN_TYPE",
            parser === undefined ? undefined : this.toLiteralValue(parser));
    }

    tsStat(sqlquery?: StatementValueLiteral, weights?: StatementValueLiteral) {
        return this.pushFunction("TS_STAT",
            sqlquery === undefined ? undefined : this.toLiteralValue(sqlquery),
            weights === undefined ? undefined : this.toLiteralValue(weights));
    }
}
