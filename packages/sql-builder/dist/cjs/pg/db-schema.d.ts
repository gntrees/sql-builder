export declare class DBSchema {
    dbSchemaName: string;
    constructor(dbSchemaName: string);
}
export declare class TableSchema {
    dbSchema: DBSchema;
    tableSchemaName: string;
    constructor(dbSchema: DBSchema, tableSchemaName: string);
}
export declare class ColumnSchema {
    dbSchema: DBSchema;
    tableSchema: TableSchema;
    columnSchemaName: string;
    constructor(dbSchema: DBSchema, tableSchema: TableSchema, columnSchemaName: string);
}
