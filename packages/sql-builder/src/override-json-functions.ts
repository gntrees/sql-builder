import { NetworkFunctionBuilder } from "./override-network-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";

export class JSONFunctionBuilder extends NetworkFunctionBuilder {
    // ============================================================
    // JSON CREATION FUNCTIONS (Table 9.49)
    // ============================================================

    /**
     * Converts any SQL value to json or jsonb
     * PostgreSQL: to_json(anyelement) -> json
     */
    toJson(value?: StatementValueQueryBuilder) {
        return this.pushFunction("TO_JSON", value);
    }

    toJsonb(value?: StatementValueQueryBuilder) {
        return this.pushFunction("TO_JSONB", value);
    }

    /**
     * Converts an SQL array to a JSON array
     * PostgreSQL: array_to_json(anyarray [, boolean]) -> json
     */
    arrayToJson(array?: StatementValueQueryBuilder, prettyPrint?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_TO_JSON",
            array,
            prettyPrint === undefined ? undefined : this.toLiteralValue(prettyPrint));
    }

    /**
     * Converts an SQL composite value to a JSON object
     * PostgreSQL: row_to_json(record [, boolean]) -> json
     */
    rowToJson(row?: StatementValueQueryBuilder, prettyPrint?: StatementValueLiteral) {
        return this.pushFunction("ROW_TO_JSON",
            row,
            prettyPrint === undefined ? undefined : this.toLiteralValue(prettyPrint));
    }

    /**
     * Builds a JSON array from variadic arguments
     * PostgreSQL: json_build_array(VARIADIC "any") -> json
     */
    jsonBuildArray(...values: StatementValueLiteral[]) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("JSON_BUILD_ARRAY",
            ...filtered.map(v => this.toLiteralValue(v)));
    }

    jsonbBuildArray(...values: StatementValueLiteral[]) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("JSONB_BUILD_ARRAY",
            ...filtered.map(v => this.toLiteralValue(v)));
    }

    /**
     * Builds a JSON object from variadic arguments (alternating key/value pairs)
     * PostgreSQL: json_build_object(VARIADIC "any") -> json
     */
    jsonBuildObject(...keyValuePairs: StatementValueLiteral[]) {
        const filtered = keyValuePairs.filter(v => v !== undefined && v !== null);
        return this.pushFunction("JSON_BUILD_OBJECT",
            ...filtered.map(v => this.toLiteralValue(v)));
    }

    jsonbBuildObject(...keyValuePairs: StatementValueLiteral[]) {
        const filtered = keyValuePairs.filter(v => v !== undefined && v !== null);
        return this.pushFunction("JSONB_BUILD_OBJECT",
            ...filtered.map(v => this.toLiteralValue(v)));
    }

    /**
     * Builds a JSON object from a text array
     * PostgreSQL: json_object(text[]) -> json
     */
    jsonObjectFromArray(array?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_OBJECT", array);
    }

    jsonbObjectFromArray(array?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_OBJECT", array);
    }

    /**
     * Builds a JSON object from separate key and value arrays
     * PostgreSQL: json_object(keys[], values[]) -> json
     */
    jsonObjectFromPairs(keys?: StatementValueQueryBuilder, values?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_OBJECT", keys, values);
    }

    jsonbObjectFromPairs(keys?: StatementValueQueryBuilder, values?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_OBJECT", keys, values);
    }

    // ============================================================
    // JSON PROCESSING FUNCTIONS (Table 9.51)
    // ============================================================

    /**
     * Expands JSON array to set of json values
     * PostgreSQL: json_array_elements(json) -> setof json
     */
    jsonArrayElements(json?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_ARRAY_ELEMENTS", json);
    }

    jsonbArrayElements(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_ARRAY_ELEMENTS", jsonb);
    }

    /**
     * Expands JSON array to set of text values
     * PostgreSQL: json_array_elements_text(json) -> setof text
     */
    jsonArrayElementsText(json?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_ARRAY_ELEMENTS_TEXT", json);
    }

    jsonbArrayElementsText(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_ARRAY_ELEMENTS_TEXT", jsonb);
    }

    /**
     * Returns number of elements in JSON array
     * PostgreSQL: json_array_length(json) -> integer
     */
    jsonArrayLength(json?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_ARRAY_LENGTH", json);
    }

    jsonbArrayLength(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_ARRAY_LENGTH", jsonb);
    }

    /**
     * Expands JSON object to set of key/value pairs
     * PostgreSQL: json_each(json) -> setof record(key text, value json)
     */
    jsonEach(json?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_EACH", json);
    }

    jsonbEach(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_EACH", jsonb);
    }

    /**
     * Expands JSON object to set of key/value pairs (as text)
     * PostgreSQL: json_each_text(json) -> setof record(key text, value text)
     */
    jsonEachText(json?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_EACH_TEXT", json);
    }

    jsonbEachText(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_EACH_TEXT", jsonb);
    }

    /**
     * Extracts JSON sub-object at specified path
     * PostgreSQL: json_extract_path(from_json, VARIADIC path_elems) -> json
     */
    jsonExtractPath(fromJson?: StatementValueQueryBuilder, ...pathElems: StatementValueLiteral[]) {
        const filtered = pathElems.filter(p => p !== undefined && p !== null);
        return this.pushFunction("JSON_EXTRACT_PATH",
            fromJson,
            ...filtered.map(p => this.toLiteralValue(p)));
    }

    jsonbExtractPath(fromJsonb?: StatementValueQueryBuilder, ...pathElems: StatementValueLiteral[]) {
        const filtered = pathElems.filter(p => p !== undefined && p !== null);
        return this.pushFunction("JSONB_EXTRACT_PATH",
            fromJsonb,
            ...filtered.map(p => this.toLiteralValue(p)));
    }

    /**
     * Extracts JSON sub-object at specified path as text
     * PostgreSQL: json_extract_path_text(from_json, VARIADIC path_elems) -> text
     */
    jsonExtractPathText(fromJson?: StatementValueQueryBuilder, ...pathElems: StatementValueLiteral[]) {
        const filtered = pathElems.filter(p => p !== undefined && p !== null);
        return this.pushFunction("JSON_EXTRACT_PATH_TEXT",
            fromJson,
            ...filtered.map(p => this.toLiteralValue(p)));
    }

    jsonbExtractPathText(fromJsonb?: StatementValueQueryBuilder, ...pathElems: StatementValueLiteral[]) {
        const filtered = pathElems.filter(p => p !== undefined && p !== null);
        return this.pushFunction("JSONB_EXTRACT_PATH_TEXT",
            fromJsonb,
            ...filtered.map(p => this.toLiteralValue(p)));
    }

    /**
     * Returns set of keys in JSON object
     * PostgreSQL: json_object_keys(json) -> setof text
     */
    jsonObjectKeys(json?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_OBJECT_KEYS", json);
    }

    jsonbObjectKeys(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_OBJECT_KEYS", jsonb);
    }

    /**
     * Expands JSON object to row (composite type)
     * PostgreSQL: json_populate_record(base, from_json) -> anyelement
     */
    jsonPopulateRecord(base?: StatementValueQueryBuilder, fromJson?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_POPULATE_RECORD", base, fromJson);
    }

    jsonbPopulateRecord(base?: StatementValueQueryBuilder, fromJsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_POPULATE_RECORD", base, fromJsonb);
    }

    /**
     * Tests if jsonb_populate_record would succeed
     * PostgreSQL: jsonb_populate_record_valid(base, from_jsonb) -> boolean
     */
    jsonbPopulateRecordValid(base?: StatementValueQueryBuilder, fromJsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_POPULATE_RECORD_VALID", base, fromJsonb);
    }

    /**
     * Expands JSON array of objects to set of rows
     * PostgreSQL: json_populate_recordset(base, from_json) -> setof anyelement
     */
    jsonPopulateRecordset(base?: StatementValueQueryBuilder, fromJson?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_POPULATE_RECORDSET", base, fromJson);
    }

    jsonbPopulateRecordset(base?: StatementValueQueryBuilder, fromJsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_POPULATE_RECORDSET", base, fromJsonb);
    }

    /**
     * Expands JSON to record with AS clause
     * PostgreSQL: json_to_record(json) -> record
     */
    jsonToRecord(json?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_TO_RECORD", json);
    }

    jsonbToRecord(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_TO_RECORD", jsonb);
    }

    /**
     * Expands JSON array to recordset
     * PostgreSQL: json_to_recordset(json) -> setof record
     */
    jsonToRecordset(json?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_TO_RECORDSET", json);
    }

    jsonbToRecordset(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_TO_RECORDSET", jsonb);
    }

    /**
     * Sets item in JSONB at path
     * PostgreSQL: jsonb_set(target, path, new_value[, create_if_missing]) -> jsonb
     */
    jsonbSet(target?: StatementValueQueryBuilder, path?: StatementValueQueryBuilder, newValue?: StatementValueQueryBuilder, createIfMissing?: StatementValueLiteral) {
        return this.pushFunction("JSONB_SET",
            target,
            path,
            newValue,
            createIfMissing === undefined ? undefined : this.toLiteralValue(createIfMissing));
    }

    /**
     * Sets item in JSONB with null handling
     * PostgreSQL: jsonb_set_lax(target, path, new_value[, create_if_missing][, null_value_treatment]) -> jsonb
     */
    jsonbSetLax(
        target?: StatementValueQueryBuilder,
        path?: StatementValueQueryBuilder,
        newValue?: StatementValueQueryBuilder,
        createIfMissing?: StatementValueLiteral,
        nullValueTreatment?: StatementValueLiteral
    ) {
        return this.pushFunction("JSONB_SET_LAX",
            target,
            path,
            newValue,
            createIfMissing === undefined ? undefined : this.toLiteralValue(createIfMissing),
            nullValueTreatment === undefined ? undefined : this.toLiteralValue(nullValueTreatment));
    }

    /**
     * Inserts into JSONB at path
     * PostgreSQL: jsonb_insert(target, path, new_value[, insert_after]) -> jsonb
     */
    jsonbInsert(target?: StatementValueQueryBuilder, path?: StatementValueQueryBuilder, newValue?: StatementValueQueryBuilder, insertAfter?: StatementValueLiteral) {
        return this.pushFunction("JSONB_INSERT",
            target,
            path,
            newValue,
            insertAfter === undefined ? undefined : this.toLiteralValue(insertAfter));
    }

    /**
     * Deletes null fields from JSON
     * PostgreSQL: json_strip_nulls(target[, strip_in_arrays]) -> json
     */
    jsonStripNulls(target?: StatementValueQueryBuilder, stripInArrays?: StatementValueLiteral) {
        return this.pushFunction("JSON_STRIP_NULLS",
            target,
            stripInArrays === undefined ? undefined : this.toLiteralValue(stripInArrays));
    }

    jsonbStripNulls(target?: StatementValueQueryBuilder, stripInArrays?: StatementValueLiteral) {
        return this.pushFunction("JSONB_STRIP_NULLS",
            target,
            stripInArrays === undefined ? undefined : this.toLiteralValue(stripInArrays));
    }

    /**
     * Checks if JSON path returns any items
     * PostgreSQL: jsonb_path_exists(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathExists(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_EXISTS",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    jsonbPathExistsTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_EXISTS_TZ",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    /**
     * Returns boolean predicate result
     * PostgreSQL: jsonb_path_match(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathMatch(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_MATCH",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    jsonbPathMatchTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_MATCH_TZ",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    /**
     * Returns all JSON items from path
     * PostgreSQL: jsonb_path_query(target, path[, vars][, silent]) -> setof jsonb
     */
    jsonbPathQuery(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_QUERY",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    jsonbPathQueryTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_QUERY_TZ",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    /**
     * Returns all JSON items as JSON array
     * PostgreSQL: jsonb_path_query_array(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryArray(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_QUERY_ARRAY",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    jsonbPathQueryArrayTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_QUERY_ARRAY_TZ",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    /**
     * Returns first JSON item from path
     * PostgreSQL: jsonb_path_query_first(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryFirst(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_QUERY_FIRST",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    jsonbPathQueryFirstTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral) {
        return this.pushFunction("JSONB_PATH_QUERY_FIRST_TZ",
            target,
            path === undefined ? undefined : this.toLiteralValue(path),
            vars === undefined ? undefined : this.toLiteralValue(vars),
            silent === undefined ? undefined : this.toLiteralValue(silent));
    }

    /**
     * Pretty-prints JSON as text
     * PostgreSQL: jsonb_pretty(jsonb) -> text
     */
    jsonbPretty(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_PRETTY", jsonb);
    }

    /**
     * Returns type of JSON value
     * PostgreSQL: json_typeof(json) -> text
     */
    jsonTypeof(json?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_TYPEOF", json);
    }

    jsonbTypeof(jsonb?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_TYPEOF", jsonb);
    }

    // ============================================================
    // JSON AGGREGATE FUNCTIONS
    // ============================================================

    /**
     * Aggregates values as JSON array
     * PostgreSQL: json_agg(expression) -> json
     */
    jsonAgg(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_AGG", expression);
    }

    jsonbAgg(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_AGG", expression);
    }

    /**
     * Aggregates name/value pairs as JSON object
     * PostgreSQL: json_object_agg(name, value) -> json
     */
    jsonObjectAgg(name?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_OBJECTAGG", name, value);
    }

    jsonbObjectAgg(name?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_OBJECTAGG", name, value);
    }
}
