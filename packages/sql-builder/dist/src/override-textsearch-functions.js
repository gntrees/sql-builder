"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSearchFunctionBuilder = void 0;
const override_array_functions_1 = require("./override-array-functions");
class TextSearchFunctionBuilder extends override_array_functions_1.ArrayFunctionBuilder {
    arrayToTsvector(array) {
        return this.pushFunction("ARRAY_TO_TSVECTOR", array);
    }
    toTsvector(config, document) {
        return this.pushFunction("TO_TSVECTOR", config === undefined ? undefined : this.toLiteral(config), document);
    }
    toTsquery(config, query) {
        return this.pushFunction("TO_TSQUERY", config === undefined ? undefined : this.toLiteral(config), query === undefined ? undefined : this.toLiteral(query));
    }
    jsonToTsvector(config, document, filter) {
        return this.pushFunction("JSON_TO_TSVECTOR", config === undefined ? undefined : this.toLiteral(config), document, filter === undefined ? undefined : this.toLiteral(filter));
    }
    jsonbToTsvector(config, document, filter) {
        return this.pushFunction("JSONB_TO_TSVECTOR", config === undefined ? undefined : this.toLiteral(config), document, filter === undefined ? undefined : this.toLiteral(filter));
    }
    tsvectorToArray(tsvector) {
        return this.pushFunction("TSVECTOR_TO_ARRAY", tsvector);
    }
    plaintoTsquery(config, query) {
        return this.pushFunction("PLAINTO_TSQUERY", config === undefined ? undefined : this.toLiteral(config), query === undefined ? undefined : this.toLiteral(query));
    }
    phrasetoTsquery(config, query) {
        return this.pushFunction("PHRASETO_TSQUERY", config === undefined ? undefined : this.toLiteral(config), query === undefined ? undefined : this.toLiteral(query));
    }
    websearchToTsquery(config, query) {
        return this.pushFunction("WEBSEARCH_TO_TSQUERY", config === undefined ? undefined : this.toLiteral(config), query === undefined ? undefined : this.toLiteral(query));
    }
    tsqueryPhrase(query1, query2, distance) {
        return this.pushFunction("TSQUERY_PHRASE", query1, query2, distance === undefined ? undefined : this.toLiteral(distance));
    }
    setweight(vector, weight, lexemes) {
        return this.pushFunction("SETWEIGHT", vector, weight === undefined ? undefined : this.toLiteral(weight), lexemes);
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
        return this.pushFunction("TS_FILTER", vector, weights === undefined ? undefined : this.toLiteral(weights));
    }
    tsRank(weights, vector, query, normalization) {
        return this.pushFunction("TS_RANK", weights === undefined ? undefined : this.toLiteral(weights), vector, query, normalization === undefined ? undefined : this.toLiteral(normalization));
    }
    tsRankCd(weights, vector, query, normalization) {
        return this.pushFunction("TS_RANK_CD", weights === undefined ? undefined : this.toLiteral(weights), vector, query, normalization === undefined ? undefined : this.toLiteral(normalization));
    }
    tsHeadline(config, document, query, options) {
        return this.pushFunction("TS_HEADLINE", config === undefined ? undefined : this.toLiteral(config), document, query, options === undefined ? undefined : this.toLiteral(options));
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
        return this.pushFunction("TS_DEBUG", config === undefined ? undefined : this.toLiteral(config), document === undefined ? undefined : this.toLiteral(document));
    }
    tsLexize(dict, token) {
        return this.pushFunction("TS_LEXIZE", dict === undefined ? undefined : this.toLiteral(dict), token === undefined ? undefined : this.toLiteral(token));
    }
    tsParse(parser, document) {
        return this.pushFunction("TS_PARSE", parser === undefined ? undefined : this.toLiteral(parser), document === undefined ? undefined : this.toLiteral(document));
    }
    tsTokenType(parser) {
        return this.pushFunction("TS_TOKEN_TYPE", parser === undefined ? undefined : this.toLiteral(parser));
    }
    tsStat(sqlquery, weights) {
        return this.pushFunction("TS_STAT", sqlquery === undefined ? undefined : this.toLiteral(sqlquery), weights === undefined ? undefined : this.toLiteral(weights));
    }
}
exports.TextSearchFunctionBuilder = TextSearchFunctionBuilder;
