import { NetworkFunctionBuilder } from "./override-network-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";
export declare class JSONFunctionBuilder extends NetworkFunctionBuilder {
    /**
     * Converts any SQL value to json or jsonb
     * PostgreSQL: to_json(anyelement) -> json
     */
    toJson(value?: StatementValueQueryBuilder): this;
    toJsonb(value?: StatementValueQueryBuilder): this;
    /**
     * Converts an SQL array to a JSON array
     * PostgreSQL: array_to_json(anyarray [, boolean]) -> json
     */
    arrayToJson(array?: StatementValueQueryBuilder, prettyPrint?: StatementValueLiteral): this;
    /**
     * Converts an SQL composite value to a JSON object
     * PostgreSQL: row_to_json(record [, boolean]) -> json
     */
    rowToJson(row?: StatementValueQueryBuilder, prettyPrint?: StatementValueLiteral): this;
    /**
     * Builds a JSON array from variadic arguments
     * PostgreSQL: json_build_array(VARIADIC "any") -> json
     */
    jsonBuildArray(...values: StatementValueLiteral[]): this;
    jsonbBuildArray(...values: StatementValueLiteral[]): this;
    /**
     * Builds a JSON object from variadic arguments (alternating key/value pairs)
     * PostgreSQL: json_build_object(VARIADIC "any") -> json
     */
    jsonBuildObject(...keyValuePairs: StatementValueLiteral[]): this;
    jsonbBuildObject(...keyValuePairs: StatementValueLiteral[]): this;
    /**
     * Builds a JSON object from a text array
     * PostgreSQL: json_object(text[]) -> json
     */
    jsonObjectFromArray(array?: StatementValueQueryBuilder): this;
    jsonbObjectFromArray(array?: StatementValueQueryBuilder): this;
    /**
     * Builds a JSON object from separate key and value arrays
     * PostgreSQL: json_object(keys[], values[]) -> json
     */
    jsonObjectFromPairs(keys?: StatementValueQueryBuilder, values?: StatementValueQueryBuilder): this;
    jsonbObjectFromPairs(keys?: StatementValueQueryBuilder, values?: StatementValueQueryBuilder): this;
    /**
     * Expands JSON array to set of json values
     * PostgreSQL: json_array_elements(json) -> setof json
     */
    jsonArrayElements(json?: StatementValueQueryBuilder): this;
    jsonbArrayElements(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Expands JSON array to set of text values
     * PostgreSQL: json_array_elements_text(json) -> setof text
     */
    jsonArrayElementsText(json?: StatementValueQueryBuilder): this;
    jsonbArrayElementsText(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Returns number of elements in JSON array
     * PostgreSQL: json_array_length(json) -> integer
     */
    jsonArrayLength(json?: StatementValueQueryBuilder): this;
    jsonbArrayLength(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Expands JSON object to set of key/value pairs
     * PostgreSQL: json_each(json) -> setof record(key text, value json)
     */
    jsonEach(json?: StatementValueQueryBuilder): this;
    jsonbEach(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Expands JSON object to set of key/value pairs (as text)
     * PostgreSQL: json_each_text(json) -> setof record(key text, value text)
     */
    jsonEachText(json?: StatementValueQueryBuilder): this;
    jsonbEachText(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Extracts JSON sub-object at specified path
     * PostgreSQL: json_extract_path(from_json, VARIADIC path_elems) -> json
     */
    jsonExtractPath(fromJson?: StatementValueQueryBuilder, ...pathElems: StatementValueLiteral[]): this;
    jsonbExtractPath(fromJsonb?: StatementValueQueryBuilder, ...pathElems: StatementValueLiteral[]): this;
    /**
     * Extracts JSON sub-object at specified path as text
     * PostgreSQL: json_extract_path_text(from_json, VARIADIC path_elems) -> text
     */
    jsonExtractPathText(fromJson?: StatementValueQueryBuilder, ...pathElems: StatementValueLiteral[]): this;
    jsonbExtractPathText(fromJsonb?: StatementValueQueryBuilder, ...pathElems: StatementValueLiteral[]): this;
    /**
     * Returns set of keys in JSON object
     * PostgreSQL: json_object_keys(json) -> setof text
     */
    jsonObjectKeys(json?: StatementValueQueryBuilder): this;
    jsonbObjectKeys(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Expands JSON object to row (composite type)
     * PostgreSQL: json_populate_record(base, from_json) -> anyelement
     */
    jsonPopulateRecord(base?: StatementValueQueryBuilder, fromJson?: StatementValueQueryBuilder): this;
    jsonbPopulateRecord(base?: StatementValueQueryBuilder, fromJsonb?: StatementValueQueryBuilder): this;
    /**
     * Tests if jsonb_populate_record would succeed
     * PostgreSQL: jsonb_populate_record_valid(base, from_jsonb) -> boolean
     */
    jsonbPopulateRecordValid(base?: StatementValueQueryBuilder, fromJsonb?: StatementValueQueryBuilder): this;
    /**
     * Expands JSON array of objects to set of rows
     * PostgreSQL: json_populate_recordset(base, from_json) -> setof anyelement
     */
    jsonPopulateRecordset(base?: StatementValueQueryBuilder, fromJson?: StatementValueQueryBuilder): this;
    jsonbPopulateRecordset(base?: StatementValueQueryBuilder, fromJsonb?: StatementValueQueryBuilder): this;
    /**
     * Expands JSON to record with AS clause
     * PostgreSQL: json_to_record(json) -> record
     */
    jsonToRecord(json?: StatementValueQueryBuilder): this;
    jsonbToRecord(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Expands JSON array to recordset
     * PostgreSQL: json_to_recordset(json) -> setof record
     */
    jsonToRecordset(json?: StatementValueQueryBuilder): this;
    jsonbToRecordset(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Sets item in JSONB at path
     * PostgreSQL: jsonb_set(target, path, new_value[, create_if_missing]) -> jsonb
     */
    jsonbSet(target?: StatementValueQueryBuilder, path?: StatementValueQueryBuilder, newValue?: StatementValueQueryBuilder, createIfMissing?: StatementValueLiteral): this;
    /**
     * Sets item in JSONB with null handling
     * PostgreSQL: jsonb_set_lax(target, path, new_value[, create_if_missing][, null_value_treatment]) -> jsonb
     */
    jsonbSetLax(target?: StatementValueQueryBuilder, path?: StatementValueQueryBuilder, newValue?: StatementValueQueryBuilder, createIfMissing?: StatementValueLiteral, nullValueTreatment?: StatementValueLiteral): this;
    /**
     * Inserts into JSONB at path
     * PostgreSQL: jsonb_insert(target, path, new_value[, insert_after]) -> jsonb
     */
    jsonbInsert(target?: StatementValueQueryBuilder, path?: StatementValueQueryBuilder, newValue?: StatementValueQueryBuilder, insertAfter?: StatementValueLiteral): this;
    /**
     * Deletes null fields from JSON
     * PostgreSQL: json_strip_nulls(target[, strip_in_arrays]) -> json
     */
    jsonStripNulls(target?: StatementValueQueryBuilder, stripInArrays?: StatementValueLiteral): this;
    jsonbStripNulls(target?: StatementValueQueryBuilder, stripInArrays?: StatementValueLiteral): this;
    /**
     * Checks if JSON path returns any items
     * PostgreSQL: jsonb_path_exists(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathExists(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    jsonbPathExistsTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    /**
     * Returns boolean predicate result
     * PostgreSQL: jsonb_path_match(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathMatch(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    jsonbPathMatchTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    /**
     * Returns all JSON items from path
     * PostgreSQL: jsonb_path_query(target, path[, vars][, silent]) -> setof jsonb
     */
    jsonbPathQuery(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    jsonbPathQueryTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    /**
     * Returns all JSON items as JSON array
     * PostgreSQL: jsonb_path_query_array(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryArray(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    jsonbPathQueryArrayTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    /**
     * Returns first JSON item from path
     * PostgreSQL: jsonb_path_query_first(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryFirst(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    jsonbPathQueryFirstTz(target?: StatementValueQueryBuilder, path?: StatementValueLiteral, vars?: StatementValueLiteral, silent?: StatementValueLiteral): this;
    /**
     * Pretty-prints JSON as text
     * PostgreSQL: jsonb_pretty(jsonb) -> text
     */
    jsonbPretty(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Returns type of JSON value
     * PostgreSQL: json_typeof(json) -> text
     */
    jsonTypeof(json?: StatementValueQueryBuilder): this;
    jsonbTypeof(jsonb?: StatementValueQueryBuilder): this;
    /**
     * Aggregates values as JSON array
     * PostgreSQL: json_agg(expression) -> json
     */
    jsonAgg(expression?: StatementValueQueryBuilder): this;
    jsonbAgg(expression?: StatementValueQueryBuilder): this;
    /**
     * Aggregates name/value pairs as JSON object
     * PostgreSQL: json_object_agg(name, value) -> json
     */
    jsonObjectAgg(name?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder): this;
    jsonbObjectAgg(name?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder): this;
}
