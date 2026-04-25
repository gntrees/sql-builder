var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// still prototype
var SqlSchemaParam = /** @class */ (function () {
    function SqlSchemaParam(key) {
        this.types = [];
        this.hasDefaultValue = false;
        this.key = key;
    }
    SqlSchemaParam.prototype.addType = function (type) {
        if (!this.types.includes(type)) {
            this.types.push(type);
        }
    };
    SqlSchemaParam.prototype.getKey = function () {
        return this.key;
    };
    SqlSchemaParam.prototype.number = function () {
        this.addType("number");
        return this;
    };
    SqlSchemaParam.prototype.boolean = function () {
        this.addType("boolean");
        return this;
    };
    SqlSchemaParam.prototype.string = function () {
        this.addType("string");
        return this;
    };
    SqlSchemaParam.prototype.nullable = function () {
        this.addType("null");
        return this;
    };
    SqlSchemaParam.prototype.default = function (value) {
        this.hasDefaultValue = true;
        this.defaultValue = value;
        this.value = value;
        return this;
    };
    SqlSchemaParam.prototype.hasDefault = function () {
        return this.hasDefaultValue;
    };
    SqlSchemaParam.prototype.getDefaultValue = function () {
        return this.defaultValue;
    };
    SqlSchemaParam.prototype.getTypes = function () {
        return this.types;
    };
    return SqlSchemaParam;
}());
export { SqlSchemaParam };
// still prototype
var SqlSchemaParamCase = /** @class */ (function () {
    function SqlSchemaParamCase(key, queryBuilder) {
        this.key = key;
        this.queryBuilder = queryBuilder;
    }
    SqlSchemaParamCase.prototype.setParams = function (params) {
        var runtimeParams = __assign({}, params);
        this.queryBuilder.setParams(runtimeParams);
        return this;
    };
    SqlSchemaParamCase.prototype.getQueryBuilder = function () {
        return this.queryBuilder;
    };
    return SqlSchemaParamCase;
}());
export { SqlSchemaParamCase };
