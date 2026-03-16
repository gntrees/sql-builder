import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("array functions", () => {
    it("builds cardinality", () => {
        const builder = q.select(q.cardinality(q.i("arr")));
        expectQuery(builder, "arrays", "cardinality");
    });

    it("builds unnest", () => {
        const builder = q.select(q.unnest(q.i("arr")));
        expectQuery(builder, "arrays", "unnest");
    });

    it("builds unnest with multiple arrays", () => {
        const builder = q.select(q.unnest(q.i("arr1"), q.i("arr2")));
        expectQuery(builder, "arrays", "unnest with multiple arrays");
    });

    it("builds array_append", () => {
        const builder = q.select(q.arrayAppend(q.i("arr"), 4));
        expectQuery(builder, "arrays", "array_append");
    });

    it("builds array_cat", () => {
        const builder = q.select(q.arrayCat(q.i("arr1"), q.i("arr2")));
        expectQuery(builder, "arrays", "array_cat");
    });

    it("builds array_dims", () => {
        const builder = q.select(q.arrayDims(q.i("arr")));
        expectQuery(builder, "arrays", "array_dims");
    });

    it("builds array_fill", () => {
        const builder = q.select(q.arrayFill(0, q.r`ARRAY[3,3]`));
        expectQuery(builder, "arrays", "array_fill");
    });

    it("builds array_fill with lower bounds", () => {
        const builder = q.select(q.arrayFill(0, q.r`ARRAY[3,3]`, q.r`ARRAY[2,2]`));
        expectQuery(builder, "arrays", "array_fill with lower bounds");
    });

    it("builds array_length", () => {
        const builder = q.select(q.arrayLength(q.i("arr"), 1));
        expectQuery(builder, "arrays", "array_length");
    });

    it("builds array_lower", () => {
        const builder = q.select(q.arrayLower(q.i("arr"), 1));
        expectQuery(builder, "arrays", "array_lower");
    });

    it("builds array_ndims", () => {
        const builder = q.select(q.arrayNdims(q.i("arr")));
        expectQuery(builder, "arrays", "array_ndims");
    });

    it("builds array_position", () => {
        const builder = q.select(q.arrayPosition(q.i("arr"), "target"));
        expectQuery(builder, "arrays", "array_position");
    });

    it("builds array_position with start", () => {
        const builder = q.select(q.arrayPosition(q.i("arr"), "target", 2));
        expectQuery(builder, "arrays", "array_position with start");
    });

    it("builds array_positions", () => {
        const builder = q.select(q.arrayPositions(q.i("arr"), "target"));
        expectQuery(builder, "arrays", "array_positions");
    });

    it("builds array_prepend", () => {
        const builder = q.select(q.arrayPrepend(1, q.i("arr")));
        expectQuery(builder, "arrays", "array_prepend");
    });

    it("builds array_remove", () => {
        const builder = q.select(q.arrayRemove(q.i("arr"), "value"));
        expectQuery(builder, "arrays", "array_remove");
    });

    it("builds array_replace", () => {
        const builder = q.select(q.arrayReplace(q.i("arr"), "old", "new"));
        expectQuery(builder, "arrays", "array_replace");
    });

    it("builds array_reverse", () => {
        const builder = q.select(q.arrayReverse(q.i("arr")));
        expectQuery(builder, "arrays", "array_reverse");
    });

    it("builds array_sample", () => {
        const builder = q.select(q.arraySample(q.i("arr"), 5));
        expectQuery(builder, "arrays", "array_sample");
    });

    it("builds array_shuffle", () => {
        const builder = q.select(q.arrayShuffle(q.i("arr")));
        expectQuery(builder, "arrays", "array_shuffle");
    });

    it("builds array_sort", () => {
        const builder = q.select(q.arraySort(q.i("arr")));
        expectQuery(builder, "arrays", "array_sort");
    });

    it("builds array_sort with descending", () => {
        const builder = q.select(q.arraySort(q.i("arr"), true));
        expectQuery(builder, "arrays", "array_sort with descending");
    });

    it("builds array_sort with descending and nulls first", () => {
        const builder = q.select(q.arraySort(q.i("arr"), true, true));
        expectQuery(builder, "arrays", "array_sort with descending and nulls first");
    });

    it("builds array_to_string", () => {
        const builder = q.select(q.arrayToString(q.i("arr"), ","));
        expectQuery(builder, "arrays", "array_to_string");
    });

    it("builds array_to_string with null string", () => {
        const builder = q.select(q.arrayToString(q.i("arr"), ",", "NULL"));
        expectQuery(builder, "arrays", "array_to_string with null string");
    });

    it("builds array_upper", () => {
        const builder = q.select(q.arrayUpper(q.i("arr"), 1));
        expectQuery(builder, "arrays", "array_upper");
    });

    it("builds trim_array", () => {
        const builder = q.select(q.trimArray(q.i("arr"), 2));
        expectQuery(builder, "arrays", "trim_array");
    });
});
