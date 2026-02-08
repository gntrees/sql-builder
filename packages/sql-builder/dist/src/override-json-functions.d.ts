import { NetworkFunctionBuilder } from "./override-network-functions";
import type { Statement } from "./types";
export declare class JSONFunctionBuilder extends NetworkFunctionBuilder {
    /**
     * Converts any SQL value to json or jsonb
     * PostgreSQL: to_json(anyelement) -> json
     */
    toJson(value?: Statement): this;
    toJsonb(value?: Statement): this;
    /**
     * Converts an SQL array to a JSON array
     * PostgreSQL: array_to_json(anyarray [, boolean]) -> json
     */
    arrayToJson(array?: Statement, prettyPrint?: Statement): this;
    /**
     * Converts an SQL composite value to a JSON object
     * PostgreSQL: row_to_json(record [, boolean]) -> json
     */
    rowToJson(row?: Statement, prettyPrint?: Statement): this;
    /**
     * Builds a JSON array from variadic arguments
     * PostgreSQL: json_build_array(VARIADIC "any") -> json
     */
    jsonBuildArray(...values: Statement[]): this;
    jsonbBuildArray(...values: Statement[]): this;
    /**
     * Builds a JSON object from variadic arguments (alternating key/value pairs)
     * PostgreSQL: json_build_object(VARIADIC "any") -> json
     */
    jsonBuildObject(...keyValuePairs: Statement[]): this;
    jsonbBuildObject(...keyValuePairs: Statement[]): this;
    /**
     * Builds a JSON object from a text array
     * PostgreSQL: json_object(text[]) -> json
     */
    jsonObjectFromArray(array?: Statement): this;
    jsonbObjectFromArray(array?: Statement): this;
    /**
     * Builds a JSON object from separate key and value arrays
     * PostgreSQL: json_object(keys[], values[]) -> json
     */
    jsonObjectFromPairs(keys?: Statement, values?: Statement): this;
    jsonbObjectFromPairs(keys?: Statement, values?: Statement): this;
    /**
     * Expands JSON array to set of json values
     * PostgreSQL: json_array_elements(json) -> setof json
     */
    jsonArrayElements(json?: Statement): this;
    jsonbArrayElements(jsonb?: Statement): this;
    /**
     * Expands JSON array to set of text values
     * PostgreSQL: json_array_elements_text(json) -> setof text
     */
    jsonArrayElementsText(json?: Statement): this;
    jsonbArrayElementsText(jsonb?: Statement): this;
    /**
     * Returns number of elements in JSON array
     * PostgreSQL: json_array_length(json) -> integer
     */
    jsonArrayLength(json?: Statement): this;
    jsonbArrayLength(jsonb?: Statement): this;
    /**
     * Expands JSON object to set of key/value pairs
     * PostgreSQL: json_each(json) -> setof record(key text, value json)
     */
    jsonEach(json?: Statement): this;
    jsonbEach(jsonb?: Statement): this;
    /**
     * Expands JSON object to set of key/value pairs (as text)
     * PostgreSQL: json_each_text(json) -> setof record(key text, value text)
     */
    jsonEachText(json?: Statement): this;
    jsonbEachText(jsonb?: Statement): this;
    /**
     * Extracts JSON sub-object at specified path
     * PostgreSQL: json_extract_path(from_json, VARIADIC path_elems) -> json
     */
    jsonExtractPath(fromJson?: Statement, ...pathElems: Statement[]): this;
    jsonbExtractPath(fromJsonb?: Statement, ...pathElems: Statement[]): this;
    /**
     * Extracts JSON sub-object at specified path as text
     * PostgreSQL: json_extract_path_text(from_json, VARIADIC path_elems) -> text
     */
    jsonExtractPathText(fromJson?: Statement, ...pathElems: Statement[]): this;
    jsonbExtractPathText(fromJsonb?: Statement, ...pathElems: Statement[]): this;
    /**
     * Returns set of keys in JSON object
     * PostgreSQL: json_object_keys(json) -> setof text
     */
    jsonObjectKeys(json?: Statement): this;
    jsonbObjectKeys(jsonb?: Statement): this;
    /**
     * Expands JSON object to row (composite type)
     * PostgreSQL: json_populate_record(base, from_json) -> anyelement
     */
    jsonPopulateRecord(base?: Statement, fromJson?: Statement): this;
    jsonbPopulateRecord(base?: Statement, fromJsonb?: Statement): this;
    /**
     * Tests if jsonb_populate_record would succeed
     * PostgreSQL: jsonb_populate_record_valid(base, from_jsonb) -> boolean
     */
    jsonbPopulateRecordValid(base?: Statement, fromJsonb?: Statement): this;
    /**
     * Expands JSON array of objects to set of rows
     * PostgreSQL: json_populate_recordset(base, from_json) -> setof anyelement
     */
    jsonPopulateRecordset(base?: Statement, fromJson?: Statement): this;
    jsonbPopulateRecordset(base?: Statement, fromJsonb?: Statement): this;
    /**
     * Expands JSON to record with AS clause
     * PostgreSQL: json_to_record(json) -> record
     */
    jsonToRecord(json?: Statement): this;
    jsonbToRecord(jsonb?: Statement): this;
    /**
     * Expands JSON array to recordset
     * PostgreSQL: json_to_recordset(json) -> setof record
     */
    jsonToRecordset(json?: Statement): this;
    jsonbToRecordset(jsonb?: Statement): this;
    /**
     * Sets item in JSONB at path
     * PostgreSQL: jsonb_set(target, path, new_value[, create_if_missing]) -> jsonb
     */
    jsonbSet(target?: Statement, path?: Statement, newValue?: Statement, createIfMissing?: Statement): this;
    /**
     * Sets item in JSONB with null handling
     * PostgreSQL: jsonb_set_lax(target, path, new_value[, create_if_missing][, null_value_treatment]) -> jsonb
     */
    jsonbSetLax(target?: Statement, path?: Statement, newValue?: Statement, createIfMissing?: Statement, nullValueTreatment?: Statement): this;
    /**
     * Inserts into JSONB at path
     * PostgreSQL: jsonb_insert(target, path, new_value[, insert_after]) -> jsonb
     */
    jsonbInsert(target?: Statement, path?: Statement, newValue?: Statement, insertAfter?: Statement): this;
    /**
     * Deletes null fields from JSON
     * PostgreSQL: json_strip_nulls(target[, strip_in_arrays]) -> json
     */
    jsonStripNulls(target?: Statement, stripInArrays?: Statement): this;
    jsonbStripNulls(target?: Statement, stripInArrays?: Statement): this;
    /**
     * Checks if JSON path returns any items
     * PostgreSQL: jsonb_path_exists(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathExists(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    jsonbPathExistsTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    /**
     * Returns boolean predicate result
     * PostgreSQL: jsonb_path_match(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathMatch(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    jsonbPathMatchTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    /**
     * Returns all JSON items from path
     * PostgreSQL: jsonb_path_query(target, path[, vars][, silent]) -> setof jsonb
     */
    jsonbPathQuery(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    jsonbPathQueryTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    /**
     * Returns all JSON items as JSON array
     * PostgreSQL: jsonb_path_query_array(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryArray(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    jsonbPathQueryArrayTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    /**
     * Returns first JSON item from path
     * PostgreSQL: jsonb_path_query_first(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryFirst(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    jsonbPathQueryFirstTz(target?: Statement, path?: Statement, vars?: Statement, silent?: Statement): this;
    /**
     * Pretty-prints JSON as text
     * PostgreSQL: jsonb_pretty(jsonb) -> text
     */
    jsonbPretty(jsonb?: Statement): this;
    /**
     * Returns type of JSON value
     * PostgreSQL: json_typeof(json) -> text
     */
    jsonTypeof(json?: Statement): this;
    jsonbTypeof(jsonb?: Statement): this;
    /**
     * Aggregates values as JSON array
     * PostgreSQL: json_agg(expression) -> json
     */
    jsonAgg(expression?: Statement): this;
    jsonbAgg(expression?: Statement): this;
    /**
     * Aggregates name/value pairs as JSON object
     * PostgreSQL: json_object_agg(name, value) -> json
     */
    jsonObjectAgg(name?: Statement, value?: Statement): this;
    jsonbObjectAgg(name?: Statement, value?: Statement): this;
}
