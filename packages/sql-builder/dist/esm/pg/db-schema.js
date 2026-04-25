var DBSchema = /** @class */ (function () {
    function DBSchema(dbSchemaName) {
        this.dbSchemaName = dbSchemaName;
    }
    return DBSchema;
}());
export { DBSchema };
var TableSchema = /** @class */ (function () {
    function TableSchema(dbSchema, tableSchemaName) {
        this.dbSchema = dbSchema;
        this.tableSchemaName = tableSchemaName;
    }
    return TableSchema;
}());
export { TableSchema };
var ColumnSchema = /** @class */ (function () {
    function ColumnSchema(dbSchema, tableSchema, columnSchemaName) {
        this.dbSchema = dbSchema;
        this.tableSchema = tableSchema;
        this.columnSchemaName = columnSchemaName;
    }
    return ColumnSchema;
}());
export { ColumnSchema };
