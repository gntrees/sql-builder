import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("array functions", () => {
    it("builds cardinality", () => {
        const builder = q.select(q.cardinality(q.i("arr")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CARDINALITY(arr)");
        expect(parameters).toEqual([]);
    });

    it("builds unnest", () => {
        const builder = q.select(q.unnest(q.i("arr")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT UNNEST(arr)");
        expect(parameters).toEqual([]);
    });

    it("builds unnest with multiple arrays", () => {
        const builder = q.select(q.unnest(q.i("arr1"), q.i("arr2")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT UNNEST(arr1, arr2)");
        expect(parameters).toEqual([]);
    });

    it("builds array_append", () => {
        const builder = q.select(q.arrayAppend(q.i("arr"), 4));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_APPEND(arr, $1)");
        expect(parameters).toEqual([4]);
    });

    it("builds array_cat", () => {
        const builder = q.select(q.arrayCat(q.i("arr1"), q.i("arr2")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_CAT(arr1, arr2)");
        expect(parameters).toEqual([]);
    });

    it("builds array_dims", () => {
        const builder = q.select(q.arrayDims(q.i("arr")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_DIMS(arr)");
        expect(parameters).toEqual([]);
    });

    it("builds array_fill", () => {
        const builder = q.select(q.arrayFill(0, q.r`ARRAY[3,3]`));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_FILL($1, ARRAY[3,3])");
        expect(parameters).toEqual([0]);
    });

    it("builds array_fill with lower bounds", () => {
        const builder = q.select(q.arrayFill(0, q.r`ARRAY[3,3]`, q.r`ARRAY[2,2]`));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_FILL($1, ARRAY[3,3], ARRAY[2,2])");
        expect(parameters).toEqual([0]);
    });

    it("builds array_length", () => {
        const builder = q.select(q.arrayLength(q.i("arr"), 1));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_LENGTH(arr, $1)");
        expect(parameters).toEqual([1]);
    });

    it("builds array_lower", () => {
        const builder = q.select(q.arrayLower(q.i("arr"), 1));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_LOWER(arr, $1)");
        expect(parameters).toEqual([1]);
    });

    it("builds array_ndims", () => {
        const builder = q.select(q.arrayNdims(q.i("arr")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_NDIMS(arr)");
        expect(parameters).toEqual([]);
    });

    it("builds array_position", () => {
        const builder = q.select(q.arrayPosition(q.i("arr"), "target"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_POSITION(arr, $1)");
        expect(parameters).toEqual(["target"]);
    });

    it("builds array_position with start", () => {
        const builder = q.select(q.arrayPosition(q.i("arr"), "target", 2));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_POSITION(arr, $1, $2)");
        expect(parameters).toEqual(["target", 2]);
    });

    it("builds array_positions", () => {
        const builder = q.select(q.arrayPositions(q.i("arr"), "target"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_POSITIONS(arr, $1)");
        expect(parameters).toEqual(["target"]);
    });

    it("builds array_prepend", () => {
        const builder = q.select(q.arrayPrepend(1, q.i("arr")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_PREPEND($1, arr)");
        expect(parameters).toEqual([1]);
    });

    it("builds array_remove", () => {
        const builder = q.select(q.arrayRemove(q.i("arr"), "value"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_REMOVE(arr, $1)");
        expect(parameters).toEqual(["value"]);
    });

    it("builds array_replace", () => {
        const builder = q.select(q.arrayReplace(q.i("arr"), "old", "new"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_REPLACE(arr, $1, $2)");
        expect(parameters).toEqual(["old", "new"]);
    });

    it("builds array_reverse", () => {
        const builder = q.select(q.arrayReverse(q.i("arr")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_REVERSE(arr)");
        expect(parameters).toEqual([]);
    });

    it("builds array_sample", () => {
        const builder = q.select(q.arraySample(q.i("arr"), 5));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_SAMPLE(arr, $1)");
        expect(parameters).toEqual([5]);
    });

    it("builds array_shuffle", () => {
        const builder = q.select(q.arrayShuffle(q.i("arr")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_SHUFFLE(arr)");
        expect(parameters).toEqual([]);
    });

    it("builds array_sort", () => {
        const builder = q.select(q.arraySort(q.i("arr")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_SORT(arr)");
        expect(parameters).toEqual([]);
    });

    it("builds array_sort with descending", () => {
        const builder = q.select(q.arraySort(q.i("arr"), true));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_SORT(arr, $1)");
        expect(parameters).toEqual([true]);
    });

    it("builds array_sort with descending and nulls first", () => {
        const builder = q.select(q.arraySort(q.i("arr"), true, true));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_SORT(arr, $1, $2)");
        expect(parameters).toEqual([true, true]);
    });

    it("builds array_to_string", () => {
        const builder = q.select(q.arrayToString(q.i("arr"), ","));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_TO_STRING(arr, $1)");
        expect(parameters).toEqual([","]);
    });

    it("builds array_to_string with null string", () => {
        const builder = q.select(q.arrayToString(q.i("arr"), ",", "NULL"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_TO_STRING(arr, $1, $2)");
        expect(parameters).toEqual([",", "NULL"]);
    });

    it("builds array_upper", () => {
        const builder = q.select(q.arrayUpper(q.i("arr"), 1));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_UPPER(arr, $1)");
        expect(parameters).toEqual([1]);
    });

    it("builds trim_array", () => {
        const builder = q.select(q.trimArray(q.i("arr"), 2));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT TRIM_ARRAY(arr, $1)");
        expect(parameters).toEqual([2]);
    });
});
