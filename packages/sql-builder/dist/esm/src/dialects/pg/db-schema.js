export class DBSchema {
    dbSchemaName;
    constructor(dbSchemaName) {
        this.dbSchemaName = dbSchemaName;
    }
}
export class TableSchema {
    dbSchema;
    tableSchemaName;
    constructor(dbSchema, tableSchemaName) {
        this.dbSchema = dbSchema;
        this.tableSchemaName = tableSchemaName;
    }
}
export class ColumnSchema {
    dbSchema;
    tableSchema;
    columnSchemaName;
    constructor(dbSchema, tableSchema, columnSchemaName) {
        this.dbSchema = dbSchema;
        this.tableSchema = tableSchema;
        this.columnSchemaName = columnSchemaName;
    }
}
