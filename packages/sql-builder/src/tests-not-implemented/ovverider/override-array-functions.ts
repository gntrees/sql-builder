import { ConditionalFunctionBuilder } from "./override-conditional-functions";
import type { Statement } from "../../types";

export class ArrayFunctionBuilder extends ConditionalFunctionBuilder {
    // Override base-query-builder keyword to accept array parameter
    override cardinality(array?: Statement) {
        return this.pushFunction("CARDINALITY", array);
    }

    // Override base-query-builder keyword to accept array(s) parameter(s)
    override unnest(...arrays: Statement[]) {
        const filtered = arrays.filter(a => a !== undefined);
        return this.pushFunction("UNNEST", ...filtered);
    }

    // array_append(anyarray, anyelement) -> anyarray
    arrayAppend(array?: Statement, element?: Statement) {
        return this.pushFunction("ARRAY_APPEND",
            array, element);
    }

    // array_cat(anyarray, anyarray) -> anyarray
    arrayCat(array1?: Statement, array2?: Statement) {
        return this.pushFunction("ARRAY_CAT", array1, array2);
    }

    // array_dims(anyarray) -> text
    arrayDims(array?: Statement) {
        return this.pushFunction("ARRAY_DIMS", array);
    }

    // array_fill(anyelement, integer[][, integer[]]) -> anyarray
    arrayFill(value?: Statement, dimensions?: Statement, lowerBounds?: Statement) {
        return this.pushFunction("ARRAY_FILL",
            value,
            dimensions,
            lowerBounds);
    }

    // array_length(anyarray, integer) -> integer
    arrayLength(array?: Statement, dimension?: Statement) {
        return this.pushFunction("ARRAY_LENGTH",
            array,
            dimension);
    }

    // array_lower(anyarray, integer) -> integer
    arrayLower(array?: Statement, dimension?: Statement) {
        return this.pushFunction("ARRAY_LOWER",
            array,
            dimension);
    }

    // array_ndims(anyarray) -> integer
    arrayNdims(array?: Statement) {
        return this.pushFunction("ARRAY_NDIMS", array);
    }

    // array_position(anyarray, anyelement[, integer]) -> integer
    arrayPosition(array?: Statement, element?: Statement, start?: Statement) {
        return this.pushFunction("ARRAY_POSITION",
            array,
            element,
            start);
    }

    // array_positions(anyarray, anyelement) -> integer[]
    arrayPositions(array?: Statement, element?: Statement) {
        return this.pushFunction("ARRAY_POSITIONS",
            array,
            element);
    }

    // array_prepend(anyelement, anyarray) -> anyarray
    arrayPrepend(element?: Statement, array?: Statement) {
        return this.pushFunction("ARRAY_PREPEND",
            element,
            array);
    }

    // array_remove(anyarray, anyelement) -> anyarray
    arrayRemove(array?: Statement, element?: Statement) {
        return this.pushFunction("ARRAY_REMOVE",
            array,
            element);
    }

    // array_replace(anyarray, anyelement, anyelement) -> anyarray
    arrayReplace(array?: Statement, oldElement?: Statement, newElement?: Statement) {
        return this.pushFunction("ARRAY_REPLACE",
            array,
            oldElement,
            newElement);
    }

    // array_reverse(anyarray) -> anyarray
    arrayReverse(array?: Statement) {
        return this.pushFunction("ARRAY_REVERSE", array);
    }

    // array_sample(anyarray, integer) -> anyarray
    arraySample(array?: Statement, n?: Statement) {
        return this.pushFunction("ARRAY_SAMPLE",
            array,
            n);
    }

    // array_shuffle(anyarray) -> anyarray
    arrayShuffle(array?: Statement) {
        return this.pushFunction("ARRAY_SHUFFLE", array);
    }

    // array_sort(anyarray[, boolean][, boolean]) -> anyarray
    arraySort(array?: Statement, descending?: Statement, nullsFirst?: Statement) {
        return this.pushFunction("ARRAY_SORT",
            array,
            descending,
            nullsFirst);
    }

    // array_to_string(anyarray, text[, text]) -> text
    arrayToString(array?: Statement, delimiter?: Statement, nullString?: Statement) {
        return this.pushFunction("ARRAY_TO_STRING",
            array,
            delimiter,
            nullString);
    }

    // array_upper(anyarray, integer) -> integer
    arrayUpper(array?: Statement, dimension?: Statement) {
        return this.pushFunction("ARRAY_UPPER",
            array,
            dimension);
    }

    // trim_array(anyarray, integer) -> anyarray
    override trimArray(array?: Statement, n?: Statement) {
        return this.pushFunction("TRIM_ARRAY",
            array,
            n);
    }
}
