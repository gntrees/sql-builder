import { ArrayFunctionBuilder } from "./override-array-functions";
import type { Statement } from "../../types";

export class TextSearchFunctionBuilder extends ArrayFunctionBuilder {
    arrayToTsvector(array?: Statement) {
        return this.pushFunction("ARRAY_TO_TSVECTOR", array);
    }

    toTsvector(config?: Statement, document?: Statement) {
        return this.pushFunction("TO_TSVECTOR",
            config,
            document);
    }

    toTsquery(config?: Statement, query?: Statement) {
        return this.pushFunction("TO_TSQUERY",
            config,
            query);
    }

    jsonToTsvector(config?: Statement, document?: Statement, filter?: Statement) {
        return this.pushFunction("JSON_TO_TSVECTOR",
            config,
            document,
            filter);
    }

    jsonbToTsvector(config?: Statement, document?: Statement, filter?: Statement) {
        return this.pushFunction("JSONB_TO_TSVECTOR",
            config,
            document,
            filter);
    }

    tsvectorToArray(tsvector?: Statement) {
        return this.pushFunction("TSVECTOR_TO_ARRAY", tsvector);
    }

    plaintoTsquery(config?: Statement, query?: Statement) {
        return this.pushFunction("PLAINTO_TSQUERY",
            config,
            query);
    }

    phrasetoTsquery(config?: Statement, query?: Statement) {
        return this.pushFunction("PHRASETO_TSQUERY",
            config,
            query);
    }

    websearchToTsquery(config?: Statement, query?: Statement) {
        return this.pushFunction("WEBSEARCH_TO_TSQUERY",
            config,
            query);
    }

    tsqueryPhrase(query1?: Statement, query2?: Statement, distance?: Statement) {
        return this.pushFunction("TSQUERY_PHRASE",
            query1,
            query2,
            distance);
    }

    setweight(vector?: Statement, weight?: Statement, lexemes?: Statement) {
        return this.pushFunction("SETWEIGHT",
            vector,
            weight,
            lexemes);
    }

    override strip(tsvector?: Statement) {
        if (tsvector === undefined) {
            return super.strip();
        }
        return this.pushFunction("STRIP", tsvector);
    }

    tsDelete(vector?: Statement, lexemeOrArray?: Statement) {
        return this.pushFunction("TS_DELETE", vector, lexemeOrArray);
    }

    tsFilter(vector?: Statement, weights?: Statement) {
        return this.pushFunction("TS_FILTER",
            vector,
            weights);
    }

    tsRank(weights?: Statement, vector?: Statement, query?: Statement, normalization?: Statement) {
        return this.pushFunction("TS_RANK",
            weights,
            vector,
            query,
            normalization);
    }

    tsRankCd(weights?: Statement, vector?: Statement, query?: Statement, normalization?: Statement) {
        return this.pushFunction("TS_RANK_CD",
            weights,
            vector,
            query,
            normalization);
    }

    tsHeadline(config?: Statement, document?: Statement, query?: Statement, options?: Statement) {
        return this.pushFunction("TS_HEADLINE",
            config,
            document,
            query,
            options);
    }

    querytree(tsquery?: Statement) {
        return this.pushFunction("QUERYTREE", tsquery);
    }

    numnode(tsquery?: Statement) {
        return this.pushFunction("NUMNODE", tsquery);
    }

    override length(tsvector?: Statement) {
        if (tsvector === undefined) {
            return super.length();
        }
        return this.pushFunction("LENGTH", tsvector);
    }

    getCurrentTsConfig() {
        return this.pushFunction("GET_CURRENT_TS_CONFIG");
    }

    tsRewrite(query?: Statement, targetOrSelect?: Statement, substitute?: Statement) {
        return this.pushFunction("TS_REWRITE", query, targetOrSelect, substitute);
    }

    tsDebug(config?: Statement, document?: Statement) {
        return this.pushFunction("TS_DEBUG",
            config,
            document);
    }

    tsLexize(dict?: Statement, token?: Statement) {
        return this.pushFunction("TS_LEXIZE",
            dict,
            token);
    }

    tsParse(parser?: Statement, document?: Statement) {
        return this.pushFunction("TS_PARSE",
            parser,
            document);
    }

    tsTokenType(parser?: Statement) {
        return this.pushFunction("TS_TOKEN_TYPE",
            parser);
    }

    tsStat(sqlquery?: Statement, weights?: Statement) {
        return this.pushFunction("TS_STAT",
            sqlquery,
            weights);
    }
}
