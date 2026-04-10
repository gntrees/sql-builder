"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnSchema = exports.TableSchema = exports.DBSchema = void 0;
class DBSchema {
    dbSchemaName;
    constructor(dbSchemaName) {
        this.dbSchemaName = dbSchemaName;
    }
}
exports.DBSchema = DBSchema;
class TableSchema {
    dbSchema;
    tableSchemaName;
    constructor(dbSchema, tableSchemaName) {
        this.dbSchema = dbSchema;
        this.tableSchemaName = tableSchemaName;
    }
}
exports.TableSchema = TableSchema;
class ColumnSchema {
    dbSchema;
    tableSchema;
    columnSchemaName;
    constructor(dbSchema, tableSchema, columnSchemaName) {
        this.dbSchema = dbSchema;
        this.tableSchema = tableSchema;
        this.columnSchemaName = columnSchemaName;
    }
}
exports.ColumnSchema = ColumnSchema;
