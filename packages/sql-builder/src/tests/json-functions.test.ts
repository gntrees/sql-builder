import { describe, test, expect } from "bun:test";
import { sqlBuilder } from "../../index";

describe("JSON Functions", () => {
    const db = {
        execHandler: async () => [],
        formatParamHandler: "pg" as const,
    };
    const qb = sqlBuilder(db);

    describe("JSON Creation Functions", () => {
        test("to_json", () => {
            const query = qb.toJson(qb.l('{"a": 1, "b": 2}')).getSql();
            expect(query).toContain("TO_JSON");
        });

        test("to_jsonb", () => {
            const query = qb.toJsonb(qb.l('{"a": 1}')).getSql();
            expect(query).toContain("TO_JSONB");
        });

        test("array_to_json", () => {
            const query = qb.arrayToJson(qb.l("[1,2,3]")).getSql();
            expect(query).toContain("ARRAY_TO_JSON");
        });

        test("array_to_json with pretty print", () => {
            const query = qb.arrayToJson(qb.l("[1,2,3]"), qb.l(true)).getSql();
            expect(query).toContain("ARRAY_TO_JSON");
        });

        test("row_to_json", () => {
            const query = qb.rowToJson(qb.l("row(1, 'foo')")).getSql();
            expect(query).toContain("ROW_TO_JSON");
        });

        test("json_build_array", () => {
            const query = qb.jsonBuildArray(qb.l(1), qb.l(2), qb.l('"three"')).getSql();
            expect(query).toContain("JSON_BUILD_ARRAY");
        });

        test("jsonb_build_array", () => {
            const query = qb.jsonbBuildArray(qb.l(1), qb.l(2), qb.l(3)).getSql();
            expect(query).toContain("JSONB_BUILD_ARRAY");
        });

        test("json_build_object", () => {
            const query = qb.jsonBuildObject(qb.l("foo"), qb.l(1), qb.l("bar"), qb.l(2)).getSql();
            expect(query).toContain("JSON_BUILD_OBJECT");
        });

        test("jsonb_build_object", () => {
            const query = qb.jsonbBuildObject(qb.l("a"), qb.l(1), qb.l("b"), qb.l(2)).getSql();
            expect(query).toContain("JSONB_BUILD_OBJECT");
        });

        test("json_object from array", () => {
            const query = qb.jsonObjectFromArray(qb.l('{a, 1, b, 2}')).getSql();
            expect(query).toContain("JSON_OBJECT");
        });

        test("jsonb_object from array", () => {
            const query = qb.jsonbObjectFromArray(qb.l('{a, 1, b, 2}')).getSql();
            expect(query).toContain("JSONB_OBJECT");
        });

        test("json_object from pairs", () => {
            const query = qb.jsonObjectFromPairs(qb.l('{a,b}'), qb.l('{1,2}')).getSql();
            expect(query).toContain("JSON_OBJECT");
        });

        test("jsonb_object from pairs", () => {
            const query = qb.jsonbObjectFromPairs(qb.l('{a,b}'), qb.l('{1,2}')).getSql();
            expect(query).toContain("JSONB_OBJECT");
        });
    });

    describe("JSON Processing Functions - Array Operations", () => {
        test("json_array_elements", () => {
            const query = qb.jsonArrayElements(qb.l('[1,true,"foo"]')).getSql();
            expect(query).toContain("JSON_ARRAY_ELEMENTS");
        });

        test("jsonb_array_elements", () => {
            const query = qb.jsonbArrayElements(qb.l('[1,2,3]')).getSql();
            expect(query).toContain("JSONB_ARRAY_ELEMENTS");
        });

        test("json_array_elements_text", () => {
            const query = qb.jsonArrayElementsText(qb.l('["foo", "bar"]')).getSql();
            expect(query).toContain("JSON_ARRAY_ELEMENTS_TEXT");
        });

        test("jsonb_array_elements_text", () => {
            const query = qb.jsonbArrayElementsText(qb.l('["a", "b"]')).getSql();
            expect(query).toContain("JSONB_ARRAY_ELEMENTS_TEXT");
        });

        test("json_array_length", () => {
            const query = qb.jsonArrayLength(qb.l('[1,2,3,4,5]')).getSql();
            expect(query).toContain("JSON_ARRAY_LENGTH");
        });

        test("jsonb_array_length", () => {
            const query = qb.jsonbArrayLength(qb.l('[]')).getSql();
            expect(query).toContain("JSONB_ARRAY_LENGTH");
        });
    });

    describe("JSON Processing Functions - Object Operations", () => {
        test("json_each", () => {
            const query = qb.jsonEach(qb.l('{"a": "foo", "b": "bar"}')).getSql();
            expect(query).toContain("JSON_EACH");
        });

        test("jsonb_each", () => {
            const query = qb.jsonbEach(qb.l('{"a": 1, "b": 2}')).getSql();
            expect(query).toContain("JSONB_EACH");
        });

        test("json_each_text", () => {
            const query = qb.jsonEachText(qb.l('{"a": "foo", "b": "bar"}')).getSql();
            expect(query).toContain("JSON_EACH_TEXT");
        });

        test("jsonb_each_text", () => {
            const query = qb.jsonbEachText(qb.l('{"a": "1", "b": "2"}')).getSql();
            expect(query).toContain("JSONB_EACH_TEXT");
        });

        test("json_object_keys", () => {
            const query = qb.jsonObjectKeys(qb.l('{"f1": "abc", "f2": "def"}')).getSql();
            expect(query).toContain("JSON_OBJECT_KEYS");
        });

        test("jsonb_object_keys", () => {
            const query = qb.jsonbObjectKeys(qb.l('{"a": 1, "b": 2}')).getSql();
            expect(query).toContain("JSONB_OBJECT_KEYS");
        });
    });

    describe("JSON Processing Functions - Path Extraction", () => {
        test("json_extract_path", () => {
            const query = qb.jsonExtractPath(qb.l('{"f2": {"f3": 1}}'), qb.l("f2"), qb.l("f3")).getSql();
            expect(query).toContain("JSON_EXTRACT_PATH");
        });

        test("jsonb_extract_path", () => {
            const query = qb.jsonbExtractPath(qb.l('{"a": {"b": 1}}'), qb.l("a"), qb.l("b")).getSql();
            expect(query).toContain("JSONB_EXTRACT_PATH");
        });

        test("json_extract_path_text", () => {
            const query = qb.jsonExtractPathText(qb.l('{"f2": {"f6": "foo"}}'), qb.l("f2"), qb.l("f6")).getSql();
            expect(query).toContain("JSON_EXTRACT_PATH_TEXT");
        });

        test("jsonb_extract_path_text", () => {
            const query = qb.jsonbExtractPathText(qb.l('{"a": {"b": "value"}}'), qb.l("a"), qb.l("b")).getSql();
            expect(query).toContain("JSONB_EXTRACT_PATH_TEXT");
        });
    });

    describe("JSON Processing Functions - Record Population", () => {
        test("json_populate_record", () => {
            const query = qb.jsonPopulateRecord(qb.l("null::myrowtype"), qb.l('{"a": 1, "b": [2, 3]}')).getSql();
            expect(query).toContain("JSON_POPULATE_RECORD");
        });

        test("jsonb_populate_record", () => {
            const query = qb.jsonbPopulateRecord(qb.l("null::myrowtype"), qb.l('{"a": 1, "b": 2}')).getSql();
            expect(query).toContain("JSONB_POPULATE_RECORD");
        });

        test("jsonb_populate_record_valid", () => {
            const query = qb.jsonbPopulateRecordValid(qb.l("null::jsb_char2"), qb.l('{"a": "aa"}')).getSql();
            expect(query).toContain("JSONB_POPULATE_RECORD_VALID");
        });

        test("json_populate_recordset", () => {
            const query = qb.jsonPopulateRecordset(qb.l("null::twoints"), qb.l('[{"a": 1, "b": 2}, {"a": 3, "b": 4}]')).getSql();
            expect(query).toContain("JSON_POPULATE_RECORDSET");
        });

        test("jsonb_populate_recordset", () => {
            const query = qb.jsonbPopulateRecordset(qb.l("null::twoints"), qb.l('[{"a": 1, "b": 2}]')).getSql();
            expect(query).toContain("JSONB_POPULATE_RECORDSET");
        });

        test("json_to_record", () => {
            const query = qb.jsonToRecord(qb.l('{"a": 1, "b": [1, 2, 3]}')).getSql();
            expect(query).toContain("JSON_TO_RECORD");
        });

        test("jsonb_to_record", () => {
            const query = qb.jsonbToRecord(qb.l('{"a": 1, "b": 2}')).getSql();
            expect(query).toContain("JSONB_TO_RECORD");
        });

        test("json_to_recordset", () => {
            const query = qb.jsonToRecordset(qb.l('[{"a": 1, "b": "foo"}, {"a": 2, "c": "bar"}]')).getSql();
            expect(query).toContain("JSON_TO_RECORDSET");
        });

        test("jsonb_to_recordset", () => {
            const query = qb.jsonbToRecordset(qb.l('[{"a": 1, "b": 2}]')).getSql();
            expect(query).toContain("JSONB_TO_RECORDSET");
        });
    });

    describe("JSON Processing Functions - JSONB Modification", () => {
        test("jsonb_set", () => {
            const query = qb.jsonbSet(qb.l('{"a": 1}'), qb.l('{a}'), qb.l('2')).getSql();
            expect(query).toContain("JSONB_SET");
        });

        test("jsonb_set with create_if_missing", () => {
            const query = qb.jsonbSet(qb.l('{"a": 1}'), qb.l('{b}'), qb.l('2'), qb.l(true)).getSql();
            expect(query).toContain("JSONB_SET");
        });

        test("jsonb_set_lax", () => {
            const query = qb.jsonbSetLax(qb.l('{"a": [1, 2]}'), qb.l('{a}'), qb.l('null')).getSql();
            expect(query).toContain("JSONB_SET_LAX");
        });

        test("jsonb_set_lax with all parameters", () => {
            const query = qb.jsonbSetLax(
                qb.l('{"a": 1}'),
                qb.l('{b}'),
                qb.l('null'),
                qb.l(true),
                qb.l('delete_key')
            ).getSql();
            expect(query).toContain("JSONB_SET_LAX");
        });

        test("jsonb_insert", () => {
            const query = qb.jsonbInsert(qb.l('{"a": [0, 1, 2]}'), qb.l('{a, 1}'), qb.l('"new"')).getSql();
            expect(query).toContain("JSONB_INSERT");
        });

        test("jsonb_insert with insert_after", () => {
            const query = qb.jsonbInsert(qb.l('{"a": [0, 1, 2]}'), qb.l('{a, 1}'), qb.l('"new"'), qb.l(true)).getSql();
            expect(query).toContain("JSONB_INSERT");
        });

        test("json_strip_nulls", () => {
            const query = qb.jsonStripNulls(qb.l('[{"f1": 1, "f2": null}, 2]')).getSql();
            expect(query).toContain("JSON_STRIP_NULLS");
        });

        test("json_strip_nulls with strip_in_arrays", () => {
            const query = qb.jsonStripNulls(qb.l('[1, 2, null, 3]'), qb.l(true)).getSql();
            expect(query).toContain("JSON_STRIP_NULLS");
        });

        test("jsonb_strip_nulls", () => {
            const query = qb.jsonbStripNulls(qb.l('{"a": 1, "b": null}')).getSql();
            expect(query).toContain("JSONB_STRIP_NULLS");
        });

        test("jsonb_strip_nulls with strip_in_arrays", () => {
            const query = qb.jsonbStripNulls(qb.l('[1, null, 3]'), qb.l(true)).getSql();
            expect(query).toContain("JSONB_STRIP_NULLS");
        });
    });

    describe("JSON Processing Functions - JSON Path Query", () => {
        test("jsonb_path_exists", () => {
            const query = qb.jsonbPathExists(qb.l('{"a": [1, 2, 3]}'), qb.l('$.a[*] ? (@ > 1)')).getSql();
            expect(query).toContain("JSONB_PATH_EXISTS");
        });

        test("jsonb_path_exists with vars", () => {
            const query = qb.jsonbPathExists(
                qb.l('{"a": [1, 2, 3]}'),
                qb.l('$.a[*] ? (@ >= $min && @ <= $max)'),
                qb.l('{"min": 1, "max": 2}')
            ).getSql();
            expect(query).toContain("JSONB_PATH_EXISTS");
        });

        test("jsonb_path_exists_tz", () => {
            const query = qb.jsonbPathExistsTz(
                qb.l('[\"2015-08-01 12:00:00-05\"]'),
                qb.l('$[*] ? (@.datetime() < \"2015-08-02\".datetime())')
            ).getSql();
            expect(query).toContain("JSONB_PATH_EXISTS_TZ");
        });

        test("jsonb_path_match", () => {
            const query = qb.jsonbPathMatch(qb.l('{"a": [1, 2, 3]}'), qb.l('$.a[*] > 2')).getSql();
            expect(query).toContain("JSONB_PATH_MATCH");
        });

        test("jsonb_path_match with vars", () => {
            const query = qb.jsonbPathMatch(
                qb.l('{"a": [1, 2, 3]}'),
                qb.l('exists($.a[*] ? (@ >= $min && @ <= $max))'),
                qb.l('{"min": 1, "max": 2}')
            ).getSql();
            expect(query).toContain("JSONB_PATH_MATCH");
        });

        test("jsonb_path_match_tz", () => {
            const query = qb.jsonbPathMatchTz(qb.l('[\"2015-08-01\"]'), qb.l('$[*].datetime() < \"2015-08-02\".datetime()')).getSql();
            expect(query).toContain("JSONB_PATH_MATCH_TZ");
        });

        test("jsonb_path_query", () => {
            const query = qb.jsonbPathQuery(qb.l('{"a": [1, 2, 3]}'), qb.l('$.a[*]')).getSql();
            expect(query).toContain("JSONB_PATH_QUERY");
        });

        test("jsonb_path_query_tz", () => {
            const query = qb.jsonbPathQueryTz(qb.l('[\"2015-08-01\"]'), qb.l('$[*].datetime()')).getSql();
            expect(query).toContain("JSONB_PATH_QUERY_TZ");
        });

        test("jsonb_path_query_array", () => {
            const query = qb.jsonbPathQueryArray(qb.l('{"a": [1, 2, 3]}'), qb.l('$.a[*] ? (@ > 1)')).getSql();
            expect(query).toContain("JSONB_PATH_QUERY_ARRAY");
        });

        test("jsonb_path_query_array_tz", () => {
            const query = qb.jsonbPathQueryArrayTz(qb.l('[\"2015-08-01\"]'), qb.l('$[*].datetime()')).getSql();
            expect(query).toContain("JSONB_PATH_QUERY_ARRAY_TZ");
        });

        test("jsonb_path_query_first", () => {
            const query = qb.jsonbPathQueryFirst(qb.l('{"a": [1, 2, 3]}'), qb.l('$.a[*]')).getSql();
            expect(query).toContain("JSONB_PATH_QUERY_FIRST");
        });

        test("jsonb_path_query_first_tz", () => {
            const query = qb.jsonbPathQueryFirstTz(qb.l('[\"2015-08-01\"]'), qb.l('$[*].datetime()')).getSql();
            expect(query).toContain("JSONB_PATH_QUERY_FIRST_TZ");
        });
    });

    describe("JSON Processing Functions - Utilities", () => {
        test("jsonb_pretty", () => {
            const query = qb.jsonbPretty(qb.l('[{"f1": 1, "f2": null}, 2]')).getSql();
            expect(query).toContain("JSONB_PRETTY");
        });

        test("json_typeof", () => {
            const query = qb.jsonTypeof(qb.l('-123.4')).getSql();
            expect(query).toContain("JSON_TYPEOF");
        });

        test("jsonb_typeof", () => {
            const query = qb.jsonbTypeof(qb.l('{"a": 1}')).getSql();
            expect(query).toContain("JSONB_TYPEOF");
        });
    });

    describe("JSON Aggregate Functions", () => {
        test("json_agg", () => {
            const query = qb.jsonAgg(qb.i("column_name")).getSql();
            expect(query).toContain("JSON_AGG");
        });

        test("jsonb_agg", () => {
            const query = qb.jsonbAgg(qb.i("column_name")).getSql();
            expect(query).toContain("JSONB_AGG");
        });

        test("json_object_agg", () => {
            const query = qb.jsonObjectAgg(qb.i("key_column"), qb.i("value_column")).getSql();
            expect(query).toContain("JSON_OBJECT_AGG");
        });

        test("jsonb_object_agg", () => {
            const query = qb.jsonbObjectAgg(qb.i("key_column"), qb.i("value_column")).getSql();
            expect(query).toContain("JSONB_OBJECT_AGG");
        });
    });

    describe("Integration with Query Builder", () => {
        test("json functions in SELECT clause", () => {
            const query = qb
                .select(qb.jsonbPretty(qb.i("data_column")).as("pretty_data"))
                .from("my_table")
                .getSql();
            expect(query).toContain("JSONB_PRETTY");
            expect(query).toContain("SELECT");
            expect(query).toContain("FROM");
        });

        test("json functions in WHERE clause", () => {
            const query = qb
                .select("*")
                .from("my_table")
                .where(qb.jsonbPathExists(qb.i("data_column"), qb.l('$.a[*]')))
                .getSql();
            expect(query).toContain("JSONB_PATH_EXISTS");
            expect(query).toContain("WHERE");
        });

        test("json_typeof in ORDER BY clause", () => {
            const query = qb
                .select("*")
                .from("my_table")
                .orderBy(qb.jsonbTypeof(qb.i("data_column")))
                .getSql();
            expect(query).toContain("JSONB_TYPEOF");
            expect(query).toContain("ORDER BY");
        });

        test("json_build_object in SELECT with multiple columns", () => {
            const query = qb
                .select(
                    qb.jsonbBuildObject(qb.l("id"), qb.i("id"), qb.l("name"), qb.i("name")).as("json_data")
                )
                .from("users")
                .getSql();
            expect(query).toContain("JSONB_BUILD_OBJECT");
        });

        test("json_array_length in HAVING clause", () => {
            const query = qb
                .select("category")
                .from("products")
                .groupBy("category")
                .having(qb.jsonArrayLength(qb.i("tags")).op(">").l(3))
                .getSql();
            expect(query).toContain("JSON_ARRAY_LENGTH");
            expect(query).toContain("HAVING");
        });

        test("json_agg with GROUP BY", () => {
            const query = qb
                .select(qb.i("user_id"), qb.jsonAgg(qb.i("data")).as("all_data"))
                .from("logs")
                .groupBy("user_id")
                .getSql();
            expect(query).toContain("JSON_AGG");
            expect(query).toContain("GROUP BY");
        });
    });
});
