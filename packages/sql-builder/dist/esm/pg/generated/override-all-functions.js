var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// AUTO-GENERATED - DO NOT EDIT.
import { BaseQueryBuilder } from "./base-query-builder";
var AllFunctionBuilder = /** @class */ (function (_super) {
    __extends(AllFunctionBuilder, _super);
    function AllFunctionBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllFunctionBuilder.prototype.abbrev = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ABBREV", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.abs = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.abs.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ABS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.acldefault = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ACLDEFAULT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.aclexplode = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ACLEXPLODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.acos = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.acos.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ACOS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.acosd = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ACOSD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.acosh = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ACOSH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.age = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "AGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.anyValue = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.anyValue.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ANY_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.area = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "AREA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayAgg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.arrayAgg.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayAppend = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_APPEND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayCat = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_CAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayDims = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_DIMS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayFill = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_FILL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayLength = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayLower = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_LOWER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayNdims = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_NDIMS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayPosition = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_POSITION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayPositions = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_POSITIONS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayPrepend = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_PREPEND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayRemove = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_REMOVE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayReplace = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_REPLACE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayReverse = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_REVERSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arraySample = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_SAMPLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayShuffle = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_SHUFFLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arraySort = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_SORT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayToJson = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_TO_JSON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayToString = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_TO_STRING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayToTsvector = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.arrayUpper = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ARRAY_UPPER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.ascii = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ASCII", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.asin = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.asin.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ASIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.asind = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ASIND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.asinh = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ASINH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.atan = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.atan.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ATAN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.atan2 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ATAN2", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.atan2d = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ATAN2D", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.atand = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ATAND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.atanh = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ATANH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.avg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.avg.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "AVG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.bitAnd = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BIT_AND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.bitCount = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BIT_COUNT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.bitLength = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.bitLength.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BIT_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.bitOr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BIT_OR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.bitXor = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BIT_XOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.boolAnd = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BOOL_AND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.boolOr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BOOL_OR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.boundBox = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BOUND_BOX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.box = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BOX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.brinDesummarizeRange = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BRIN_DESUMMARIZE_RANGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.brinSummarizeNewValues = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BRIN_SUMMARIZE_NEW_VALUES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.brinSummarizeRange = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BRIN_SUMMARIZE_RANGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.broadcast = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BROADCAST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.btrim = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.btrim.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "BTRIM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cardinality = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.cardinality.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CARDINALITY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.casefold = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CASEFOLD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cbrt = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CBRT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.ceil = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.ceil.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CEIL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.ceiling = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.ceiling.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CEILING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.center = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CENTER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.characterLength = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.characterLength.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CHARACTER_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.charLength = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.charLength.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CHAR_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.chr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CHR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.circle = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CIRCLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.clockTimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CLOCK_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.coalesce = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.coalesce.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COALESCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.colDescription = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COL_DESCRIPTION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.collationFor = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COLLATION_FOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.concat = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CONCAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.concatWs = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CONCAT_WS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.convert = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.convert.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CONVERT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.convertFrom = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CONVERT_FROM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.convertTo = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CONVERT_TO", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.corr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.corr.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CORR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cos = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.cos.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cosd = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COSD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cosh = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.cosh.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COSH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cotd = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COTD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.count = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.count.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COUNT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.covarPop = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.covarPop.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COVAR_POP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.covarSamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.covarSamp.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "COVAR_SAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.crc32 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CRC32", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.crc32c = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CRC32C", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cumeDist = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.cumeDist.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CUME_DIST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.currentDatabase = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURRENT_DATABASE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.currentDate = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.currentDate.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURRENT_DATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.currentQuery = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURRENT_QUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.currentSchema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.currentSchema.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURRENT_SCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.currentSchemas = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURRENT_SCHEMAS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.currentSetting = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURRENT_SETTING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.currentTime = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.currentTime.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURRENT_TIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.currentTimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.currentTimestamp.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURRENT_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.currval = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURRVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cursorToXml = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURSOR_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.cursorToXmlschema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "CURSOR_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.databaseToXml = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DATABASE_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.databaseToXmlAndXmlschema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DATABASE_TO_XML_AND_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.databaseToXmlschema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DATABASE_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.dateAdd = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DATE_ADD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.dateBin = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DATE_BIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.datePart = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DATE_PART", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.dateSubtract = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DATE_SUBTRACT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.dateTrunc = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DATE_TRUNC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.decode = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DECODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.degrees = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DEGREES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.denseRank = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.denseRank.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DENSE_RANK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.diagonal = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DIAGONAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.diameter = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DIAMETER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.div = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "DIV", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.encode = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ENCODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.enumFirst = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ENUM_FIRST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.enumLast = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ENUM_LAST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.enumRange = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ENUM_RANGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.erf = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ERF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.erfc = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ERFC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.every = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.every.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "EVERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.exp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.exp.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "EXP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.extract = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.extract.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "EXTRACT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.factorial = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "FACTORIAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.family = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.family.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "FAMILY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.firstValue = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.firstValue.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "FIRST_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.floor = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.floor.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "FLOOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.format = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.format.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "FORMAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.formatType = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "FORMAT_TYPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.gamma = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GAMMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.gcd = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GCD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.generateSeries = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GENERATE_SERIES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.generateSubscripts = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GENERATE_SUBSCRIPTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.genRandomUuid = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GEN_RANDOM_UUID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.getBit = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GET_BIT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.getByte = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GET_BYTE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.getCurrentTsConfig = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GET_CURRENT_TS_CONFIG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.ginCleanPendingList = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GIN_CLEAN_PENDING_LIST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.greatest = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.greatest.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GREATEST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.grouping = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.grouping.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "GROUPING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasAnyColumnPrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_ANY_COLUMN_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasColumnPrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_COLUMN_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasDatabasePrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_DATABASE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasForeignDataWrapperPrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasFunctionPrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_FUNCTION_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasLanguagePrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_LANGUAGE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasLargeobjectPrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_LARGEOBJECT_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasParameterPrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_PARAMETER_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasSchemaPrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_SCHEMA_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasSequencePrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_SEQUENCE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasServerPrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_SERVER_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasTablePrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_TABLE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasTablespacePrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_TABLESPACE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hasTypePrivilege = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HAS_TYPE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.height = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HEIGHT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.host = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HOST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.hostmask = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "HOSTMASK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.icuUnicodeVersion = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ICU_UNICODE_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.inetClientAddr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "INET_CLIENT_ADDR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.inetClientPort = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "INET_CLIENT_PORT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.inetMerge = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "INET_MERGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.inetSameFamily = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "INET_SAME_FAMILY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.inetServerAddr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "INET_SERVER_ADDR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.inetServerPort = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "INET_SERVER_PORT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.initcap = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "INITCAP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.isclosed = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ISCLOSED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.isempty = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ISEMPTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.isfinite = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ISFINITE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.isopen = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ISOPEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonAgg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonAggStrict = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_AGG_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonArray = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.jsonArray.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonArrayagg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.jsonArrayagg.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_ARRAYAGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonArrayElements = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_ARRAY_ELEMENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonArrayElementsText = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_ARRAY_ELEMENTS_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonArrayLength = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_ARRAY_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbAgg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbAggStrict = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_AGG_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbArrayElements = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_ARRAY_ELEMENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbArrayElementsText = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_ARRAY_ELEMENTS_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbArrayLength = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_ARRAY_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbBuildArray = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_BUILD_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbBuildObject = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_BUILD_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbEach = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_EACH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbEachText = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_EACH_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbExtractPath = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_EXTRACT_PATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbExtractPathText = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_EXTRACT_PATH_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbInsert = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_INSERT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbObject = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbObjectAgg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_OBJECT_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbObjectAggStrict = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_OBJECT_AGG_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbObjectAggUnique = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_OBJECT_AGG_UNIQUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbObjectAggUniqueStrict = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_OBJECT_AGG_UNIQUE_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbObjectKeys = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_OBJECT_KEYS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathExists = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_EXISTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathExistsTz = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_EXISTS_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathMatch = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_MATCH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathMatchTz = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_MATCH_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathQuery = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_QUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathQueryArray = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_QUERY_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathQueryArrayTz = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_QUERY_ARRAY_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathQueryFirst = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_QUERY_FIRST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathQueryFirstTz = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_QUERY_FIRST_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPathQueryTz = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PATH_QUERY_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPopulateRecord = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_POPULATE_RECORD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPopulateRecordset = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_POPULATE_RECORDSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPopulateRecordValid = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_POPULATE_RECORD_VALID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbPretty = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_PRETTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbSet = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_SET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbSetLax = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_SET_LAX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbStripNulls = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_STRIP_NULLS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbToRecord = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_TO_RECORD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbToRecordset = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_TO_RECORDSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbToTsvector = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonbTypeof = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSONB_TYPEOF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonBuildArray = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_BUILD_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonBuildObject = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_BUILD_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonEach = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_EACH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonEachText = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_EACH_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonExists = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.jsonExists.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_EXISTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonExtractPath = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_EXTRACT_PATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonExtractPathText = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_EXTRACT_PATH_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonObject = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.jsonObject.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonObjectagg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.jsonObjectagg.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_OBJECTAGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonObjectAgg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_OBJECT_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonObjectAggStrict = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_OBJECT_AGG_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonObjectAggUnique = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_OBJECT_AGG_UNIQUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonObjectAggUniqueStrict = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_OBJECT_AGG_UNIQUE_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonObjectKeys = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_OBJECT_KEYS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonPopulateRecord = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_POPULATE_RECORD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonPopulateRecordset = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_POPULATE_RECORDSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonQuery = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.jsonQuery.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_QUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonScalar = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.jsonScalar.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_SCALAR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonSerialize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.jsonSerialize.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_SERIALIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonStripNulls = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_STRIP_NULLS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonToRecord = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_TO_RECORD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonToRecordset = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_TO_RECORDSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonToTsvector = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonTypeof = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_TYPEOF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.jsonValue = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.jsonValue.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JSON_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.justifyDays = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JUSTIFY_DAYS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.justifyHours = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JUSTIFY_HOURS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.justifyInterval = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "JUSTIFY_INTERVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lag = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.lag.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LAG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lastval = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LASTVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lastValue = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.lastValue.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LAST_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lcm = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LCM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lead = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.lead.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LEAD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.least = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.least.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LEAST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.left = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.left.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LEFT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.length = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.length.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lgamma = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LGAMMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.line = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LINE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.ln = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.ln.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.localtime = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.localtime.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LOCALTIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.localtimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.localtimestamp.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LOCALTIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.log = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.log.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LOG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.log10 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.log10.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LOG10", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lower = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.lower.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LOWER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lowerInc = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LOWER_INC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lowerInf = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LOWER_INF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lpad = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.lpad.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LPAD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.lseg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LSEG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.ltrim = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.ltrim.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "LTRIM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.macaddr8Set7bit = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MACADDR8_SET7BIT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.makeaclitem = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MAKEACLITEM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.makeDate = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MAKE_DATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.makeInterval = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MAKE_INTERVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.makeTime = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MAKE_TIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.makeTimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MAKE_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.makeTimestamptz = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MAKE_TIMESTAMPTZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.masklen = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MASKLEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.max = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.max.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MAX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.md5 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MD5", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.mergeAction = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MERGE_ACTION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.min = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.min.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.minScale = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MIN_SCALE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.mod = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.mod.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MOD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.mode = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.mode.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.multirange = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MULTIRANGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.mxidAge = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "MXID_AGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.netmask = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NETMASK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.network = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NETWORK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.nextval = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NEXTVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.normalize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.normalize.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NORMALIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.now = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NOW", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.npoints = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NPOINTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.nthValue = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.nthValue.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NTH_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.ntile = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.ntile.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NTILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.nullif = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.nullif.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NULLIF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.numnode = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "NUMNODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.objDescription = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "OBJ_DESCRIPTION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.octetLength = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.octetLength.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "OCTET_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.overlay = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.overlay.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "OVERLAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.parseIdent = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PARSE_IDENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.path = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.path.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pclose = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PCLOSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.percentileCont = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.percentileCont.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PERCENTILE_CONT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.percentileDisc = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.percentileDisc.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PERCENTILE_DISC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.percentRank = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.percentRank.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PERCENT_RANK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgAdvisoryLock = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_ADVISORY_LOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgAdvisoryLockShared = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_ADVISORY_LOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgAdvisoryUnlock = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_ADVISORY_UNLOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgAdvisoryUnlockAll = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_ADVISORY_UNLOCK_ALL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgAdvisoryUnlockShared = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_ADVISORY_UNLOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgAdvisoryXactLock = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_ADVISORY_XACT_LOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgAdvisoryXactLockShared = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_ADVISORY_XACT_LOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgAvailableWalSummaries = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_AVAILABLE_WAL_SUMMARIES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgBackendPid = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_BACKEND_PID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgBackupStart = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_BACKUP_START", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgBackupStop = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_BACKUP_STOP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgBasetype = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_BASETYPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgBlockingPids = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_BLOCKING_PIDS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCancelBackend = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CANCEL_BACKEND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCharToEncoding = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CHAR_TO_ENCODING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgClearAttributeStats = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CLEAR_ATTRIBUTE_STATS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgClearRelationStats = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CLEAR_RELATION_STATS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgClientEncoding = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CLIENT_ENCODING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCollationActualVersion = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_COLLATION_ACTUAL_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCollationIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_COLLATION_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgColumnCompression = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_COLUMN_COMPRESSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgColumnSize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_COLUMN_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgColumnToastChunkId = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_COLUMN_TOAST_CHUNK_ID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgConfLoadTime = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CONF_LOAD_TIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgControlCheckpoint = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CONTROL_CHECKPOINT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgControlInit = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CONTROL_INIT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgControlRecovery = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CONTROL_RECOVERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgControlSystem = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CONTROL_SYSTEM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgConversionIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CONVERSION_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCopyLogicalReplicationSlot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_COPY_LOGICAL_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCopyPhysicalReplicationSlot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_COPY_PHYSICAL_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCreateLogicalReplicationSlot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CREATE_LOGICAL_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCreatePhysicalReplicationSlot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CREATE_PHYSICAL_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCreateRestorePoint = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CREATE_RESTORE_POINT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCurrentLogfile = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CURRENT_LOGFILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCurrentSnapshot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CURRENT_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCurrentWalFlushLsn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CURRENT_WAL_FLUSH_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCurrentWalInsertLsn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CURRENT_WAL_INSERT_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCurrentWalLsn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CURRENT_WAL_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCurrentXactId = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CURRENT_XACT_ID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgCurrentXactIdIfAssigned = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_CURRENT_XACT_ID_IF_ASSIGNED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgDatabaseCollationActualVersion = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_DATABASE_COLLATION_ACTUAL_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgDatabaseSize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_DATABASE_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgDescribeObject = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_DESCRIBE_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgDropReplicationSlot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_DROP_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgEncodingToChar = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_ENCODING_TO_CHAR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgEventTriggerDdlCommands = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_EVENT_TRIGGER_DDL_COMMANDS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgEventTriggerDroppedObjects = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_EVENT_TRIGGER_DROPPED_OBJECTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgEventTriggerTableRewriteOid = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_EVENT_TRIGGER_TABLE_REWRITE_OID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgEventTriggerTableRewriteReason = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_EVENT_TRIGGER_TABLE_REWRITE_REASON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgExportSnapshot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_EXPORT_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgFilenodeRelation = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_FILENODE_RELATION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgFunctionIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_FUNCTION_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetAcl = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_ACL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetCatalogForeignKeys = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_CATALOG_FOREIGN_KEYS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetConstraintdef = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_CONSTRAINTDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetExpr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_EXPR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetFunctionArguments = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_FUNCTION_ARGUMENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetFunctiondef = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_FUNCTIONDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetFunctionIdentityArguments = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_FUNCTION_IDENTITY_ARGUMENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetFunctionResult = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_FUNCTION_RESULT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetIndexdef = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_INDEXDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetKeywords = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_KEYWORDS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetLoadedModules = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_LOADED_MODULES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetMultixactMembers = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_MULTIXACT_MEMBERS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetObjectAddress = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_OBJECT_ADDRESS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetPartitionConstraintdef = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_PARTITION_CONSTRAINTDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetPartkeydef = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_PARTKEYDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetRuledef = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_RULEDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetSerialSequence = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_SERIAL_SEQUENCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetStatisticsobjdef = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_STATISTICSOBJDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetTriggerdef = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_TRIGGERDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetUserbyid = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_USERBYID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetViewdef = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_VIEWDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetWalReplayPauseState = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_WAL_REPLAY_PAUSE_STATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetWalResourceManagers = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_WAL_RESOURCE_MANAGERS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgGetWalSummarizerState = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_GET_WAL_SUMMARIZER_STATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgHasRole = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_HAS_ROLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgIdentifyObject = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_IDENTIFY_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgIdentifyObjectAsAddress = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_IDENTIFY_OBJECT_AS_ADDRESS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgImportSystemCollations = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_IMPORT_SYSTEM_COLLATIONS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgIndexamHasProperty = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_INDEXAM_HAS_PROPERTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgIndexColumnHasProperty = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_INDEX_COLUMN_HAS_PROPERTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgIndexesSize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_INDEXES_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgIndexHasProperty = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_INDEX_HAS_PROPERTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgInputErrorInfo = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_INPUT_ERROR_INFO", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgInputIsValid = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_INPUT_IS_VALID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgIsInRecovery = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_IS_IN_RECOVERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgIsOtherTempSchema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_IS_OTHER_TEMP_SCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgIsWalReplayPaused = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_IS_WAL_REPLAY_PAUSED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgJitAvailable = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_JIT_AVAILABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLastCommittedXact = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LAST_COMMITTED_XACT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLastWalReceiveLsn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LAST_WAL_RECEIVE_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLastWalReplayLsn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LAST_WAL_REPLAY_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLastXactReplayTimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LAST_XACT_REPLAY_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgListeningChannels = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LISTENING_CHANNELS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLogBackendMemoryContexts = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LOG_BACKEND_MEMORY_CONTEXTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLogicalEmitMessage = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LOGICAL_EMIT_MESSAGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLogicalSlotGetBinaryChanges = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LOGICAL_SLOT_GET_BINARY_CHANGES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLogicalSlotGetChanges = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LOGICAL_SLOT_GET_CHANGES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLogicalSlotPeekBinaryChanges = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LOGICAL_SLOT_PEEK_BINARY_CHANGES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLogicalSlotPeekChanges = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LOGICAL_SLOT_PEEK_CHANGES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLogStandbySnapshot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LOG_STANDBY_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLsArchiveStatusdir = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LS_ARCHIVE_STATUSDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLsDir = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LS_DIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLsLogdir = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LS_LOGDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLsLogicalmapdir = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LS_LOGICALMAPDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLsLogicalsnapdir = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LS_LOGICALSNAPDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLsReplslotdir = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LS_REPLSLOTDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLsSummariesdir = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LS_SUMMARIESDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLsTmpdir = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LS_TMPDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgLsWaldir = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_LS_WALDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgMcvListItems = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_MCV_LIST_ITEMS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgMyTempSchema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_MY_TEMP_SCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgNotificationQueueUsage = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_NOTIFICATION_QUEUE_USAGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgNumaAvailable = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_NUMA_AVAILABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgOpclassIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_OPCLASS_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgOperatorIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_OPERATOR_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgOpfamilyIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_OPFAMILY_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgOptionsToTable = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_OPTIONS_TO_TABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgPartitionAncestors = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_PARTITION_ANCESTORS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgPartitionRoot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_PARTITION_ROOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgPartitionTree = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_PARTITION_TREE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgPostmasterStartTime = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_POSTMASTER_START_TIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgPromote = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_PROMOTE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReadBinaryFile = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_READ_BINARY_FILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReadFile = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_READ_FILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgRelationFilenode = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_RELATION_FILENODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgRelationFilepath = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_RELATION_FILEPATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgRelationSize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_RELATION_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReloadConf = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_RELOAD_CONF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginAdvance = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_ADVANCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginCreate = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_CREATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginDrop = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_DROP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginOid = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_OID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginProgress = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_PROGRESS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginSessionIsSetup = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_SESSION_IS_SETUP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginSessionProgress = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_SESSION_PROGRESS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginSessionReset = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_SESSION_RESET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginSessionSetup = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_SESSION_SETUP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginXactReset = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_XACT_RESET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationOriginXactSetup = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_ORIGIN_XACT_SETUP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgReplicationSlotAdvance = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_REPLICATION_SLOT_ADVANCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgRestoreAttributeStats = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_RESTORE_ATTRIBUTE_STATS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgRestoreRelationStats = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_RESTORE_RELATION_STATS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgRotateLogfile = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_ROTATE_LOGFILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSafeSnapshotBlockingPids = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SAFE_SNAPSHOT_BLOCKING_PIDS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSettingsGetFlags = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SETTINGS_GET_FLAGS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSizeBytes = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SIZE_BYTES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSizePretty = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SIZE_PRETTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSleep = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SLEEP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSleepFor = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SLEEP_FOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSleepUntil = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SLEEP_UNTIL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSnapshotXip = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SNAPSHOT_XIP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSnapshotXmax = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SNAPSHOT_XMAX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSnapshotXmin = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SNAPSHOT_XMIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSplitWalfileName = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SPLIT_WALFILE_NAME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgStatFile = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_STAT_FILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgStatisticsObjIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_STATISTICS_OBJ_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSwitchWal = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SWITCH_WAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgSyncReplicationSlots = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_SYNC_REPLICATION_SLOTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTableIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TABLE_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTableSize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TABLE_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTablespaceDatabases = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TABLESPACE_DATABASES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTablespaceLocation = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TABLESPACE_LOCATION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTablespaceSize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TABLESPACE_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTerminateBackend = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TERMINATE_BACKEND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTotalRelationSize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TOTAL_RELATION_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTriggerDepth = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TRIGGER_DEPTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTryAdvisoryLock = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TRY_ADVISORY_LOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTryAdvisoryLockShared = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TRY_ADVISORY_LOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTryAdvisoryXactLock = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TRY_ADVISORY_XACT_LOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTryAdvisoryXactLockShared = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TRY_ADVISORY_XACT_LOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTsConfigIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TS_CONFIG_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTsDictIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TS_DICT_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTsParserIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TS_PARSER_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTsTemplateIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TS_TEMPLATE_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTypeIsVisible = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TYPE_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgTypeof = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_TYPEOF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgVisibleInSnapshot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_VISIBLE_IN_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgWalfileName = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_WALFILE_NAME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgWalfileNameOffset = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_WALFILE_NAME_OFFSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgWalLsnDiff = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_WAL_LSN_DIFF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgWalReplayPause = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_WAL_REPLAY_PAUSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgWalReplayResume = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_WAL_REPLAY_RESUME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgWalSummaryContents = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_WAL_SUMMARY_CONTENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgXactCommitTimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_XACT_COMMIT_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgXactCommitTimestampOrigin = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_XACT_COMMIT_TIMESTAMP_ORIGIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pgXactStatus = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PG_XACT_STATUS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.phrasetoTsquery = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PHRASETO_TSQUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.pi = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PI", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.plaintoTsquery = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "PLAINTO_TSQUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.point = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "POINT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.polygon = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "POLYGON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.popen = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "POPEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.position = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.position.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "POSITION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.power = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.power.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "POWER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.queryToXml = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "QUERY_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.queryToXmlAndXmlschema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "QUERY_TO_XML_AND_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.queryToXmlschema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "QUERY_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.querytree = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "QUERYTREE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.quoteIdent = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "QUOTE_IDENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.quoteLiteral = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "QUOTE_LITERAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.quoteNullable = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "QUOTE_NULLABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.radians = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RADIANS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.radius = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RADIUS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.random = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RANDOM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.randomNormal = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RANDOM_NORMAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.rangeAgg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RANGE_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.rangeIntersectAgg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RANGE_INTERSECT_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.rangeMerge = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RANGE_MERGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.rank = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.rank.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RANK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regexpCount = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGEXP_COUNT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regexpInstr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGEXP_INSTR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regexpLike = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGEXP_LIKE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regexpMatch = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGEXP_MATCH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regexpMatches = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGEXP_MATCHES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regexpReplace = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGEXP_REPLACE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regexpSplitToArray = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGEXP_SPLIT_TO_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regexpSplitToTable = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGEXP_SPLIT_TO_TABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regexpSubstr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGEXP_SUBSTR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regrAvgx = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.regrAvgx.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGR_AVGX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regrAvgy = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.regrAvgy.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGR_AVGY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regrCount = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.regrCount.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGR_COUNT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regrIntercept = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.regrIntercept.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGR_INTERCEPT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regrR2 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.regrR2.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGR_R2", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regrSlope = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.regrSlope.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGR_SLOPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regrSxx = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.regrSxx.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGR_SXX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regrSxy = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.regrSxy.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGR_SXY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.regrSyy = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.regrSyy.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REGR_SYY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.repeat = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REPEAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.replace = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.replace.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REPLACE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.reverse = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "REVERSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.right = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.right.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RIGHT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.round = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ROUND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.rowNumber = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ROW_NUMBER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.rowSecurityActive = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ROW_SECURITY_ACTIVE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.rowToJson = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "ROW_TO_JSON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.rpad = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.rpad.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RPAD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.rtrim = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.rtrim.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "RTRIM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.scale = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.scale.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SCALE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.schemaToXml = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SCHEMA_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.schemaToXmlAndXmlschema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SCHEMA_TO_XML_AND_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.schemaToXmlschema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SCHEMA_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.setBit = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SET_BIT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.setByte = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SET_BYTE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.setConfig = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SET_CONFIG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.setMasklen = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SET_MASKLEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.setseed = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SETSEED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.setval = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SETVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.setweight = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SETWEIGHT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sha224 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SHA224", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sha256 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SHA256", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sha384 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SHA384", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sha512 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SHA512", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.shobjDescription = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SHOBJ_DESCRIPTION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sign = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SIGN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sin = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.sin.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sind = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SIND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sinh = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.sinh.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SINH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.slope = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SLOPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.splitPart = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SPLIT_PART", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sqrt = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.sqrt.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SQRT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.startsWith = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STARTS_WITH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.statementTimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STATEMENT_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.stddev = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STDDEV", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.stddevPop = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.stddevPop.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STDDEV_POP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.stddevSamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.stddevSamp.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STDDEV_SAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.stringAgg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STRING_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.stringToArray = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STRING_TO_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.stringToTable = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STRING_TO_TABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.strip = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.strip.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STRIP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.strpos = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "STRPOS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.substr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SUBSTR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.substring = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.substring.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SUBSTRING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.sum = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.sum.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SUM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.suppressRedundantUpdatesTrigger = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "SUPPRESS_REDUNDANT_UPDATES_TRIGGER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tableToXml = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TABLE_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tableToXmlAndXmlschema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TABLE_TO_XML_AND_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tableToXmlschema = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TABLE_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tan = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.tan.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TAN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tand = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TAND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tanh = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.tanh.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TANH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.timeofday = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TIMEOFDAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toAscii = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_ASCII", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toBin = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_BIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toChar = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_CHAR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toDate = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_DATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toHex = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_HEX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toJson = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_JSON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toJsonb = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_JSONB", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toNumber = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_NUMBER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toOct = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_OCT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegclass = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGCLASS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegcollation = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGCOLLATION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegnamespace = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGNAMESPACE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegoper = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGOPER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegoperator = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGOPERATOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegproc = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGPROC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegprocedure = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGPROCEDURE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegrole = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGROLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegtype = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGTYPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toRegtypemod = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_REGTYPEMOD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toText = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CAST" }], params, false));
    };
    AllFunctionBuilder.prototype.toTimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toTsquery = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_TSQUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.toTsvector = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.transactionTimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TRANSACTION_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.translate = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.translate.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TRANSLATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.trim = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.trim.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TRIM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.trimArray = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.trimArray.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TRIM_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.trimScale = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TRIM_SCALE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.trunc = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TRUNC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsDebug = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_DEBUG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsDelete = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_DELETE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsFilter = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_FILTER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsHeadline = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_HEADLINE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsLexize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_LEXIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsParse = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_PARSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsqueryPhrase = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TSQUERY_PHRASE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsRank = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_RANK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsRankCd = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_RANK_CD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsRewrite = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_REWRITE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsStat = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_STAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsTokenType = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TS_TOKEN_TYPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsvectorToArray = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TSVECTOR_TO_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsvectorUpdateTrigger = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TSVECTOR_UPDATE_TRIGGER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.tsvectorUpdateTriggerColumn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TSVECTOR_UPDATE_TRIGGER_COLUMN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.txidCurrent = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TXID_CURRENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.txidCurrentIfAssigned = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TXID_CURRENT_IF_ASSIGNED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.txidCurrentSnapshot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TXID_CURRENT_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.txidSnapshotXip = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TXID_SNAPSHOT_XIP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.txidSnapshotXmax = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TXID_SNAPSHOT_XMAX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.txidSnapshotXmin = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TXID_SNAPSHOT_XMIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.txidStatus = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TXID_STATUS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.txidVisibleInSnapshot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "TXID_VISIBLE_IN_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.unicodeAssigned = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UNICODE_ASSIGNED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.unicodeVersion = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UNICODE_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.unistr = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UNISTR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.unnest = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.unnest.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UNNEST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.upper = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.upper.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UPPER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.upperInc = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UPPER_INC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.upperInf = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UPPER_INF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.uuidExtractTimestamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UUID_EXTRACT_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.uuidExtractVersion = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UUID_EXTRACT_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.uuidv4 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UUIDV4", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.uuidv7 = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "UUIDV7", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.variance = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "VARIANCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.varPop = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.varPop.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "VAR_POP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.varSamp = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.varSamp.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "VAR_SAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.version = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.version.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.websearchToTsquery = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "WEBSEARCH_TO_TSQUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.width = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "WIDTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.widthBucket = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.widthBucket.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "WIDTH_BUCKET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlagg = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlagg.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLAGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlattributes = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlattributes.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLATTRIBUTES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlcomment = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlcomment.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLCOMMENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlconcat = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlconcat.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLCONCAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlelement = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlelement.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLELEMENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlexists = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlexists.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLEXISTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlforest = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlforest.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLFOREST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlIsWellFormed = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XML_IS_WELL_FORMED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlIsWellFormedContent = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XML_IS_WELL_FORMED_CONTENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlIsWellFormedDocument = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XML_IS_WELL_FORMED_DOCUMENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlparse = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlparse.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLPARSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlpi = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlpi.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLPI", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlroot = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlroot.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLROOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmlserialize = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmlserialize.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLSERIALIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xmltext = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length == 0) {
            return _super.prototype.xmltext.call(this);
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XMLTEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xpath = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XPATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    AllFunctionBuilder.prototype.xpathExists = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.pushFunction.apply(this, __spreadArray([{ name: "XPATH_EXISTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }], params, false));
    };
    return AllFunctionBuilder;
}(BaseQueryBuilder));
export { AllFunctionBuilder };
