import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("JSON Functions", () => {
    describe("JSON Creation Functions", () => {
        it("builds to_json", () => {
            const builder = q.select(q.toJson(q.l('{"a": 1, "b": 2}')));
            expectQuery(builder, "json", "to_json");
        });

        it("builds to_jsonb", () => {
            const builder = q.select(q.toJsonb(q.l('{"a": 1}')));
            expectQuery(builder, "json", "to_jsonb");
        });

        it("builds array_to_json", () => {
            const builder = q.select(q.arrayToJson(q.l("[1,2,3]")));
            expectQuery(builder, "json", "array_to_json");
        });

        it("builds array_to_json with pretty print", () => {
            const builder = q.select(q.arrayToJson(q.l("[1,2,3]"), q.l(true)));
            expectQuery(builder, "json", "array_to_json with pretty print");
        });

        it("builds row_to_json", () => {
            const builder = q.select(q.rowToJson(q.l("row(1, 'foo')")));
            expectQuery(builder, "json", "row_to_json");
        });

        it("builds json_build_array", () => {
            const builder = q.select(q.jsonBuildArray(q.l(1), q.l(2), q.l('"three"')));
            expectQuery(builder, "json", "json_build_array");
        });

        it("builds jsonb_build_array", () => {
            const builder = q.select(q.jsonbBuildArray(q.l(1), q.l(2), q.l(3)));
            expectQuery(builder, "json", "jsonb_build_array");
        });

        it("builds json_build_object", () => {
            const builder = q.select(q.jsonBuildObject(q.l("foo"), q.l(1), q.l("bar"), q.l(2)));
            expectQuery(builder, "json", "json_build_object");
        });

        it("builds jsonb_build_object", () => {
            const builder = q.select(q.jsonbBuildObject(q.l("a"), q.l(1), q.l("b"), q.l(2)));
            expectQuery(builder, "json", "jsonb_build_object");
        });

        it("builds json_object from array", () => {
            const builder = q.select(q.jsonObject(q.l('{a, 1, b, 2}')));
            expectQuery(builder, "json", "json_object from array");
        });

        it("builds jsonb_object from array", () => {
            const builder = q.select(q.jsonbObject(q.l('{a, 1, b, 2}')));
            expectQuery(builder, "json", "jsonb_object from array");
        });

        it("builds json_object from pairs", () => {
            const builder = q.select(q.jsonObject(q.l('{a,b}'), q.l('{1,2}')));
            expectQuery(builder, "json", "json_object from pairs");
        });

        it("builds jsonb_object from pairs", () => {
            const builder = q.select(q.jsonbObject(q.l('{a,b}'), q.l('{1,2}')));
            expectQuery(builder, "json", "jsonb_object from pairs");
        });
    });

    describe("JSON Processing Functions - Array Operations", () => {
        it("builds json_array_elements", () => {
            const builder = q.select(q.jsonArrayElements(q.l('[1,true,"foo"]')));
            expectQuery(builder, "json", "json_array_elements");
        });

        it("builds jsonb_array_elements", () => {
            const builder = q.select(q.jsonbArrayElements(q.l('[1,2,3]')));
            expectQuery(builder, "json", "jsonb_array_elements");
        });

        it("builds json_array_elements_text", () => {
            const builder = q.select(q.jsonArrayElementsText(q.l('["foo", "bar"]')));
            expectQuery(builder, "json", "json_array_elements_text");
        });

        it("builds jsonb_array_elements_text", () => {
            const builder = q.select(q.jsonbArrayElementsText(q.l('["a", "b"]')));
            expectQuery(builder, "json", "jsonb_array_elements_text");
        });

        it("builds json_array_length", () => {
            const builder = q.select(q.jsonArrayLength(q.l('[1,2,3,4,5]')));
            expectQuery(builder, "json", "json_array_length");
        });

        it("builds jsonb_array_length", () => {
            const builder = q.select(q.jsonbArrayLength(q.l('[]')));
            expectQuery(builder, "json", "jsonb_array_length");
        });
    });

    describe("JSON Processing Functions - Object Operations", () => {
        it("builds json_each", () => {
            const builder = q.select(q.jsonEach(q.l('{"a": "foo", "b": "bar"}')));
            expectQuery(builder, "json", "json_each");
        });

        it("builds jsonb_each", () => {
            const builder = q.select(q.jsonbEach(q.l('{"a": 1, "b": 2}')));
            expectQuery(builder, "json", "jsonb_each");
        });

        it("builds json_each_text", () => {
            const builder = q.select(q.jsonEachText(q.l('{"a": "foo", "b": "bar"}')));
            expectQuery(builder, "json", "json_each_text");
        });

        it("builds jsonb_each_text", () => {
            const builder = q.select(q.jsonbEachText(q.l('{"a": "1", "b": "2"}')));
            expectQuery(builder, "json", "jsonb_each_text");
        });

        it("builds json_object_keys", () => {
            const builder = q.select(q.jsonObjectKeys(q.l('{"f1": "abc", "f2": "def"}')));
            expectQuery(builder, "json", "json_object_keys");
        });

        it("builds jsonb_object_keys", () => {
            const builder = q.select(q.jsonbObjectKeys(q.l('{"a": 1, "b": 2}')));
            expectQuery(builder, "json", "jsonb_object_keys");
        });
    });

    describe("JSON Processing Functions - Path Extraction", () => {
        it("builds json_extract_path", () => {
            const builder = q.select(q.jsonExtractPath(q.l('{"f2": {"f3": 1}}'), q.l("f2"), q.l("f3")));
            expectQuery(builder, "json", "json_extract_path");
        });

        it("builds jsonb_extract_path", () => {
            const builder = q.select(q.jsonbExtractPath(q.l('{"a": {"b": 1}}'), q.l("a"), q.l("b")));
            expectQuery(builder, "json", "jsonb_extract_path");
        });

        it("builds json_extract_path_text", () => {
            const builder = q.select(q.jsonExtractPathText(q.l('{"f2": {"f6": "foo"}}'), q.l("f2"), q.l("f6")));
            expectQuery(builder, "json", "json_extract_path_text");
        });

        it("builds jsonb_extract_path_text", () => {
            const builder = q.select(q.jsonbExtractPathText(q.l('{"a": {"b": "value"}}'), q.l("a"), q.l("b")));
            expectQuery(builder, "json", "jsonb_extract_path_text");
        });
    });

    describe("JSON Processing Functions - Record Population", () => {
        it("builds json_populate_record", () => {
            const builder = q.select(q.jsonPopulateRecord(q.l("null::myrowtype"), q.l('{"a": 1, "b": [2, 3]}')));
            expectQuery(builder, "json", "json_populate_record");
        });

        it("builds jsonb_populate_record", () => {
            const builder = q.select(q.jsonbPopulateRecord(q.l("null::myrowtype"), q.l('{"a": 1, "b": 2}')));
            expectQuery(builder, "json", "jsonb_populate_record");
        });

        it("builds jsonb_populate_record_valid", () => {
            const builder = q.select(q.jsonbPopulateRecordValid(q.l("null::jsb_char2"), q.l('{"a": "aa"}')));
            expectQuery(builder, "json", "jsonb_populate_record_valid");
        });

        it("builds json_populate_recordset", () => {
            const builder = q.select(q.jsonPopulateRecordset(q.l("null::twoints"), q.l('[{"a": 1, "b": 2}, {"a": 3, "b": 4}]')));
            expectQuery(builder, "json", "json_populate_recordset");
        });

        it("builds jsonb_populate_recordset", () => {
            const builder = q.select(q.jsonbPopulateRecordset(q.l("null::twoints"), q.l('[{"a": 1, "b": 2}]')));
            expectQuery(builder, "json", "jsonb_populate_recordset");
        });

        it("builds json_to_record", () => {
            const builder = q.select(q.jsonToRecord(q.l('{"a": 1, "b": [1, 2, 3]}')));
            expectQuery(builder, "json", "json_to_record");
        });

        it("builds jsonb_to_record", () => {
            const builder = q.select(q.jsonbToRecord(q.l('{"a": 1, "b": 2}')));
            expectQuery(builder, "json", "jsonb_to_record");
        });

        it("builds json_to_recordset", () => {
            const builder = q.select(q.jsonToRecordset(q.l('[{"a": 1, "b": "foo"}, {"a": 2, "c": "bar"}]')));
            expectQuery(builder, "json", "json_to_recordset");
        });

        it("builds jsonb_to_recordset", () => {
            const builder = q.select(q.jsonbToRecordset(q.l('[{"a": 1, "b": 2}]')));
            expectQuery(builder, "json", "jsonb_to_recordset");
        });
    });

    describe("JSON Processing Functions - JSONB Modification", () => {
        it("builds jsonb_set", () => {
            const builder = q.select(q.jsonbSet(q.l('{"a": 1}'), q.l('{a}'), q.l('2')));
            expectQuery(builder, "json", "jsonb_set");
        });

        it("builds jsonb_set with create_if_missing", () => {
            const builder = q.select(q.jsonbSet(q.l('{"a": 1}'), q.l('{b}'), q.l('2'), q.l(true)));
            expectQuery(builder, "json", "jsonb_set with create_if_missing");
        });

        it("builds jsonb_set_lax", () => {
            const builder = q.select(q.jsonbSetLax(q.l('{"a": [1, 2]}'), q.l('{a}'), q.l('null')));
            expectQuery(builder, "json", "jsonb_set_lax");
        });

        it("builds jsonb_set_lax with all parameters", () => {
            const builder = q.select(
                q.jsonbSetLax(
                    q.l('{"a": 1}'),
                    q.l('{b}'),
                    q.l('null'),
                    q.l(true),
                    q.l('delete_key')
                )
            );
            expectQuery(builder, "json", "jsonb_set_lax with all parameters");
        });

        it("builds jsonb_insert", () => {
            const builder = q.select(q.jsonbInsert(q.l('{"a": [0, 1, 2]}'), q.l('{a, 1}'), q.l('"new"')));
            expectQuery(builder, "json", "jsonb_insert");
        });

        it("builds jsonb_insert with insert_after", () => {
            const builder = q.select(q.jsonbInsert(q.l('{"a": [0, 1, 2]}'), q.l('{a, 1}'), q.l('"new"'), q.l(true)));
            expectQuery(builder, "json", "jsonb_insert with insert_after");
        });

        it("builds json_strip_nulls", () => {
            const builder = q.select(q.jsonStripNulls(q.l('[{"f1": 1, "f2": null}, 2]')));
            expectQuery(builder, "json", "json_strip_nulls");
        });

        it("builds json_strip_nulls with strip_in_arrays", () => {
            const builder = q.select(q.jsonStripNulls(q.l('[1, 2, null, 3]'), q.l(true)));
            expectQuery(builder, "json", "json_strip_nulls with strip_in_arrays");
        });

        it("builds jsonb_strip_nulls", () => {
            const builder = q.select(q.jsonbStripNulls(q.l('{"a": 1, "b": null}')));
            expectQuery(builder, "json", "jsonb_strip_nulls");
        });

        it("builds jsonb_strip_nulls with strip_in_arrays", () => {
            const builder = q.select(q.jsonbStripNulls(q.l('[1, null, 3]'), q.l(true)));
            expectQuery(builder, "json", "jsonb_strip_nulls with strip_in_arrays");
        });
    });

    describe("JSON Processing Functions - JSON Path Query", () => {
        it("builds jsonb_path_exists", () => {
            const builder = q.select(q.jsonbPathExists(q.l('{"a": [1, 2, 3]}'), q.l('$.a[*] ? (@ > 1)')));
            expectQuery(builder, "json", "jsonb_path_exists");
        });

        it("builds jsonb_path_exists with vars", () => {
            const builder = q.select(
                q.jsonbPathExists(
                    q.l('{"a": [1, 2, 3]}'),
                    q.l('$.a[*] ? (@ >= $min && @ <= $max)'),
                    q.l('{"min": 1, "max": 2}')
                )
            );
            expectQuery(builder, "json", "jsonb_path_exists with vars");
        });

        it("builds jsonb_path_exists_tz", () => {
            const builder = q.select(
                q.jsonbPathExistsTz(
                    q.l('[\"2015-08-01 12:00:00-05\"]'),
                    q.l('$[*] ? (@.datetime() < \"2015-08-02\".datetime())')
                )
            );
            expectQuery(builder, "json", "jsonb_path_exists_tz");
        });

        it("builds jsonb_path_match", () => {
            const builder = q.select(q.jsonbPathMatch(q.l('{"a": [1, 2, 3]}'), q.l('$.a[*] > 2')));
            expectQuery(builder, "json", "jsonb_path_match");
        });

        it("builds jsonb_path_match with vars", () => {
            const builder = q.select(
                q.jsonbPathMatch(
                    q.l('{"a": [1, 2, 3]}'),
                    q.l('exists($.a[*] ? (@ >= $min && @ <= $max))'),
                    q.l('{"min": 1, "max": 2}')
                )
            );
            expectQuery(builder, "json", "jsonb_path_match with vars");
        });

        it("builds jsonb_path_match_tz", () => {
            const builder = q.select(q.jsonbPathMatchTz(q.l('[\"2015-08-01\"]'), q.l('$[*].datetime() < \"2015-08-02\".datetime()')));
            expectQuery(builder, "json", "jsonb_path_match_tz");
        });

        it("builds jsonb_path_query", () => {
            const builder = q.select(q.jsonbPathQuery(q.l('{"a": [1, 2, 3]}'), q.l('$.a[*]')));
            expectQuery(builder, "json", "jsonb_path_query");
        });

        it("builds jsonb_path_query_tz", () => {
            const builder = q.select(q.jsonbPathQueryTz(q.l('[\"2015-08-01\"]'), q.l('$[*].datetime()')));
            expectQuery(builder, "json", "jsonb_path_query_tz");
        });

        it("builds jsonb_path_query_array", () => {
            const builder = q.select(q.jsonbPathQueryArray(q.l('{"a": [1, 2, 3]}'), q.l('$.a[*] ? (@ > 1)')));
            expectQuery(builder, "json", "jsonb_path_query_array");
        });

        it("builds jsonb_path_query_array_tz", () => {
            const builder = q.select(q.jsonbPathQueryArrayTz(q.l('[\"2015-08-01\"]'), q.l('$[*].datetime()')));
            expectQuery(builder, "json", "jsonb_path_query_array_tz");
        });

        it("builds jsonb_path_query_first", () => {
            const builder = q.select(q.jsonbPathQueryFirst(q.l('{"a": [1, 2, 3]}'), q.l('$.a[*]')));
            expectQuery(builder, "json", "jsonb_path_query_first");
        });

        it("builds jsonb_path_query_first_tz", () => {
            const builder = q.select(q.jsonbPathQueryFirstTz(q.l('[\"2015-08-01\"]'), q.l('$[*].datetime()')));
            expectQuery(builder, "json", "jsonb_path_query_first_tz");
        });
    });

    describe("JSON Processing Functions - Utilities", () => {
        it("builds jsonb_pretty", () => {
            const builder = q.select(q.jsonbPretty(q.l('[{"f1": 1, "f2": null}, 2]')));
            expectQuery(builder, "json", "jsonb_pretty");
        });

        it("builds json_typeof", () => {
            const builder = q.select(q.jsonTypeof(q.l('-123.4')));
            expectQuery(builder, "json", "json_typeof");
        });

        it("builds jsonb_typeof", () => {
            const builder = q.select(q.jsonbTypeof(q.l('{"a": 1}')));
            expectQuery(builder, "json", "jsonb_typeof");
        });
    });

    describe("JSON Aggregate Functions", () => {
        it("builds json_agg", () => {
            const builder = q.select(q.jsonAgg(q.i("column_name")));
            expectQuery(builder, "json", "json_agg");
        });

        it("builds jsonb_agg", () => {
            const builder = q.select(q.jsonbAgg(q.i("column_name")));
            expectQuery(builder, "json", "jsonb_agg");
        });

        it("builds json_object_agg", () => {
            const builder = q.select(q.jsonObjectAgg(q.i("key_column"), q.i("value_column")));
            expectQuery(builder, "json", "json_object_agg");
        });

        it("builds jsonb_object_agg", () => {
            const builder = q.select(q.jsonbObjectAgg(q.i("key_column"), q.i("value_column")));
            expectQuery(builder, "json", "jsonb_object_agg");
        });
    });

    describe("Integration with Query Builder", () => {
        it("builds json functions in SELECT clause", () => {
            const builder = q
                .select(q.jsonbPretty(q.i("data_column")).as(q.c("pretty_data")))
                .from(q.t("my_table"));
            expectQuery(builder, "json", "json functions in SELECT clause");
        });

        it("builds json functions in WHERE clause", () => {
            const builder = q
                .select("*")
                .from(q.t("my_table"))
                .where(q.jsonbPathExists(q.i("data_column"), q.l('$.a[*]')));
            expectQuery(builder, "json", "json functions in WHERE clause");
        });

        it("builds json_typeof in ORDER BY clause", () => {
            const builder = q
                .select("*")
                .from(q.t("my_table"))
                .orderBy(q.jsonbTypeof(q.i("data_column")));
            expectQuery(builder, "json", "json_typeof in ORDER BY clause");
        });

        it("builds json_build_object in SELECT with multiple columns", () => {
            const builder = q
                .select(
                    q.jsonbBuildObject(q.l("id"), q.i("id"), q.l("name"), q.i("name")).as(q.c("json_data"))
                )
                .from(q.t("users"));
            expectQuery(builder, "json", "json_build_object in SELECT with multiple columns");
        });

        it("builds json_array_length in HAVING clause", () => {
            const builder = q
                .select(q.c("category"))
                .from(q.t("products"))
                .groupBy(q.c("category"))
                .having(q.jsonArrayLength(q.i("tags")).op(">").l(3));
            expectQuery(builder, "json", "json_array_length in HAVING clause");
        });

        it("builds json_agg with GROUP BY", () => {
            const builder = q
                .select(q.i("user_id"), q.jsonAgg(q.i("data")).as(q.c("all_data")))
                .from(q.t("logs"))
                .groupBy(q.c("user_id"));
            expectQuery(builder, "json", "json_agg with GROUP BY");
        });
    });
});
