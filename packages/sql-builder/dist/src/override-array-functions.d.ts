import { ConditionalFunctionBuilder } from "./override-conditional-functions";
import type { Statement } from "./types";
export declare class ArrayFunctionBuilder extends ConditionalFunctionBuilder {
    cardinality(array?: Statement): this;
    unnest(...arrays: Statement[]): this;
    arrayAppend(array?: Statement, element?: Statement): this;
    arrayCat(array1?: Statement, array2?: Statement): this;
    arrayDims(array?: Statement): this;
    arrayFill(value?: Statement, dimensions?: Statement, lowerBounds?: Statement): this;
    arrayLength(array?: Statement, dimension?: Statement): this;
    arrayLower(array?: Statement, dimension?: Statement): this;
    arrayNdims(array?: Statement): this;
    arrayPosition(array?: Statement, element?: Statement, start?: Statement): this;
    arrayPositions(array?: Statement, element?: Statement): this;
    arrayPrepend(element?: Statement, array?: Statement): this;
    arrayRemove(array?: Statement, element?: Statement): this;
    arrayReplace(array?: Statement, oldElement?: Statement, newElement?: Statement): this;
    arrayReverse(array?: Statement): this;
    arraySample(array?: Statement, n?: Statement): this;
    arrayShuffle(array?: Statement): this;
    arraySort(array?: Statement, descending?: Statement, nullsFirst?: Statement): this;
    arrayToString(array?: Statement, delimiter?: Statement, nullString?: Statement): this;
    arrayUpper(array?: Statement, dimension?: Statement): this;
    trimArray(array?: Statement, n?: Statement): this;
}
