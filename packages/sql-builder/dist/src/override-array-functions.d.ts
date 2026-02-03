import { ConditionalFunctionBuilder } from "./override-conditional-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";
export declare class ArrayFunctionBuilder extends ConditionalFunctionBuilder {
    cardinality(array?: StatementValueQueryBuilder): this;
    unnest(...arrays: StatementValueQueryBuilder[]): this;
    arrayAppend(array?: StatementValueQueryBuilder, element?: StatementValueLiteral): this;
    arrayCat(array1?: StatementValueQueryBuilder, array2?: StatementValueQueryBuilder): this;
    arrayDims(array?: StatementValueQueryBuilder): this;
    arrayFill(value?: StatementValueLiteral, dimensions?: StatementValueQueryBuilder, lowerBounds?: StatementValueLiteral): this;
    arrayLength(array?: StatementValueQueryBuilder, dimension?: StatementValueLiteral): this;
    arrayLower(array?: StatementValueQueryBuilder, dimension?: StatementValueLiteral): this;
    arrayNdims(array?: StatementValueQueryBuilder): this;
    arrayPosition(array?: StatementValueQueryBuilder, element?: StatementValueLiteral, start?: StatementValueLiteral): this;
    arrayPositions(array?: StatementValueQueryBuilder, element?: StatementValueLiteral): this;
    arrayPrepend(element?: StatementValueLiteral, array?: StatementValueQueryBuilder): this;
    arrayRemove(array?: StatementValueQueryBuilder, element?: StatementValueLiteral): this;
    arrayReplace(array?: StatementValueQueryBuilder, oldElement?: StatementValueLiteral, newElement?: StatementValueLiteral): this;
    arrayReverse(array?: StatementValueQueryBuilder): this;
    arraySample(array?: StatementValueQueryBuilder, n?: StatementValueLiteral): this;
    arrayShuffle(array?: StatementValueQueryBuilder): this;
    arraySort(array?: StatementValueQueryBuilder, descending?: StatementValueLiteral, nullsFirst?: StatementValueLiteral): this;
    arrayToString(array?: StatementValueQueryBuilder, delimiter?: StatementValueLiteral, nullString?: StatementValueLiteral): this;
    arrayUpper(array?: StatementValueQueryBuilder, dimension?: StatementValueLiteral): this;
    trimArray(array?: StatementValueQueryBuilder, n?: StatementValueLiteral): this;
}
