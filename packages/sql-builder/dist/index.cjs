"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryInstance = exports.QueryBuilder = void 0;
exports.sqlBuilder = sqlBuilder;
const query_instance_1 = require("./src/generated/query-instance");
Object.defineProperty(exports, "QueryInstance", { enumerable: true, get: function () { return query_instance_1.QueryInstance; } });
const query_builder_1 = require("./src/query-builder");
Object.defineProperty(exports, "QueryBuilder", { enumerable: true, get: function () { return query_builder_1.QueryBuilder; } });
function sqlBuilder(db) {
    const requiredDbInstance = {
        ...db,
        formatParamHandler: db.formatParamHandler || "pg",
    };
    return new query_instance_1.QueryInstance(requiredDbInstance);
}
