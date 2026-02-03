import { ConditionalFunctionBuilder } from "./override-conditional-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";

export class ArrayFunctionBuilder extends ConditionalFunctionBuilder {
    // Override base-query-builder keyword to accept array parameter
    override cardinality(array?: StatementValueQueryBuilder) {
        return this.pushFunction("CARDINALITY", array);
    }

    // Override base-query-builder keyword to accept array(s) parameter(s)
    override unnest(...arrays: StatementValueQueryBuilder[]) {
        const filtered = arrays.filter(a => a !== undefined);
        return this.pushFunction("UNNEST", ...filtered);
    }

    // array_append(anyarray, anyelement) -> anyarray
    arrayAppend(array?: StatementValueQueryBuilder, element?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_APPEND",
            array,
            element === undefined ? undefined : this.toLiteralValue(element));
    }

    // array_cat(anyarray, anyarray) -> anyarray
    arrayCat(array1?: StatementValueQueryBuilder, array2?: StatementValueQueryBuilder) {
        return this.pushFunction("ARRAY_CAT", array1, array2);
    }

    // array_dims(anyarray) -> text
    arrayDims(array?: StatementValueQueryBuilder) {
        return this.pushFunction("ARRAY_DIMS", array);
    }

    // array_fill(anyelement, integer[][, integer[]]) -> anyarray
    arrayFill(value?: StatementValueLiteral, dimensions?: StatementValueQueryBuilder, lowerBounds?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_FILL",
            value === undefined ? undefined : this.toLiteralValue(value),
            dimensions,
            lowerBounds === undefined ? undefined : this.toLiteralValue(lowerBounds));
    }

    // array_length(anyarray, integer) -> integer
    arrayLength(array?: StatementValueQueryBuilder, dimension?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_LENGTH",
            array,
            dimension === undefined ? undefined : this.toLiteralValue(dimension));
    }

    // array_lower(anyarray, integer) -> integer
    arrayLower(array?: StatementValueQueryBuilder, dimension?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_LOWER",
            array,
            dimension === undefined ? undefined : this.toLiteralValue(dimension));
    }

    // array_ndims(anyarray) -> integer
    arrayNdims(array?: StatementValueQueryBuilder) {
        return this.pushFunction("ARRAY_NDIMS", array);
    }

    // array_position(anyarray, anyelement[, integer]) -> integer
    arrayPosition(array?: StatementValueQueryBuilder, element?: StatementValueLiteral, start?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_POSITION",
            array,
            element === undefined ? undefined : this.toLiteralValue(element),
            start === undefined ? undefined : this.toLiteralValue(start));
    }

    // array_positions(anyarray, anyelement) -> integer[]
    arrayPositions(array?: StatementValueQueryBuilder, element?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_POSITIONS",
            array,
            element === undefined ? undefined : this.toLiteralValue(element));
    }

    // array_prepend(anyelement, anyarray) -> anyarray
    arrayPrepend(element?: StatementValueLiteral, array?: StatementValueQueryBuilder) {
        return this.pushFunction("ARRAY_PREPEND",
            element === undefined ? undefined : this.toLiteralValue(element),
            array);
    }

    // array_remove(anyarray, anyelement) -> anyarray
    arrayRemove(array?: StatementValueQueryBuilder, element?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_REMOVE",
            array,
            element === undefined ? undefined : this.toLiteralValue(element));
    }

    // array_replace(anyarray, anyelement, anyelement) -> anyarray
    arrayReplace(array?: StatementValueQueryBuilder, oldElement?: StatementValueLiteral, newElement?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_REPLACE",
            array,
            oldElement === undefined ? undefined : this.toLiteralValue(oldElement),
            newElement === undefined ? undefined : this.toLiteralValue(newElement));
    }

    // array_reverse(anyarray) -> anyarray
    arrayReverse(array?: StatementValueQueryBuilder) {
        return this.pushFunction("ARRAY_REVERSE", array);
    }

    // array_sample(anyarray, integer) -> anyarray
    arraySample(array?: StatementValueQueryBuilder, n?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_SAMPLE",
            array,
            n === undefined ? undefined : this.toLiteralValue(n));
    }

    // array_shuffle(anyarray) -> anyarray
    arrayShuffle(array?: StatementValueQueryBuilder) {
        return this.pushFunction("ARRAY_SHUFFLE", array);
    }

    // array_sort(anyarray[, boolean][, boolean]) -> anyarray
    arraySort(array?: StatementValueQueryBuilder, descending?: StatementValueLiteral, nullsFirst?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_SORT",
            array,
            descending === undefined ? undefined : this.toLiteralValue(descending),
            nullsFirst === undefined ? undefined : this.toLiteralValue(nullsFirst));
    }

    // array_to_string(anyarray, text[, text]) -> text
    arrayToString(array?: StatementValueQueryBuilder, delimiter?: StatementValueLiteral, nullString?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_TO_STRING",
            array,
            delimiter === undefined ? undefined : this.toLiteralValue(delimiter),
            nullString === undefined ? undefined : this.toLiteralValue(nullString));
    }

    // array_upper(anyarray, integer) -> integer
    arrayUpper(array?: StatementValueQueryBuilder, dimension?: StatementValueLiteral) {
        return this.pushFunction("ARRAY_UPPER",
            array,
            dimension === undefined ? undefined : this.toLiteralValue(dimension));
    }

    // trim_array(anyarray, integer) -> anyarray
    override trimArray(array?: StatementValueQueryBuilder, n?: StatementValueLiteral) {
        return this.pushFunction("TRIM_ARRAY",
            array,
            n === undefined ? undefined : this.toLiteralValue(n));
    }
}
