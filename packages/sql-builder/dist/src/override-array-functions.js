"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayFunctionBuilder = void 0;
const override_conditional_functions_1 = require("./override-conditional-functions");
class ArrayFunctionBuilder extends override_conditional_functions_1.ConditionalFunctionBuilder {
    // Override base-query-builder keyword to accept array parameter
    cardinality(array) {
        return this.pushFunction("CARDINALITY", array);
    }
    // Override base-query-builder keyword to accept array(s) parameter(s)
    unnest(...arrays) {
        const filtered = arrays.filter(a => a !== undefined);
        return this.pushFunction("UNNEST", ...filtered);
    }
    // array_append(anyarray, anyelement) -> anyarray
    arrayAppend(array, element) {
        return this.pushFunction("ARRAY_APPEND", array, element === undefined ? undefined : this.toLiteral(element));
    }
    // array_cat(anyarray, anyarray) -> anyarray
    arrayCat(array1, array2) {
        return this.pushFunction("ARRAY_CAT", array1, array2);
    }
    // array_dims(anyarray) -> text
    arrayDims(array) {
        return this.pushFunction("ARRAY_DIMS", array);
    }
    // array_fill(anyelement, integer[][, integer[]]) -> anyarray
    arrayFill(value, dimensions, lowerBounds) {
        return this.pushFunction("ARRAY_FILL", value === undefined ? undefined : this.toLiteral(value), dimensions, lowerBounds === undefined ? undefined : this.toLiteral(lowerBounds));
    }
    // array_length(anyarray, integer) -> integer
    arrayLength(array, dimension) {
        return this.pushFunction("ARRAY_LENGTH", array, dimension === undefined ? undefined : this.toLiteral(dimension));
    }
    // array_lower(anyarray, integer) -> integer
    arrayLower(array, dimension) {
        return this.pushFunction("ARRAY_LOWER", array, dimension === undefined ? undefined : this.toLiteral(dimension));
    }
    // array_ndims(anyarray) -> integer
    arrayNdims(array) {
        return this.pushFunction("ARRAY_NDIMS", array);
    }
    // array_position(anyarray, anyelement[, integer]) -> integer
    arrayPosition(array, element, start) {
        return this.pushFunction("ARRAY_POSITION", array, element === undefined ? undefined : this.toLiteral(element), start === undefined ? undefined : this.toLiteral(start));
    }
    // array_positions(anyarray, anyelement) -> integer[]
    arrayPositions(array, element) {
        return this.pushFunction("ARRAY_POSITIONS", array, element === undefined ? undefined : this.toLiteral(element));
    }
    // array_prepend(anyelement, anyarray) -> anyarray
    arrayPrepend(element, array) {
        return this.pushFunction("ARRAY_PREPEND", element === undefined ? undefined : this.toLiteral(element), array);
    }
    // array_remove(anyarray, anyelement) -> anyarray
    arrayRemove(array, element) {
        return this.pushFunction("ARRAY_REMOVE", array, element === undefined ? undefined : this.toLiteral(element));
    }
    // array_replace(anyarray, anyelement, anyelement) -> anyarray
    arrayReplace(array, oldElement, newElement) {
        return this.pushFunction("ARRAY_REPLACE", array, oldElement === undefined ? undefined : this.toLiteral(oldElement), newElement === undefined ? undefined : this.toLiteral(newElement));
    }
    // array_reverse(anyarray) -> anyarray
    arrayReverse(array) {
        return this.pushFunction("ARRAY_REVERSE", array);
    }
    // array_sample(anyarray, integer) -> anyarray
    arraySample(array, n) {
        return this.pushFunction("ARRAY_SAMPLE", array, n === undefined ? undefined : this.toLiteral(n));
    }
    // array_shuffle(anyarray) -> anyarray
    arrayShuffle(array) {
        return this.pushFunction("ARRAY_SHUFFLE", array);
    }
    // array_sort(anyarray[, boolean][, boolean]) -> anyarray
    arraySort(array, descending, nullsFirst) {
        return this.pushFunction("ARRAY_SORT", array, descending === undefined ? undefined : this.toLiteral(descending), nullsFirst === undefined ? undefined : this.toLiteral(nullsFirst));
    }
    // array_to_string(anyarray, text[, text]) -> text
    arrayToString(array, delimiter, nullString) {
        return this.pushFunction("ARRAY_TO_STRING", array, delimiter === undefined ? undefined : this.toLiteral(delimiter), nullString === undefined ? undefined : this.toLiteral(nullString));
    }
    // array_upper(anyarray, integer) -> integer
    arrayUpper(array, dimension) {
        return this.pushFunction("ARRAY_UPPER", array, dimension === undefined ? undefined : this.toLiteral(dimension));
    }
    // trim_array(anyarray, integer) -> anyarray
    trimArray(array, n) {
        return this.pushFunction("TRIM_ARRAY", array, n === undefined ? undefined : this.toLiteral(n));
    }
}
exports.ArrayFunctionBuilder = ArrayFunctionBuilder;
