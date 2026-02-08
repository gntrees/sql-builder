"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONFunctionBuilder = void 0;
const override_network_functions_1 = require("./override-network-functions");
class JSONFunctionBuilder extends override_network_functions_1.NetworkFunctionBuilder {
    // ============================================================
    // JSON CREATION FUNCTIONS (Table 9.49)
    // ============================================================
    /**
     * Converts any SQL value to json or jsonb
     * PostgreSQL: to_json(anyelement) -> json
     */
    toJson(value) {
        return this.pushFunction("TO_JSON", value);
    }
    toJsonb(value) {
        return this.pushFunction("TO_JSONB", value);
    }
    /**
     * Converts an SQL array to a JSON array
     * PostgreSQL: array_to_json(anyarray [, boolean]) -> json
     */
    arrayToJson(array, prettyPrint) {
        return this.pushFunction("ARRAY_TO_JSON", array, prettyPrint === undefined ? undefined : this.toLiteral(prettyPrint));
    }
    /**
     * Converts an SQL composite value to a JSON object
     * PostgreSQL: row_to_json(record [, boolean]) -> json
     */
    rowToJson(row, prettyPrint) {
        return this.pushFunction("ROW_TO_JSON", row, prettyPrint === undefined ? undefined : this.toLiteral(prettyPrint));
    }
    /**
     * Builds a JSON array from variadic arguments
     * PostgreSQL: json_build_array(VARIADIC "any") -> json
     */
    jsonBuildArray(...values) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("JSON_BUILD_ARRAY", ...filtered.map(v => this.toLiteral(v)));
    }
    jsonbBuildArray(...values) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("JSONB_BUILD_ARRAY", ...filtered.map(v => this.toLiteral(v)));
    }
    /**
     * Builds a JSON object from variadic arguments (alternating key/value pairs)
     * PostgreSQL: json_build_object(VARIADIC "any") -> json
     */
    jsonBuildObject(...keyValuePairs) {
        const filtered = keyValuePairs.filter(v => v !== undefined && v !== null);
        return this.pushFunction("JSON_BUILD_OBJECT", ...filtered.map(v => this.toLiteral(v)));
    }
    jsonbBuildObject(...keyValuePairs) {
        const filtered = keyValuePairs.filter(v => v !== undefined && v !== null);
        return this.pushFunction("JSONB_BUILD_OBJECT", ...filtered.map(v => this.toLiteral(v)));
    }
    /**
     * Builds a JSON object from a text array
     * PostgreSQL: json_object(text[]) -> json
     */
    jsonObjectFromArray(array) {
        return this.pushFunction("JSON_OBJECT", array);
    }
    jsonbObjectFromArray(array) {
        return this.pushFunction("JSONB_OBJECT", array);
    }
    /**
     * Builds a JSON object from separate key and value arrays
     * PostgreSQL: json_object(keys[], values[]) -> json
     */
    jsonObjectFromPairs(keys, values) {
        return this.pushFunction("JSON_OBJECT", keys, values);
    }
    jsonbObjectFromPairs(keys, values) {
        return this.pushFunction("JSONB_OBJECT", keys, values);
    }
    // ============================================================
    // JSON PROCESSING FUNCTIONS (Table 9.51)
    // ============================================================
    /**
     * Expands JSON array to set of json values
     * PostgreSQL: json_array_elements(json) -> setof json
     */
    jsonArrayElements(json) {
        return this.pushFunction("JSON_ARRAY_ELEMENTS", json);
    }
    jsonbArrayElements(jsonb) {
        return this.pushFunction("JSONB_ARRAY_ELEMENTS", jsonb);
    }
    /**
     * Expands JSON array to set of text values
     * PostgreSQL: json_array_elements_text(json) -> setof text
     */
    jsonArrayElementsText(json) {
        return this.pushFunction("JSON_ARRAY_ELEMENTS_TEXT", json);
    }
    jsonbArrayElementsText(jsonb) {
        return this.pushFunction("JSONB_ARRAY_ELEMENTS_TEXT", jsonb);
    }
    /**
     * Returns number of elements in JSON array
     * PostgreSQL: json_array_length(json) -> integer
     */
    jsonArrayLength(json) {
        return this.pushFunction("JSON_ARRAY_LENGTH", json);
    }
    jsonbArrayLength(jsonb) {
        return this.pushFunction("JSONB_ARRAY_LENGTH", jsonb);
    }
    /**
     * Expands JSON object to set of key/value pairs
     * PostgreSQL: json_each(json) -> setof record(key text, value json)
     */
    jsonEach(json) {
        return this.pushFunction("JSON_EACH", json);
    }
    jsonbEach(jsonb) {
        return this.pushFunction("JSONB_EACH", jsonb);
    }
    /**
     * Expands JSON object to set of key/value pairs (as text)
     * PostgreSQL: json_each_text(json) -> setof record(key text, value text)
     */
    jsonEachText(json) {
        return this.pushFunction("JSON_EACH_TEXT", json);
    }
    jsonbEachText(jsonb) {
        return this.pushFunction("JSONB_EACH_TEXT", jsonb);
    }
    /**
     * Extracts JSON sub-object at specified path
     * PostgreSQL: json_extract_path(from_json, VARIADIC path_elems) -> json
     */
    jsonExtractPath(fromJson, ...pathElems) {
        const filtered = pathElems.filter(p => p !== undefined && p !== null);
        return this.pushFunction("JSON_EXTRACT_PATH", fromJson, ...filtered.map(p => this.toLiteral(p)));
    }
    jsonbExtractPath(fromJsonb, ...pathElems) {
        const filtered = pathElems.filter(p => p !== undefined && p !== null);
        return this.pushFunction("JSONB_EXTRACT_PATH", fromJsonb, ...filtered.map(p => this.toLiteral(p)));
    }
    /**
     * Extracts JSON sub-object at specified path as text
     * PostgreSQL: json_extract_path_text(from_json, VARIADIC path_elems) -> text
     */
    jsonExtractPathText(fromJson, ...pathElems) {
        const filtered = pathElems.filter(p => p !== undefined && p !== null);
        return this.pushFunction("JSON_EXTRACT_PATH_TEXT", fromJson, ...filtered.map(p => this.toLiteral(p)));
    }
    jsonbExtractPathText(fromJsonb, ...pathElems) {
        const filtered = pathElems.filter(p => p !== undefined && p !== null);
        return this.pushFunction("JSONB_EXTRACT_PATH_TEXT", fromJsonb, ...filtered.map(p => this.toLiteral(p)));
    }
    /**
     * Returns set of keys in JSON object
     * PostgreSQL: json_object_keys(json) -> setof text
     */
    jsonObjectKeys(json) {
        return this.pushFunction("JSON_OBJECT_KEYS", json);
    }
    jsonbObjectKeys(jsonb) {
        return this.pushFunction("JSONB_OBJECT_KEYS", jsonb);
    }
    /**
     * Expands JSON object to row (composite type)
     * PostgreSQL: json_populate_record(base, from_json) -> anyelement
     */
    jsonPopulateRecord(base, fromJson) {
        return this.pushFunction("JSON_POPULATE_RECORD", base, fromJson);
    }
    jsonbPopulateRecord(base, fromJsonb) {
        return this.pushFunction("JSONB_POPULATE_RECORD", base, fromJsonb);
    }
    /**
     * Tests if jsonb_populate_record would succeed
     * PostgreSQL: jsonb_populate_record_valid(base, from_jsonb) -> boolean
     */
    jsonbPopulateRecordValid(base, fromJsonb) {
        return this.pushFunction("JSONB_POPULATE_RECORD_VALID", base, fromJsonb);
    }
    /**
     * Expands JSON array of objects to set of rows
     * PostgreSQL: json_populate_recordset(base, from_json) -> setof anyelement
     */
    jsonPopulateRecordset(base, fromJson) {
        return this.pushFunction("JSON_POPULATE_RECORDSET", base, fromJson);
    }
    jsonbPopulateRecordset(base, fromJsonb) {
        return this.pushFunction("JSONB_POPULATE_RECORDSET", base, fromJsonb);
    }
    /**
     * Expands JSON to record with AS clause
     * PostgreSQL: json_to_record(json) -> record
     */
    jsonToRecord(json) {
        return this.pushFunction("JSON_TO_RECORD", json);
    }
    jsonbToRecord(jsonb) {
        return this.pushFunction("JSONB_TO_RECORD", jsonb);
    }
    /**
     * Expands JSON array to recordset
     * PostgreSQL: json_to_recordset(json) -> setof record
     */
    jsonToRecordset(json) {
        return this.pushFunction("JSON_TO_RECORDSET", json);
    }
    jsonbToRecordset(jsonb) {
        return this.pushFunction("JSONB_TO_RECORDSET", jsonb);
    }
    /**
     * Sets item in JSONB at path
     * PostgreSQL: jsonb_set(target, path, new_value[, create_if_missing]) -> jsonb
     */
    jsonbSet(target, path, newValue, createIfMissing) {
        return this.pushFunction("JSONB_SET", target, path, newValue, createIfMissing === undefined ? undefined : this.toLiteral(createIfMissing));
    }
    /**
     * Sets item in JSONB with null handling
     * PostgreSQL: jsonb_set_lax(target, path, new_value[, create_if_missing][, null_value_treatment]) -> jsonb
     */
    jsonbSetLax(target, path, newValue, createIfMissing, nullValueTreatment) {
        return this.pushFunction("JSONB_SET_LAX", target, path, newValue, createIfMissing === undefined ? undefined : this.toLiteral(createIfMissing), nullValueTreatment === undefined ? undefined : this.toLiteral(nullValueTreatment));
    }
    /**
     * Inserts into JSONB at path
     * PostgreSQL: jsonb_insert(target, path, new_value[, insert_after]) -> jsonb
     */
    jsonbInsert(target, path, newValue, insertAfter) {
        return this.pushFunction("JSONB_INSERT", target, path, newValue, insertAfter === undefined ? undefined : this.toLiteral(insertAfter));
    }
    /**
     * Deletes null fields from JSON
     * PostgreSQL: json_strip_nulls(target[, strip_in_arrays]) -> json
     */
    jsonStripNulls(target, stripInArrays) {
        return this.pushFunction("JSON_STRIP_NULLS", target, stripInArrays === undefined ? undefined : this.toLiteral(stripInArrays));
    }
    jsonbStripNulls(target, stripInArrays) {
        return this.pushFunction("JSONB_STRIP_NULLS", target, stripInArrays === undefined ? undefined : this.toLiteral(stripInArrays));
    }
    /**
     * Checks if JSON path returns any items
     * PostgreSQL: jsonb_path_exists(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathExists(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_EXISTS", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    jsonbPathExistsTz(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_EXISTS_TZ", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    /**
     * Returns boolean predicate result
     * PostgreSQL: jsonb_path_match(target, path[, vars][, silent]) -> boolean
     */
    jsonbPathMatch(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_MATCH", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    jsonbPathMatchTz(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_MATCH_TZ", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    /**
     * Returns all JSON items from path
     * PostgreSQL: jsonb_path_query(target, path[, vars][, silent]) -> setof jsonb
     */
    jsonbPathQuery(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_QUERY", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    jsonbPathQueryTz(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_QUERY_TZ", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    /**
     * Returns all JSON items as JSON array
     * PostgreSQL: jsonb_path_query_array(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryArray(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_QUERY_ARRAY", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    jsonbPathQueryArrayTz(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_QUERY_ARRAY_TZ", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    /**
     * Returns first JSON item from path
     * PostgreSQL: jsonb_path_query_first(target, path[, vars][, silent]) -> jsonb
     */
    jsonbPathQueryFirst(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_QUERY_FIRST", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    jsonbPathQueryFirstTz(target, path, vars, silent) {
        return this.pushFunction("JSONB_PATH_QUERY_FIRST_TZ", target, path === undefined ? undefined : this.toLiteral(path), vars === undefined ? undefined : this.toLiteral(vars), silent === undefined ? undefined : this.toLiteral(silent));
    }
    /**
     * Pretty-prints JSON as text
     * PostgreSQL: jsonb_pretty(jsonb) -> text
     */
    jsonbPretty(jsonb) {
        return this.pushFunction("JSONB_PRETTY", jsonb);
    }
    /**
     * Returns type of JSON value
     * PostgreSQL: json_typeof(json) -> text
     */
    jsonTypeof(json) {
        return this.pushFunction("JSON_TYPEOF", json);
    }
    jsonbTypeof(jsonb) {
        return this.pushFunction("JSONB_TYPEOF", jsonb);
    }
    // ============================================================
    // JSON AGGREGATE FUNCTIONS
    // ============================================================
    /**
     * Aggregates values as JSON array
     * PostgreSQL: json_agg(expression) -> json
     */
    jsonAgg(expression) {
        return this.pushFunction("JSON_AGG", expression);
    }
    jsonbAgg(expression) {
        return this.pushFunction("JSONB_AGG", expression);
    }
    /**
     * Aggregates name/value pairs as JSON object
     * PostgreSQL: json_object_agg(name, value) -> json
     */
    jsonObjectAgg(name, value) {
        return this.pushFunction("JSON_OBJECTAGG", name, value);
    }
    jsonbObjectAgg(name, value) {
        return this.pushFunction("JSONB_OBJECTAGG", name, value);
    }
}
exports.JSONFunctionBuilder = JSONFunctionBuilder;
