export class DBSchema {
    constructor(public dbSchemaName: string) {}
}
export class TableSchema {
    constructor(public dbSchema: DBSchema, public tableSchemaName: string) {}
}

export class ColumnSchema {
    public dbSchema: DBSchema;
    public tableSchema: TableSchema;
    public columnSchemaName: string;
    constructor(dbSchema: DBSchema, tableSchema: TableSchema, columnSchemaName: string) { 
        this.dbSchema = dbSchema;
        this.tableSchema = tableSchema;
        this.columnSchemaName = columnSchemaName;
    }
}
