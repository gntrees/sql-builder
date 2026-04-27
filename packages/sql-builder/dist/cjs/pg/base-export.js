"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlSchema = exports.ColumnSchema = exports.TableSchema = exports.DBSchema = void 0;
var db_schema_1 = require("./db-schema");
Object.defineProperty(exports, "DBSchema", { enumerable: true, get: function () { return db_schema_1.DBSchema; } });
Object.defineProperty(exports, "TableSchema", { enumerable: true, get: function () { return db_schema_1.TableSchema; } });
Object.defineProperty(exports, "ColumnSchema", { enumerable: true, get: function () { return db_schema_1.ColumnSchema; } });
var sql_schema_1 = require("./sql-schema");
Object.defineProperty(exports, "sqlSchema", { enumerable: true, get: function () { return sql_schema_1.sqlSchema; } });
