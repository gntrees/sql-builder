"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSearchFunctionBuilder = void 0;
const override_array_functions_1 = require("./override-array-functions");
class TextSearchFunctionBuilder extends override_array_functions_1.ArrayFunctionBuilder {
    arrayToTsvector(array) {
        return this.pushFunction("ARRAY_TO_TSVECTOR", array);
    }
    toTsvector(config, document) {
        return this.pushFunction("TO_TSVECTOR", config === undefined ? undefined : this.toLiteralValue(config), document);
    }
    toTsquery(config, query) {
        return this.pushFunction("TO_TSQUERY", config === undefined ? undefined : this.toLiteralValue(config), query === undefined ? undefined : this.toLiteralValue(query));
    }
    jsonToTsvector(config, document, filter) {
        return this.pushFunction("JSON_TO_TSVECTOR", config === undefined ? undefined : this.toLiteralValue(config), document, filter === undefined ? undefined : this.toLiteralValue(filter));
    }
    jsonbToTsvector(config, document, filter) {
        return this.pushFunction("JSONB_TO_TSVECTOR", config === undefined ? undefined : this.toLiteralValue(config), document, filter === undefined ? undefined : this.toLiteralValue(filter));
    }
    tsvectorToArray(tsvector) {
        return this.pushFunction("TSVECTOR_TO_ARRAY", tsvector);
    }
    plaintoTsquery(config, query) {
        return this.pushFunction("PLAINTO_TSQUERY", config === undefined ? undefined : this.toLiteralValue(config), query === undefined ? undefined : this.toLiteralValue(query));
    }
    phrasetoTsquery(config, query) {
        return this.pushFunction("PHRASETO_TSQUERY", config === undefined ? undefined : this.toLiteralValue(config), query === undefined ? undefined : this.toLiteralValue(query));
    }
    websearchToTsquery(config, query) {
        return this.pushFunction("WEBSEARCH_TO_TSQUERY", config === undefined ? undefined : this.toLiteralValue(config), query === undefined ? undefined : this.toLiteralValue(query));
    }
    tsqueryPhrase(query1, query2, distance) {
        return this.pushFunction("TSQUERY_PHRASE", query1, query2, distance === undefined ? undefined : this.toLiteralValue(distance));
    }
    setweight(vector, weight, lexemes) {
        return this.pushFunction("SETWEIGHT", vector, weight === undefined ? undefined : this.toLiteralValue(weight), lexemes);
    }
    strip(tsvector) {
        if (tsvector === undefined) {
            return super.strip();
        }
        return this.pushFunction("STRIP", tsvector);
    }
    tsDelete(vector, lexemeOrArray) {
        return this.pushFunction("TS_DELETE", vector, lexemeOrArray);
    }
    tsFilter(vector, weights) {
        return this.pushFunction("TS_FILTER", vector, weights === undefined ? undefined : this.toLiteralValue(weights));
    }
    tsRank(weights, vector, query, normalization) {
        return this.pushFunction("TS_RANK", weights === undefined ? undefined : this.toLiteralValue(weights), vector, query, normalization === undefined ? undefined : this.toLiteralValue(normalization));
    }
    tsRankCd(weights, vector, query, normalization) {
        return this.pushFunction("TS_RANK_CD", weights === undefined ? undefined : this.toLiteralValue(weights), vector, query, normalization === undefined ? undefined : this.toLiteralValue(normalization));
    }
    tsHeadline(config, document, query, options) {
        return this.pushFunction("TS_HEADLINE", config === undefined ? undefined : this.toLiteralValue(config), document, query, options === undefined ? undefined : this.toLiteralValue(options));
    }
    querytree(tsquery) {
        return this.pushFunction("QUERYTREE", tsquery);
    }
    numnode(tsquery) {
        return this.pushFunction("NUMNODE", tsquery);
    }
    length(tsvector) {
        if (tsvector === undefined) {
            return super.length();
        }
        return this.pushFunction("LENGTH", tsvector);
    }
    getCurrentTsConfig() {
        return this.pushFunction("GET_CURRENT_TS_CONFIG");
    }
    tsRewrite(query, targetOrSelect, substitute) {
        return this.pushFunction("TS_REWRITE", query, targetOrSelect, substitute);
    }
    tsDebug(config, document) {
        return this.pushFunction("TS_DEBUG", config === undefined ? undefined : this.toLiteralValue(config), document === undefined ? undefined : this.toLiteralValue(document));
    }
    tsLexize(dict, token) {
        return this.pushFunction("TS_LEXIZE", dict === undefined ? undefined : this.toLiteralValue(dict), token === undefined ? undefined : this.toLiteralValue(token));
    }
    tsParse(parser, document) {
        return this.pushFunction("TS_PARSE", parser === undefined ? undefined : this.toLiteralValue(parser), document === undefined ? undefined : this.toLiteralValue(document));
    }
    tsTokenType(parser) {
        return this.pushFunction("TS_TOKEN_TYPE", parser === undefined ? undefined : this.toLiteralValue(parser));
    }
    tsStat(sqlquery, weights) {
        return this.pushFunction("TS_STAT", sqlquery === undefined ? undefined : this.toLiteralValue(sqlquery), weights === undefined ? undefined : this.toLiteralValue(weights));
    }
}
exports.TextSearchFunctionBuilder = TextSearchFunctionBuilder;
