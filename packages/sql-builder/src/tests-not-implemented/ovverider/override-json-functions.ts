import { NetworkFunctionBuilder } from "./override-network-functions";
import type { Statement } from "../../types";

export class JSONFunctionBuilder extends NetworkFunctionBuilder {
    // ============================================================
    // JSON CREATION FUNCTIONS (Table 9.49)
    // ============================================================

    /**
     * Converts any SQL value to json or jsonb
     * PostgreSQL: to_json(anyelement) -> json
     */
    toJson(value?: Statement) {
        return this.pushFunction("TO_JSON", value);
    }

    toJsonb(value?: Statement) {
        return this.pushFunction("TO_JSONB", value);
    }

    /**
     * Converts an SQL array to a JSON array
     * PostgreSQL: array_to_json(anyarray [, boolean]) -> json
     */
    arrayToJson(array?: Statement, prettyPrint?: Statement) {
        return this.pushFunction("ARRAY_TO_JSON",
            array,
            prettyPrint);
    }

    /**
     * Converts an SQL composite value to a JSON object
     * PostgreSQL: row_to_json(record [, boolean]) -> json
     */
    rowToJson(row?: Statement, prettyPrint?: Statement) {
        return this.pushFunction("ROW_TO_JSON",
            row,
            prettyPrint);
    }

    /**
     * Builds a JSON array from variadic arguments
     * PostgreSQL: json_build_array(VARIADIC "any") -> json
     */
    jsonBuildArray(...values: Statement[]) {
        return this.pushFunction("JSON_BUILD_ARRAY",
            ...values);
    }

    jsonbBuildArray(...values: Statement[]) {
        return this.pushFunction("JSONB_BUILD_ARRAY",
            ...values);
    }

    /**
     * Builds a JSON object from variadic arguments (alternating key/value pairs)
     * PostgreSQL: json_build_object(VARIADIC "any") -> json
     */
    jsonBuildObject(...keyValuePairs: Statement[]) {
        return this.pushFunction("JSON_BUILD_OBJECT",
            ...keyValuePairs);
    }

    jsonbBuildObject(...keyValuePairs: Statement[]) {
        return this.pushFunction("JSONB_BUILD_OBJECT",
            ...keyValuePairs);
    }

    /**
     * Builds a JSON object from a text array
     * PostgreSQL: json_object(text[]) -> json
     */
    jsonObjectFromArray(array?: Statement) {
        return this.pushFunction("JSON_OBJECT", array);
    }

    jsonbObjectFromArray(array?: Statement) {
        return this.pushFunction("JSONB_OBJECT", array);
    }

    /**
     * Builds a JSON object from separate key and value arrays
     * PostgreSQL: json_object(keys[], values[]) -> json
     */
    jsonObjectFromPairs(keys?: Statement, values?: Statement) {
        return this.pushFunction("JSON_OBJECT", keys, values);
    }

    jsonbObjectFromPairs(keys?: Statement, values?: Statement) {
        return this.pushFunction("JSONB_OBJECT", keys, values);
    }

    // ============================================================
    // JSON PROCESSING FUNCTIONS (Table 9.51)
    // ============================================================

    /**
     * Expands JSON array to set of json values
     * PostgreSQL: json_array_elements(json) -> setof json
     */
    jsonArrayElements(json?: Statement) {
        return this.pushFunction("JSON_ARRAY_ELEMENTS", json);
    }

    jsonbArrayElements(jsonb?: Statement) {
        return this.pushFunction("JSONB_ARRAY_ELEMENTS", jsonb);
    }

    /**
     * Expands JSON array to set of text values
     * PostgreSQL: json_array_elements_text(json) -> setof text
     */
    jsonArrayElementsText(json?: Statement) {
        return this.pushFunction("JSON_ARRAY_ELEMENTS_TEXT", json);
    }

    jsonbArrayElementsText(jsonb?: Statement) {
        return this.pushFunction("JSONB_ARRAY_ELEMENTS_TEXT", jsonb);
    }

    /**
     * Returns number of elements in JSON array
     * PostgreSQL: json_array_length(json) -> integer
     */
    jsonArrayLength(json?: Statement) {
        return this.pushFunction("JSON_ARRAY_LENGTH", json);
    }

    jsonbArrayLength(jsonb?: Statement) {
        return this.pushFunction("JSONB_ARRAY_LENGTH", jsonb);
    }

    /**
     * Expands JSON object to set of key/value pairs
     * PostgreSQL: json_each(json) -> setof record(key text, value json)
     */
    jsonEach(json?: Statement) {
        return this.pushFunction("JSON_EACH", json);
    }

    jsonbEach(jsonb?: Statement) {
        return this.pushFunction("JSONB_EACH", jsonb);
    }

    /**
     * Expands JSON object to set of key/value pairs (as text)
     * PostgreSQL: json_each_text(json) -> setof record(key text, value text)
     */
    jsonEachText(json?: Statement) {
        return this.pushFunction("JSON_EACH_TEXT", json);
    }

    jsonbEachText(jsonb?: Statement) {
        return this.pushFunction("JSONB_EACH_TEXT", jsonb);
    }

    /**
     * Extracts JSON sub-object at specified path
     * PostgreSQL: json_extract_path(from_json, VARIADIC path_elems) -> json
     */
    jsonExtractPath(fromJson?: Statement, ...pathElems: Statement[]) {
        return this.pushFunction("JSON_EXTRACT_PATH",
            fromJson,
            ...pathElems);
    }

    jsonbExtractPath(fromJsonb?: Statement, ...pathElems: Statement[]) {
        return this.pushFunction("JSONB_EXTRACT_PATH",
            fromJsonb,
            ...pathElems);
    }

    /**
     * Extracts JSON sub-object at specified path as text
     * PostgreSQL: json_extract_path_text(from_json, VARIADIC path_elems) -> text
     */
    jsonExtractPathText(fromJson?: Statement, ...pathElems: Statement[]) {
        return this.pushFunction("JSON_EXTRACT_PATH_TEXT",
            fromJson,
            ...pathElems);
    }

    jsonbExtractPathText(fromJsonb?: Statement, ...pathElems: Statement[]) {
        return this.pushFunction("JSONB_EXTRACT_PATH_TEXT",
            fromJsonb,
            ...pathElems);
    }

    /**
     * Returns set of keys in JSON object
     * PostgreSQL: json_object_keys(json) -> setof text
     */
    jsonObjectKeys(json?: Statement) {
        return this.pushFunction("JSON_OBJECT_KEYS", json);
    }

    jsonbObjectKeys(jsonb?: Statement) {
        return this.pushFunction("JSONB_OBJECT_KEYS", jsonb);
    }

    /**
     * Expands JSON object to row (composite type)
     * PostgreSQL: json_populate_record(base, from_json) -> anyelement
     */
    jsonPopulateRecord(base?: Statement, fromJson?: Statement) {
        return this.pushFunction("JSON_POPULATE_RECORD", base, fromJson);
    }

    jsonbPopulateRecord(base?: Statement, fromJsonb?: Statement) {
        return this.pushFunction("JSONB_POPULATE_RECORD", base, fromJsonb);
    }

    /**
     * Tests if jsonb_populate_record would succeed
     * PostgreSQL: jsonb_populate_record_valid(base, from_jsonb) -> boolean
     */
    jsonbPopulateRecordValid(base?: Statement, fromJsonb?: Statement) {
        return this.pushFunction("JSONB_POPULATE_RECORD_VALID", base, fromJsonb);
    }

    /**
     * Expands JSON array of objects to set of rows
     * PostgreSQL: json_populate_recordset(base, from_json) -> setof anyelement
     */
    jsonPopulateRecordset(base?: Statement, fromJson?: Statement) {
        return this.pushFunction("JSON_POPULATE_RECORDSET", base, fromJson);
    }

    jsonbPopulateRecordset(base?: Statement, fromJsonb?: Statement) {
        return this.pushFunction("JSONB_POPULATE_RECORDSET", base, fromJsonb);
    }

    /**
     * Expands JSON to record with AS clause
     * PostgreSQL: json_to_record(json) -> record
     */
    jsonToRecord(json?: Statement) {
        return this.pushFunction("JSON_TO_RECORD", json);
    }

    jsonbToRecord(jsonb?: Statement) {
        return this.pushFunction("JSONB_TO_RECORD", jsonb);
    }

    /**
     * Expands JSON array to recordset
     * PostgreSQL: json_to_recordset(json) -> setof record
     */
    jsonToRecordset(json?: Statement) {
        return this.pushFunction("JSON_TO_RECORDSET", json);
    }

    jsonbToRecordset(jsonb?: Statement) {
        return this.pushFunction("JSONB_TO_RECORDSET", jsonb);
    }

    /**
     * Sets item in JSONB at path
     * PostgreSQL: jsonb_set(target, path, new_value[, create_if_missing]) -> jsonb
     */
    jsonbSet(target?: Statement, path?: Statement, newValue?: Statement, createIfMissing?: Statement) {
        return this.pushFunction("JSONB_SET",
            target,
            path,
            newValue,
            createIfMissing);
    }

    /**
     * Sets item in JSONB with null handling
     * PostgreSQL: jsonb_set_lax(target, path, new_value[, create_if_missing][, null_value_treatment]) -> jsonb
     */
    jsonbSetLax(
        target?: Statement,
        path?: Statement,
        newValue?: Statement,
        createIfMissing?: Statement,
        nullValueTreatment?: Statement
    ) {
        return this.pushFunction("JSONB_SET_LAX",
            target,
            path,
            newValue,
            createIfMissing,
            nullValueTreatment);
    }

    /**
     * Inserts into JSONB at path
     * PostgreSQL: jsonb_insert(target, path, new_value[, insert_after]) -> jsonb
     */
    jsonbInsert(target?: Statement, path?: Statement, newValue?: Statement, insertAfter?: Statement) {
        return this.pushFunction("JSONB_INSERT",
            target,
            path,
            newValue,
            insertAfter);
    }

    /**
     * Deletes null fields from JSON
     * PostgreSQL: json_strip_nulls(target[, strip_in_arrays]) -> json
     */
    jsonStripNulls(target?: Statement, stripInArrays?: Statement) {
        return this.pushFunction("JSON_STRIP_NULLS",
            target,
            stripInArrays);
    }

    jsonbStripNulls(target?: Statement, stripInArrays?: Statement) {
        return this.pushFunction("JSONB_STRIP_NULLS",
            target,
            stripInArrays);
    }

    /**
     * Checks if JSON path returns any items
     * PostgreSQL: jsonb_path_exists(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathExists(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_EXISTS",
            target,
            path,
            vars,
            silent);
    }

    jsonbPathExistsTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_EXISTS_TZ",
            target,
            path,
            vars,
            silent);
    }

    /**
     * Returns boolean predicate result
     * PostgreSQL: jsonb_path_match(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathMatch(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_MATCH",
            target,
            path,
            vars,
            silent);
    }

    jsonbPathMatchTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_MATCH_TZ",
            target,
            path,
            vars,
            silent);
    }

    /**
     * Returns all JSON items from path
     * PostgreSQL: jsonb_path_query(target, path[, vars][, silent]) -> setof jsonb
     */
    jsonbPathQuery(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_QUERY",
            target,
            path,
            vars,
            silent);
    }

    jsonbPathQueryTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_QUERY_TZ",
            target,
            path,
            vars,
            silent);
    }

    /**
     * Returns all JSON items as JSON array
     * PostgreSQL: jsonb_path_query_array(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryArray(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_QUERY_ARRAY",
            target,
            path,
            vars,
            silent);
    }

    jsonbPathQueryArrayTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_QUERY_ARRAY_TZ",
            target,
            path,
            vars,
            silent);
    }

    /**
     * Returns first JSON item from path
     * PostgreSQL: jsonb_path_query_first(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryFirst(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_QUERY_FIRST",
            target,
            path,
            vars,
            silent);
    }

    jsonbPathQueryFirstTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement) {
        return this.pushFunction("JSONB_PATH_QUERY_FIRST_TZ",
            target,
            path,
            vars,
            silent);
    }

    /**
     * Pretty-prints JSON as text
     * PostgreSQL: jsonb_pretty(jsonb) -> text
     */
    jsonbPretty(jsonb?: Statement) {
        return this.pushFunction("JSONB_PRETTY", jsonb);
    }

    /**
     * Returns type of JSON value
     * PostgreSQL: json_typeof(json) -> text
     */
    jsonTypeof(json?: Statement) {
        return this.pushFunction("JSON_TYPEOF", json);
    }

    jsonbTypeof(jsonb?: Statement) {
        return this.pushFunction("JSONB_TYPEOF", jsonb);
    }

    // ============================================================
    // JSON AGGREGATE FUNCTIONS
    // ============================================================

    /**
     * Aggregates values as JSON array
     * PostgreSQL: json_agg(expression) -> json
     */
    jsonAgg(expression?: Statement) {
        return this.pushFunction("JSON_AGG", expression);
    }

    jsonbAgg(expression?: Statement) {
        return this.pushFunction("JSONB_AGG", expression);
    }

    /**
     * Aggregates name/value pairs as JSON object
     * PostgreSQL: json_object_agg(name, value) -> json
     */
    jsonObjectAgg(name?: Statement, value?: Statement) {
        return this.pushFunction("JSON_OBJECTAGG", name, value);
    }

    jsonbObjectAgg(name?: Statement, value?: Statement) {
        return this.pushFunction("JSONB_OBJECTAGG", name, value);
    }
}
