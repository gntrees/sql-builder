import { ArrayFunctionBuilder } from "./override-array-functions";
import type { Statement } from "./types";

export class TextSearchFunctionBuilder extends ArrayFunctionBuilder {
    arrayToTsvector(array?: Statement) {
        return this.pushFunction("ARRAY_TO_TSVECTOR", array);
    }

    toTsvector(config?: Statement, document?: Statement) {
        return this.pushFunction("TO_TSVECTOR",
            config === undefined ? undefined : this.toLiteral(config),
            document);
    }

    toTsquery(config?: Statement, query?: Statement) {
        return this.pushFunction("TO_TSQUERY",
            config === undefined ? undefined : this.toLiteral(config),
            query === undefined ? undefined : this.toLiteral(query));
    }

    jsonToTsvector(config?: Statement, document?: Statement, filter?: Statement) {
        return this.pushFunction("JSON_TO_TSVECTOR",
            config === undefined ? undefined : this.toLiteral(config),
            document,
            filter === undefined ? undefined : this.toLiteral(filter));
    }

    jsonbToTsvector(config?: Statement, document?: Statement, filter?: Statement) {
        return this.pushFunction("JSONB_TO_TSVECTOR",
            config === undefined ? undefined : this.toLiteral(config),
            document,
            filter === undefined ? undefined : this.toLiteral(filter));
    }

    tsvectorToArray(tsvector?: Statement) {
        return this.pushFunction("TSVECTOR_TO_ARRAY", tsvector);
    }

    plaintoTsquery(config?: Statement, query?: Statement) {
        return this.pushFunction("PLAINTO_TSQUERY",
            config === undefined ? undefined : this.toLiteral(config),
            query === undefined ? undefined : this.toLiteral(query));
    }

    phrasetoTsquery(config?: Statement, query?: Statement) {
        return this.pushFunction("PHRASETO_TSQUERY",
            config === undefined ? undefined : this.toLiteral(config),
            query === undefined ? undefined : this.toLiteral(query));
    }

    websearchToTsquery(config?: Statement, query?: Statement) {
        return this.pushFunction("WEBSEARCH_TO_TSQUERY",
            config === undefined ? undefined : this.toLiteral(config),
            query === undefined ? undefined : this.toLiteral(query));
    }

    tsqueryPhrase(query1?: Statement, query2?: Statement, distance?: Statement) {
        return this.pushFunction("TSQUERY_PHRASE",
            query1,
            query2,
            distance === undefined ? undefined : this.toLiteral(distance));
    }

    setweight(vector?: Statement, weight?: Statement, lexemes?: Statement) {
        return this.pushFunction("SETWEIGHT",
            vector,
            weight === undefined ? undefined : this.toLiteral(weight),
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
            weights === undefined ? undefined : this.toLiteral(weights));
    }

    tsRank(weights?: Statement, vector?: Statement, query?: Statement, normalization?: Statement) {
        return this.pushFunction("TS_RANK",
            weights === undefined ? undefined : this.toLiteral(weights),
            vector,
            query,
            normalization === undefined ? undefined : this.toLiteral(normalization));
    }

    tsRankCd(weights?: Statement, vector?: Statement, query?: Statement, normalization?: Statement) {
        return this.pushFunction("TS_RANK_CD",
            weights === undefined ? undefined : this.toLiteral(weights),
            vector,
            query,
            normalization === undefined ? undefined : this.toLiteral(normalization));
    }

    tsHeadline(config?: Statement, document?: Statement, query?: Statement, options?: Statement) {
        return this.pushFunction("TS_HEADLINE",
            config === undefined ? undefined : this.toLiteral(config),
            document,
            query,
            options === undefined ? undefined : this.toLiteral(options));
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
            config === undefined ? undefined : this.toLiteral(config),
            document === undefined ? undefined : this.toLiteral(document));
    }

    tsLexize(dict?: Statement, token?: Statement) {
        return this.pushFunction("TS_LEXIZE",
            dict === undefined ? undefined : this.toLiteral(dict),
            token === undefined ? undefined : this.toLiteral(token));
    }

    tsParse(parser?: Statement, document?: Statement) {
        return this.pushFunction("TS_PARSE",
            parser === undefined ? undefined : this.toLiteral(parser),
            document === undefined ? undefined : this.toLiteral(document));
    }

    tsTokenType(parser?: Statement) {
        return this.pushFunction("TS_TOKEN_TYPE",
            parser === undefined ? undefined : this.toLiteral(parser));
    }

    tsStat(sqlquery?: Statement, weights?: Statement) {
        return this.pushFunction("TS_STAT",
            sqlquery === undefined ? undefined : this.toLiteral(sqlquery),
            weights === undefined ? undefined : this.toLiteral(weights));
    }
}
